import translations from '@public/text/translations'
import {throwError,useWrapperContext} from '@common_imports' 

export default function getCommonText(textId) {
    const lang = useWrapperContext().state.lang

    if(!lang) {
        throwError("Lang is null")
        return "Error"
    }

    const text = translations[textId]

    if(!text) {
        throwError("No text found under given Id " + textId)
        return "Error"
    }

    const translation = text[lang]

    if(!translation) {
        throwError("No translation for text found for Id " + textId + " and lang " + lang)
        return "Error"
    }

    return translation;

}