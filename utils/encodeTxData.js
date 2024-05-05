import { ethers } from "ethers"

const encodeTxData = (abi, fn, args) => {
    let iface = new ethers.Interface(abi)
    const encodedFunctionData = iface.encodeFunctionData(fn, args)
    return encodedFunctionData
}

export default encodeTxData
