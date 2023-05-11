const DevErr = (message) => {
    const env = process.env.NODE_ENV
    if(env === "development") {
        console.error(message)
    }
}
export default DevErr
