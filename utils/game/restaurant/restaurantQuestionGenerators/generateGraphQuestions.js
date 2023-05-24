import createGameQuestion from '@utils/game/quiz/questionGeneration/createGameQuestion'

export default function generateGraphQuestions(randomGenerator, level) {
    const questions = []
    questions[0] = generateDefaultGraphQuestion(randomGenerator)

    return questions
}

function generateDefaultGraphQuestion(randomGenerator) {
    const dishIndex = randomGenerator.randomInt(1,11)
    let answer = getDefaultPriceByIndex(dishIndex)

    const question = createGameQuestion(
        {
            en:'This is a graph that shows the cost for each main dish. The x-axis represents the different main dishes on the menu and the y-axis is the price for each main dish. How much was main dish ' + dishIndex + '.', 
            es:'Este es un gráfico que muestra el costo de cada plato principal. El eje x representa los diferentes platos principales en el menú y el eje y es el precio de cada plato principal. ¿Cuánto cuesta el plato principal ' + dishIndex + '.',
        },
        answer,
        [{
            en: 'x = y; x = main dish and y = price',
            es: 'x = y; x = plato principal y y = precio',
        },{
            en: 'x = y; x = ' + dishIndex + ' and y = ' + answer,
            es: 'x = y; x = ' + dishIndex + ' y y = ' + answer,
        }],
        "wholeNumber",
        null,
        'defaultGraphQuestion'
    )
    return question
}

function getDefaultPriceByIndex(index) {
    switch (index) {
        case 1:
            return 9
        case 2:
            return 7
        case 3:
            return 8
        case 4:
            return 5
        case 5:
            return 6
        case 6:
            return 9
        case 7:
            return 7
        case 8:
            return 5
        case 9:
            return 4
        case 10:
            return 5
    }
}
