import generateAHSimpleMultiQuestion from "@utils/game/auntHouse/questionCreation/auntHouseQuestionGenerators/generateAHSimpleMultiQuestion"
import createGameQuestion, { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion"
import { GenerateFriendContainerQuestion } from "@utils/game/recipes/questionGeneration/containerQuestionGenerators"

const recipesQuizzedOn = 2
const triples = [6,9,12,15,18]
const evens = [2,4,8,10]


const generateLevel1Questions = (recipes,questionType,randomGenerator) => {
    let questions = []
    Object.keys(recipes).forEach((recipeKey, index) => {
        switch(recipeKey) {
            case 'vanillaMilkShake':
                vanillaMilkShakeQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'mangoPineappleJuice':
                mangoPineappleJuiceQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'hamAndCheeseArepas':
                hamAndCheeseArepasQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'caesarSalad':
                caesarSaladQuestions(questions,recipes[recipeKey],randomGenerator)
                break
            case 'churros':
                churrosQuestions(questions,recipes[recipeKey],randomGenerator)
            case 'flan':
                flanQuestions(questions,recipes[recipeKey],randomGenerator)
            default:
                questions.push(ErrorQuestion)
        }
    })
     return questions
}

const mangoPineappleJuiceQuestions = (questions,recipe,randomGenerator) => {
    //questions.push(GenerateFriendContainerQuestion(recipe,2,5,6))
    questions.push(createGameQuestion(
        {
            en:'You need to make mango-pineapple juice for 5 friends. While in the store, you see that limes are sold in bags of 6. Using this recipe, how many bags of limes do you need to purchase to make mango-pineapple juice for you and 5 friends?',
            es: 'Necesitas hacer jugo de mango-piña para 5 amigos. Mientras estás en la tienda, ves que los limones se venden en bolsas de 6. Usando esta receta, ¿cuántas bolsas de limones necesitas comprar para hacer jugo de mango-piña para ti y tus 5 amigos?'
        },
        1,
        [
            {
               en: 'Limes per 1 serving = # limes / # servings \n Servings Needed = # friends + you \n Total limes needed = limes per 1 serving * servings needed \n Bags of limes needed = Total limes / # limes per 1 bag',
               es: 'Limones por 1 porción = # limones / # porciones \nPorciones necesitadas = # amigos + tú \nTotal de limones = limones por 1 porción * porciones necesitadas\nBolsas de limones necesitadas = Total de limones / # limones por 1 bolsa'

            },
            {
                en: 'Limes per 1 serving = 2 / 2 = 1 \n Servings Needed = 5 + 1 = 6 \n Total limes = 1 * 6 = 6 \n Bags of limes needed = 6 / 6 = 1 (Answer)',
                es: 'Limones por 1 porción = 2 / 2 = 1 \nPorciones necesitadas = 5 + 1 = 6\nTotal de limones = 1 * 6 = 6\nBolsas de limones necesitadas = 6 / 6 = 1 (Respuesta)'
            }
        ],
        'wholeNumber',
        null,
        null
    ))

    const q2Arr1 = [6,8,10]
    const q2Arr2 = [6,8,10]
    const q2num1 = q2Arr1[randomGenerator.randomInt(0,q2Arr1.length-1)]
    const q2num2 = q2Arr2[randomGenerator.randomInt(0,q2Arr2.length-1)]
    //Unit price question
    questions.push(createGameQuestion(
        {
            en: '',
            es: 'Estás tratando de calcular el precio unitario de los mangos. La marca Sunshine Mango vende paquetes con ' + q2num1 + ' mangos. Cada paquete cuesta ' + q2num2 + ' dólares. ¿Cuál es el precio por unidad de la marca Sunshine Mango? Escribe tu respuesta en formato de precio (por ejemplo, el formato de precio para 2 dólares y 35 centavos sería 2.35).'
        },
        1,
        [
            {
                en: 'Estás tratando de calcular el precio unitario de los mangos. La marca Sunshine Mango vende paquetes con [6, 8, 10] mangos. Cada paquete cuesta [4, 6, 8] dólares. ¿Cuál es el precio por unidad de la marca Sunshine Mango? Escribe tu respuesta en formato de precio (por ejemplo, el formato de precio para 2 dólares y 35 centavos sería 2.35).',
                es: 'Limones por 1 porción = # limones / # porciones \nPorciones necesitadas = # amigos + tú \nTotal de limones = limones por 1 porción * porciones necesitadas\nBolsas de limones necesitadas = Total de limones / # limones por 1 bolsa'

            },
            {
                en: 'Limes per 1 serving = 2 / 2 = 1 \n Servings Needed = 5 + 1 = 6 \n Total limes = 1 * 6 = 6 \n Bags of limes needed = 6 / 6 = 1 (Answer)',
                es: 'Limones por 1 porción = 2 / 2 = 1 \nPorciones necesitadas = 5 + 1 = 6\nTotal de limones = 1 * 6 = 6\nBolsas de limones necesitadas = 6 / 6 = 1 (Respuesta)'
            }
        ],
        'wholeNumber',
        null,
        null
    ))
    //Friend Container Cost question
    //Cheapest Brand Question
}

const hamAndCheeseArepasQuestions = (questions,recipe,randomGenerator) => {
    //Unit price question
    questions.push(GenerateFriendContainerQuestion(
        recipe,
        0,
        triples[randomGenerator.randomInt(0,triples.length-1)],
        10))
    //Unit price question
    //Cheapest Brand Question
}

const vanillaMilkShakeQuestions = (questions,recipe,randomGenerator) => {
    //Unit price question
    //Friend Container unit conversion question
    //image question
}

const caesarSaladQuestions = (questions,recipe,randomGenerator) => {
    //Friend Container unit conversion question
    //Cheapest Brand Question
    //ammout of servings with x question

}
const churrosQuestions = (questions,recipe,randomGenerator) => {
    //Friend unit conversion question
    //Cheapest Brand Question
    //image question
}

const flanQuestions = (questions,recipe,randomGenerator) => {
    const q1FactorArr = [4,16,24]
    questions.push(generateAHSimpleMultiQuestion(
            recipe,recipe.ingredients[2],
            q1FactorArr[randomGenerator.randomInt(0,q1FactorArr.length-1)],
            randomGenerator))
    //friend unit convertion question
}
export default generateLevel1Questions


//EASY
    //Friend unit price question
    //budget questions
    //reverse unit price question
    //Unit price question
    //Cheapest Brand Question
    //ammout of servings with x question
    //Unit price sale question
//HARD
    //Friend Container Cost question
    //Price unit convertion question
    //Cheapest Brand different size Question
    //Friend unit conversion question
    //Friend Container unit conversion question
