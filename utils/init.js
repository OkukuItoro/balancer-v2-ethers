import { ethers } from "ethers"
import fs from "fs"
import dotenv from "dotenv"
import { poolFactory } from "../config/chain.config.js"
dotenv.config()

// Load private key and connect to RPC endpoint
const rpcUrl = process.env.RPC_URL
const privateKey = process.env.PRIVATE_KEY
if (rpcUrl == undefined || privateKey == undefined || privateKey == "") {
    throw new Error(
        "You must set environment variables for RPC_ENDPOINT and PRIVATE_KEY",
    )
}

// Account/Wallet connection
const provider = new ethers.JsonRpcProvider(rpcUrl)
const wallet = new ethers.Wallet(privateKey, provider)
const walletAddress = await wallet.getAddress()

console.log(`Wallet Address: ${walletAddress}`)
console.log(`---------------------------------------------------------`)

// Contract Addresses
const VAULT_ADDRESS = "0xBA12222222228d8Ba445958a75a0704d566BF2C8"
const POOL_FACTORY_ADDRESS =
    poolFactory[process.env.CHAIN_ID].CREATE_WEIGHTED_POOL_ADDR

// ABI paths
const VAULT_ABI_PATH =
    process.env.CHAIN_ID == 80001 || 137
        ? "./contracts/VaultMatic.abi"
        : "./contracts/Vault_sol.abi"
const POOL_FACTORY_ABI_PATH =
    process.env.CHAIN_ID == 80001 || 137
        ? "./contracts/WeightedPoolMatic.abi"
        : "./contracts/WeightedPoolEther.abi"

// ABI converted to JSON
const VAULT_ABI = JSON.parse(fs.readFileSync(VAULT_ABI_PATH, "utf8"))
const POOL_FACTORY_ABI = JSON.parse(
    fs.readFileSync(POOL_FACTORY_ABI_PATH, "utf8"),
)

// Contract connection
const vaultContract = new ethers.Contract(VAULT_ADDRESS, VAULT_ABI, wallet)
const poolFactoryContract = new ethers.Contract(
    POOL_FACTORY_ADDRESS,
    POOL_FACTORY_ABI,
    wallet,
)

console.log(`Contracts connected successfully`)
console.log(`---------------------------------------------------------`)

export {
    vaultContract,
    poolFactoryContract,
    VAULT_ADDRESS,
    VAULT_ABI,
    POOL_FACTORY_ADDRESS,
    POOL_FACTORY_ABI,
    wallet,
    walletAddress,
}
