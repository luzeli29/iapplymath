import createGameQuestion, { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion"
import { GenerateFriendContainerQuestion } from "@utils/game/recipes/questionGeneration/containerQuestionGenerators"


const generateLevel3Questions = (recipes,questionType,randomGenerator) => {
    let questions = []
    Object.keys(recipes).forEach((recipeKey, index) => {
        switch(recipeKey) {
            case 'strawberryLimeade':
                strawberryLimeadeQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'strawberryCake':
                strawberryCakeQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            default:
                questions.push(ErrorQuestion)
        }
    })
     return questions
}

const strawberryLimeadeQuestions = (questions,recipe,randomGenerator) => {
    //Friend Container Cost question
    //Friend Container Cost question
    //Price unit convertion question
    //Table Question
}

const strawberryCakeQuestions = (questions,recipe,randomGenerator) => {
    //Friend Container Cost question
    //budget questions
    //Image Question
}


export default generateLevel3Questions
