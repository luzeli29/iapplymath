const DevLog = (message) => {
    const env = process.env.NODE_ENV
    if(env === "development") {
        console.log(message)
    }
}
export default DevLog