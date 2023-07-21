import generateIngredientText from "./generateIngredientText"

const GenerateContainerContainingText = (ingredient, containerAmount) => {
    const containerAmountText = generateIngredientText(ingredient, containerAmount)

    const containerText = {
        en: ingredient.ingredient.container.namePlural.en + ' containing ' + containerAmountText.en + ' per ' + ingredient.ingredient.container.nameSingular.en,
        es: ingredient.ingredient.container.namePlural.es + ' que contienen ' + containerAmountText.es + ' por ' + ingredient.ingredient.container.nameSingular.es
    }

    return containerText
}

const GenerateContainerText = (ingredient) => {
    const containerAmountText = generateIngredientText(ingredient)
    const containerText = {
        en: ingredient.ingredient.container.namePlural.en + ' of ' + containerAmountText.en,
        es: ingredient.ingredient.container.namePlural.es + ' de' + containerAmountText.es
    }

    return containerText
}
const countableSoldText = {
    en: ' are sold in ',
    es: ' se venden en ',
}

const uncountableSoldText = {
    en: ' is sold in ',
    es: ' se vende en ',
}

const GenerateContainerSoldText = (ingredient, containerAmount) => {
    const soldText = ingredient.ingredient.countable ? countableSoldText : uncountableSoldText
    let ingredientText = generateIngredientText(ingredient)
    let containerText = GenerateContainerContainingText(ingredient, containerAmount)

    const containerSoldText = {
        en: ingredientText.en.toLowerCase() + soldText.en + containerText.en.toLowerCase(),
        es: ingredientText.es.toLowerCase() + soldText.es + containerText.es.toLowerCase()
    }

    return containerSoldText
}

export {GenerateContainerText,GenerateContainerSoldText};