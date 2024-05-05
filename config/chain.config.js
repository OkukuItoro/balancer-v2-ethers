const poolFactory = {
    1: {
        CREATE_WEIGHTED_POOL_ADDR: "",
    },
    11155111: {
        CREATE_WEIGHTED_POOL_ADDR: "0x7920BFa1b2041911b354747CA7A6cDD2dfC50Cfd",
    },
    80001: {
        CREATE_WEIGHTED_POOL_ADDR: "0xb77c2e6E609B1e4e722c99e67690a369D716c2B3",
    },
    137: {
        CREATE_WEIGHTED_POOL_ADDR: "0xA5bf2ddF098bb0Ef6d120C98217dD6B141c74EE0",
    },
}

const tokens = {
    1: [{}],
    11155111: {
        LINK: {
            symbol: "LINK",
            address: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
            decimals: 18,
        },
        WETH: {
            symbol: "WETH",
            address: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
            decimals: 18,
        },
    },
    80001: {
        WMATIC: {
            symbol: "WMATIC",
            address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
            decimals: 18,
        },
        LINK: {
            symbol: "LINK",
            address: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
            decimals: 18,
        },
    },
    137: [
        {
            WMATIC: "",
            MATICX: "",
            STMATIC: "",
        },
    ],
}

const pools = {
    1: {},

    11155111: [
        {
            name: "LINK/WETH",
            id: "0xe468F5E34aD7F6926636Eee751B0098ABef05e40000200000000000000000078",
        },
        {
            name: "WETH/USDT",
            id: "0xe468F5E34aD7F6926636Eee751B0098ABef05e40000200000000000000000078",
        },
    ],
    80001: [
        {
            name: "50WMATIC-50LINK",
            id: "0x74d87423F3Db4fEE64802454c2211275eB1CfA57000200000000000000000008",
        },
    ],
    137: [
        {
            name: "wMATIC/stMATIC",
            id: "",
        },
        {
            name: "wMATIC/MaticX",
            id: "0xf0ad209e2e969eaaa8c882aac71f02d8a047d5c2000200000000000000000b49",
        },
        {
            name: "wMATIC/MaticX",
            id: "0xee278d943584dd8640eaf4cc6c7a5c80c0073e85000200000000000000000bc7",
        },
    ],
}

export { poolFactory, tokens, pools }
