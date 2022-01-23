//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract EventContract {
    struct Event {
        address admin;
        string name;
        uint256 date;
        uint256 price;
        uint256 ticketCount;
        uint256 spotsLeft;
    }
    // event id to event
    mapping(uint256 => Event) public events;

    mapping(address => mapping(uint256 => uint256)) public tickets;

    uint256 public nextId;

    function createEvent(
        string calldata name,
        uint256 date,
        uint256 price,
        uint256 ticketCount
    ) external {
        // the date event is in the future not the past
        require(
            date > block.timestamp,
            "Event must be scheduled at a future date"
        );
        require(
            ticketCount > 0,
            "Event must be created with at least one ticket"
        );
        events[nextId] = Event(
            msg.sender,
            name,
            date,
            price,
            ticketCount,
            ticketCount
        );
        nextId++;
    }

    // allow potential attendee to purchase ticket
    function buyTicket(uint256 id, uint256 quantity)
        external
        payable
        eventExists(id)
        eventActive(id)
    {
        Event storage _event = events[id];

        // check that enough ether was sent to purchase ticket
        require(
            msg.value == (_event.price * quantity),
            "not enough ether sent"
        );
        // are there any remaining tickets
        require(_event.spotsLeft >= quantity, "not enough tickets left");
        // decrease the amount of tickets remaining
        _event.spotsLeft -= quantity;
        // create the ticket for new attendee
        tickets[msg.sender][id] += quantity;
    }

    // enable attendee to transfer ticket to others
    // DONATION DOES NOT COORDINATE TICKET WITH TRANSFER OF ETHER
    function donateTicket(
        uint256 eventId,
        uint256 quantity,
        address to
    ) external eventExists(eventId) eventActive(eventId) {
        require(tickets[msg.sender][eventId] >= quantity, "not enough tickets");
        tickets[msg.sender][eventId] -= quantity;
        tickets[to][eventId] += quantity;
    }

    // modifiers
    modifier eventExists(uint256 id) {
        // check that the event exists
        require(events[id].date != 0, "this event does not exist");
        _;
    }

    modifier eventActive(uint256 id) {
        // check the event is active || yet to occur
        require(
            block.timestamp < events[id].date,
            "this event is not active anymore"
        );
        _;
    }
}
