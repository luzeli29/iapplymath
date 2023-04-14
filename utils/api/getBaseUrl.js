import path from 'path'

export default function getBaseUrl() {
    if(process.env.NODE_ENV == "development") {
        //Change this depending of you
        return "http://localhost:3000"
    } else {
        return "https://www.iapplymath.com"
    }
}