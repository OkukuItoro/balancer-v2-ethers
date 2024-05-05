import { ethers } from "ethers"
import {
    vaultContract,
    VAULT_ADDRESS,
    VAULT_ABI,
    wallet,
    walletAddress,
} from "../utils/init.js"
import BigNumber from "bignumber.js"
import sendTx from "../utils/sendTx.js"
import encodeTxData from "../utils/encodeTxData.js"

async function batchSwap() {
    // Where are the tokens coming from/going to?
    const fundSettings = {
        sender: walletAddress,
        recipient: walletAddress,
        fromInternalBalance: false,
        toInternalBalance: false,
    }

    // When should the transaction timeout?
    const deadline = new BigNumber(999999999999999999)

    // Pool IDs
    const POOL_20WETH_80TEL =
        "0xca6efa5704f1ae445e0ee24d9c3ddde34c5be1c2000200000000000000000dbd"
    // const POOL_WMATIC_MATICX =
    //     "0xcd78a20c597e367a4e478a2411ceb790604d7c8f000000000000000000000c22"
    const POOL_50RBW_50WETH =
        "0x8f9dd2064eb38e8e40f2ab67bde27c0e16ea9b080002000000000000000004ca"

    // Token addresses (checksum format)
    const WETH = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"
    const RBW = "0x431cd3c9ac9fc73644bf68bf5691f4b83f9e104f"
    const TEL = "0xdf7837de1f2fa4631d716cf2502f8b230f1dcc32"

    // Token data
    const tokenData = {}
    tokenData[RBW] = {
        symbol: "RBW",
        decimals: 18,
        limit: "0",
    }
    tokenData[TEL] = {
        symbol: "TEL",
        decimals: 2,
        limit: "857850.46",
    }
    tokenData[WETH] = {
        symbol: "WETH",
        decimals: 18,
        limit: "0",
    }

    const swapSteps = [
        {
            poolId: POOL_20WETH_80TEL,
            assetIn: TEL,
            assetOut: WETH,
            amount: "857850.46",
        },
        {
            poolId: POOL_50RBW_50WETH,
            assetIn: WETH,
            assetOut: RBW,
            amount: "0",
        },
    ]

    // SwapKind is an Enum. This example handles a GIVEN_IN swap.
    // https://github.com/balancer-labs/balancer-v2-monorepo/blob/0328ed575c1b36fb0ad61ab8ce848083543070b9/pkg/vault/contracts/interfaces/IVault.sol#L497
    // 0 = GIVEN_IN, 1 = GIVEN_OUT
    const swapKind = 0

    let tokenAddresses = Object.keys(tokenData)
    tokenAddresses.sort()
    const tokenIndices = {}
    for (let i = 0; i < tokenAddresses.length; i++) {
        tokenIndices[tokenAddresses[i]] = i
    }

    const swapStepsStruct = []
    for (const step of swapSteps) {
        const swapStepStruct = {
            poolId: step["poolId"],
            assetInIndex: tokenIndices[step["assetIn"]],
            assetOutIndex: tokenIndices[step["assetOut"]],
            amount: ethers.parseUnits(
                step["amount"],
                tokenData[step["assetIn"]]["decimals"],
            ),
            userData: "0x",
        }
        swapStepsStruct.push(swapStepStruct)
    }

    const fundStruct = {
        sender: fundSettings["sender"],
        fromInternalBalance: fundSettings["fromInternalBalance"],
        recipient: fundSettings["recipient"],
        toInternalBalance: fundSettings["toInternalBalance"],
    }

    const tokenLimits = []
    for (const token of tokenAddresses) {
        tokenLimits.push(
            ethers.parseUnits(
                tokenData[token]["limit"],
                tokenData[token]["decimals"],
            ),
        )
    }

    const executeBatchSwap = vaultContract.batchSwap(
        swapKind,
        swapStepsStruct,
        tokenAddresses,
        fundStruct,
        tokenLimits,
        deadline.toString(),
    )

    /* The "executeBatchSwap" Tx Function abi --> encoded --> Tx Data */
    const args = [
        swapKind,
        swapStepsStruct,
        tokenAddresses,
        fundStruct,
        tokenLimits,
        deadline.toString(),
    ]

    const encodedSwapFunction = encodeTxData(VAULT_ABI, "batchSwap", args)

    console.log(`Encoded Batch Swap Execution Function: 
     ${encodedSwapFunction ? true : false}
     `)
    console.log(
        `-----------------------------------------------------------------`,
    )

    await sendTx(wallet, encodedSwapFunction, VAULT_ADDRESS)
}

batchSwap()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
