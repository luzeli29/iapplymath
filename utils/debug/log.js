export function log(message) {
    const env = process.env.NODE_ENV
    if(env === "development") {
        console.log(message)
    }
}

export function err(message) {
    const env = process.env.NODE_ENV
    if(env === "development") {
        console.error(message)
    }
}