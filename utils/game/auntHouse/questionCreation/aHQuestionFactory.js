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
    }else if (recipe.level == 2 ){


        var questions = [];

        // first we get the operation and algebra questions
        let operationsAndAlgebra = generateAuntOperationsAndAlgebraQuestions(recipe, randomGenerator)
        // then we get the number and operations in base ten questions
       // let numberAndOperationsInBaseTen = generateNumberAndOperationsInBaseTenQuestion(order, level, randomGenerator)
        // then we get the number and operations fractions questions
       // let numberAndOperationsFractions = generateNumberAndOperationsFractionsQuestions(order, level, randomGenerator)
        // then we get the measurement and data questions
       // let measurementAndData = generateMeasurementAndDataQuestions(order, level, randomGenerator)


    // the we add all the questions to the questions array
         questions = questions.concat(operationsAndAlgebra)
    //questions = questions.concat(numberAndOperationsInBaseTen)
   // questions = questions.concat(numberAndOperationsFractions)
   // questions = questions.concat(measurementAndData)

        DevLog("QUESTIONS" + questions)


    return questions 

        switch(questionType) {
            case "basic" :
                return generateLevel2AuntQuestions(recipe)
            case "familySize":
                return generateLevel2AuntQuestions(recipe)
            case "familyQuestion":
                if(familySize == undefined) {
                    return generateFamilyQuestions(recipe,3)
                }
                return generateFamilyQuestions(recipe,familySize)
            default:
                return [createGameQuestion()]
            }

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