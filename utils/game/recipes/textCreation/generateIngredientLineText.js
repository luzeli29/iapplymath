import getText from '@utils/text/getText'

export default function generateIngredientLineText(ingredient, lang) {
    console.log(ingredient)
    let _lang
    if(lang) {
        _lang = lang
    } else {
        _lang = 'en'
    }
    const amount = ingredient.amount ? ingredient.amount + ' ': ''

    const amountEval = eval(amount)
    let servingText = ''
    let ingredientName = ''

    if(amountEval > 1) {
        console.log(ingredient.servingType)
        servingText = ingredient.servingType.namePlural[lang]
        if(servingText) {
            servingText += ' ' + getText('of',lang).toLowerCase() + ' '
            ingredientName = ingredient.ingredient.nameSingular ? ingredient.ingredient.nameSingular[lang] : 'name singular'
        } else {
            ingredientName = ingredient.ingredient.namePlural ? ingredient.ingredient.namePlural[lang] : 'name namePlural'
        }
    } else {
        servingText = ingredient.servingType.nameSingular[lang]
        if(servingText) {
            servingText += ' ' + getText('of',lang).toLowerCase() + ' '
        }
        ingredientName = ingredient.ingredient.nameSingular ? ingredient.ingredient.nameSingular[lang] : 'name singular'

    }

    return amount + servingText  + ingredientName
}