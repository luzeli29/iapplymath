import AES from 'crypto-js/aes'
import Hex from 'crypto-js/enc-hex'
import Utf8 from 'crypto-js/enc-utf8'


const iv = Hex.parse('101112131415161718191a1b1c1d1e1f');

function DecryptUsername(secureUsername,key) {
    if (!key) {
        throw new Error("There is no encryption key in the environmental variables.")
    }
    if(!secureUsername) {
        throw new Error ('No "secureUsername" given to decryptUsername()')
    }

    const parsedKey = Hex.parse(key)
    var bytes  = AES.decrypt(secureUsername, parsedKey, { iv: iv });
    var username = bytes.toString(Utf8);
    return username
}


export default DecryptUsername