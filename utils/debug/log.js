export default function log(message) {
    const env = process.env.NODE_ENV
    if(env === "development") {
        console.log(message)
    }
}