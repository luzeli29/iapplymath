import SHA256 from "crypto-js/sha256";
import HEX from "crypto-js/enc-hex";

export default function CreateKeyFromPassword(password) {

    let hash = SHA256(password);

    const key = hash.toString(HEX)

    console.log(key)

    return key
}