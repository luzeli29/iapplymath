import getText from '@utils/text/getText'

export default function generateRecipeTitleText(recipe,lang) {
    let _lang
    if(lang) {
        _lang = lang
    } else {
        _lang = 'en'
    }
    
    const amount = recipe.recipeMakesAmount ? recipe.recipeMakesAmount : 1
    const amountEval = eval(amount)
    let servingText = ''

    if(amountEval > 1) {
        servingText = recipe.servingType.namePlural[lang]
    } else {
        servingText = recipe.servingType.nameSingular[lang]
    }

    

    if(servingText) {
        servingText += ' ' + getText('of',lang).toLowerCase()
    }

    const recipeName = recipe.name ? recipe.name[lang] : 'name'

    return amount + ' ' + servingText + ' ' + recipeName
}