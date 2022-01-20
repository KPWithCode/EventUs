import React, { useState } from 'react'
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const NavBarItem = ({ title, classprops }) => (
    <li className={`mx-4 cursor-pointer text-white ${classprops}`}>{title}</li>
);
const Navbar = () => {
    const [toggle, setToggle] = useState(false)

    return (
        <nav className="w-full flex md:justify-center justify-between items-center pt-10 text-white h-24 bg-black">
            <div className="md:flex-[.75] flex-initial justify-center items-center">
                IMAGE/LOGO?
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {["Market", "Exchange", "Tutorials"].map((item, index) => (
                    <NavBarItem key={item + index} title={item} />
                ))}
                <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    Login
                </li>
            </ul>
            <div className="flex relative">
                {!toggle && (
                    <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggle(true)} />
                )}
                {toggle && (
                    <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggle(false)} />
                )}
                {toggle && (
                    <ul
                        className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                        flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
                    >
                        <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggle(false)} /></li>
                        {["Market", "Exchange", "Tutorials"].map(
                            (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
                        )}
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default Navbar;