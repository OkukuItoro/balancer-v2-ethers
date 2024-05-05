import { ethers } from "ethers"

const weightedPool = {
    11155111: {
        poolId: "0x98A342E482eDeDF10b512e8773D3133Ad0C41efc00020000000000000000007B",
        amountsIn: [ethers.parseUnits("20", 6), ethers.parseEther("0.1")],

        // enum - INIT, EXACT_TOKENS_IN_FOR_BPT_OUT, TOKEN_IN_FOR_EXACT_BPT_OUT
        JOIN_KIND: 0,

        // Join Pool Request
        request: {
            assets: [
                "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06",
                "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
            ],
            maxAmountsIn: null,
            userData: null,
            fromInternalBalance: false,
        },
    },
    80001: {
        poolId: "0x74d87423F3Db4fEE64802454c2211275eB1CfA57000200000000000000000008",
        amountsIn: [ethers.parseUnits("0.03", 18), ethers.parseUnits("10", 18)],

        // enum - INIT, EXACT_TOKENS_IN_FOR_BPT_OUT, TOKEN_IN_FOR_EXACT_BPT_OUT
        JOIN_KIND: 0,

        // Join Pool Request
        request: {
            assets: [
                "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
                "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
            ],
            maxAmountsIn: null,
            userData: null,
            fromInternalBalance: false,
        },
    },

    137: {},
}

export { weightedPool }
