import { getText } from "@commonImports"
import createGameQuestion from "@utils/game/createGameQuestion"
import validateOrder from "@utils/validation/game/restaurant/validateOrder"

export default function generateSingleMultiplyDishQuestions(order,level,randomGenerator) {
    const numbOfQuestionsNeeded = 3
    let questions = []


    for(let i = 0; i < numbOfQuestionsNeeded; i++) {
        let question = generateSingleMultiplyQuestion(order,level,randomGenerator)
        questions.push(question)
    }

    return questions
}

function generateSingleMultiplyQuestion(order,level,randomGenerator) {
    const factorMax = Math.ceil(((level+2)**2) + 3)
    const factorMin = Math.ceil(((level+2)**2)/5 + 3)
    const factor = randomGenerator.randomInt(factorMin,factorMax)
    const dishType = randomGenerator.randomDishType()
    const dish = order[dishType]
    const dishTypeEs =  getText(dishType,'es').toLowerCase()
    let question

    if(factor == 3) {
        question = createGameQuestion(
            {
                en:"Elena’s friend, Alex, joins you at the table. If all three of you order the same " + dishType + ", " + dish.en + ", what is the total cost of all " + dishType + "s?",
                es:"El amigo de Elena, Alex, se une a ti en la mesa. Si los tres piden " + (dishTypeEs === "postre" ? "el mismo " : "la misma ") + dishTypeEs + ", " + dish.es + ", ¿cuál es el costo total de " + (dishTypeEs === "postre" ? "todos los " : "todas las ") + dishTypeEs + "s?",
            },
            dish.price * 3,
            [{
                en: "(" + dish.en + ") + (" + dish.en + ") + (" + dish.en + ") = ???",
                es: "(" + dish.es + ") + (" + dish.es + ") + (" + dish.es + ") = ???",
            },{
                en: "(" + dish.en + ") + (" + dish.en + ") + (" + dish.en + ") = " + dish.price * 3,
                es: "(" + dish.es + ") + (" + dish.es + ") + (" + dish.es + ") = " + dish.price * 3,
            }]
        )
    } else if (dishType == 'entree') {
        question = createGameQuestion(
            {
                en:'If your family wants to order your same main dish ' + factor + ' times, how much is your family’s total?',
                es:'Si su familia quiere pedir el mismo plato principal ' + factor + ' veces , ¿cuánto es el total?',
            },
            dish.price * factor,
            [{
                en: "(" + dish.en + ") x " + factor + " = ???",
                es: "(" + dish.es + ") x " + factor + " = ???",
            },{
                en: "(" + dish.en + ") x " + factor + " = " + dish.price * factor,
                es: "(" + dish.es + ") x " + factor + " = " + dish.price * factor,
            }]
        ) 
    } else {
        question = createGameQuestion(
            {
                en:"If you buy your " + dishType + ", " + dish.en + ", " + factor + (factor === 1 ? " time" : " times") + ", how much money did you spend in total?",
                es:"Si compra su " + dishTypeEs + ", " + dish.es + ", " + factor + (factor === 1 ? " vez" : " veces") + ", ¿cuánto dinero gastó en total?",
            },
            dish.price * factor,
            [{
                en: "(" + dish.en + ") x " + factor + " = ???",
                es: "(" + dish.es + ") x " + factor + " = ???",
            },{
                en: "(" + dish.en + ") x " + factor + " = " + dish.price * factor,
                es: "(" + dish.es + ") x " + factor + " = " + dish.price * factor,
            }]
        ) 
    }
    return question
}