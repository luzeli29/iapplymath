import { getText } from "@commonImports"
import createGameQuestion from "@utils/game/createGameQuestion"
import validateOrder from "@utils/validation/game/restaurant/validateOrder"

export default function generateMultiMultiplyDishQuestions(order,level,randomGenerator) {
    const numbOfTwoQuestionsNeeded = 2
    const numbOfThreeQuestionsNeeded = 1

    let questions = []


    for(let i = 0; i < numbOfTwoQuestionsNeeded; i++) {
        let question = generateTwoMultiplyQuestion(order,level,randomGenerator)
        questions.push(question)
    }

    for(let i = 0; i < numbOfThreeQuestionsNeeded; i++) {
        let question = generateThreeMultiplyQuestion(order,level,randomGenerator)
        questions.push(question)
    }

    return questions
}

function generateTwoMultiplyQuestion(order,level,randomGenerator) {
    const factorMax = Math.ceil(((level+2)**2) + 3)
    const factorMin = Math.ceil(((level+2)**2)/5 + 3)
    const factor1 = randomGenerator.randomInt(factorMin,factorMax)
    const dishType1 = randomGenerator.randomDishType()
    let dishType2
    const dishType2Choice = randomGenerator.randomInt(0,2)
    const factor2 = randomGenerator.randomInt(factorMin,factorMax)

    switch (dishType1) {
        case 'entree': 
            dishType2 = dishType2Choice ? 'drink' : 'dessert'
            break
        case 'drink': 
            dishType2 = dishType2Choice ? 'dessert' : 'entree'
            break
        case 'dessert': 
            dishType2 = dishType2Choice ? 'entree' : 'drink'
            break
    }

    const dish1 = order[dishType1]
    const dish2 = order[dishType2]
    const answer = dish1.price * factor1 + dish2.price * factor2
    const question = createGameQuestion(
        {
            en:'If you buy ' + factor1 + ', ' +  dish1.en +' and ' + factor2 + ', ' + dish2.en + ', what is your total?',
            es:'Si compras ' + factor1 + ', ' +  dish1.es +' et ' + factor2 + ', ' + dish2.es + ' ¿Cuál es su total?',
        },
        answer,
        [{
            en: "(" + dish1.en + ") x " + factor1 + " + (" + dish2.en + ") x " + factor2 +" = ?",
            es: "(" + dish1.es + ") x " + factor1 + " + (" + dish2.es + ") x " + factor2 +" = ?",
        },{
            en: "(" + dish1.en + ") x " + factor1 + " + (" + dish2.en + ") x " + factor2 +" = " + answer,
            es: "(" + dish1.es + ") x " + factor1 + " + (" + dish2.es + ") x " + factor2 +" = " + answer,
        }]
    ) 

    return question
}


function generateThreeMultiplyQuestion(order,level,randomGenerator) {
    const factorMax = Math.ceil(((level+2)**2) + 3)
    const factorMin = Math.ceil(((level+2)**2)/5 + 3)
    const factorEntree = randomGenerator.randomInt(factorMin,factorMax)
    const factorDrink = randomGenerator.randomInt(factorMin,factorMax)
    const factorDessert = randomGenerator.randomInt(factorMin,factorMax)

    const entree = order.entree
    const drink = order.drink
    const dessert = order.dessert

    const answer = (factorEntree * entree.price) + (factorDessert * dessert.price) + (factorDrink * drink.price)
    const question = createGameQuestion(
        {
            en:'If you buy ' + factorEntree + ' ' + entree.en + ', ' + factorDrink + ' ' + drink.en + ', and ' + factorDessert + ' ' + dessert.en + ', what is your total?',
            es:'Si compras ' + factorEntree + ' ' + entree.es + ', ' + factorDrink + ' ' + drink.es + ', et ' + factorDessert + ' ' + dessert.es + ' ¿Cuál es su total?',
        },
        answer,
        [{
            en: "(" + entree.en + ") x " + factorEntree + " + (" + drink.en + ") x " + factorDrink + " + (" + dessert.en + ") x " + factorDessert +" = ?",
            es: "(" + entree.es + ") x " + factorEntree + " + (" + drink.es + ") x " + factorDrink + " + (" + dessert.es + ") x " + factorDessert +" = ?",
        },{
            en: "(" + entree.en + ") x " + factorEntree + " + (" + drink.en + ") x " + factorDrink + " + (" + dessert.en + ") x " + factorDessert +" = " + answer,
            es: "(" + entree.es + ") x " + factorEntree + " + (" + drink.es + ") x " + factorDrink + " + (" + dessert.es + ") x " + factorDessert +" = " + answer,
        }]
    ) 

    return question
}