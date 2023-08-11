import DevLog from "@utils/debug/devLog";
import { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion"
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
const BasketballL3Questions = (questions,randomGenerator) => {
    const { randomInt } = randomGenerator;
    
    // **********************************************************
    // Question 1
    // In the NBA players can score a 3-point shot, a 2-point shot, or a free throw worth 1 point.  If the Los Angeles Lakers had [10-16] 3-pointers, [24-34] 2-pointers, and [16-21] free throws made in their last game, how many points did they score in total?

    const randomNum = randomInt(10,17)
    const randomNum1 = randomInt(24,35)
    const randomNum11 = randomInt(16,22)
   
    const answerQ1 = randomNum*3 + randomNum1*2 + randomNum11*1
    questions.push(createGameQuestion(
        {
            en:`In the NBA players can score a 3-point shot, a 2-point shot, or a free throw worth 1 point.  If the Los Angeles Lakers had ${randomNum} 3-pointers, ${randomNum1} 2-pointers, and ${randomNum11} free throws made in their last game, how many points did they score in total? `,
            es:`En la NBA, los jugadores pueden anotar un tiro de 3 puntos, un tiro de 2 puntos o un tiro libre que vale 1 punto. Si Los Angeles Lakers tuvo ${randomNum} tiros de 3 puntos, ${randomNum1} tiros de 2 puntos y ${randomNum11} tiros libres anotados en su último partido, ¿cuántos puntos anotaron en total?`,
        },
        answerQ1,
        [
            {
                en:"Total points = (# of 3 point shots * 3) + (# of 2 point shots * 2) + (# of free throws * 1)",
                es:"Puntos totales = (# de tiros de 3 puntos * 3) + (# de tiros de 2 puntos * 2) + (# de tiros libres * 1)",

            },
            {
                en:`Total points = ( ${randomNum} * 3) + ( ${randomNum1} * 2) + ( ${randomNum11} * 1) = ${answerQ1}`,
                es:`Puntos totales = ( ${randomNum} * 3) + ( ${randomNum1} * 2) + ( ${randomNum11} * 1) = ${answerQ1}`,
            }
        ],
        "wholeNumber",
        null,
        null
    ));

        // **********************************************************
    // Question 2
    // La tabla a continuación muestra los salarios por partido de 4 jugadores de la NBA durante la temporada 2022-2023. ¿Cuánto más dinero por partido gana Steph Curry que [Lebron James, Jimmy Butler, Lamelo Ball]?
    const player = ["Lebron James", "Jimmy Butler", "LaMelo Ball"];
    const randomColorIndex = Math.floor(Math.random() * player.length);
    const randomColor = player[randomColorIndex];
   
    let number ;
    if (randomColor === "Lebron James") {
        number = 542377;
      } else if (randomColor === "Jimmy Butler") {
        number = 459186;
      }else if (randomColor === "LaMelo Ball"){
          number = 105169;
      }

   
    const answerQ2 = 586220 - number
    questions.push(createGameQuestion(
        {
            en:`The table below shows the salaries per game for 4 NBA players during the 2022-2023 season. How much more money per game does Steph Curry make than ${randomColor}?`,
            es:`La tabla a continuación muestra los salarios por partido de 4 jugadores de la NBA durante la temporada 2022-2023. ¿Cuánto más dinero por partido gana Steph Curry que ${randomColor}?`,
        },
        answerQ2,
        [
            {
                en:"Salary difference = Steph Curry salary – Second player salary ",
                es:"Diferencia salarial = salario de Steph Curry – salario del segundo jugador",

            },
            {
                en:`Salary difference = 586220 – ${number} = ${answerQ2} `,
                es:`Diferencia salarial = 586220 – ${number} = ${answerQ2} `,
            }
        ],
        "wholeNumber",
        null,
        "BasketLevel3_1"
    ));


        // **********************************************************
    // Question 3
    // The table below shows the salaries per game for 4 WNBA players during the 2023 season. If Diana Taurasi plays all 40 games of the season, how many games will it take [Alyssa Thomas, A’ja Wilson, Breanna Stewart] to earn the same amount of money as Diana? Round your answer to the nearest whole number.
    const player3 = ["Alyssa Thomas", "A'ja Wilson", "Breanna Stewart"];
    const randomColorIndex3 = Math.floor(Math.random() * player3.length);
    const randomColor3 = player3[randomColorIndex3];
   
    let number3 ;
    if (randomColor3 === "Alyssa Thomas") {
        number3 = 5225;
      } else if (randomColor3 === "A'ja Wilson") {
        number3 = 5054;
      }else if (randomColor3 === "Breanna Stewart"){
          number3 = 4500;
      }

    const first3 = 23490 / number3
    const answerQ3 = Math.ceil(23490 / number3)
    questions.push(createGameQuestion(
        {
            en:`The table below shows the salaries per game for 4 WNBA players during the 2023 season. If Diana Taurasi plays all 40 games of the season, how many games will it take ${randomColor3} to earn the same amount of money as Diana? Round your answer to the nearest whole number.`,
            es:`La tabla a continuación muestra los salarios por partido de 4 jugadoras de la WNBA durante la temporada 2023. Si Diana Taurasi juega los 40 partidos de una temporada, ¿cuántos partidos necesitarán ${randomColor3} para ganar la misma cantidad de dinero que Diana? Redondea tu respuesta al número entero más cercano.`,
        },
        answerQ3,
        [
            {
                en:`1) Diana Taurasi money = salary per game * games played
               2)  Games required = Diana Taurasi money / second player salary per game 
                `,
                es:`1) Diana Taurasi dinero = salario por partido * partidos jugados
                2) Partidos requeridos = Diana Taurasi dinero / salario del segundo jugador por partido
                `,

            },
            {
                en:`1) Diana Taurasi money = 5873 * 40 = 234920 
                2) Games required = 234920 / ${randomColor3} = ${first3} = rounded up ${answerQ3}
                 `,
                es:`1) Diana Taurasi dinero = 5873 * 40 = 234920
                2) Partidos requeridos = 234920 / ${randomColor3}= ${first3} = redondeado para arriba ${answerQ3}
                `,
            }
        ],
        "wholeNumber",
        null,
        "BasketLevel3_2"
    ));

        // **********************************************************
    // Question 4
    // Joel Embiid anotó [2000-2200] puntos en 82 partidos para los Philadelphia 76ers y ganó el premio al Jugador Más Valioso (MVP). ¿Cuántos puntos anotaría Embiid si jugara [100-200] partidos? Redondea tu respuesta al milésimo más cercano. 

    const randomNum4 = randomInt(2000,2201)
    const randomNum41 = randomInt(100,201)
    const first4 = randomNum4/82
    const first41 = Math.round(first4 * 1000)/1000
    const second4 = first41 * randomNum41

    const answerQ4 = Math.round(second4 *1000)/1000
    questions.push(createGameQuestion(
        {
            en:`Joel Embiid scored ${randomNum4} points in 82 games for the Philadelphia 76ers and won the MVP. How many points would Embiid score if he played ${randomNum41} games? Round your answer to the nearest thousandth.`,
            es:`Joel Embiid anotó ${randomNum4} puntos en 82 partidos para los Philadelphia 76ers y ganó el premio al Jugador Más Valioso (MVP). ¿Cuántos puntos anotaría Embiid si jugara ${randomNum41} partidos? Redondea tu respuesta al milésimo más cercano. `,
        },
        answerQ4,
        [
            {
                en:`Points per game = total points scored / games played 
                Expected points = points per game * new amount of games played
                `,
                es:`1) Puntos por partido = total de puntos anotados / partidos jugados 
                2) Puntos esperados = puntos por juego * nueva cantidad de juegos jugados
                `,

            },
            {
                en:`Points per game = ${randomNum4} / 82 = ${first41}
                Expected points = ${first41} * ${randomNum41} = ${answerQ4} (rounded to 3 decimals)
                `,
                es:`1) Puntos por partido = ${randomNum4} / 82 = ${first41}
                2) Puntos esperados = ${first41} * ${randomNum41} = ${answerQ4} (redondeada a 3 decimales)
                `,
            }
        ],
        "decimal",
        null,
        null
    ));

            // **********************************************************
    // Question 5
    // The table below shows the salaries per game for 4 NBA players during the 2023-2024 season. If Kevin Durant and [Trae Young, Kyrie Irving, Victor Wembanyama] both play [25-50] games, how much more will Kevin make?

    const randomNum5 = randomInt(25,51)
    const first5 = 581090 * randomNum5
    const player5 = ["Trae Young", "Kyrie Irving", "Victor Wembanyama"];
    const randomColorIndex5 = Math.floor(Math.random() * player5.length);
    const randomColor5 = player5[randomColorIndex5];
   
    let number5 ;
    if (randomColor5 === "Trae Young") {
        number5 = 488588;
      } else if (randomColor5 === "Kyrie Irving") {
        number5 = 451671;
      }else if (randomColor5 === "Victor Wembanyama"){
          number5 = 148300;
      }


    const second5 = number5 * randomNum5

    const answerQ5 = first5 - second5
    questions.push(createGameQuestion(
        {
            en:`The table below shows the salaries per game for 4 NBA players during the 2023-2024 season. If Kevin Durant and ${randomColor5} both play ${randomNum5} games, how much more will Kevin make?`,
            es:` La tabla a continuación muestra los salarios por partido de 4 jugadores de la NBA durante la temporada 2023-2024. Si Kevin Durant y ${randomColor5} juegan ${randomNum5} partidos cada uno, ¿cuánto más ganará Kevin?  `,
        },
        answerQ5,
        [
            {
                en:`1) Kevin Durant salary = salary per game * number of games
                2) Second player salary = salary per game * number of games
                3) Salary Difference = Kevin Durant salary – Second player salary`,
                es:`1) Salario de Kevin Durant = salario por partido * número de partidos
                2) Salario del segundo jugador = salario por partido * número de partidos
                3) Diferencia salarial = salario de Kevin Durant – salario del segundo jugador
                `,

            },
            {
                en:`1) Kevin Durant salary = 581090 * ${randomNum5} = ${first5}
                2) Second player salary = ${randomColor5} * ${randomNum5} = ${second5}
                3) Salary Difference = ${first5} – ${second5} = ${answerQ5}
                `,
                es:`Salario de Kevin Durant =  581090 * ${randomNum5} = ${first5}
                Salario del segundo jugador = ${randomColor5} * ${randomNum5} = ${second5}
                Diferencia salarial = ${first5} – ${second5} = ${answerQ5}`,
            }
        ],
        "wholeNumber",
        null,
        "BasketLevel3_5"
    ));

            // **********************************************************
    // Question 6
    // En los últimos playoffs de la NBA, los campeones de la NBA Denver Nuggets ganaron 16 de los 20 partidos que jugaron. Durante la temporada regular ganaron 53 de los 82 partidos. ¿Qué fracción de sus partidos totales ganaron los campeones de la NBA? Simplifica tu respuesta.


    const answerQ6 = "23/34"
    questions.push(createGameQuestion(
        {
            en:`In the last NBA Playoffs, the NBA Champions Denver Nuggets won 16 out of the 20 games they played. During the regular season they won 53 out of 82 games. What fraction of their total games did the NBA Champions win? Simplify your answer.  `,
            es:`En los últimos playoffs de la NBA, los campeones de la NBA Denver Nuggets ganaron 16 de los 20 partidos que jugaron. Durante la temporada regular ganaron 53 de los 82 partidos. ¿Qué fracción de sus partidos totales ganaron los campeones de la NBA? Simplifica tu respuesta. `,
        },
        answerQ6,
        [
            {
                en:`Fraction of games won = games won / total games `,
                es:`Fracción de partidos ganados = partidos ganados / total de partidos`,

            },
            {
                en:`Fraction of games won = (16 + 53) / (20 + 82) = 69/102 → 23/34 (simplified)`,
                es:`Fracción de partidos ganados = (16 + 53) / (20 + 82) = 69/102 → 23/34 (simplificado)`,
            }
        ],
        "fraction",
        null,
        null
    ));

            // **********************************************************
    // Question 7
    // Jayson Tatum was the leading scorer for the Boston Celtics in the last NBA Playoffs. If he scored 543 points in 20 games, then how many points would you expect him to score in [22-40] games? Round your answer to the nearest tenth.

    const randomNum7 = randomInt(2000,2201)

    const first7 = 543/20
    const first71 = randomNum7 *  first7
    

    const answerQ7 =  Math.round(first71 * 10)/10
    questions.push(createGameQuestion(
        {
            en:`Jayson Tatum was the leading scorer for the Boston Celtics in the last NBA Playoffs. If he scored 543 points in 20 games, then how many points would you expect him to score in ${randomNum7} games? Round your answer to the nearest tenth.`,
            es:`Jayson Tatum fue el máximo anotador de los Boston Celtics en los últimos playoffs de la NBA. Si anotó 543 puntos en 20 partidos, ¿cuántos puntos esperarías que anotara en ${randomNum7} partidos? Redondea tu respuesta al décimo más cercano`,
        },
        answerQ7,
        [
            {
                en:`1) Points per game = total points scored / games played 
                2) Points expected = points per game * # of expected games
                `,
                es:`1) Puntos por partido = puntos totales anotados / partidos jugados
                2) Puntos esperados = puntos por partido * # de partidos esperados
                `,

            },
            {
                en:`1) Points per game = 543 / 20 = 27.15
                2) Points expected = 27.15 * ${randomNum7} = ${answerQ7} (rounded to nearest tenth)
                `,
                es:`1) Puntos por partido = 543 / 20 = 27.15
               2)  Puntos esperados = 27.15 * ${randomNum7} = ${answerQ7} (Redondeada a la décima más cercana)
                `,
            }
        ],
        "decimal",
        null,
        null
    ));

                // **********************************************************
    // Question 8
    // Las canchas de baloncesto de la NBA están hechas de madera dura de arce. Si cada cancha es un prisma rectangular que mide 94 pies de largo, 50 pies de ancho y 0.5 pies de grosor, ¿cuál es el volumen de la cancha de baloncesto en pies cúbicos? Pista: para encontrar el volumen, multiplica el grosor del prisma rectangular por el área de su base

    const answerQ8 = 2350
    questions.push(createGameQuestion(
        {
            en:` NBA basketball courts are made from maple hardwood. If each court is a rectangular prism that is 94 feet long, 50 feet wide, and 0.5 feet thick, then what is the volume of the basketball court in cubic feet? Hint: To find the volume, multiply the thickness of the rectangular prism by the area of its base.`,
            es:`Las canchas de baloncesto de la NBA están hechas de madera dura de arce. Si cada cancha es un prisma rectangular que mide 94 pies de largo, 50 pies de ancho y 0.5 pies de grosor, ¿cuál es el volumen de la cancha de baloncesto en pies cúbicos? Pista: para encontrar el volumen, multiplica el grosor del prisma rectangular por el área de su base`,
        },
        answerQ8,
        [
            {
                en:`Volume = thickness * length * width `,
                es:`Volumen = grosor * longitud * anchura`,

            },
            {
                en:`Volume = 0.5 * 94 * 50 = 2350 cubic feet`,
                es:`Volumen = 0.5 * 94 * 50 = 2350 pies cubicos`,
            }
        ],
        "wholeNumber",
        null,
        null
    ));

    // **********************************************************
    // Question 9
    // The table below shows the salaries per game for 4 NBA players during the 2023-2024 season. If Kevin Durant and [Trae Young, Kyrie Irving, Victor Wembanyama] both play [25-50] games, how much more will Kevin make?

    const player9 = ["California", "Texas", "Florida", "Illinois", "Michigan", "Colorado"];
    const randomColorIndex9 = Math.floor(Math.random() * player9.length);
    const randomColor9 = player9[randomColorIndex9];
   
    let number9 ;
    let text9 ;
    if (randomColor9 === "California") {
        text9 = "(11 + 4)"
        number9 = 15;
      } else if (randomColor9 ===  "Texas") {
          text9 = "(2 + 1)"
        number9 = 3;
      }else if (randomColor9 === "Florida"){
          text9 = "3"
          number9 = 3;
      } else if (randomColor9 ===  "Illinois") {
            text9 = "6"
            number9 = 6;
      }else if (randomColor9 === "Michigan"){
         text9 = "3"
          number9 = 3;
      }else if (randomColor9 === "Colorado"){
            text9 = "1"
            number9 = 1;
    }
    const first9 = convertToFraction(number9+"/44")

    const answerQ9 = simplifyFraction(first9)
    questions.push(createGameQuestion(
        {
            en:`The following table shows each NBA Champion since 1980 and how many times each team won the championship. What fraction of the champion teams are from ${randomColor9}? Type your answer as a fraction.   `,
            es:`La siguiente tabla muestra cada campeón de la NBA desde 1980 y cuántas veces ganó el campeonato cada equipo. ¿Qué fracción de los equipos campeones son de ${randomColor9}? Escriba su respuesta como una fracción. 
            `,
        },
        answerQ9.result,
        [
            {
                en:` Add all the championships from the required state and divide them by the number of all championships. `,
                es:`Sume todos los campeonatos del estado requerido y divídalos por el número de todos los campeonatos.`,

            },
            {
                en:`Championship Fraction = ${text9} / 44 = ${answerQ9.result}`,
                es:`Fracción de campeonatos = ${text9} / 44 = ${answerQ9.result}`,
            }
        ],
        answerQ9.types,
        null,
        "BasketLevel3_9"
    ));

      // Question 10
    // The following graph shows the height in inches of multiple NBA Most Valuable Players (MVP) and the year in which they won the award. Which player does the point [ (1960,85) or (1970,82) or (1980,86) or (1990,81) or (2000,85) or (2010,80) or (2020,83) ] represent? Type the first name of the correct player in the answer box. 

    const player10 = ["(1960,85)", "(1970,82)", "(1980,86)", "(1990,81)", "(2000,85)", "(2010,80)", "(2020,83)"];
    const randomColorIndex10 = Math.floor(Math.random() * player10.length);
    const randomColor10 = player10[randomColorIndex10];
   

    let text10 ;
    if (randomColor10 === "(1960,85)") {
        text10 = "wilt"
      } else if (randomColor10 ===  "(1970,82)") {
          text10 = "willis"
      }else if (randomColor10 === "(1980,86)"){
          text10 = "kareem"
      } else if (randomColor10 ===  "(1990,81)") {
            text10 = "magic"
      }else if (randomColor10 === "(2000,85)"){
         text10 = "shaquille"
      }else if (randomColor10 === "(2010,80)"){
            text10 = "lebron"
    }else if (randomColor10 === "(2020,83)"){
      text10 = "giannis"
}


    const answerQ10 = text10
    questions.push(createGameQuestion(
        {
            en:`The following graph shows the height in inches of multiple NBA Most Valuable Players (MVP) and the year in which they won the award. Which player does the point ${randomColor10} represent? Type the first name of the correct player in the answer box. `,
            es:`Este gráfico muestra la altura en pulgadas de varios Jugadores Más Valiosos (MVP) de la NBA y el año en que ganaron el premio. ¿Qué jugador representa el punto ${randomColor10}? Escriba el primer nombre del jugador correcto en el cuadro de respuesta. `,
        },
        answerQ10,
        [
            {
                en:`Match the x and y coordinates of the given point to the corresponding point on the graph to identify the correct player.`,
                es:`Empareje las coordenadas x e y del punto dado con el punto correspondiente en el gráfico para identificar al jugador correcto.`,

            },
            {
                en:`Player first name corresponding to the point chosen by the game. ${randomColor10} - ${text10}`,
                es:`Primer nombre del jugador correspondiente al punto elegido por el juego.${randomColor10} - ${text10}`,
            }
        ],
        "text",
        null,
        "BasketLevel3_10"
    ));

    // Question 11
    // This graph shows the height in inches of multiple NBA Most Valuable Players (MVP) and the year in which they won the award. Who is the [shortest, tallest] player in this graph of MVPs? Type the first name of the correct player in the answer box. 

    const player11 = ["shortest", "tallest"];
    const randomColorIndex11 = Math.floor(Math.random() * player11.length);
    const randomColor11 = player11[randomColorIndex11];
   

    let text11 ;
    let randomColor111;
    if (randomColor11 === "shortest") {
        text11 = "lebron"
        randomColor111 = "más bajo"
      } else if (randomColor11 ===  "tallest") {
          text11 = "kareem"
          randomColor111 = "más alto"
      }



    const answerQ11 = text11
    questions.push(createGameQuestion(
        {
            en:`This graph shows the height in inches of multiple NBA Most Valuable Players (MVP) and the year in which they won the award. Who is the ${randomColor11} player in this graph of MVPs? Type the first name of the correct player in the answer box. `,
            es:`Este gráfico muestra la altura en pulgadas de varios Jugadores Más Valiosos (MVP) de la NBA y el año en que ganaron el premio. ¿Quién es el jugador ${randomColor111} en este gráfico de MVP? Escriba el primer nombre del jugador correcto en el cuadro de respuesta.`,
        },
        answerQ11,
        [
            {
                en:`IF shortest: identify the point with the smallest y-coordinate (height)
                IF tallest: identify the point with the largest y-coordinate (height)`,
                es:`SI más bajo: identifique el punto con la coordenada y más pequeña (altura)
                SI más alto: identifique el punto con la coordenada y más grande (altura)`,

            },
            {
                en:` ${randomColor11} - ${text11}`,
                es:` ${randomColor11} - ${text11}`,
            }
        ],
        "text",
        null,
        "BasketLevel3_10"
    ));

    // Question 12
    // This graph shows the height in inches of multiple NBA Most Valuable Players (MVP) and the year they won the award. The first pick in the 2023 NBA Draft was Victor Wembanyama who is 7 ft. 4 in. or 88 inches tall. If Wembanyama wins the MVP award in 2030, what would be the x and y coordinates to represent him on the graph? Type your answer in point format (x,y) 

    const answerQ12 = "(2030,88)"
    questions.push(createGameQuestion(
        {
            en:`This graph shows the height in inches of multiple NBA Most Valuable Players (MVP) and the year they won the award. The first pick in the 2023 NBA Draft was Victor Wembanyama who is 7 ft. 4 in. or 88 inches tall. If Wembanyama wins the MVP award in 2030, what would be the x and y coordinates to represent him on the graph? Type your answer in point format (x,y)`,
            es:`Este gráfico muestra la altura en pulgadas de varios Jugadores Más Valiosos (MVP) de la NBA y el año en que ganaron el premio. La primera selección en el Draft de la NBA de 2023 fue Victor Wembanyama, que mide 7 pies y 4 pulgadas o 88 pulgadas de altura. Si Wembanyama gana el premio MVP en 2030, ¿cuáles serían las coordenadas x e y para representarlo en el gráfico? Escriba su respuesta en formato de punto (x,y).`,
        },
        answerQ12,
        [
            {
                en:`1) Hint: if x coordinate is 2023 and y coordinate is 80 your answer would be (2023,80)
                2) The x coordinate represents the year and the y coordinate represents the player’s height. Type the given year and Victor’s height in point format. 
                `,
                es:`1) Pista: si la coordenada x es 2023 y la coordenada y es 80, tu respuesta sería (2023,80)
                2) La coordenada x representa el año y la coordenada y representa la altura del jugador. Escriba el año dado y la altura de Víctor en formato de puntos.
                `,

            },
            {
                en:`Year = 2030; Height = 88 → Answer = ${answerQ12}`,
                es:`Año = 2030; Altura = 88 → Respuesta =  ${answerQ12}`,
            }
        ],
        "text",
        null,
        "BasketLevel3_10"
    ));
}

export default BasketballL3Questions