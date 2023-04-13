import { getText } from "@commonImports"

export default function generateRecipeServingText(recipe,lang) {
    let _lang
    if(lang) {
        _lang = lang
    } else {
        _lang = 'en'
    }
    
    const servingAmount = recipe.servingSize ? recipe.servingSize : 1
    const servingText = servingAmount > 1 ? getText('people',lang) : getText('person',lang)

    return getText('serves',lang) + ' ' + servingAmount + ' ' + servingText
}