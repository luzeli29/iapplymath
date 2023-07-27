import { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion";
import createGameQuestion from "@utils/game/quiz/questionGeneration/createGameQuestion";



function findGCD(a, b) {
    if (b === 0) {
      return a;
    }
    return findGCD(b, a % b);
  }
  
  // Convert the amount to a fraction
  function convertToFraction(amount) {
    if (amount.includes('/')) {
      const [numeratorStr, denominatorStr] = amount.split('/');
      const numerator = parseInt(numeratorStr);
      const denominator = parseInt(denominatorStr);
  
      const gcd = findGCD(numerator, denominator);
      const simplifiedNumerator = numerator / gcd;
      const simplifiedDenominator = denominator / gcd;
  
      if (simplifiedNumerator === simplifiedDenominator) {
        return 1; // Simplify to 1 if numerator and denominator are the same
      }
  
      return { numerator: simplifiedNumerator, denominator: simplifiedDenominator }; // Return as fraction object
    } else {
      const integerValue = parseInt(amount);
      return Number.isNaN(integerValue) ? null : integerValue; // Return as integer or null if not a valid number
    }
  }
  
  function simplifyFraction(fraction) {
    if (typeof fraction !== 'object') {
      return {
        result: fraction, // Return the input if not a fraction object
        types: typeof fraction === 'number' ? 'wholeNumber' : null,
      };
    }
  
    const numerator = fraction.numerator;
    const denominator = fraction.denominator;
  
    // Find the greatest common divisor (GCD)
    const commonDivisor = findGCD(numerator, denominator);
  
    // Simplify the fraction
    const simplifiedNumerator = numerator / commonDivisor;
    const simplifiedDenominator = denominator / commonDivisor;
  
    if (simplifiedDenominator === 1) {
      return {
        result: simplifiedNumerator.toString(), // Treat as whole number
        types: 'wholeNumber',
      };
    } else if (simplifiedNumerator === simplifiedDenominator) {
      return {
        result: '1', // Output "1" if the numerator and denominator are the same
        types: 'wholeNumber',
      };
    } else {
      return {
        result: `${simplifiedNumerator}/${simplifiedDenominator}`,
        types: 'fraction',
      };
    }
  }
  
  function multiplyOrDivide(fractionOrInteger, randomNum, operation) {
    if (typeof fractionOrInteger === 'object' && typeof randomNum === 'object') {
      const numerator1 = fractionOrInteger.numerator;
      const denominator1 = fractionOrInteger.denominator;
      const numerator2 = randomNum.numerator;
      const denominator2 = randomNum.denominator;
  
      let result;
      if (operation === 'multiply') {
        result = {
          numerator: numerator1 * numerator2,
          denominator: denominator1 * denominator2,
        };
      } else if (operation === 'divide') {
        result = {
          numerator: numerator1 * denominator2,
          denominator: denominator1 * numerator2,
        };
      }
  
      return {
        result: result,
      };
    } else if (typeof fractionOrInteger === 'object') {
      const numerator = fractionOrInteger.numerator;
      const denominator = fractionOrInteger.denominator;
  
      let result;
      if (operation === 'multiply') {
        result = {
          numerator: numerator * randomNum,
          denominator: denominator,
        };
      } else if (operation === 'divide') {
        result = {
          numerator: numerator,
          denominator: denominator * randomNum,
        };
      }
  
      return {
        result: result,
      };
    } else if (typeof fractionOrInteger === 'number') {
      let result;
      if (operation === 'multiply') {
        result = fractionOrInteger * randomNum;
      } else if (operation === 'divide') {
        if (typeof randomNum === 'object') {
          result = {
            numerator: fractionOrInteger * randomNum.denominator,
            denominator: randomNum.numerator,
          };
        } else if (typeof randomNum === 'number') {
          result = {
            numerator: fractionOrInteger,
            denominator: randomNum,
          };
        } else {
          return {
            result: null,
          };
        }
      }
  
      return {
        result: result,
      };
    } else {
      return {
        result: null,
      };
    }
  }
  
  function addOrSubtract(fractionOrInteger1, fractionOrInteger2, operation) {
    let result;
  
    if (typeof fractionOrInteger1 === 'object' && typeof fractionOrInteger2 === 'object') {
      const numerator1 = fractionOrInteger1.numerator;
      const denominator1 = fractionOrInteger1.denominator;
      const numerator2 = fractionOrInteger2.numerator;
      const denominator2 = fractionOrInteger2.denominator;
  
      if (operation === 'add') {
        const commonDenominator = denominator1 * denominator2;
        const newNumerator = numerator1 * denominator2 + numerator2 * denominator1;
        result = {
          numerator: newNumerator,
          denominator: commonDenominator,
        };
      } else if (operation === 'subtract') {
        const commonDenominator = denominator1 * denominator2;
        const newNumerator = numerator1 * denominator2 - numerator2 * denominator1;
        result = {
          numerator: newNumerator,
          denominator: commonDenominator,
        };
      }
    } else if (typeof fractionOrInteger1 === 'number' && typeof fractionOrInteger2 === 'object') {
      const numerator = fractionOrInteger2.numerator;
      const denominator = fractionOrInteger2.denominator;
    
  
      if (operation === 'add') {
        const commonDenominator = denominator;
        const newNumerator = fractionOrInteger1 * denominator + numerator;
        result = {
          numerator: newNumerator,
          denominator: commonDenominator,
        };
      } else if (operation === 'subtract') {
        const commonDenominator = denominator;
        const newNumerator = fractionOrInteger1 * denominator - numerator;
        result = {
          numerator: newNumerator,
          denominator: commonDenominator,
        };
      }
    } else if (typeof fractionOrInteger1 === 'object' && typeof fractionOrInteger2 === 'number') {
      const numerator = fractionOrInteger1.numerator;
      const denominator = fractionOrInteger1.denominator;
  
      if (operation === 'add') {
        const commonDenominator = denominator;
        const newNumerator = numerator + fractionOrInteger2 * denominator;
        result = {
          numerator: newNumerator,
          denominator: commonDenominator,
        };
      } else if (operation === 'subtract') {
        const commonDenominator = denominator;
        const newNumerator = numerator - fractionOrInteger2 * denominator;
        result = {
          numerator: newNumerator,
          denominator: commonDenominator,
        };
      }
    }
  
    if (result !== undefined) {
      const { numerator, denominator } = result;
  
      if (denominator === 1) {
        return {
          result: numerator,
          type: 'wholeNumber',
        };
      } else {
        return {
          result: result,
          type: 'fraction',
        };
      }
    } else {
      return {
        result: null,
        type: null,
      };
    }
  }
const SoccorL1Questions = (questions,randomGenerator) => {

    const { randomInt } = randomGenerator;
    
    // **********************************************************
    // Question 1
    // You made two rectangular signs to bring to a soccer game. Both signs have different lengths and widths but they have an equal area of 24 square centimeters (cm2). The green sign’s width is 4 cm and the blue sign’s width is 3 cm. What is the perimeter of the [blue, green] sign in centimeters?

    const colors = ["blue", "green"];
    const randomColorIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomColorIndex];
   
    let number ;
    if (randomColor === "blue") {
        number = 3;
      } else if (randomColor === "green") {
        number = 4;
      }
    const first = 24/number
    const answerQ1 = first*2 + number*2;
    questions.push(createGameQuestion(
        {
            en:`You made two rectangular signs to bring to a soccer game. Both signs have different lengths and widths but they have an equal area of 24 square centimeters (cm2). The green sign’s width is 4 cm and the blue sign’s width is 3 cm. What is the perimeter of the ${randomColor} sign in centimeters?`,
            es:`Hiciste dos letreros rectangulares para llevar a un partido de fútbol. Ambos letreros tienen diferentes tamaños de ancho y largo, pero tienen un área igual de 24 centímetros cuadrados (cm2). El ancho del letrero verde es de 4 cm y el ancho del letrero azul es de 3 cm. ¿Cuál es el perímetro del letrero ${randomColor} en centímetros?`,
        },
        answerQ1,
        [
            {
                en:"1) Length = L, Width = w, Area = A, Perimeter = P 2) A = L * w  →  L = A / w 3)P = L + L + w + w = (2 * L) + (2 * w)",
                es:"1) Longitud = L, Ancho = w, Área = A, Perímetro = P 2) A = L * w  →  L = A / w 3)P = L + L + w + w = (2 * L) + (2 * w)",

            },
            {
                en:`For ${randomColor} sign:
               1)  L = 24 / ${number} = ${first} cm
               2)  P = ${first} + ${number} + ${first} + ${number} = ${answerQ1} cm
                `,
                es:`Para el signo ${randomColor} :
                1)  L = 24 / ${number} = ${first} cm
                2)  P = ${first} + ${number} + ${first} + ${number} = ${answerQ1} cm
                 `,
            }
        ],
        "wholeNumber",
        null,
        null
    ));

        // **********************************************************
    // Question 2
    // Lionel Messi scored 4 goals in a recent match. If he played for a total of [24,28,32,36,40] minutes, what is the average time it took him to score 1 goal?

    const randomNum = [24,28,32,36,40];
    const randomIndex = Math.floor(Math.random() * randomNum.length);
    const randomFraction = randomNum[randomIndex];

    const answerQ2 = randomFraction/4
    questions.push(createGameQuestion(
        {
            en:`Lionel Messi scored 4 goals in a recent match. If he played for a total of ${randomFraction} minutes, what is the average time it took him to score 1 goal? Hint: divide the total play time by the total number of goals! `,
            es:`Lionel Messi anotó 4 goles en un partido reciente. Si jugó un total de ${randomFraction} minutos, ¿cuál es el tiempo promedio que le tomó anotar 1 gol? Pista: ¡divide el tiempo total de juego por el número total de goles!`,
        },
        answerQ2,
        [
            {
                en:"Average time per goal = total play time / number of goals scored ",
                es:"Tiempo medio por gol = tiempo total de juego / número de goles marcados",

            },
            {
                en:`Average time per goal = ${randomFraction} / 4 = ${answerQ2}`,
                es:`Tiempo medio por gol = ${randomFraction} / 4 = ${answerQ2}`,
            }
        ],
        "wholeNumber",
        null,
        null
    ));


    // **********************************************************
    // Question 3
    // Neymar typically plays [40,50,60,70,80,90] minutes in each of his team’s matches. If his team played [3-7] matches this month, how many total minutes did Neymar play?

    const randomNum2 = [40,50,60,70,80,90];
    const randomIndex2 = Math.floor(Math.random() * randomNum2.length);
    const randomFraction2 = randomNum2[randomIndex2];
    const randomNums = randomInt(3,8)

    const answerQ3 = randomFraction2 * randomNums
    questions.push(createGameQuestion(
        {
            en:`Neymar typically plays ${randomFraction2} minutes in each of his team’s matches. If his team played ${randomNums} matches this month, how many total minutes did Neymar play? `,
            es:`Neymar juega típicamente ${randomFraction2} minutos en cada uno de los partidos de su equipo. Si su equipo jugó ${randomNums} partidos este mes, ¿cuántos minutos totales jugó Neymar? `,
        },
        answerQ3,
        [
            {
                en:"Total minutes = minutes per 1 match * number of matches",
                es:"Tiempo medio por gol = tiempo total de juego / número de goles marcados",

            },
            {
                en:`Total minutes = ${randomFraction2} * ${randomNums} = ${answerQ3}`,
                es:`Minutos totales = ${randomFraction2} * ${randomNums} = ${answerQ3}`,
            }
        ],
        "wholeNumber",
        null,
        null
    ));


    // **********************************************************
    // Question 4
    // Pedro Porro plays 50 minutes in home games and 30 minutes in away games. If he played [4-9] home games and [4-9] away games this season, how many total minutes did he play? 

    const randomNumber1 = randomInt(4,10)
    const randomNumber2 = randomInt(4,10)
    const first4 = 50 * randomNumber1
    const second4 = 30 * randomNumber2


    const answerQ4 = first4+second4
    questions.push(createGameQuestion(
        {
            en:`Pedro Porro plays 50 minutes in home games and 30 minutes in away games. If he played ${randomNumber1} home games and ${randomNumber2} away games this season, how many total minutes did he play? `,
            es:`Pedro Porro juega 50 minutos en los partidos en casa y 30 minutos en los partidos fuera de casa. Si jugó ${randomNumber1} partidos en casa y ${randomNumber2} partidos fuera de casa esta temporada, ¿cuántos minutos totales jugó?`,
        },
        answerQ4,
        [
            {
                en:`1) Minutes home = minutes per home game * number of home games
               2) Minutes away = minutes per away game * number of away games
               3) Total minutes = minutes home + minutes away 
                `,
                es:`1) Minutos en casa = minutos por partido en casa * número de partidos en casa
                2) Minutos fuera de casa = minutos por partido fuera de casa * número de partidos fuera de casa
                3) Minutos totales = minutos en casa + minutos fuera de casa
                `,

            },
            {
                en:`1) Minutes home = 50 * ${randomNumber1} = ${first4}
                2) Minutes away = 30 * ${randomNumber2} = ${second4}
                3) Total minutes = ${first4} + ${second4} = ${answerQ4} 
                `,
                es:`Minutos en casa = 50 *  ${randomNumber1} = ${first4}
                Minutes fuera de casa = 30 * ${randomNumber2} = ${second4}
                Minutos totales = ${first4} + ${second4} = ${answerQ4} 
                `,
            }
        ],
        "wholeNumber",
        null,
        null
    ));

        // **********************************************************
    // Question 5
    // Alyssa Naeher plays goalie for the US women’s national soccer team. During practice, out of [24,32,40,48] total shots, she blocked [1/2, 1/4, 1/8] of them. How many total shots did she block?

    const randomNum5 = ["1/2", "1/4", "1/8"];
    const randomIndex5 = Math.floor(Math.random() * randomNum5.length);
    const randomFraction5 = randomNum5[randomIndex5];

    const randomNum51 = [24,32,40,48];
    const randomIndex51 = Math.floor(Math.random() * randomNum51.length);
    const randomFraction51 = randomNum51[randomIndex51];


    const fraction5 = convertToFraction(randomFraction5)
    const multipliedResult = multiplyOrDivide(fraction5, randomFraction51, 'multiply')


    const answerQ5 = simplifyFraction(multipliedResult.result)
    questions.push(createGameQuestion(
        {
            en:`Alyssa Naeher plays goalie for the US women’s national soccer team. During practice, out of ${randomFraction51} total shots, she blocked ${randomFraction5} of them. How many total shots did she block?`,
            es:`Alyssa Naeher es la portera del equipo nacional de fútbol femenino de los Estados Unidos. Durante la práctica, de un total de ${randomFraction51} tiros, ella bloqueó ${randomFraction5} de los tiros. ¿Cuántos tiros totales bloqueó?`,
        },
        answerQ5.result,
        [
            {
                en:"Total shots blocked = total shots * fraction blocked",
                es:"Total de tiros bloqueados = total de tiros * fracción bloqueada",

            },
            {
                en:`Total shots blocked = ${randomFraction51} * ${randomFraction5} = ${answerQ5.result}`,
                es:`Total de tiros bloqueados = ${randomFraction51} * ${randomFraction5} = ${answerQ5.result}`,
            }
        ],
        answerQ5.types,
        null,
        null
    ));


            // **********************************************************
    // Question 6
    // Matt Turner juega de portero para el equipo nacional de fútbol masculino de los Estados Unidos. Durante la práctica, de un total de 72 tiros, bloqueó [1/4, 1/6, 1/8] de esos y el resto fueron goles. ¿Cuántos goles totales permitió en esta sesión de práctica?

    const randomNum6 = ["1/4", "1/6", "1/8"];
    const randomIndex6 = Math.floor(Math.random() * randomNum6.length);
    const randomFraction6 = randomNum6[randomIndex6];


    const fraction6 = convertToFraction(randomFraction6)
    const multipliedResult6 = multiplyOrDivide(fraction6, 72 , 'multiply')
    const addedResult6 = addOrSubtract(72,multipliedResult6.result, 'subtract')

    const first6 = simplifyFraction(multipliedResult6.result)

    const answerQ6 = simplifyFraction(addedResult6.result)
    questions.push(createGameQuestion(
        {
            en:`Matt Turner plays goalie for the US men’s national soccer team. At practice, out of 72 total shots, he blocked ${randomFraction6} of them and the rest were goals. How many total goals did he allow in this practice session?`,
            es:`Matt Turner juega de portero para el equipo nacional de fútbol masculino de los Estados Unidos. Durante la práctica, de un total de 72 tiros, bloqueó ${randomFraction6} de esos y el resto fueron goles. ¿Cuántos goles totales permitió en esta sesión de práctica? `,
        },
        answerQ6.result,
        [
            {
                en:`1) Total shots blocked = total shots * fraction saved 
               2) Total goals allowed = total shots - total shots blocked 
                `,
                es:`1) Total de tiros bloqueados = total de tiros * fracción bloqueados
                2) Total de goles permitidos = total de tiros - total de tiros bloqueados
                `,

            },
            {
                en:`Total shots blocked = 72 * ${randomFraction6} = ${first6.result}
                Total goals allowed = 72 – ${first6.result} = ${answerQ6.result}
                `,
                es:`Total de tiros bloqueados = 72 * ${randomFraction6} = ${first6.result}
                Total de goles permitidos = 72 –${first6.result} = ${answerQ6.result}
                `,
            }
        ],
        answerQ6.types,
        null,
        null
    ));

    
    // **********************************************************
    // Question 7
    // A full soccer match lasts 90 minutes and the total time is split in two 45-minute halves. If yesterday’s match started at [8:00 - 8:10] PM and the referee added [2-5] minutes of extra time to the first half, at what time did the first half end?

    const firstmin = randomInt(0,11)
    const randoms = randomInt(2,5)
    const secondmin = firstmin + randoms + 45
    // Add leading zeros if newMinutes is 9 or less
    let formattedTimeMin = secondmin.toString().padStart(2, '0');
    let formattedTimeMin2 = firstmin.toString().padStart(2, '0');
    let answerQ7 =  "8:" + formattedTimeMin + "pm" ;

    questions.push(createGameQuestion(
        {
            en:`A full soccer match lasts 90 minutes and the total time is split in two 45-minute halves. If yesterday’s match started at 8:${formattedTimeMin2} PM and the referee added ${randoms} minutes of extra time to the first half, at what time did the first half end?`,
            es:`Un partido completo de fútbol dura 90 minutos y el tiempo total se divide en dos mitades de 45 minutos. Si el partido de ayer comenzó a las 8:${formattedTimeMin2} PM y el árbitro agregó ${randoms} minutos de tiempo extra a la primera mitad, ¿a qué hora terminó la primera mitad?`,
        },
        answerQ7,
        [
            {
                en:`End time = Start time + half length + extra time added `,
                es:`Hora de finalización = Hora de inicio + duración de la mitad + tiempo extra añadido`,

            },
            {
                en:`End time = 8:${formattedTimeMin2} + 45 + ${randoms} = ${answerQ7}`,
                es:`Hora de finalización = 8:${formattedTimeMin2} + 45 + ${randoms} = ${answerQ7}`,
            }
        ],
        "time",
        null,
        null
    ));

            // **********************************************************
    // Question 8
    // ¡Son Heung-min es una estrella de su equipo de fútbol! Esta temporada, jugó alrededor de 90 minutos por semana. Si gana un total de [6-9] dólares por minuto, ¿cuál es su salario semanal?

    const randomNum8 = randomInt(6,10)
    const answerQ8 = randomNum8*90

    questions.push(createGameQuestion(
        {
            en:`Son Heung-min is a star player for his soccer team! This season, he played about 90 minutes per week. If he earns a total of ${randomNum8} dollars per minute, what is his weekly salary?`,
            es:`¡Son Heung-min es una estrella de su equipo de fútbol! Esta temporada, jugó alrededor de 90 minutos por semana. Si gana un total de ${randomNum8} dólares por minuto, ¿cuál es su salario semanal?`,
        },
        answerQ8,
        [
            {
                en:"Weekly salary = dollars per minute * number of minutes played ",
                es:"Salario semanal = dólares por minuto * número de minutos jugados",

            },
            {
                en:`Weekly salary = ${randomNum8} * 90 = ${answerQ8}`,
                es:`Salario semanal = ${randomNum8} * 90 = ${answerQ8}`,
            }
        ],
        "wholeNumber",
        null,
        null
    ));

                // **********************************************************
    // Question 9
    // Alex Morgan earns about $8 per minute. Last month she played [3-5] home games and [2-4] away games. If she played 10 minutes in every home game and 8 minutes in every away game, how much money did she make last month?

    const randomNum9 = randomInt(3,6)
    const randomNum91 = randomInt(2,5)
    
    const first9 = randomNum9 *10 
    const first99 = randomNum91 *8
    const second9 = first9+ first99

    const answerQ9 = second9 * 8

    questions.push(createGameQuestion(
        {
            en:`Alex Morgan earns about $8 per minute. Last month she played ${randomNum9} home games and ${randomNum91} away games. If she played 10 minutes in every home game and 8 minutes in every away game, how much money did she make last month?`,
            es:`Alex Morgan gana alrededor de $8 por minuto. El mes pasado jugó ${randomNum9} partidos en casa y ${randomNum91} partidos fuera de casa. Si jugó 10 minutos en cada partido en casa y 8 minutos en cada partido fuera de casa, ¿cuánto dinero ganó el mes pasado?`,
        },
        answerQ9,
        [
            {
                en:`1) Total home minutes = minutes per game * number of home games 
                2) Total away minutes = minutes per game * number of away games
                3) Total minutes = Total home minutes + total away minutes 
                4) Total money = total minutes * dollars per minute 
                `,
                es:`1) Minutos totales en casa = minutos por partido * número de partidos en casa
                2) Minutos totales fuera de casa = minutos por partido * número de partidos fuera de casa
                3) Minutos totales = minutos totales en casa + minutos totales fuera de casa
                4) Dinero total = minutos totales * dólares por minuto
                `,

            },
            {
                en:`1) Total home minutes = 10 * ${randomNum9} = ${first9}
                2) Total away minutes = 8 * ${randomNum91} = ${first99}
                3) Total minutes = ${first9} + ${first99} = ${second9}
                4) Total money = ${second9} * 8 = ${answerQ9}
                `,
                es:`1) Minutos totales en casa = 10 * ${randomNum9} = ${first9}
               2) Minutos totales fuera de casa = 8 * ${randomNum91} = ${first99}
                3) Minutos totales  = ${first9} + ${first99} = ${second9}
                4) Dinero total = ${second9} * 8 = ${answerQ9}
                `,
            }
        ],
        "wholeNumber",
        null,
        null
    ));



    // **********************************************************
    // Question 10
    // You and 3 other friends bought tickets to a Real Madrid soccer match. If each ticket was [120-180] dollars, how much money did all tickets cost?

    const randomNum10 = randomInt(120,181)

    const answerQ10 =  randomNum10 * 4

    questions.push(createGameQuestion(
        {
            en:`You and 3 other friends bought tickets to a Real Madrid soccer match. If each ticket was ${randomNum10} dollars, how much money did all tickets cost?`,
            es:`Tú y otros 3 amigos compraron boletos para un partido de fútbol del Real Madrid. Si cada boleto costó ${randomNum10} dólares, ¿cuánto dinero costaron todos los boletos?`,
        },
        answerQ10,
        [
            {
                en:`1)Total tickets = friends + you
                2) Total cost = ticket price + ticket price + ticket price + ticket price
                `,
                es:`1)Boletos totales = amigos + tú
                2) Costo total = precio del boleto + precio del boleto + precio del boleto + precio del boleto
                `,

            },
            {
                en:`1) Total tickets = 3 + 1 = 4
                2) Total cost =  ${randomNum10} + ${randomNum10} +  ${randomNum10} +  ${randomNum10} = ${answerQ10}
                `,
                es:`1)Boletos totales = 3 + 1 = 4
                2) Costo total = ${randomNum10} + ${randomNum10} +  ${randomNum10} +  ${randomNum10} = ${answerQ10}
                `,
            }
        ],
        "wholeNumber",
        null,
        null
    ));

        // **********************************************************
    // Question 11
    // Alexia Putellas is the best woman soccer player in the world and typically plays [60,70,80] minutes in each match. If she plays [2-3] matches every week, how many total minutes does she play in a month? Hint: there are 4 weeks in 1 month.

    const randomNum11 = randomInt(2,4)
    const randomNum111 = [60,70,80];
    const randomIndex111 = Math.floor(Math.random() * randomNum111.length);
    const randomFraction111 = randomNum111[randomIndex111];

    const answerQ11 =  randomNum11 * randomFraction111 * 4 

    questions.push(createGameQuestion(
        {
            en:`Alexia Putellas is the best woman soccer player in the world and typically plays ${randomFraction111} minutes in each match. If she plays ${randomNum11} matches every week, how many total minutes does she play in a month? Hint: there are 4 weeks in 1 month.`,
            es:`Alexia Putellas es la mejor futbolista del mundo y normalmente juega ${randomFraction111} minutos en cada partido. Si ella juega ${randomNum11} partidos cada semana, ¿cuántos minutos totales juega en un mes? Pista: hay 4 semanas en 1 mes.`,
        },
        answerQ11,
        [
            {
                en:`Total minutes = minutes per game * games per week * weeks in a month`,
                es:`Minutos totales = minutos por juego * juegos por semana * semanas en un mes`,

            },
            {
                en:`Total minutes = ${randomFraction111} * ${randomNum11} * 4 = ${answerQ11}`,
                es:`Minutos totales =${randomFraction111} * ${randomNum11} * 4 = ${answerQ11}`,
            }
        ],
        "wholeNumber",
        null,
        null
    ));


            // **********************************************************
    // Question 12
    //Tu equipo de fútbol ganó 3/4 de todos los partidos la temporada pasada. Si tu equipo jugó un total de [40,60,80] partidos, ¿cuántos partidos ganó el equipo la temporada pasada? 


    const randomNum12 = [40,60,80];
    const randomIndex12 = Math.floor(Math.random() * randomNum12.length);
    const randomFraction12 = randomNum12[randomIndex12];
    
    const value = '3/4'
    const convert = convertToFraction(value)
    const multipliedResult12 = multiplyOrDivide(convert, randomFraction12, 'multiply')

    const answerQ12 =  simplifyFraction(multipliedResult12.result)

    questions.push(createGameQuestion(
        {
            en:`Your soccer team won 3/4 of all games last season. If your team played a total of ${randomFraction12} games, how many games did the team win last season?`,
            es:`Tu equipo de fútbol ganó 3/4 de todos los partidos la temporada pasada. Si tu equipo jugó un total de ${randomFraction12} partidos, ¿cuántos partidos ganó el equipo la temporada pasada? `,
        },
        answerQ12.result,
        [
            {
                en:`Total games won = total games played * fraction of games won`,
                es:`Total de juegos ganados = total de juegos jugados * fracción de juegos ganados`,

            },
            {
                en:`Total games won = ${randomFraction12} * ¾ = ${answerQ12.result}`,
                es:`Total de juegos ganados = ${randomFraction12} * ¾ =  ${answerQ12.result}`,
            }
        ],
        answerQ12.types,
        null,
        null
    ));








}

export default SoccorL1Questions;