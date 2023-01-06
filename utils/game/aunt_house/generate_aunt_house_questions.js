import recipes from '@public/text/aunt_house_recipes'
import {simplifyFraction} from '@common_imports'

export function generateAuntHouseQuestions(recipeIndex) {
    const recipe = recipes[recipeIndex]
    var questions = [];
    //TODO: This is bad, relook at this during recipe rework
    if(recipeIndex === 3) {
        /*TODO: potencially change if other langs were added*/
        questions[0] = {
            en:"How many different fruits do we need for our fruit salad?",
            es:"¿Cuántas frutas diferentes necesitamos para nuestra ensalada de frutas?",
            answer: 4,
            hints: [
                {
                    en: "Count all the ingredients.",
                    es: "Cuenta todos los ingredientes",
                }
            ]
        }
    }

    recipe.set_questions.map((x) => {
        if(x[0] == -1) {
            //do question on every ingredient with given multiple
            recipe.ingredients.map((ing) => {
                questions = questions.concat(generateMultiQuestion(recipe,ing, x[1]))
            })
        } else {
            //do question with given ing and multiple
            questions = questions.concat(generateMultiQuestion(recipe,recipe.ingredients[x[0]], x[1]))
        }
        //goes through every ingredient for every multiple
    })
    return questions
}

export function generateFamilyQuestions(recipeIndex, familySize) {
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
    return ([{
        en: ing.question.en  + " do we need for " + num + " " + recipe.serving_of[num == 1 ? "singular" : "plural"].en + " " + recipe.name.en.toLowerCase() + "?",
        es: "¿" + ing.question.es + " necesitamos para " + " " + num + " " + recipe.serving_of[num == 1 ? "singular" : "plural"].es + " " + recipe.name.es.toLowerCase() + "?",
        answer: answer,
        hint: [{
            en: "(" + ing.amount + ") x (" + simplifyFraction(num,recipe.serving_size) + ") = ???",
            es: "(" + ing.amount + ") x (" + simplifyFraction(num,recipe.serving_size) + ") = ???",
        },{
            en: "(" + ing.amount + ") x (" + simplifyFraction(num,recipe.serving_size) + ") = " + answer,
            es: "(" + ing.amount + ") x (" + simplifyFraction(num,recipe.serving_size) + ") = " + answer,
        }],
    }])
}