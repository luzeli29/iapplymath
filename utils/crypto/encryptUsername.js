import AES from 'crypto-js/aes'
import Hex from 'crypto-js/enc-hex'


const iv = Hex.parse("101112131415161718191a1b1c1d1e1f");

function EncryptUsername(username) {
    if (!process.env.ENCRYPTION_KEY) {
        throw new Error("There is no encryption key in the environmental variables.")
    }
    if(!username) {
        throw new Error ("No username given to EncryptUsername")
    }

    const lowerCaseUsername = username.toLowerCase()

    const key = Hex.parse(process.env.ENCRYPTION_KEY)
    const secureUsername = AES.encrypt(lowerCaseUsername, key, { iv: iv }).toString();

    return secureUsername
}


export default EncryptUsername