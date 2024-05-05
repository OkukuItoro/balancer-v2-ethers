import {
    wallet,
    POOL_FACTORY_ADDRESS,
    POOL_FACTORY_ABI,
} from "../utils/init.js"
import sendTx from "../utils/sendTx.js"
import encodeTxData from "../utils/encodeTxData.js"
import { weightedPool } from "../config/createPool.config.js"

async function createPool() {
    // args
    const {
        poolName,
        symbol,
        tokens,
        normalizedWeights,
        rateProviders,
        swapPercentage,
        owner,
        salt,
    } = weightedPool[process.env.CHAIN_ID]

    const polygonArgs = [
        poolName,
        symbol,
        tokens,
        normalizedWeights,
        swapPercentage,
        owner,
    ]
    const mainArgs = [
        poolName,
        symbol,
        tokens,
        normalizedWeights,
        rateProviders,
        swapPercentage,
        owner,
        salt,
    ]

    const args = process.env.CHAIN_ID == 80001 ? polygonArgs : mainArgs

    const encodedCreationFunction = encodeTxData(POOL_FACTORY_ABI, "create", [
        ...args,
    ])

    await sendTx(wallet, encodedCreationFunction, POOL_FACTORY_ADDRESS)

    /* Weighted Pool on the Balancer v2 (Sepolia) was created:
        const POOL_50LINK-50WETH =
            "0xe468F5E34aD7F6926636Eee751B0098ABef05e40000200000000000000000078"
        const POOL_ADDRESS_50LINK-50WETH = "0xe468F5E34aD7F6926636Eee751B0098ABef05e40"
        
        const POOL_50WETH-50USDT =  "0x98A342E482eDeDF10b512e8773D3133Ad0C41efc00020000000000000000007B"
        const POOL_ADDRESS_50WETH-50USDT = "0x98A342E482eDeDF10b512e8773D3133Ad0C41efc"
        */

    /* Weighted Pool on the Balancer v2 (Polygon Mumbai) was created:
        const POOL_50LINK-50WETH =
            "0x74d87423F3Db4fEE64802454c2211275eB1CfA57000200000000000000000008"
        const POOL_ADDRESS_50LINK-50WETH = "0x74d87423F3Db4fEE64802454c2211275eB1CfA57"
        
        */
}

createPool()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
