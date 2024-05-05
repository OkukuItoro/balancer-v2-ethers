import { poolFactoryContract, vaultContract } from "../utils/init.js"

const poolVersion = await poolFactoryContract.getPoolVersion()
console.log(`pool version is: ${poolVersion}`)

/* Since we have conection to the deployed contract, we can interact with the created pool */
// Pool Id and Address
const poolId =
    "0x98A342E482eDeDF10b512e8773D3133Ad0C41efc00020000000000000000007B"
const poolAddress = "0x98A342E482eDeDF10b512e8773D3133Ad0C41efc"

// Is valid Pool?
const validPool = await poolFactoryContract.isPoolFromFactory(poolAddress)
console.log(`is Pool from the Weighted Pool Factory: ${validPool}`)
console.log("------------------------------------------------")

// Vault x Pool interactions
const pool = await vaultContract.getPool(poolId)
console.log(`pool ${pool}`)
console.log("------------------------------------------------")

const poolInfo = await vaultContract.getPoolTokens(poolId)
console.log(`pool tokens: ${poolInfo}`)
console.log("------------------------------------------------")
