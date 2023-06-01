import createGameQuestion from '@utils/game/quiz/questionGeneration/createGameQuestion'
import DevLog from '@utils/debug/devLog'
import generateBasicAHQuestions from './basic/generateBasicAHQuestions'
import generateFamilyQuestions from './familyQuestions/generateFamilyQuestions'

export default function aHQuestionFactory(questionType,recipe,randomGenerator,familySize) {
    if(!questionType) {
        return [createGameQuestion()]
    }
    if(!recipe) {
        return [createGameQuestion()]
    }

    DevLog('Generating Aunt House Questions')
    DevLog('Question Type: ' + questionType)
    DevLog('Recipe: ' + recipe.name.en)

    switch(questionType) {
        case "basic":
            return generateBasicAHQuestions(recipe)
        case "familySize":
            return generateFamilySizeQuestion()
        case "familyQuestion":
            if(familySize == undefined) {
                return generateFamilyQuestions(recipe,3)
            }
            return generateFamilyQuestions(recipe,familySize)
        default:
            return [createGameQuestion()]
        }

}

function generateFamilySizeQuestion() {
    return [{
        en: "How many people should we cook for?",
        es: "¿Para cuántas personas vamos a cocinar?",
    
        hints: [{
                en: 'Please enter a number between 1 - 13',
                es: 'Por favor ingrese un número entre 1 - 13',
            },
        ],
        answer: "fill_in",
        onAnswer: (answer) => {
            if(isNaN(answer)) {
                return false;
            } else if(answer > 1 && answer < 13) {
                window.sessionStorage.setItem('FAMILY_SIZE',answer)
                return true;
            } else {
                return false;
            }
        },
        questionFormatKey: 'wholeNumber'
        },]
}