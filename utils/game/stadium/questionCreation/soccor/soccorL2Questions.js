import { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion";
import createGameQuestion from "@utils/game/quiz/questionGeneration/createGameQuestion";
const SoccorL2Questions = (questions,randomGenerator) => {
    const { randomInt } = randomGenerator;
    
    const answerQ1 = 160;
    questions.push(createGameQuestion(
        {
            en:"In the Premier League, soccer teams earn 3 points for a win and 1 point for a tie game. If Manchester City had 28 wins and 5 ties this season and Newcastle United had 19 wins and 14 ties, how many points did these two teams earn in total?",
            es:"En la Premier League, los equipos de fútbol ganan 3 puntos por una victoria y 1 punto por un empate. Si el Manchester City tuvo 28 victorias y 5 empates esta temporada y el Newcastle United tuvo 19 victorias y 14 empates, ¿cuántos puntos ganaron estos dos equipos en total?",
        },
        answerQ1,
        [
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


    const answerQ2 = 102;

    questions.push(createGameQuestion(
        {
            en:"Erling Haaland scored 36 goals in 35 games for Manchester City which led the Premier League. If Erling keeps scoring at the same rate, how many goals would he score if he played 100 games? Round your answer to the nearest goal",
            es:"Erling Haaland anotó 36 goles en 35 partidos para el Manchester City, que lideró la Premier League. Si Erling sigue anotando al mismo ritmo, ¿cuántos goles anotaría si jugara 100 partidos? Redondea tu respuesta al gol más cercano",
        },
        answerQ2,
        [
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


}

export default SoccorL2Questions;