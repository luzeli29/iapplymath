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
    const randomColor3 = player3[randomColorIndex];
   
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
}

export default BasketballL3Questions