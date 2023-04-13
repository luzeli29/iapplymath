import {simplifyFraction} from '@utils/imports/commonImports'
import createGameQuestion from '@utils/game/createGameQuestion.js'
import { log } from '@utils/debug/log'
import generateBasicAHQuestions from './basic/generateBasicAHQuestions'

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

function generateFamilyQuestions(recipeIndex, familySize) {
    const recipe = recipes[recipeIndex]
    var questions = [];
    //family questions
    recipe.family_questions.map((x) => {
        if(x == -1) {
            //do question on every ingredient
            recipe.ingredients.map((ing) => {
                questions = questions.concat(generateMultiQuestion(recipe,ing, familySize))
            })
        } else {
            questions = questions.concat(generateMultiQuestion(recipe,recipe.ingredients[x], familySize))
        }
    })
    return questions
}

function generateFamilySizeQuestion() {
    return [{
        en: "How many people should we cook for?",
        es: "¿Para cuántas personas vamos a cocinar?",
    
        hints: [{
                en: 'Please enter a number between 1 - 13',
                //TODO: Translate
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
                //Incorrect, shows hint
                return false;
            }
        }},]
}


//generates the propper question JS object to be read by QuestionLayout
function generateMultiQuestion(recipe,ing, num) {
    var answer = 0;
    if(isNaN(ing.amount)) {
        //ing.amount is not a number
        var ingAmount = ing.amount.split("/")
        answer = simplifyFraction((ingAmount[0] * num),ingAmount[1] * recipe.serving_size)
    } else {
        //ing.amount is a number
        answer = simplifyFraction((ing.amount * num),recipe.serving_size)
    }
    //TODO: potencially change if other langs were added
    return ([
        createGameQuestion(
            {
                en: ing.question.en  + " do we need for " + num + " " + recipe.serving_of[num == 1 ? "singular" : "plural"].en + " " + recipe.name.en.toLowerCase() + "? (Please answer with fractions only)",
                es: "¿" + ing.question.es + " necesitamos para " + " " + num + " " + recipe.serving_of[num == 1 ? "singular" : "plural"].es + " " + recipe.name.es.toLowerCase() + "? (Por favor responda solo con fracciones)",
            },
            answer,
            [{
                en: "(" + ing.amount + ") x (" + simplifyFraction(num,recipe.serving_size) + ") = ???",
                es: "(" + ing.amount + ") x (" + simplifyFraction(num,recipe.serving_size) + ") = ???",
            },{
                en: "(" + ing.amount + ") x (" + simplifyFraction(num,recipe.serving_size) + ") = " + answer,
                es: "(" + ing.amount + ") x (" + simplifyFraction(num,recipe.serving_size) + ") = " + answer,
            }],

        )])
}