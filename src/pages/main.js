import React from 'react'
import { ethers, BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import minterJson from '../artifacts/contracts/Minter.sol/Minter.json'
import Navbar from '../components/Navbar'

const minterAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
const EventContractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'

const Main = () => {

    const [accounts, setAccounts] = useState([])
    const [mintAmount, setMintAmount] = useState(1)

    async function connectAccounts() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })
            setAccounts(accounts)
        }
    }
    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                minterAddress,
                minterJson.abi,
                signer
            )
            try {
                const response = await contract.mint(BigNumber.from(mintAmount))
                console.log('response: ', response)
            } catch (err) {
                console.log('err: ', err)
            }
        }
    }
    useEffect(() => {
        connectAccounts()
    }, [])


    return (
        <div className="w-full h-full">

            <Navbar />
            <div className="font-bold text-xl">
                Hello World
            </div>
                {accounts.length && (
                    <div className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full text-center cursor-pointer hover:bg-[#2546bd] w-28">
                        Connect
                    </div>
                )}
        </div>
    )
}

export default Main