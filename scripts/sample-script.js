const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const Minter = await hre.ethers.getContractFactory("Minter");
  const minter = await Minter.deploy("EventUs", "EVT");

  await minter.deployed();

  console.log("Minter deployed to:", minter.address);

  const EventContract = await hre.ethers.getContractFactory("EventContract");
  const eventcontract = await EventContract.deploy();

  await eventcontract.deployed();

  console.log("EventContract deployed to:", eventcontract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
