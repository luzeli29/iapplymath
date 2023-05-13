import DevErr from "@utils/debug/devErr"

export default function validateText(text) {
    if(!text) {
        DevErr('Validating text failed due to null object given.')
        return false
    }

    if(!text.en) {
        DevErr('Validating text failed due to no english value.')
        return false
    }

    if(!text.es) {
        DevErr('Validating text has no spanish value, adding english as the spanish value.')
        text.es = text.en
    }

    return true
}