import createGameQuestion, { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion"
import { GenerateFriendContainerQuestion } from "@utils/game/recipes/questionGeneration/containerQuestionGenerators"

const recipesQuizzedOn = 2
const triples = [6,9,12,15,18,21,24,27,30]

const generateLevel2Questions = (recipes,questionType,randomGenerator) => {
    let questions = []
    Object.keys(recipes).forEach((recipeKey, index) => {
        switch(recipeKey) {
            case 'ricePudding':
                ricePuddingQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'peruvianFriedRice':
                peruvianFriedRiceQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'strawberryMilkShake':
                strawberryMilkShakeQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'pineappleCake':
                pineappleCakeQuestions(questions,recipes[recipeKey],randomGenerator)
                break
            case 'carrotJuice':
                carrotJuiceQuestions(questions,recipes[recipeKey],randomGenerator)
                break
            case 'fruitSalad':
                fruitSaladQuestions(questions,recipes[recipeKey],randomGenerator)
                break
            case 'chocolateBananaCake':
                chocolateBananaCakeQuestions(questions,recipes[recipeKey],randomGenerator)
                break
            default:
                questions.push(ErrorQuestion)
        }
    })
     return questions
}

const ricePuddingQuestions = (questions,recipe,randomGenerator) => {
    // 3 brand compare question -WONT DO
    //Unit price question
    //Cheapest Brand different size Question
    //Unit price sale question
}

const peruvianFriedRiceQuestions = (questions,recipe,randomGenerator) => {
    // 3 brand compare question -WONT DO
    //Unit price question
    //Cheapest Brand different size Question
    //Unit price sale question
    //Unit price question
}

const strawberryMilkShakeQuestions = (questions,recipe,randomGenerator) => {
    //Friend unit conversion question
    //Unit price sale question
}

const pineappleCakeQuestions = (questions,recipe,randomGenerator) => {
    //Friend unit conversion question
    //Unit price sale question
}

const carrotJuiceQuestions = (questions,recipe,randomGenerator) => {
    const q1Arr = [3,4,6,12]
    questions.push(GenerateFriendContainerQuestion(
        recipe,
        0,
        triples[randomGenerator.randomInt(0,triples.length-1)],
        q1Arr[randomGenerator.randomInt(0,q1Arr.length-1)]))
    //graph question
}

const fruitSaladQuestions = (questions,recipe,randomGenerator) => {
    //Friend unit price question
    //budget questions
    //reverse unit price question
}

const chocolateBananaCakeQuestions = (questions,recipe,randomGenerator) => {
    //Unit price sale question
    //Friend unit conversion question
}

export default generateLevel2Questions
