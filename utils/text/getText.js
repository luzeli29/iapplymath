import translations from '@public/text/translations'
import { err } from '@utils/debug/log'

export default function getText(textId,lang) {
    if(!lang) {
        err('"lang" is null in getText.')
        lang = "en"
    }

    const textObject = translations[textId]

    if(!textObject) {
        err('No text found under given Id ' + textId + ' in getText.')
        return textId;
    }

    const translation = textObject[lang]

    if(!translation && lang != 'en') {
        err('No translation for text found for Id ' + textId + ' and lang ' + lang)
        return 
    }

    return translation;

}