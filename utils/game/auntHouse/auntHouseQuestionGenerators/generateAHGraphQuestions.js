import createGameQuestion from "@utils/game/createGameQuestion"

export default function generateAHGraphQuestions(randomGenerator) {
    const questions = []
    questions[0] = generateDefaultGraphQuestion(randomGenerator)

    return questions
}

function generateDefaultGraphQuestion(randomGenerator) {
    const recipeIndex = randomGenerator.randomInt(1,11)
    let answer = getDefaultTimeByIndex(recipeIndex)

    const question = createGameQuestion(
        {
            en:'Tia Maria makes this recipe often and she is really fast. This a graph that represents the amount of time it took Tia Maria to make this recipe every day for 10 days: The x-axis represents the day she made the recipe and the y-axis is the amount of time in minutes it took her to make this recipe. How many minutes did it take her to make the recipe on day ' + recipeIndex + '?', 
            es:'Tía María hace esta receta bastante y es muy rápida. Este es un gráfico que representa la cantidad de tiempo que se demoró la Tía María en hacer esta receta todos los días durante 10 días: El eje x representa el día que tía María hizo la receta y el eje y es la cantidad de tiempo en minutos que se demoró en hacer esta receta. ¿Cuántos minutos se demoró ella para hacer la receta el día ' + recipeIndex + '?', 
        },
        answer,
        [{
            en: 'x = y; x = day making the recipe and and y = minutes',
            es: 'x = y; x = día haciendo la receta y = minutos',
        },{
            en: 'x = y; x = ' + recipeIndex + ' and y = ' + answer,
            es: 'x = y; x = ' + recipeIndex + ' et y = ' + answer,
        }],
        null,
        null,
        'auntHouseDefaultGraph'
    )
    return question
}

function getDefaultTimeByIndex(index) {
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