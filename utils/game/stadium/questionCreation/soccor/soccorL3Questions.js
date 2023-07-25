import { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion";
import createGameQuestion from "@utils/game/quiz/questionGeneration/createGameQuestion";
const SoccorL3Questions = (questions,randomGenerator) => {
    const { randomInt } = randomGenerator;
    
    // **********************************************************
    // Question 1
    // In the Premier League, soccer teams earn 3 points for a win and 1 point for a tie game. If Manchester City had 28 wins and 5 ties this season and Newcastle United had 19 wins and 14 ties, how many points did these two teams earn in total?

    const answerQ1 = 160;
    questions.push(createGameQuestion(
        {
            en:"In the Premier League, soccer teams earn 3 points for a win and 1 point for a tie game. If Manchester City had 28 wins and 5 ties this season and Newcastle United had 19 wins and 14 ties, how many points did these two teams earn in total?",
            es:"En la Premier League, los equipos de fútbol ganan 3 puntos por una victoria y 1 punto por un empate. Si el Manchester City tuvo 28 victorias y 5 empates esta temporada y el Newcastle United tuvo 19 victorias y 14 empates, ¿cuántos puntos ganaron estos dos equipos en total?",
        },
        answerQ1,
        [
            {
                en:"Try again!",
                es:"¡Inténtalo de nuevo!",
            },
            {
                en:"Total points = (points per win * total wins) + (points per tie * total ties)",
                es:"Puntos totales = (puntos por victoria * victorias totales) + (puntos por empate * empates totales)",
            },
            {
                en:"Total points = (3 * 47) + (1 * 19) = 160",
                es:"Puntos totales = (3 * 47) + (1 * 19) = 160",
            }
        ],
        "wholeNumber",
        null,
        null
    ));

    // **********************************************************
    // Question 2
    // Erling Haaland scored 36 goals in 35 games for Manchester City which led the Premier League. If Erling keeps scoring at the same rate, how many goals would he score if he played 100 games? Round your answer to the nearest goal

    const answerQ2 = 102;

    questions.push(createGameQuestion(
        {
            en:"Erling Haaland scored 36 goals in 35 games for Manchester City which led the Premier League. If Erling keeps scoring at the same rate, how many goals would he score if he played 100 games? Round your answer to the nearest goal",
            es:"Erling Haaland anotó 36 goles en 35 partidos para el Manchester City, que lideró la Premier League. Si Erling sigue anotando al mismo ritmo, ¿cuántos goles anotaría si jugara 100 partidos? Redondea tu respuesta al gol más cercano",
        },
        answerQ2,
        [
            {
                en:"Try again!",
                es:"¡Inténtalo de nuevo!",
            },
            {
                en:"Goals per 100 games = (goals scored/games played) * 100",
                es:"Goles por 100 partidos = (goles anotados / partidos jugados) * 100",
            },
            {
                en:"Goals per 100 games = (36/35) * 100 = 102",
                es:"Goles por 100 partidos = (36/35) * 100 = 102",
            }
        ],
        "wholeNumber",
        null,
        null
    ));

    // **********************************************************
    // Question 3
    // The following table shows the weekly salary of 4 Premier League players for 2023. How much more does Erling Haaland make than [Mohamed Salah, Harry Kane, Arthur Okonkwo]?

    const players = ["Mohamed Salah", "Harry Kane", "Arthur Okonkwo"]
    const salaryOptionsQ3 = [350000, 200000, 1538]
    const indexQ3 = randomInt(0,3)
    const selectedPlayerQ3 = players[indexQ3]
    const salarySelectedPlayerQ3 = salaryOptionsQ3[indexQ3]
    const answerQ3 = 482100 - salarySelectedPlayerQ3

    questions.push(createGameQuestion(
        {
            en:`The following table shows the weekly salary of 4 Premier League players for 2023. How much more does Erling Haaland make than ${selectedPlayerQ3}?`,
            es:`La siguiente tabla muestra el salario semanal de 4 jugadores de la Premier League para 2023. ¿Cuánto más gana Erling Haaland que ${selectedPlayerQ3}?`,
        },
        answerQ3,
        [
            {
                en:"Try again!",
                es:"¡Inténtalo de nuevo!",
            },
            {
                en:"Salary difference = first player salary - second player salary",
                es:"Diferencia salarial = salario del primer jugador - salario del segundo jugador",
            },
            {
                en:`Salary difference = 482100 - ${salarySelectedPlayerQ3} = ${answerQ3}`,
                es:`Diferencia salarial = 482100 - ${salarySelectedPlayerQ3} = ${answerQ3}`,
            }
        ],
        "wholeNumber",
        null,
        "level3StadiumQ3",
    ));

    // **********************************************************
    // Question 4
    // The following table shows the weekly salary of 4 Premier League players for 2023. If Kevin De Bruyne and [Jadon Sancho, Virgil Van Dijk, Rob Holding] both work for 2 weeks, then how much more will Kevin earn?

    const playersQ4 = ["Jadon Sancho", "Virgil Van Dijk", "Rob Holding"]
    const salaryOptionsQ4 = [450000, 285000, 51500]
    const indexQ4 = randomInt(0,3)
    const selectedPlayerQ4 = playersQ4[indexQ4]
    const salarySelectedPlayerQ4 = salaryOptionsQ4[indexQ4]
    const answerQ4 = 2 * (482100 - salarySelectedPlayerQ4)

    questions.push(createGameQuestion(
        {
            en:`The following table shows the weekly salary of 4 Premier League players for 2023. If Kevin De Bruyne and ${selectedPlayerQ4} both work for 2 weeks, then how much more will Kevin earn?`,
            es:`La siguiente tabla muestra el salario semanal de 4 jugadores de la Premier League para 2023. Si Kevin De Bruyne y ${selectedPlayerQ4} trabajan durante 2 semanas, ¿cuánto más ganará Kevin?`,
        },
        answerQ4,
        [
            {
                en:"Try again!",
                es:"¡Inténtalo de nuevo!",
            },
            {
                en:"Salary difference = (first player salary - second player salary) * weeks worked",
                es:"Diferencia salarial = (salario del primer jugador - salario del segundo jugador) * semanas trabajadas",
            },
            {
                en:`Salary difference = (482100 - ${salarySelectedPlayerQ4}) * 2 = ${answerQ4}`,
                es:`Diferencia salarial = (482100 - ${salarySelectedPlayerQ4}) * 2 = ${answerQ4}`,
            }
        ],
        "wholeNumber",
        null,
        "level3StadiumQ4",
    ));

    // **********************************************************
    // Question 5
    // The following table shows the weekly salary of 4 Spanish La Liga players for 2023. How many weeks will it take [Lucas Torro, Joao Felix, Vinicius Junior] to earn the same amount of money that Frenkie de Jong earns in one month? Round your answer to the nearest whole number. Hint: 1 month = 4 weeks

    const playersQ5 = ["Lucas Torro", "Joao Felix", "Vinicius Junior"]
    const salaryOptionsQ5 = [16000, 310000, 445000]
    const indexQ5 = randomInt(0,3)
    const selectedPlayerQ5 = playersQ5[indexQ5]
    const salarySelectedPlayerQ5 = salaryOptionsQ5[indexQ5]
    const frenkieSalaryQ5 = 800000 * 4 // 1 month = 4 weeks

    const answerQ5 = Math.round(frenkieSalaryQ5 / salarySelectedPlayerQ5)

    questions.push(createGameQuestion(
        {
            en:`The following table shows the weekly salary of 4 Spanish La Liga players for 2023. How many weeks will it take ${selectedPlayerQ5} to earn the same amount of money that Frenkie de Jong earns in one month? Round your answer to the nearest whole number. Hint: 1 month = 4 weeks`,
            es:`La siguiente tabla muestra el salario semanal de 4 jugadores de la Liga Española para 2023. ¿Cuántas semanas le tomará a ${selectedPlayerQ5} ganar la misma cantidad de dinero que Frenkie de Jong gana en un mes? Redondea tu respuesta al número entero más cercano. Pista: 1 mes = 4 semanas`,
        },
        answerQ5,
        [
            {
                en:"Try again!",
                es:"¡Inténtalo de nuevo!",
            },
            {
                en:'de Jong monthly salary =  weekly salary * weeks per 1 month',
                es:'Salario mensual de de Jong = salario semanal * semanas por 1 mes',
            },
            {
                en:`de Jong monthly salary = 800000 * 4 = ${frenkieSalaryQ5}\n${selectedPlayerQ5} weeks to earn same salary = de Jong monthly salary / ${salarySelectedPlayerQ5} = ${answerQ5}`,
                es:`Salario mensual de de Jong = 800000 * 4 = ${frenkieSalaryQ5}\n${selectedPlayerQ5} semanas para ganar el mismo salario = salario mensual de de Jong / ${salarySelectedPlayerQ5} = ${answerQ5}`,
            }
        ],
        "wholeNumber",
        null,
        "level3StadiumQ5",
    ));

    // **********************************************************
    // Question 6
    // In the Spanish La Liga, FC Barcelona won [7/10, 8/10, 7/8, 8/9] of their forty games and they tied [1/5, 1/4, 3/8] of them. What total fraction of Barcelona’s 40 games were not lost?   

    // const winsQ6 = ["7/10", "8/10", "7/8", "8/9"]
    // const tiesQ6 = ["1/5", "1/4", "3/8"]
    // const indexQ6 = randomInt(0,4)
    // const selectedWinQ6 = winsQ6[indexQ6]
    // const selectedTieQ6 = tiesQ6[indexQ6]

    // const sumFractions = (selectedWinQ6, selectedTieQ6) => {
    //     const [num1, den1] = selectedWinQ6.split("/");
    //     const [num2, den2] = selectedTieQ6.split("/");
    //     const den = den1 * den2;
    //     const num = num1 * den2 + num2 * den1;
    //     return [num, den];
    // }

    // const [numerator,denominator] = getFraction(selectedWinQ6, selectedTieQ6);
    // const answerQ6 = `${numerator}/${denominator}`
    
    // console.log(answerQ6)


    // **********************************************************
    // Question 7
    // Real Madrid’s leading scorer last season was Karim Benzema. If he scored 19 goals in 24 games, then how many goals would you expect him to score in [38,44,58,64] games? Round your answer to the nearest goal.

    const gamesQ7 = [38,44,58,64]
    const indexQ7 = randomInt(0,4)
    const selectedGamesQ7 = gamesQ7[indexQ7]
    const answerQ7 = Math.round((19/24) * selectedGamesQ7)
    
    questions.push(createGameQuestion(
        {
            en:`Real Madrid’s leading scorer last season was Karim Benzema. If he scored 19 goals in 24 games, then how many goals would you expect him to score in ${selectedGamesQ7} games? Round your answer to the nearest goal.`,
            es:`El máximo goleador del Real Madrid la temporada pasada fue Karim Benzema. Si anotó 19 goles en 24 partidos, ¿cuántos goles esperaría que anotara en ${selectedGamesQ7} partidos? Redondea tu respuesta al gol más cercano.`,
        },
        answerQ7,
        [
            {
                en:"Try again!",
                es:"¡Inténtalo de nuevo!",
            },
            {
                en:"Expected goals = (goals scored/games played) * total games",
                es:"Goles esperados = (goles anotados/partidos jugados) * partidos totales",
            },
            {
                en:`Expected goals = (19/24) * ${selectedGamesQ7} = ${answerQ7}`,
                es:`Goles esperados = (19/24) * ${selectedGamesQ7} = ${answerQ7}`,
            }
        ],
        "wholeNumber",
        null,
        null,
    ));

    // **********************************************************
    // Question 8
        // If a soccer goal is a rectangular prism that is 24 feet long, 5 feet wide, and 8 feet high, then what is the volume of the soccer goal in cubic feet? Hint: find the volume by multiplying the height of the rectangular prism by the area of its base.

    const answerQ8 = 960;

    questions.push(createGameQuestion(
        {
            en:"If a soccer goal is a rectangular prism that is 24 feet long, 5 feet wide, and 8 feet high, then what is the volume of the soccer goal in cubic feet? Hint: find the volume by multiplying the height of the rectangular prism by the area of its base.",
            es:"Si una portería de fútbol es un prisma rectangular de 24 pies de largo, 5 pies de ancho y 8 pies de alto, ¿cuál es el volumen de la portería de fútbol en pies cúbicos? Pista: encuentra el volumen multiplicando la altura del prisma rectangular por el área de su base.",
        },
        answerQ8,
        [
            {
                en:"Try again!",
                es:"¡Inténtalo de nuevo!",
            },
            {
                en:"Volume = height * length * width",
                es:"Volumen = altura * largo * ancho",
            },
            {
                en:`Volume = 8 * 24 * 5 = ${answerQ8}`,
                es:`Volumen = 8 * 24 * 5 = ${answerQ8}`,
            }
        ],
        "wholeNumber",
        null,
        null,
    ));

    // **********************************************************
    // Question 9
    // The following table shows the all-time champions of the Men’s Soccer World Cup. What fraction of all World Cups has been won by [South American, European] countries? 

    const continentsQ9 = ["South American", "European"]
    const worldCups = [10,12]
    const indexQ9 = randomInt(0,2)
    const selectedContinentQ9 = continentsQ9[indexQ9]
    const amountOfWorldCupsOfSaidContinent = worldCups[indexQ9]
    const amountOfWorldCupsQ9 = 22
    const answerQ9 = `${amountOfWorldCupsOfSaidContinent}/${amountOfWorldCupsQ9}`
    const vals ={
        "South American":
        {
            en:"South American",
            es:"Sur Americanos",
            hint:{
                en:"(Brazil/Total) + (Argentina/Total) + (Uruguay/Total)",
                es:"(Brasil/Total) + (Argentina/Total) + (Uruguay/Total)",
            },
            solution: " 5/22 + 3/22 + 2/22 = 10/22 "
        },
        "European":
        {
            en:"European",
            es:"Europeos",
            hint:{
                en:"(Germany/Total) + (Italy/Total) + (Spain/Total) + (France/Total) + (England/Total)",
                es:"(Alemania/Total) + (Italia/Total) + (España/Total) + (Francia/Total) + (Inglaterra/Total)",
            },
            solution:"4/22 + 4/22 + 1/22 + 2/22 + 1/22 = 12/22"
        }
    }

    questions.push(createGameQuestion({
        en:`The following table shows the all-time champions of the Men’s Soccer World Cup. What fraction of all World Cups has been won by ${selectedContinentQ9} countries?`,
        es:`La siguiente tabla muestra a los campeones de todos los tiempos de la Copa Mundial de Fútbol Masculino. ¿Qué fracción de todas las Copas del Mundo han sido ganadas por países ${vals[selectedContinentQ9].es}?`,
    },
    answerQ9,
    [
        {
            en:"Try again!",
            es:"¡Inténtalo de nuevo!",
        },
        {
            en:vals[selectedContinentQ9].hint.en,
            es:vals[selectedContinentQ9].hint.es,
        },
        {
            en:vals[selectedContinentQ9].solution,
            es:vals[selectedContinentQ9].solution,
        }
    ],
    "fraction",
    null,
    "level3StadiumQ9",
    ))

    // **********************************************************
    // Question 10
    // The following chart shows the age of each World Cup Golden Ball winner and the year when they won the award. Which player does the point [ (1998,22) or (2002,33) or (2006,34) or (2010,31) or (2014,27) or (2018,33) or (2022,35) ] represent? Type the full name of the correct player in the answer box.
    //     (1998,22) – Ronaldo
    // (2002,33) – Oliver Kahn
    // (2006,34) – Zinedine Zidane
    // (2010,31) – Diego Forlan
    // (2014,27) – Lionel Messi 
    // (2018,33) – Luka Modric
    // (2022,35) – Lionel Messi

    const options = ["(1998,22)","(2002,33)","(2006,34)","(2010,31)","(2014,27)","(2018,33)","(2022,35)"]
    const indexQ10 = randomInt(0,7)
    const selectedOptionQ10 = options[indexQ10]
    const resultsQ10 = {
        "(1998,22)":"Ronaldo",
        "(2002,33)":"Oliver Kahn",
        "(2006,34)":"Zinedine Zidane",
        "(2010,31)":"Diego Forlan",
        "(2014,27)":"Lionel Messi",
        "(2018,33)":"Luka Modric",
        "(2022,35)":"Lionel Messi",
    }

    questions.push(createGameQuestion({
        en:`The following chart shows the age of each World Cup Golden Ball winner and the year when they won the award. Which player does the point ${selectedOptionQ10} represent? Type the full name of the correct player in the answer box.`,
        es:`El siguiente gráfico muestra la edad de cada ganador del Balón de Oro de la Copa Mundial y el año en que ganaron el premio. ¿Qué jugador representa el punto ${selectedOptionQ10}? Escribe el nombre completo del jugador correcto en el cuadro de respuesta.`,
    },
    resultsQ10[selectedOptionQ10].toLowerCase(),
    [
        {
            en:"Try again!",
            es:"¡Inténtalo de nuevo!",
        },
        {
            en:"Match the x and y coordinates of the given point to the corresponding point on the graph to identify the correct player.",
            es:"Empareja las coordenadas x e y del punto dado con el punto correspondiente en el gráfico para identificar al jugador correcto.",
        },
        {
            en:`${selectedOptionQ10} = ${resultsQ10[selectedOptionQ10]}`,
            es:`${selectedOptionQ10} = ${resultsQ10[selectedOptionQ10]}`,
        }
    ],
    "text",
    null,
    "level3StadiumQ10",
    ));

    // **********************************************************
    // Question 11
    // The following chart shows the age of each World Cup Golden Ball winner and the year when they won the award. Who was the [youngest/oldest] player to win the Golden Ball award since the 1998 World Cup? Type the full name of the correct player in the answer box.

    const optionsQ11 = ["youngest","oldest"]
    const resultsQ11 = {
        "youngest":"ronaldo",
        "oldest":"lionel messi",
    }
    const translation ={
        "youngest":"más joven",
        "oldest":"más viejo",
    }
    const indexQ11 = randomInt(0,2)
    const selectedAge = optionsQ11[indexQ11]
    const answerQ11 = resultsQ11[selectedAge]

    const hints ={
        "youngest":{
            en:"Find the point with the lowest y-coordinate on the graph.",
            es:"Encuentra el punto con la coordenada y más baja en el gráfico.",
        },
        "oldest":{
            en:"Find the point with the highest y-coordinate on the graph.",
            es:"Encuentra el punto con la coordenada y más alta en el gráfico.",
        }
    }


    questions.push(createGameQuestion({
        en:`The following chart shows the age of each World Cup Golden Ball winner and the year when they won the award. Who was the ${selectedAge} player to win the Golden Ball award since the 1998 World Cup? Type the full name of the correct player in the answer box.`,
        es:`El siguiente gráfico muestra la edad de cada ganador del Balón de Oro de la Copa Mundial y el año en que ganaron el premio. ¿Quién fue el jugador ${translation[selectedAge]} en ganar el premio Balón de Oro desde la Copa Mundial de 1998? Escribe el nombre completo del jugador correcto en el cuadro de respuesta.`,
    },
    answerQ11,
    [
        {
            en:"Try again!",
            es:"¡Inténtalo de nuevo!",
        },
        {
            en:hints[selectedAge].en,
            es:hints[selectedAge].es,
        },
        {
            en:`${selectedAge} player = ${answerQ11}`,
            es:`Jugador ${selectedAge} = ${answerQ11}`,
        }
    ],
    "text",
    null,
    "level3StadiumQ10",
    ));

    // **********************************************************
    // Question 12
    // The following chart shows the age of each World Cup Golden Ball winner and the year when they won the award. Christian Pulisic is the top American soccer player today. If he were to win the Golden Ball at the 2026 World Cup, he would be 28 years old. Out of the last 7 Golden Ball winners, how many would Christian be [younger/older] than in 2026? Hint: Lionel Messi was 27 when he won the Golden Ball in 2014.

    const optionsQ12 = ["younger","older"]
    const resultsQ12 = {
        "younger":5,
        "older":2,
    }
    const translationsQ12 ={
        "younger":"más jovenes",
        "older":"más viejos",
    }
    const indexQ12 = randomInt(0,2)
    const selectedAgeQ12 = optionsQ12[indexQ12]
    const answerQ12 = resultsQ12[selectedAgeQ12]

    const hintsQ12 ={
        "younger":{
            en:"Find the points with y-coordinates less than 28 on the graph.",
            es:"Encuentra los puntos con coordenadas y menores que 28 en el gráfico.",
        },
        "older":{
            en:"Find the points with y-coordinates greater than 28 on the graph.",
            es:"Encuentra los puntos con coordenadas y mayores que 28 en el gráfico.",
        }
    }

    questions.push(createGameQuestion({
        en:`The following chart shows the age of each World Cup Golden Ball winner and the year when they won the award. Christian Pulisic is the top American soccer player today. If he were to win the Golden Ball at the 2026 World Cup, he would be 28 years old. Out of the last 7 Golden Ball winners, how many would Christian be ${selectedAgeQ12} than in 2026? Hint: Lionel Messi was 27 when he won the Golden Ball in 2014.`,
        es:`El siguiente gráfico muestra la edad de cada ganador del Balón de Oro de la Copa Mundial y el año en que ganaron el premio. Christian Pulisic es el mejor jugador de fútbol americano hoy en día. Si ganara el Balón de Oro en la Copa Mundial de 2026, tendría 28 años. De los últimos 7 ganadores del Balón de Oro, ¿cuántos serían ${translationsQ12[selectedAgeQ12]} que Christian en 2026? Pista: Lionel Messi tenía 27 años cuando ganó el Balón de Oro en 2014.`,
    },
    answerQ12,
    [
        {
            en:"Try again!",
            es:"¡Inténtalo de nuevo!",
        },
        {
            en:hintsQ12[selectedAgeQ12].en,
            es:hintsQ12[selectedAgeQ12].es,
        },
        {
            en:`${selectedAgeQ12} players = ${answerQ12}`,
            es:`Jugadores ${selectedAgeQ12} = ${answerQ12}`,
        }
    ],
    "wholeNumber",
    null,
    "level3StadiumQ10"
    ));




    








}

export default SoccorL3Questions;