import createGameQuestion from "@utils/game/createGameQuestion"

export default function generateGraphQuestions(randomGenerator) {
    const questions = []
    questions[0] = generateDefaultGraphQuestion(randomGenerator)

    return questions
}

function generateDefaultGraphQuestion(randomGenerator) {
    const dishIndex = randomGenerator.randomInt(1,11)
    let answer = getDefaultPriceByIndex(dishIndex)

    const question = createGameQuestion(
        {
            en:'This a graph that shows the cost for each entree. The x-axis represents the different entrees on the menu and the y-axis is the price for each entree. How much was entree ' + dishIndex + '.', 
            es:'Este es un gráfico que nos enseña el costo de cada plato principal. El eje x representa un plato principal diferente en el menú y el eje y es el precio de cada plato principal. ¿Cuánto cuesta el plato principal ' + dishIndex + '.',
        },
        answer,
        [{
            en: 'x = y; x = entree and y = price',
            es: 'x = y; x = plato principal and y = precio',
        },{
            en: 'x = y; x = ' + dishIndex + ' and y = ' + answer,
            es: 'x = y; x = ' + dishIndex + ' et y = ' + answer,
        }],
        null,
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