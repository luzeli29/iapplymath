import { getText, simplifyFraction } from "@commonImports"
import aHSimpleMultiQuestions from "@public/text/questions/auntHouse/aHSimpleMultiQuestions"
import fillQuestionTemplate from "@utils/game/questionGenerators/fillQuestionTemplate"

export default function generateAHSimpleMultiQuestion(recipe,ingredient,factor,randomGenerator) {

    let templateToUse = randomGenerator != undefined ? randomGenerator.randomInt(0,questionTemplates.length) : 0
    const template = aHSimpleMultiQuestions[templateToUse]
    let tags = {}
    tags.factor = factor
    tags.ing_amount = ingredient.amount
    tags.answer = simplifyFraction((eval(ingredient.amount) * factor),recipe.recipeMakesAmount)
    tags.serving_Size = recipe.servingSize

    tags.ing_serving_Text_En = ingredient.servingType.namePlural.en.toLowerCase()
    tags.ing_serving_Text_Es = ingredient.servingType.namePlural.es.toLowerCase()

    if(tags.ing_serving_Text_En) {
        tags.ing_serving_Text_En += ' ' + getText('of','en').toLowerCase() + ' ' + ingredient.ingredient.namePlural.en.toLowerCase()
        tags.ing_serving_Text_Es += ' ' + getText('of','es').toLowerCase() + ' ' + ingredient.ingredient.namePlural.es.toLowerCase()
    } else {
        tags.ing_serving_Text_En += ingredient.ingredient.namePlural.en.toLowerCase()
        tags.ing_serving_Text_Es += ingredient.ingredient.namePlural.es.toLowerCase()
    }

    tags.RECIPE_SERVING_EN = factor > 1 ? recipe.servingType.namePlural.en.toLowerCase() : recipe.servingType.nameSingular.en.toLowerCase()
    tags.RECIPE_SERVING_ES = factor > 1 ? recipe.servingType.namePlural.es.toLowerCase() : recipe.servingType.nameSingular.es.toLowerCase()

    if(tags.RECIPE_SERVING_EN) {
        tags.RECIPE_SERVING_EN += ' ' + getText('of','en').toLowerCase() + ' ' + recipe.name.en.toLowerCase()
        tags.RECIPE_SERVING_ES += ' ' + getText('of','es').toLowerCase() + ' ' + recipe.name.es.toLowerCase()
    } else {
        tags.RECIPE_SERVING_EN += recipe.name.en.toLowerCase()
        tags.RECIPE_SERVING_ES += recipe.name.es.toLowerCase()
    }

    const question = fillQuestionTemplate(template,tags)

    return question
}
