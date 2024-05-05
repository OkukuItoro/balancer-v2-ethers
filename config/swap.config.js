/* SwapKind is an Enum.
 * 0 = GIVEN_IN, 1 = GIVEN_OUT
 */

const singleSwapConfig = {
    poolName: "LINK/WETH",
    poolId: "0xe468F5E34aD7F6926636Eee751B0098ABef05e40000200000000000000000078",
    assetIn: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
    assetOut: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    limitAssetIn: "0.01",
    limitAssetOut: "0",
    swapKind: 0,
    EXACT_AMOUNT_IN: "0.01",
    EXACT_AMOUNT_OUT: "",
}

const batchSwapConfig = {}

export { singleSwapConfig }
