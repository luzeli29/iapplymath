import {simplifyFraction} from '@utils/imports/commonImports'
import createGameQuestion from '@utils/game/createGameQuestion.js'
import { log } from '@utils/debug/log'
import generateBasicAHQuestions from './basic/generateBasicAHQuestions'
import generateFamilyQuestions from './familyQuestions/generateFamilyQuestions'

export default function aHQuestionFactory(questionType,recipe) {
    if(!questionType) {
        return [createGameQuestion()]
    }
    if(!recipe) {
        return [createGameQuestion()]
    }

    log('Generating Aunt House Questions')
    log('Question Type: ' + questionType)
    log('Recipe: ' + recipe.name.en)

    switch(questionType) {
        case "basic":
            return generateBasicAHQuestions(recipe)
        case "familySize":
            return generateFamilySizeQuestion()
        case "familyQuestion":
            const familySize = window.sessionStorage.getItem('FAMILY_SIZE')

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