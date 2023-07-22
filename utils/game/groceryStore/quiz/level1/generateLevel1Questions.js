import generateAHSimpleMultiQuestion from "@utils/game/auntHouse/questionCreation/auntHouseQuestionGenerators/generateAHSimpleMultiQuestion"
import createGameQuestion, { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion"
import { GenerateFriendContainerQuestion } from "@utils/game/recipes/questionGeneration/containerQuestionGenerators"

const recipesQuizzedOn = 2
const triples = [6,9,12,15,18]
const evens = [2,4,8,10]


const generateLevel1Questions = (recipes,questionType,randomGenerator) => {
    let questions = []
    Object.keys(recipes).forEach((recipeKey, index) => {
        switch(recipeKey) {
            case 'vanillaMilkShake':
                vanillaMilkShakeQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'mangoPineappleJuice':
                mangoPineappleJuiceQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'hamAndCheeseArepas':
                hamAndCheeseArepasQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'caesarSalad':
                caesarSaladQuestions(questions,recipes[recipeKey],randomGenerator)
                break
            case 'churros':
                churrosQuestions(questions,recipes[recipeKey],randomGenerator)
            case 'flan':
                flanQuestions(questions,recipes[recipeKey],randomGenerator)
            default:
                questions.push(ErrorQuestion)
        }
    })
     return questions
}

const mangoPineappleJuiceQuestions = (questions,recipe,randomGenerator) => {
    questions.push(GenerateFriendContainerQuestion(recipe,2,5,6))
    //Unit price question
    //Friend Container Cost question
    //Cheapest Brand Question
}

const hamAndCheeseArepasQuestions = (questions,recipe,randomGenerator) => {
    //Unit price question
    questions.push(GenerateFriendContainerQuestion(
        recipe,
        0,
        triples[randomGenerator.randomInt(0,triples.length-1)],
        10))
    //Unit price question
    //Cheapest Brand Question
}

const vanillaMilkShakeQuestions = (questions,recipe,randomGenerator) => {
    //Unit price question
    //Friend Container unit conversion question
    //image question
}

const caesarSaladQuestions = (questions,recipe,randomGenerator) => {
    //Friend Container unit conversion question
    //Cheapest Brand Question
    //ammout of servings with x question

}
const churrosQuestions = (questions,recipe,randomGenerator) => {
    //Friend unit conversion question
    //Cheapest Brand Question
    //image question
}

const flanQuestions = (questions,recipe,randomGenerator) => {
    const q1FactorArr = [4,16,24]
    questions.push(generateAHSimpleMultiQuestion(
            recipe,recipe.ingredients[2],
            q1FactorArr[randomGenerator.randomInt(0,q1FactorArr.length-1)],
            randomGenerator))
    //friend unit convertion question
}
export default generateLevel1Questions


//EASY
    //Friend unit price question
    //budget questions
    //reverse unit price question
    //Unit price question
    //Cheapest Brand Question
    //ammout of servings with x question
    //Unit price sale question
//HARD
    //Friend Container Cost question
    //Price unit convertion question
    //Cheapest Brand different size Question
    //Friend unit conversion question
    //Friend Container unit conversion question
