import getText from '@utils/text/getText'

const generateIngredientText = (ingredient, amount = null) => {
    if(amount == null) {
        return ingredient.ingredient.namePlural
    } else {
        let ingredientText = {
            en: amount + ' ',
            es: amount + ' ',
        }
        const amountEval = eval(amount)
        if(amountEval > 1) {
            const servingText = ingredient.servingType.namePlural
            if(servingText) {
                ingredientText.en += servingText.en + ' ' + getText('of','en').toLowerCase() + ' '
                ingredientText.es += servingText.es + ' ' + getText('of','es').toLowerCase() + ' '
                const ingredientName = ingredient.ingredient.nameSingular ? ingredient.ingredient.nameSingular : 'name singular'
                ingredientText.en += ingredientName.en
                ingredientText.es += ingredientName.es
            } else {
                ingredientText.en += ingredient.ingredient.namePlural.en ? ingredient.ingredient.namePlural.en : 'name namePlural'
                ingredientText.es += ingredient.ingredient.namePlural.es ? ingredient.ingredient.namePlural.es : 'name namePlural'
            }
        } else {
            servingText = ingredient.servingType.nameSingular
            if(servingText) {
                ingredientText.en += servingText.en + ' ' + getText('of','en').toLowerCase() + ' '
                ingredientText.es += servingText.es + ' ' + getText('of','es').toLowerCase() + ' '
            }
            ingredientText.en += ingredient.ingredient.nameSingular.en ? ingredient.ingredient.nameSingular.en : 'name singular'
            ingredientText.es += ingredient.ingredient.nameSingular.es ? ingredient.ingredient.nameSingular.es : 'name singular'    
        }

        return ingredientText
    }
}

export default generateIngredientText;