import { log } from "@utils/debug/log"

export default function validateText(text) {
    if(!text) {
        err('Validating text failed due to null object given.')
        return false
    }

    if(!text.en) {
        err('Validating text failed due to no english value.')
        return false
    }

    if(!text.es) {
        err('Validating text has no spanish value, adding english as the spanish value.')
        text.es = text.en
    }

    return true
}