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
import { tokens } from "../config/chain.config.js"
import { singleSwapConfig } from "../config/swap.config.js"

async function singleSwap() {
    // Funding settings: Where are the tokens coming from/going to?
    const fundSettings = {
        sender: walletAddress,
        recipient: walletAddress,
        fromInternalBalance: false,
        toInternalBalance: false,
    }

    /* Deadline */
    const deadline = new BigNumber(999999999999999999)

    const {
        poolId,
        poolName,
        assetIn,
        assetOut,
        limitAssetIn,
        limitAssetOut,
        swapKind,
        EXACT_AMOUNT_IN,
        EXACT_AMOUNT_OUT,
    } = singleSwapConfig

    const poolTokens = poolName.split("/")
    const swapAmount = swapKind === 0 ? EXACT_AMOUNT_IN : EXACT_AMOUNT_OUT

    console.log(
        `-----------------------------------------------------------------`,
    )
    console.log(`Pool Name: ${poolName}`)
    console.log(`Pool Id: ${poolId}`)
    console.log(`Tokens: ${poolTokens}`)
    console.log(
        `-----------------------------------------------------------------`,
    )

    // Token data
    const tokenData = {}

    poolTokens.forEach((token, i) => {
        const data = tokens[process.env.CHAIN_ID][token]
        tokenData[data.address] = {
            symbol: data.symbol,
            decimals: data.decimals,
            limit: i == 0 ? limitAssetOut : limitAssetIn, // change later to swap_limit
        }
    })

    console.log(
        `-----------------------------------------------------------------`,
    )
    console.log(`Token addresses: 
    Token In: ${assetIn}
    Token Out: ${assetOut}
    `)
    console.log(
        `-----------------------------------------------------------------`,
    )

    /* The SingleSwap and FundManagement Structs */
    const swapStruct = {
        poolId: poolId,
        kind: swapKind,
        assetIn: assetIn,
        assetOut: assetOut,
        amount: ethers.parseUnits(swapAmount, tokenData[assetIn]["decimals"]),
        userData: "0x",
    }

    const fundStruct = {
        sender: fundSettings["sender"],
        fromInternalBalance: fundSettings["fromInternalBalance"],
        recipient: fundSettings["recipient"],
        toInternalBalance: fundSettings["toInternalBalance"],
    }

    /* Limit */
    const tokenLimit = ethers.parseUnits(
        tokenData[assetIn]["limit"],
        tokenData[assetIn]["decimals"],
    )

    console.log(`Swap Object/Struct Data:`)
    console.log("-----------------------------------")
    console.log(`Swap Kind: ${swapStruct.kind}`)
    console.log(`Asset In: ${swapStruct.assetIn}`)
    console.log(`Asset Out: ${swapStruct.assetOut}`)
    console.log(`Amount: ${swapStruct.amount}`)

    console.log(
        `-----------------------------------------------------------------`,
    )

    console.log(`Fund Object/Struct Data: `)
    console.log("-----------------------------------")
    console.log(`Sender: ${fundStruct.sender}`)
    console.log(`Recipient: ${fundStruct.recipient}`)
    console.log(
        `-----------------------------------------------------------------`,
    )

    console.log(`Token Limit: `)
    console.log(`Limit: ${tokenLimit}`)
    console.log(
        `-----------------------------------------------------------------`,
    )

    const executeSingleSwap = vaultContract.swap(
        swapStruct,
        fundStruct,
        tokenLimit,
        deadline.toString(),
    )

    /* The "executeSingleSwap" Tx Function abi --> encoded --> Tx Data */
    const args = [swapStruct, fundStruct, tokenLimit, deadline.toString()]

    const encodedSwapFunction = encodeTxData(VAULT_ABI, "swap", args)

    console.log(`Encode Swap Execution: 
    ${encodedSwapFunction ? true : false}
    `)
    console.log(
        `-----------------------------------------------------------------`,
    )

    await sendTx(wallet, encodedSwapFunction, VAULT_ADDRESS)
}

singleSwap()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
