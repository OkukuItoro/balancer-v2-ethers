import { ethers } from "ethers"

// Universal args
const rateProviders = [
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
]
const owner = "0x333fAaf1351a1387c73E8cBf41955663C3C336a8"
const swapPercentage = ethers.parseUnits("1", 15)

const weightedPool = {
    11155111: {
        poolName: "50WETH-50USDT",
        symbol: "50WETH-50USDT",
        tokens: [
            "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06",
            "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
        ],
        normalizedWeights: [
            ethers.parseEther("0.5", "ether"),
            ethers.parseEther("0.5", "ether"),
        ],
        rateProviders,
        swapPercentage,
        owner,
        salt: "0x1546d4476d9e74a90a905252db8dc96fe628342ba0e3146878cc7cab3a049955",
    },
    80001: {
        poolName: "50WMATIC-50LINK",
        symbol: "50WMATIC-50LINK",
        tokens: [
            "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
            "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
        ],
        normalizedWeights: [ethers.parseUnits("0.5"), ethers.parseUnits("0.5")],
        swapPercentage,
        owner,
    },

    137: {},
}

export { weightedPool }
