import { ethers } from "ethers"
import sendTx from "../utils/sendTx.js"
import encodeTxData from "../utils/encodeTxData.js"
import {
    wallet,
    walletAddress,
    VAULT_ADDRESS,
    VAULT_ABI,
} from "../utils/init.js"
import { weightedPool } from "../config/joinPool.config.js"

async function joinPool() {
    const { poolId, JOIN_KIND, amountsIn, request } =
        weightedPool[process.env.CHAIN_ID]

    console.log(poolId)

    request.maxAmountsIn = amountsIn
    request.userData = ethers.AbiCoder.defaultAbiCoder().encode(
        ["uint8", "uint256[]"],
        [JOIN_KIND, amountsIn],
    )

    const args = [
        poolId,
        walletAddress,
        walletAddress,
        [
            request.assets,
            request.maxAmountsIn,
            request.userData,
            request.fromInternalBalance,
        ],
    ]
    const encodedJoinPoolFunction = encodeTxData(VAULT_ABI, "joinPool", args)
    // Send tx to "Join pool"
    await sendTx(wallet, encodedJoinPoolFunction, VAULT_ADDRESS)
}

joinPool()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
