export function GetUrl() {
    if(process.env.NODE_ENV == "development") {
        //Change this depending of you
        return "http://localhost:3000"
    } else {
        return "https://www.iapplymath.com"
    }
}