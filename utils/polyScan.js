async function gasTracker() {
    const data = await fetch(
        `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=${process.env.POLYSCAN_API_KEY}`,
    ).then((res) => res.json())

    /*
     "SafeGasPrice"
     "ProposeGasPrice"
     "FastGasPrice"
     "suggestBaseFee"
    */
    return data.result
}

export { gasTracker }
