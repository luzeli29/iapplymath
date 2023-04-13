import { getText } from "@commonImports"
import createGameQuestion from "@utils/game/createGameQuestion"
import validateOrder from "@utils/validation/game/restaurant/validateOrder"

export default function generateAHMultQuestions(recipe,level,randomGenerator) {
    const numbOfQuestionsNeeded = 3
    let questions = []


    for(let i = 0; i < numbOfQuestionsNeeded; i++) {
        let question = generateSingleMultiplyQuestion(recipe,level,randomGenerator)
        questions.push(question)
    }

    return questions
}

function generateSingleMultiplyQuestion(recipe,level,randomGenerator) {
    const factorMax = Math.ceil(((level+2)**2) + 3)
    const factorMin = Math.ceil(((level+2)**2)/5 + 3)
    const factor = randomGenerator.randomInt(factorMin,factorMax)
    let question
    return question
}