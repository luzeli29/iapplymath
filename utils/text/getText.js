import translations from '@public/text/translations'
import DevErr from '@utils/debug/devErr'

export default function getText(textId,lang) {
    if(!lang) {
        DevErr('"lang" is null in getText.')
        lang = "en"
    }

    const textObject = translations[textId]

    if(!textObject) {
        DevErr('No text found under given Id ' + textId + ' in getText.')
        return textId;
    }

    const translation = textObject[lang]

    if(!translation && lang != 'en') {
        DevErr('No translation for text found for Id ' + textId + ' and lang ' + lang)
        return 
    }

    return translation;

}