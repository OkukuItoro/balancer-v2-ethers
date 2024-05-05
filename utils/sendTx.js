import { ethers } from "ethers"
import { gasTracker } from "./polyScan.js"

async function sendTx(wallet, encodedData, to) {
    let gasEstimate

    const nonce = await wallet.getNonce()

    console.log(
        `-----------------------------------------------------------------`,
    )
    console.log(`Nonce: ${nonce}`)

    try {
        gasEstimate = await wallet.estimateGas({
            to,
            data: encodedData,
            // value,
        })

        console.log(
            `-----------------------------------------------------------------`,
        )

        console.log(`Gas Estimate: ${gasEstimate}`)
    } catch (err) {
        gasEstimate = 300000
        console.log(
            "Failed to estimate gas, attempting to send with",
            gasEstimate,
            "gas limit...",
        )
    }

    const { ProposeGasPrice, FastGasPrice } = await gasTracker()

    const txObject = {
        chainId: process.env.CHAIN_ID,
        // gasLimit: gasEstimate,
        gasPrice: ethers.utils.hexlify(
            ethers.utils.parseUnits(ProposeGasPrice, "gwei"),
        ),
        nonce: nonce,
        data: encodedData,
        to: to,
    }

    let sentTxResponse
    try {
        console.log("Sending transaction...")
        sentTxResponse = await wallet.sendTransaction(txObject)
        await sentTxResponse.wait(1)
        console.log(sentTxResponse)
        const txHash = sentTxResponse["hash"]
        const url = `${process.env.BLOCK_EXPLORER_URL}/tx/${txHash}`
        console.log(url)
    } catch (error) {
        console.log(error)
    }
}

export default sendTx
