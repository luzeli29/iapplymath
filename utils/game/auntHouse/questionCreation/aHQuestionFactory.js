import createGameQuestion from '@utils/game/quiz/questionGeneration/createGameQuestion'
import DevLog from '@utils/debug/devLog'
import generateBasicAHQuestions from './basic/generateBasicAHQuestions'
import generateAuntOperationsAndAlgebraQuestions from './IngredientFactorQuestions/IngredientF'
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
    DevLog("questiontype: " + questionType)

    if (recipe.level == 1){
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
    }else if (recipe.level == 2 || recipe.level == 3 ){
        var questions = [];

        let operationsAndAlgebra = generateAuntOperationsAndAlgebraQuestions(recipe, randomGenerator);

        questions = questions.concat(operationsAndAlgebra);
        DevLog("QUESTIONS: " + questions);
        return questions;
    }
    
    return [createGameQuestion()]




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