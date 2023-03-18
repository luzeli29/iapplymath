import translations from '@public/text/translations'
import {throwError} from '@utils/imports/commonImports' 

export default function getText(textId,lang) {

    if(!lang) {
        throwError("Lang is null")
        return "Error"
    }

    const textObject = translations[textId]

    if(!textObject) {
        throwError("No text found under given Id " + textId)
        return "textId: " + textId;
    }

    const translation = textObject[lang]

    if(!translation) {
        throwError("No translation for text found for Id " + textId + " and lang " + lang)
        return "textId: " + textId + "[" + lang + "]";
    }

    return translation;

}