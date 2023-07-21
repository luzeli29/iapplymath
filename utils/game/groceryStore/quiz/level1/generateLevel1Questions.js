import createGameQuestion, { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion"
import { GenerateFriendContainerQuestion } from "@utils/game/recipes/questionGeneration/containerQuestionGenerators"

const recipesQuizzedOn = 2

const generateLevel1Questions = (recipes,questionType,randomGenerator) => {
    let questions = []
    // create question
    questions.push(ErrorQuestion)

    Object.keys(recipes).forEach((recipeKey, index) => {
        questions.push(GenerateFriendContainerQuestion(recipes[recipeKey],0,3,4))
    })
     return questions
}

export default generateLevel1Questions
