import AES from 'crypto-js/aes'
import Hex from 'crypto-js/enc-hex'


const iv = Hex.parse("101112131415161718191a1b1c1d1e1f");

function DecryptUsername(secureUsername) {
    if (!process.env.ENCRYPTION_KEY) {
        throw new Error("There is no encryption key in the environmental variables.")
    }
    if(!secureUsername) {
        throw new Error ('No "secureUsername" given to decryptUsername()')
    }

    const key = Hex.parse(process.env.ENCRYPTION_KEY)

    var bytes  = AES.decrypt(secureUsername, key, { iv: iv });
    var username = bytes.toString(Utf8);

    return username
}


export default DecryptUsername