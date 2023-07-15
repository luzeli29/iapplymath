import createGameQuestion from '@utils/game/quiz/questionGeneration/createGameQuestion'
import translations from '@public/text/translations';
import DevLog from '@utils/debug/devLog';


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

function compareNumbers(fractionOrInteger, fractionOrInteger2) {
  let value1, value2;

  if (typeof fractionOrInteger === 'object') {
    const numerator1 = fractionOrInteger.numerator;
    const denominator1 = fractionOrInteger.denominator;
    value1 = numerator1 / denominator1;
  } else {
    value1 = fractionOrInteger;
  }

  if (typeof fractionOrInteger2 === 'object') {
    const numerator2 = fractionOrInteger2.numerator;
    const denominator2 = fractionOrInteger2.denominator;
    value2 = numerator2 / denominator2;
  } else {
    value2 = fractionOrInteger2;
  }

  if (value1 > value2) {
    return "greater_than";
  } else if (value1 < value2) {
    return "less_than";
  } else {
    return "equal_to";
  }
}

function generateLevel1AuntQuestions(recipe, randomInt){
  let generatedQuestions = [];

    //question 1 vanilla milkshake
    if (recipe.name.en == "Vanilla milkshake") {
      let randomNum = randomInt(2,10)
      let first_ingredient_key = Object.keys(recipe.ingredients)[0];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let answer = randomNum* first_ingredient_key_amount
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria will make Vanilla Milkshakes for you and ${randomNum} of your friends. Each milkshake requires 2 cups of ice cream. How many cups of ice cream does Auntie Maria need in total?`,
              es:  `La Tía María hará Batidos de Vainilla para ti y ${randomNum} de tus amigos. Cada batido requiere 2 tazas de helado. ¿Cuántas tazas de helado necesita la Tía María en total?`,
          
          },
          answer,
          [{
            en: `Total cups of ice cream = (total milkshakes) * ice cream cups per milkshake `,
            es: `Tazas totales de helado = (total de batidos) * tazas de helado por batido`,
          },
            {
            en:  `Total cups of ice cream = (${randomNum}) * ${first_ingredient_key_amount} = ${answer}`,
            es:  `Tazas totales de helado = (${randomNum}) * ${first_ingredient_key_amount} = ${answer}`,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 2 vanilla milkshake
    if (recipe.name.en == "Vanilla milkshake") {
      let randomNum = randomInt(2,10)
      let first_ingredient_key = Object.keys(recipe.ingredients)[2];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let answer =  first_ingredient_key_amount * 3
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria wants to triple the recipe to make Vanilla Milkshakes for a party. How many teaspoons of vanilla extract does she need for the tripled recipe?`,
              es:  `La Tía María quiere triplicar la receta para hacer Batidos de Vainilla para una fiesta. ¿Cuántas cucharaditas de extracto de vainilla necesita para la receta triplicada?`,
          
          },
          answer,
          [{
            en: `t = initial teaspoons of vanilla extract
            Teaspoons vanilla extract = t * 3 OR ( t + t + t )
             `,
            es: `t = cucharaditas iniciales de extracto de vainilla
            Cucharaditas de extracto de vainilla = t * 3 O ( t + t + t )
            `,
          },
            {
            en:  `Teaspoons vanilla extract = (${first_ingredient_key_amount}*3) OR (${first_ingredient_key_amount}+${first_ingredient_key_amount}+${first_ingredient_key_amount}) = ${answer} teaspoons`,
            es:  `Cucharaditas de extracto de vainilla = (${first_ingredient_key_amount}*3) O (${first_ingredient_key_amount}+${first_ingredient_key_amount}+${first_ingredient_key_amount}) =  ${answer} cucharaditas`,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 3 vanilla milkshake
    if (recipe.name.en == "Vanilla milkshake") {
      let randomNum = randomInt(2,11)
      let first_ingredient_key = Object.keys(recipe.ingredients)[0];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let answer = randomNum* first_ingredient_key_amount
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `You and Auntie Maria decided to make Vanilla Milkshakes for a school event. If you need to prepare ${randomNum} servings using this recipe, how many cups of vanilla ice cream do you need to use?`,
              es:  `La Tía María y tú decidieron hacer Batidos de Vainilla para un evento escolar. Si necesitas preparar ${randomNum} porciones utilizando esta receta, ¿cuántas tazas de helado de vainilla necesitas usar?`,
          
          },
          answer,
          [{
            en: `Total cups of ice cream = number of servings * cups of ice cream per serving `,
            es: `Tazas totales de helado = número de porciones * tazas de helado por porción`,
          },
            {
            en:  `Total cups of ice cream = ${randomNum} servings * ${first_ingredient_key_amount} cups of ice cream per serving = ${answer} `,
            es:  `Tazas totales de helado = ${randomNum} porciones * ${first_ingredient_key_amount} tazas de helado por porción = ${answer}

            `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 4 vanilla milkshake
    if (recipe.name.en == "Vanilla milkshake") {
      const fractions = [2,4,6,8,10];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let first_ingredient_key = Object.keys(recipe.ingredients)[0];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let answer = randomFraction/ first_ingredient_key_amount
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria wants to make Vanilla Milkshakes using ${randomFraction} cups of ice cream. If each serving requires 2 cups of ice cream, how many servings can she make? `,
              es:  `La Tía María quiere hacer Batidos de Vainilla usando ${randomFraction} tazas de helado. Si cada porción requiere 2 tazas de helado, ¿cuántas porciones puede hacer?`,
          
          },
          answer,
          [{
            en: `Servings = available cups of ice cream / cups required per serving `,
            es: `Porciones = tazas de helado disponibles / tazas requeridas por porción`,
          },
            {
            en:  `Servings = ${randomFraction} / ${first_ingredient_key_amount} = ${answer}`,
            es:  `Porciones = ${randomFraction} / ${first_ingredient_key_amount} = ${answer}`,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 5 vanilla milkshake
    if (recipe.name.en == "Vanilla milkshake") {
      const fractions = [5,10];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let answer = randomFraction/5
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria made ${randomFraction} cups of Vanilla Milkshake and wants to pour an equal amount into 5 glasses. How many cups of milkshake will be poured into each glass?               `,
              es:  `La Tía María preparó ${randomFraction} tazas de Batido de Vainilla y quiere servir una cantidad igual en 5 vasos. ¿Cuántas tazas de batido se servirán en cada vaso?`,
          
          },
          answer,
          [{
            en: `Cups per glass = quantity available / number of glasses`,
            es: `Tazas por vaso = cantidad disponible / número de vasos`,
          },
            {
            en:  `Cups per glass = ${randomFraction} / 5 = ${answer}`,
            es:  `Tazas por vaso = ${randomFraction} / 5 = ${answer}`,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 6 vanilla milkshake
    if (recipe.name.en == "Vanilla milkshake") {
      let randomNum = randomInt(7,11)
      let serving_size = recipe.servingSize
      let first_ingredient_key = Object.keys(recipe.ingredients)[0];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let answer = randomNum * first_ingredient_key_amount
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `You and Auntie Maria are making an extra-large batch of Vanilla Milkshakes for a school event. If ${serving_size} serving requires ${first_ingredient_key_amount} cups of vanilla ice cream and you need to make ${randomNum} servings, how many cups of ice cream do you need in total`,
              es:  `La Tía María y tú están haciendo una gran cantidad de Batidos de Vainilla para un evento escolar. Si ${serving_size} porción requiere ${first_ingredient_key_amount} tazas de helado de vainilla y necesitas hacer ${randomNum} porciones, ¿cuántas  tazas de helado necesitas en total?`,
          
          },
          answer,
          [{
            en: `Total cups of ice cream = servings required * cups of ice cream per serving `,
            es: `Total de tazas de helado = porciones requeridas * tazas de helado por porción`,
          },
            {
            en:  `Total cups of ice cream = ${randomNum} * ${first_ingredient_key_amount} cups ice cream = ${answer}  `,
            es:  `Total de tazas de helado = ${randomNum} * ${first_ingredient_key_amount} tazas de helado = ${answer}`,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 7 vanilla milkshake
    if (recipe.name.en == "Vanilla milkshake") {
      let randomNum = randomInt(2,5)
      let randomNum1 = randomInt(2,11)
      let answer = randomNum * randomNum1
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `You are helping Auntie Maria make Vanilla Milkshakes batches. If each batch requires ${randomNum} cups of milk and you make ${randomNum1} batches, how many cups of milk will you use in total?`,
              es:  `Estás ayudando a la tía María a hacer lotes de batidos de vainilla. Si cada lote requiere ${randomNum} tazas de leche y haces ${randomNum1} lotes, ¿cuántas tazas de leche usarás en total?`,
          
          },
          answer,
          [{
            en: `Total cups of milk = cups of milk per batch * number of batches `,
            es: `Total de tazas de leche = tazas de leche por lote * número de lotes`,
          },
            {
            en:  `Total cups of milk = ${randomNum} * ${randomNum1} = ${answer}  `,
            es:  `Total de tazas de leche = ${randomNum} * ${randomNum1} = ${answer}`,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 8 vanilla milkshake
    if (recipe.name.en == "Vanilla milkshake") {
      let amount = '5/8'
      let amount1 = '3/8'
      let answer = amount
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria prepared 2 servings of Vanilla Milkshake and poured it in two glasses, one for you and one for her. If you drank 5/8 of your glass and she drank 3/8 of her glass, who drank more milkshake? Please type your answer in fraction form (example: 1/4).`,
              es:  `La tía Maria preparó 2 porciones de batido de vainilla y las sirvió en dos vasos, uno para ti y otro para ella. Si tú bebiste 5/8 de tu vaso y ella bebió 3/8 de su vaso, ¿quién tomó más batido? Por favor, escribe tu respuesta en forma de fracción (ejemplo: 1/4).`,
          
          },
          answer,
          [{
            en: `1) Compare the numerators of the 2 fractions →${amount} vs ${amount1}
            2) Is ${amount} larger, smaller, or equal to ${amount1}?
            `,
            es: `1) Compara las dos fracciones → ${amount} vs ${amount1}
            2) ¿${amount} es mayor, menor o igual a ${amount1}?
            `,
          },
            {
            en:  `The fractions share a common denominator which is 8. Comparing numerators: 5 > (larger than) 3 so the correct answer is ${answer}. `,
            es:  `1) Las fracciones tienen un denominador común que es 8.
            2) Comparando los numeradores: 5 > (mayor que) 3, así que la respuesta correcta es ${answer}.
            `,
          }],
        "fraction",
    
        ))
    
        }

    //question 9 vanilla milkshake
    if (recipe.name.en == "Vanilla milkshake") {
      let hour = 4
      let minute = randomInt(10,51)
      let prepTime = 5
      let newMin = prepTime*2
      let minutes = minute-newMin
      let finalTimeMin = minutes.toString().padStart(2, '0');
      let original = hour+":"+minute
      let answer  = hour + ":" + finalTimeMin + "PM" ;
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria wants to serve Vanilla Milkshakes at ${original} PM for you and your friend. If it takes her ${prepTime} minutes to prepare 1 milkshake, at what time should Auntie Maria start preparing the milkshakes?`,
              es:  `La tía María quiere servir batidos de vainilla a las ${original} PM. para ti y tu amigo. Si le toma ${prepTime} minutos preparar 1 batido, ¿a qué hora debe la tía María comenzar a preparar los batidos?`,
          
          },
          answer,
          [{
            en: `Step 1: calculate total milkshakes Auntie Maria needs to serve 
            Step 2: calculate total minutes required for Auntie Maria to prepare milkshakes 
            Step 3: Prep start time = given time - total minutes needed to prepare milkshakes
            `,
            es: `Paso 1: calcula el total de batidos que la tía María necesita servir
            Paso 2: calcula el total de minutos necesarios para que la tía María prepare los batidos
            Paso 3: Hora de inicio de preparación = hora dada - minutos totales necesarios para preparar batidos
            `,
          },
            {
            en:  `Step 1: Total milkshakes = 1 + 1 = 2
            Step 2: Total minutes = ${prepTime} min. per milkshake * 2 milkshakes OR ${prepTime} + ${prepTime} = ${newMin} min.
            Step 3: ${original} - ${newMin} minutes = ${answer}
            `,
            es:  `Paso 1: Batidos totales = 1 + 1 = 2
            Paso 2: Minutos totales = ${prepTime} min. por batido * 2 batidos O ${prepTime} + ${prepTime} = ${newMin} min.
            Paso 3: ${original} - ${newMin} minutos = ${answer}
            `,
          }],
        "time",
    
        ))
    
        }

    //question 10 vanilla milkshake
    if (recipe.name.en == "Vanilla milkshake") {
      let randomNum = randomInt(2,11)
      let first_step = randomNum*2
      let answer = 1* first_step

     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `You are helping Auntie Maria measure milk for the Vanilla Milkshakes using a measuring cup. If you fill the measuring cup to the 1-cup mark each time, how many times do you need to fill it to have enough milk for ${randomNum} servings of milkshakes? Hint: 2 cups of milk are needed for 2 servings.`,
              es:  `Estás ayudando a la tía María a medir la leche para los batidos de vainilla con una taza medidora. Si llena la taza medidora hasta la marca de 1 taza cada vez, ¿cuántas veces necesita llenarla para tener suficiente leche para ${randomNum} porciones de malteadas? Pista: se necesitan 2 tazas de leche para 2 porciones`,
          
          },
          answer,
          [{
            en: `Step 1: Milk cups needed = Milk cups per 1 serving * ${randomNum} 
            Step 2: Times filling measuring cup = measuring cup capacity * Milk cups needed 
            `,
            es: `Paso 1: Tazas de leche necesarias = Tazas de leche por 1 porción * ${randomNum}
            Paso 2: Tiempos de llenado de la taza medidora = capacidad de la taza medidora * Tazas de leche necesarias
            `,
          },
            {
            en:  `Step 1: Milk cups needed = 2 *  ${randomNum}= ${first_step} milk cups  
            Step 2: Times filling measuring cup = 1 cup * ${first_step} milk cups = ${answer}  
             `,
            es:  `Paso 1: Tazas de leche necesarias = 2 * ${randomNum} = ${first_step} tazas de leche
            Paso 2: Tiempos de llenado de la taza medidora = 1 taza * ${first_step} = ${answer}
            `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 1 baleadas
    if (recipe.name.en == "Baleadas") {
      let randomNum = randomInt(2,11)
      let randomNum1 = randomInt(2,6)
      let answer = randomNum* randomNum1
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `You invite ${randomNum} friends to Auntie Maria’s house for a Baleadas party. If each friend eats ${randomNum1} servings, how many servings of Baleadas should you prepare for your friends?`,
              es:  `Invitas a  ${randomNum} amigos a la casa de la tía María para una fiesta de Baleadas. Si cada amigo come ${randomNum1} porciones, ¿cuántas porciones de Baleadas deberías preparar para tus amigos? `,
          
          },
          answer,
          [{
            en: `Total baleadas servings = Number of friends * Servings for each friend `,
            es: `Porciones de baleadas en total = Número de amigos * Porciones para cada amigo`,
          },
            {
            en:  `Total baleadas servings = ${randomNum} * ${randomNum1} = ${answer} `,
            es:  `Porciones de baleadas en total= ${randomNum} * ${randomNum1} = ${answer} `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 2 baleadas
    if (recipe.name.en == "Baleadas") {
      const fractions = [4,6,8,10];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let serving_size = recipe.recipeMakesAmount
      let answer = randomFraction/serving_size
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria is helping you make Baleadas for a school field trip. Auntie Maria only has ${randomFraction} flour tortillas and you want to serve 2 Baleadas per person. How many people can have 2 baleadas if you use all flour tortillas?`,
              es:  `La tía María te está ayudando a hacer Baleadas para una excursión escolar. La tía María solo tiene ${randomFraction} tortillas de harina y quiere servir 2 Baleadas por persona. ¿Cuántas personas pueden tener 2 baleadas si usas todas las tortillas de harina?`,
          
          },
          answer,
          [{
            en: `Step 1: Flour tortillas for 1 baleada = recipe amount / recipe servings 
            Step 2: Total baleadas = flour tortillas available * flour tortilla for 1 baleada 
            Step 3: Total people = total baleadas / number of baleadas for each person
            `,
            es: `Paso 1: Tortillas de harina para 1 baleada = cantidad de la receta / porciones de la receta
            Paso 2: Baleadas en total = tortillas de harina disponibles * tortilla de harina para 1 baleada
            Paso 3: Total de personas = total de baleadas / número de baleadas de cada persona
             `,
          },
            {
            en:  `Step 1: Flour tortillas per baleada = 2 tortillas / 2 servings = 1 tortilla per baleada 
            Step 2: Total baleadas = ${randomFraction} tortillas available * 1 tortilla per baleada = ${randomFraction}
            Step 3: Total people = ${randomFraction} total baleadas / ${serving_size} baleadas per person = ${answer}
             `,
            es:  `Paso 1: Tortillas de harina por baleada = 2 tortillas / 2 porciones = 1 tortilla por baleada
            Paso 2: Baleadas totales = ${randomFraction} tortillas disponibles * 1 tortilla por baleada = ${randomFraction}
            Paso 3: Total personas = ${randomFraction} total baleadas / ${serving_size} baleadas por persona = ${answer}
            `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 3 baleadas
    if (recipe.name.en == "Baleadas") {
      const fractions = [6,8,10];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let first_ingredient_key = Object.keys(recipe.ingredients)[2];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let answer = randomFraction/first_ingredient_key_amount
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria has a large bag that holds ${randomFraction} cups of cheese. If the bag is full, how many servings of Baleadas can you make? Hint: assume you use the whole bag. `,
              es:  `La tía María tiene una bolsa grande que contiene ${randomFraction} tazas de queso. Si la bolsa está llena, ¿cuántas porciones de Baleadas puedes hacer? Sugerencia: suponga que usa toda la bolsa. `,
          
          },
          answer,
          [{
            en: `Total baleadas servings = ${randomFraction} cups of cheese / ${first_ingredient_key_amount} cups of cheese per serving  `,
            es: `Total de porciones de baleadas = ${randomFraction} tazas de queso / ${first_ingredient_key_amount} tazas de queso por porción`,
          },
            {
            en:  `Total baleadas servings = ${randomFraction} / ${first_ingredient_key_amount} = ${answer} `,
            es:  `Total de porciones de baleadas = ${randomFraction} / ${first_ingredient_key_amount} = ${answer}`,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 4 baleadas
    if (recipe.name.en == "Baleadas") {
      const fractions = [10,20,30];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let serving_size = recipe.recipeMakesAmount
      let answer = randomFraction* serving_size
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `For your birthday you decided to bring Baleadas to school and share them with ${randomFraction} friends. If each friend has 1 serving, how many Baleadas do you and Auntie Maria need to prepare?`,
              es: `Para tu cumpleaños decidiste traer Baleadas a la escuela y compartirlas con ${randomFraction} amigos. Si cada amigo tiene 1 porción, ¿cuántas Baleadas necesitan preparar la tía María y tú ? `,
          
          },
          answer,
          [{
            en: `Total baleadas = total servings * baleadas per serving  `,
            es: `Total de Baleadas = porciones totales * baleadas por porción`,
          },
            {
            en:  `Total baleadas = ${randomFraction} servings * ${serving_size} baleadas per serving = ${answer} `,
            es:  `Total de baleadas = ${randomFraction} porciones * ${serving_size} baleadas por porción  = ${answer}`,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 5 baleadas
    if (recipe.name.en == "Baleadas") {
      const fractions = [20,30,40,50];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let serving_size = recipe.recipeMakesAmount
      let first_step = randomFraction/serving_size
      let first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let answer = first_step* first_ingredient_key_amount
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria needs to prepare ${randomFraction} Baleadas for a family gathering. How many cups of refried beans does Auntie Maria need for all Baleadas?`,
              es: `La tía María necesita preparar ${randomFraction} Baleadas para una reunión familiar. ¿Cuántas tazas de frijoles refritos necesita la tía María para todas las baleadas? `,
          
          },
          answer,
          [{
            en: `Step 1: Baleadas servings = number of baleadas / baleadas per serving
            Step 2: Total cups of refried beans = baleadas servings * cups of refried beans per serving 
             `,
            es: `Paso 1: Porciones de baleadas = número de baleadas / baleadas por porción
          Paso 2: Total de tazas de frijoles refritos = porciones de baleadas * tazas de frijoles refritos por porción
          `,
          },
            {
            en:  `Step 1: Baleadas servings = ${randomFraction} / ${serving_size} = ${first_step}
            Step 2: Total cups of refried beans = ${first_step} baleadas servings * ${first_ingredient_key_amount} cup of refried beans per serving = ${answer}
             `,
            es:  `Paso 1: Porciones de baleadas = ${randomFraction} / ${serving_size} = ${first_step}
            Paso 2: Total de tazas de frijoles refritos = ${first_step} porciones de baleadas * ${first_ingredient_key_amount} taza de frijoles refritos por porción = ${answer}
            `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 6 baleadas
    if (recipe.name.en == "Baleadas") {
      const fractions = [4,6,8,10,20,30];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let first_ingredient_key = Object.keys(recipe.ingredients)[0];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let answer = randomFraction/ first_ingredient_key_amount
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria bought a pack of flour tortillas to make Baleadas. If the pack brings ${randomFraction} flour tortillas, how many Baleadas servings can she make? `,
              es: `La tía María compró un paquete de tortillas de harina para hacer Baleadas. Si el paquete trae ${randomFraction} tortillas de harina, ¿cuántas porciones de Baleadas puede hacer?`,
          
          },
          answer,
          [{
            en: `Total baleadas servings = number of tortillas / tortillas required for 1 serving`,
            es: `Total de porciones de baleadas = número de tortillas / tortillas requeridas para 1 porción`,
          },
            {
            en:  `Total baleadas servings = ${randomFraction} / ${first_ingredient_key_amount} = ${answer} `,
            es:  `Total de porciones de baleadas = ${randomFraction} / ${first_ingredient_key_amount} = ${answer} `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 7 baleadas
    if (recipe.name.en == "Baleadas") {
      const fractions = [4,6,8,10,20,30];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let originalHr = 5
      let originalMin = randomInt(45,60)
      let original = originalHr+":"+originalMin+"PM"
      let people = 3
      let serving_size = recipe.recipeMakesAmount
      let first_step = people*serving_size
      let second_step = first_step/serving_size
      let cookTime = 10
      let prepTime = 5
      let third_step = (cookTime+prepTime)*second_step
      let newMins = originalMin-third_step 
      let finalTimeMin = newMins.toString().padStart(2, '0');
      let answer = originalHr + ":" + finalTimeMin + "PM" ;
     
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `You and your friend are going to Auntie Maria’s house at ${original}. Auntie Maria is preparing Baleadas for dinner. If you, your friend, and Auntie will have 2 Baleadas each, at what time should Auntie Maria start making the Baleadas so that they are ready when you arrive? The prep time is 5 minutes and the cook time is 10 minutes for each recipe.`,
              es: `Tu amiga y tú irán a la casa de la tía María a las ${original}. La tía María está preparando Baleadas para la cena. Si,  tu amigo,  la tía y tú van a tener 2 baleadas cada uno, ¿a qué hora debe empezar la tía María a hacer las baleadas para que estén listas cuando llegues? El tiempo de preparación es de 5 minutos  y el tiempo de cocción es de 10 minutos por receta `,
          
          },
          answer,
          [{
            en: `Step 1: Total baleadas = (number of people * baleadas per person) 
            Step 2: Total servings = total baleadas / baleadas per serving
            Step 3: Total time required = (prep time + cook time) * total servings 
            Step 4: Start time = your arrival time - total time required 
            `,
            es: `Paso 1: Total de baleadas = (número de personas * baleadas por persona)
            Paso 2: Total de porciones = total de baleadas / baleadas por porción
            Paso 3: Tiempo total requerido = (tiempo de preparación + tiempo de cocción) * porciones totales
            Paso 4: Hora de inicio = tu hora de llegada - tiempo total requerido
            `,
          },
            {
            en:  `Step 1: Total baleadas = ${people} people * ${serving_size} baleadas each = ${first_step} 
            Step 2: Total servings = ${first_step} baleadas / ${serving_size} baleadas per serving = ${second_step}
            Step 3: Total time required = (${prepTime} minutes + ${cookTime} minutes) * ${second_step} servings = ${third_step} minutes
            Step 4: Start time = ${original} - ${third_step} minutes = ${answer}
             `,
            es:  `Paso 1: Total de baleadas = ${people} personas * ${serving_size} baleadas cada uno = ${first_step}
            Paso 2: Total de porciones = ${first_step} baleadas / ${serving_size} baleadas por porción = ${second_step}
            Paso 3: Tiempo total requerido = (${prepTime} minutos + ${cookTime} minutos) * ${second_step} porciones = ${third_step} minutos
            Paso 4: Hora de inicio = ${original} - ${third_step} minutos = ${answer}
             `,
          }],
        "time",
    
        ))
    
        }

    //question 8 baleadas
    if (recipe.name.en == "Baleadas") {
      const fractions = [2,4,6,8];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let originalHr = 2
      let originalMin = 0
      let original = originalHr+":"+originalMin+"PM"
      let people = 3
      let serving_size = recipe.recipeMakesAmount
      let first_step = randomFraction/serving_size
      let cookTime = 10
      let prepTime = 5
      let third_step = (cookTime+prepTime)*first_step
      let newMins = originalMin-third_step 

        let totalMinutes = 2 * 60 + 0;
        let part1 = third_step;

        // Add the desired number of minutes
        totalMinutes += part1;

        // Calculate the new hours and minutes
        let newHours = Math.floor(totalMinutes / 60);
        let newMinutes = totalMinutes % 60;

        // Handle the case when the minutes exceed 59
        if (newMinutes > 59) {
          newHours += Math.floor(newMinutes / 60);
          newMinutes %= 60;
        }

        let finalTimeHr = newHours;
        let finalTimeMin = newMinutes;

        // Adjust the finalTimeHr and finalTimeMin if necessary
        if (finalTimeMin >= 60) {
          finalTimeHr += Math.floor(finalTimeMin / 60);
          finalTimeMin %= 60;
        }

        // Add leading zeros if finalTimeMin is 9 or less
        finalTimeMin = finalTimeMin.toString().padStart(2, '0');

        let answer = finalTimeHr + ":" + finalTimeMin+ "PM";
;
  
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria wants to prepare  ${randomFraction} Baleadas for her neighbors. If she begins cooking at 2:00PM, at what time will she finish all the Baleadas? Please type your answer in hour format (H:MM AM/PM).The prep time is 5 minutes and the cook time is 10 minutes for each recipe.`,
              es: `La tía María quiere preparar ${randomFraction} Baleadas para sus vecinos. Si comienza a cocinar a las 2:00 p. m., ¿a qué hora terminará todas las baleadas? Escriba su respuesta en formato de hora (H:MM AM/PM). El tiempo de preparación es de 5 minutos  y el tiempo de cocción es de 10 minutos por receta `,
          
          },
          answer,
          [{
            en: `Step 1: Total servings = number of baleadas / baleadas per serving 
            Step 2: Total time for all servings = (prep time + cook time) * total servings
            Step 3: Finish time = Start time + total time for all servings  
            `,
            es: `Paso 1: Total de porciones = número de baleadas / baleadas por porción
            Paso 2: Tiempo total para todas las porciones = (tiempo de preparación + tiempo de cocción) * porciones totales
            Paso 3: Hora de finalización = Hora de inicio + tiempo total para todas las porciones
            `,
          },
            {
            en:  `Step 1: Total servings = ${randomFraction} baleadas / ${serving_size} baleadas per serving = ${first_step}
            Step 2: Total time for all servings = (${prepTime} minutes + ${cookTime} minutes) * ${first_step} = ${third_step} minutes
            Step 3: Finish time = 2:00 PM + ${third_step} minutes = ${answer}
            `,
            es:  `Paso 1: Total de porciones = ${randomFraction} baleadas / ${serving_size} baleadas por porción = ${first_step}
            Paso 2: Tiempo total para todas las porciones = (${prepTime} minutos + ${cookTime} minutos) * ${first_step} = ${third_step} minutos
            Paso 3: Hora de finalización = 2:00 p. m. + ${third_step} minutos = ${answer}
            `,
          }],
        "time",
    
        ))
    
        }

    //question 9 baleadas
    if (recipe.name.en == "Baleadas") {
      const fractions = [4,6,8,10];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let serving_size = recipe.recipeMakesAmount
      let first_step = randomFraction/serving_size
      let first_ingredient_key = Object.keys(recipe.ingredients)[2];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let answer = first_step* first_ingredient_key_amount
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria asked you to prepare the cheese required for ${randomFraction} baleadas using a measuring cup. How many cups of cheese will you need to measure for Auntie Maria?`,
              es: `La tía María te pidió que prepararas el queso necesario para ${randomFraction} baleadas usando una taza medidora. ¿Cuántas tazas de queso necesitarás medir para la tía María?`,
          
          },
          answer,
          [{
            en: `Step 1: Servings needed = number of baleadas / baleadas per serving 
            Step 2: Total cups of cheese = servings needed * cups of cheese per serving 
            `,
            es: `Paso 1: Porciones necesarias = número de baleadas / baleadas por porción
            Paso 2: Total de tazas de queso = porciones necesarias * tazas de queso por porción
            `,
          },
            {
            en:  `Step 1: Servings needed = ${randomFraction} baleadas / ${serving_size} baleadas per serving = ${first_step}
            Step 2: Total cups of cheese = ${first_step} servings needed * ${first_ingredient_key_amount} cups of cheese per serving = ${answer} 
            `,
            es:  `Paso 1: Porciones necesarias = ${randomFraction} baleadas / ${serving_size} baleadas por porción = ${first_step}
            Paso 2: Total de tazas de queso = ${first_step} porciones necesarias * ${first_ingredient_key_amount} tazas de queso por porción = ${answer}
            `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 10 baleadas
    if (recipe.name.en == "Baleadas") {
      let serving_size = recipe.recipeMakesAmount
      let first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount+"/"+serving_size)
      let answer = simplifyFraction(fractionOrInteger)

     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `You found 1 Baleada left over in the fridge. How many cups of refried beans are in this Baleada? Hint: type your answer in fraction format.`,
              es: `Encontraste 1 Baleada sobrante en el refrigerador. ¿Cuántas tazas de frijoles refritos hay en esta Baleada? Pista: escribe tu respuesta en formato de fracción`,
          
          },
          answer.result,
          [{
            en: `Since 1 baleada is half a serving, cups of refried beans for 1 baleada is half of the amount required for 2 baleadas.  `,
            es: `Dado que 1 baleada es la mitad de una porción, las tazas de frijoles refritos para 1 baleada es la mitad de la cantidad requerida para 2 baleadas.`,
          },
            {
            en:  `${first_ingredient_key_amount} cup of refried beans required for ${serving_size} baleadas → ${answer.result} cup of refried beans required for 1 baleada`,
            es:  `${first_ingredient_key_amount} taza de frijoles refritos se requiere para ${serving_size} baleadas → ${answer.result} taza de frijoles refritos se requiere para 1 baleada`,
          }],
        answer.types,
    
        ))
    
        }

    //question 1 Churros
    if (recipe.name.en == "Churros") {
      let first_ingredient_key = Object.keys(recipe.ingredients)[3];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let answer = 2
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria is helping you make churros but she only has 1 tablespoon of salt. How many churros recipes can you make with this much salt? Assume Tia Maria has all other ingredients`,
              es:  `Tía María te está ayudando a hacer churros, pero solo tiene 1 cucharada de sal. ¿Cuántas porciones churros puedes hacer con esta cantidad de sal? Supón que Tía María tiene todos los demás ingredientes`,
          
          },
          answer,
          [{
            en: `1 tablespoon is twice as much as 1/2 tablespoon → two halves make 1 whole`,
            es: `1 cucharada es el doble que 1/2 cucharada → dos mitades hacen 1 entero`,
          },
            {
            en:  `1 churros serving requires 1/2 tablespoon salt. Since you have 1 tablespoon available, you can make 2 churros recipes. `,
            es:  `1 porción de churros requiere 1/2 cucharada de sal. Dado que tienes 1 cucharada disponible, puedes hacer 2 porciones. `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 2 Churros
    if (recipe.name.en == "Churros") {
      let randomNum = randomInt(3,10)
      let random2 = randomNum+ 1
      let serving_size = recipe.recipeMakesAmount
      let first_ingredient_key = Object.keys(recipe.ingredients)[4];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let answer = random2* first_ingredient_key_amount
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `The word is out! Your friends found out about Auntie Maria’s delicious Churros and they decided to join you at her house to have some. If ${randomNum} friends join you, and you all have ${serving_size} churros each, how many cups of oil does Auntie Maria need to cook all churros? Remember, 1 serving = 4 churros.`,
              es:  `¡Se corrió la voz! Tus amigos se enteraron de los deliciosos churros de la tía María y decidieron acompañarte a su casa para comer unos. Si ${randomNum} amigos se unen a ti y todos tienen ${serving_size} churros cada uno, ¿cuántas tazas de aceite necesita la tía María para cocinar todos los churros? Recuerda, 1 ración equivale a 4 churros. `,
          
          },
          answer,
          [{
            en: `Step 1: Each person has 1 serving (${serving_size} churros). Total people = total servings
            Step 2:  Cups of Oil = total servings * cups of oil per 1 serving
            `,
            es: `Paso 1: Cada persona tiene 1 porción (${serving_size} churros). Total de personas = total de porciones 
            Paso 2: Tazas de aceite = total de porciones* tazas de aceite por 1 porción
            `,
          },
            {
            en:  `Step 1: Total people = total servings = ${randomNum} +1 = ${random2}
            Step 2:  Cups of Oil = ${random2} servings * ${first_ingredient_key_amount} cups of oil for 1 serving = ${answer}
             `,
            es:  `Paso 1: Total de personas = total de porciones = ${randomNum}+ 1 = ${random2}
            Paso 2: Tazas de aceite = ${random2} porciones * ${first_ingredient_key_amount} tazas de aceite por 1 porción = ${answer}
             `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 3 Churros
    if (recipe.name.en == "Churros") {
      let randomNum = randomInt(3,10)
      let random2 = randomNum+ 1
      let serving_size = recipe.recipeMakesAmount
      let first_ingredient_key = Object.keys(recipe.ingredients)[0];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger= convertToFraction(first_ingredient_key_amount+"/2")
      let answer = simplifyFraction(fractionOrInteger)
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `If you need ${first_ingredient_key_amount} cup of flour to make ${serving_size} Churros, how many cups of flour do you need for 2 Churros? Please write your answer as a fraction.`,
              es:  `Si necesitas ${first_ingredient_key_amount} taza de harina para hacer ${serving_size} Churros, ¿cuántas tazas de harina necesitas para 2 Churros? Por favor, escribe tu respuesta como una fracción.`,
          
          },
          answer.result,
          [{
            en: `Hint: 2 churros are half as many as ${serving_size} churros. You need half the amount of flour than you need for ${serving_size} churros.`,
            es: `Pista: 2 churros son la mitad de ${serving_size} churros. Necesitas la mitad de la cantidad de harina que necesitas para ${serving_size} churros.`,
          },
            {
            en:  `${serving_size} Churros require ${first_ingredient_key_amount} cup of flour. 2 Churros require half as much flour → ${answer.result} cups`,
            es:  `${serving_size} Churros requieren ${first_ingredient_key_amount} taza de harina. 2 Churros requieren la mitad de la cantidad de harina → ${answer.result} tazas `,
          }],
        answer.types,
    
        ))
    
        }

    //question 4 Churros
    if (recipe.name.en == "Churros") {
      let randomNum = randomInt(2,5)
      const fractions = [10,20,30,40];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let answer = randomFraction*randomNum
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `You decide to sell Auntie Maria’s delicious churros to your classmates. If you charge ${randomNum} dollars for one churro and you sell ${randomFraction} churros, how much money did you make?`,
              es:  `Decides vender los deliciosos churros de la tía María a tus compañeros de clase. Si cobras ${randomNum} dólares por un churro y vendes ${randomFraction} churros, ¿cuánto dinero ganaste?`,
          
          },
          answer,
          [{
            en: `Total money = money for 1 churro * churros sold `,
            es: `Total de dinero = dinero por 1 churro * churros vendidos`,
          },
            {
            en:  `Total money = ${randomNum} dollars * ${randomFraction} churros sold = ${answer} `,
            es:  `Total de dinerol = ${randomNum} dólares * ${randomFraction} churros vendidos = ${answer}`,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 5 Churros
    if (recipe.name.en == "Churros") {
      let randomNum = randomInt(3,10)
      let random2 = randomNum*4
      let serving_size = recipe.recipeMakesAmount
      let answer = random2 * 4
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `You need 1 cup of water to make ${serving_size} Churros. How many Churros can you make with ${randomNum} quarts of water? Hint: 1 quart = 4 cups.`,
              es: `Necesitas 1 taza de agua para hacer ${serving_size} Churros. ¿Cuántos churros puedes hacer con ${randomNum} cuartos de galón de agua? Pista: 1 cuarto es igual a 4 tazas.`,
          
          },
          answer,
          [{
            en: `Step 1: Cups of water = quarts of water * 4 cups per quart
            Step 2: Total churros = cups of water * churros for 1 cup of water
            `,
            es: `Paso 1: Tazas de agua = cuartos de galón de agua * 4 tazas por cuarto
            Paso 2: Total de churros  = tazas de agua * churros por 1 taza de agua
            `,
          },
            {
            en:  `Step 1: Cups of water = ${randomNum} quarts * 4 cups per quart = ${random2} cups 
            Step 2: Total churros = ${random2} cups * 4 churros for 1 cup of water = ${answer}
            `,
            es:  `Paso 1: Tazas de agua = ${randomNum} cuartos * 4 tazas por cuarto = ${random2} tazas
            Paso 2: Total de churros = ${random2} tazas * 4 churros por 1 taza de agua = ${answer}
            `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 6 Churros
    if (recipe.name.en == "Churros") {
      const fractions = [4,6,8];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let random2 = randomFraction*2
      let serving_size = recipe.recipeMakesAmount
      let first_step = random2/serving_size
      let prepTime = 10
      let cookTime = 20
      let answer = (prepTime+cookTime)*first_step
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria and you are preparing Churros for your parents. If each of them will have ${randomFraction} churros, how many minutes will it take to prepare and cook the churros? The prep time for one recipe is 10 minutes and cook time is 20.`,
              es: `La tía María y tú están preparando churros para tus padres. Si cada uno de ellos tendrá ${randomFraction} churros, ¿cuántos minutos tardarán en preparar y cocinar los churros? El tiempo de preparación es de 10 minutos y el tiempo de cocción es de 20 minutos por receta.`,
          
          },
          answer,
          [{
            en: `Step 1: Total churros = churros for Mom + churros for Dad
            Step 2: Total servings = total churros / number of churros per serving 
            Step 3: Total time = (prep time + cook time) * total servings 
            `,
            es: `Paso 1: Total de churros = churros para mamá + churros para papá
            Paso 2: Total de porciones = total de churros / número de churros por porción 
            Paso 3: Tiempo total = (tiempo de preparación + tiempo de cocción) * porciones totales
            `,
          },
            {
            en:  `Step 1: Total churros =  ${randomFraction} churros for Mom + ${randomFraction} churros for Dad =${random2}
            Step 2: Total servings = ${random2} total churros / ${serving_size} = ${first_step} servings 
            Step 3: Total time = (${prepTime} minutes + ${cookTime} minutes) * ${first_step} servings = ${answer} minutes
            `,
            es:  `Paso 1: Total de churros  = ${randomFraction} churros para mamá + ${randomFraction} churros para papá = ${random2}
            Paso 2: Total de porciones = ${random2} total de churros / ${serving_size} = ${first_step} de porciones
            Paso 3: Tiempo total = (${prepTime} minutos + ${cookTime} minutos) * ${first_step} porciones = ${answer} minutos
            `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 7 Churros
    if (recipe.name.en == "Churros") {
      let hrs = 1
      let min = randomInt(0,30)
      let prepTime = 10
      let cookTime = 20
      let first_step = prepTime+cookTime
      let newMins = min+first_step
      min = min.toString().padStart(2, '0');
      let original = hrs+":"+min+"PM"
      let answer = hrs+":"+newMins+"PM"
      let serving_size = recipe.recipeMakesAmount

     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `If Auntie Maria started making churros at ${original} and she is making 4 Churros, at what time will she finish cooking? Remember, ${serving_size} churros = 1 serving. Prep time is 10 minutes and cook time is 20 minutes for 1 serving.`,
              es: `Si la tía María comenzó a hacer churros a las ${original} y está haciendo 4 churros, ¿a qué hora terminará de cocinar? Recuerda, 4 churros equivalen a 1 porción. El tiempo de preparación es de 10 minutos y el tiempo de cocción es de 20  minutos para una porción `,
          
          },
          answer,
          [{
            en: `Step 1: Time required = prep time + cook time 
            Step 2: Finish time = start time + time required 
            `,
            es: `Paso 1: Tiempo requerido = tiempo de preparación + tiempo de cocción
            Paso 2: Hora de finalización = hora de inicio + tiempo requerido
            `,
          },
            {
            en:  `Step 1: Time required = ${prepTime} minutes + ${cookTime} minutes = ${first_step} minutes 
            Step 2: Finish time = ${original} + ${first_step} minutes = ${answer}
            `,
            es:  `Paso 1: Tiempo requerido = ${prepTime} minutos + ${cookTime} minutos = ${first_step} minutos
            Paso 2: Hora de finalización = ${original} + ${first_step} minutos = ${answer}
            `,
          }],
        "time",
    
        ))
    
        }

    //question 8 Churros
    if (recipe.name.en == "Churros") {
      const fractions = [8,12,16,20,24];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let serving_size = recipe.recipeMakesAmount
      let first_step = randomFraction/serving_size
      let first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let answer = first_step* first_ingredient_key_amount

     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `How many cups of water do you need to prepare ${randomFraction} Churros?`,
              es: `¿Cuántas tazas de agua necesitas para preparar ${randomFraction} Churros?`,
          
          },
          answer,
          [{
            en: `Step 1: Total servings required = # of churros needed / # of churros per serving
            Step 2: Cups of water = total servings * cups of water for 1 serving 
            `,
            es: `Paso 1: Total de porciones requeridas = # de churros necesarios / # de churros por porción
            Paso 2: Tazas de agua = total de porciones * tazas de agua por 1 porción
            `,
          },
            {
            en:  `Step 1: Total servings required = ${randomFraction} churros / ${serving_size} churros per serving = ${first_step} servings
            Step 2: Cups of water = ${first_step} servings * ${first_ingredient_key_amount} cup of water per serving = ${answer}
            `,
            es:  `Paso 1: Total de porciones requeridas = ${randomFraction} churros / ${serving_size} churros por ración = ${first_step} porciones
            Paso 2: Tazas de agua = ${first_step} porciones * ${first_ingredient_key_amount} taza de agua por porción = ${answer}
            `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 9 Churros
    if (recipe.name.en == "Churros") {
      const fractions = [16,24,32,40,48];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let first_step = randomFraction/8
      let answer = first_step* 5

     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `If you need 5 tablespoons of sugar to make 8 Churros, how many tablespoons of sugar do you need for ${randomFraction} Churros?`,
              es: `Si necesitas 5 cucharadas de azúcar para hacer 8 Churros, ¿cuántas cucharadas de azúcar necesitas para ${randomFraction} Churros?`,
          
          },
          answer,
          [{
            en: `Step 1: Multiplying factor = churros needed / given churros 
            Step 2: Tablespoons of sugar = tablespoons of sugar for 8 churros * multiplying factor
            `,
            es: `Paso 1: Factor multiplicador = churros necesarios / churros dados
            Paso 2: Cucharadas de azúcar = cucharadas de azúcar para 8 churros * factor multiplicador
            `,
          },
            {
            en:  `Step 1: Multiplying factor = ${randomFraction} churros / 8 churros = ${first_step} 
            Step 2: Tablespoons of sugar = 5 * ${first_step} = ${answer}
            `,
            es:  `Paso 1: Factor multiplicador = ${randomFraction} churros / 8 churros = ${first_step}
            Paso 2: Cucharadas de azúcar = 5 * ${first_step} = ${answer}
            `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 10 Churros
    if (recipe.name.en == "Churros") {
      let answer = '1/6'

     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria has 1/4 cup of flour, 1/2 cup of water, and 1/6 teaspoon of salt. Which of these 3 fractions is the smallest? Hint: type your answer in fraction form (example: 1/8).`,
              es: `Tía María tiene 1/4 de taza de harina, 1/2 taza de agua y 1/6 de cucharadita de sal. ¿Cuál de estas 3 fracciones es la más pequeña? Pista: escribe tu respuesta en forma de fracción (ejemplo: 1/8).`,
          
          },
          answer,
          [{
            en: `Unit fractions get smaller as the denominator increases. Think of it like sharing a pizza with more friends—the more friends you have, the smaller the slice each person gets. Similarly, as the denominator in a unit fraction gets bigger, the unit fraction becomes smaller. In a similar way, as the denominator of a unit fraction gets smaller, the fraction becomes bigger. `,
            es: `Las fracciones unitarias se vuelven más pequeñas a medida que el denominador aumenta. Piénsalo como compartir una pizza con más amigos: cuantos más amigos tengas, más pequeña será la porción que le toque a cada persona. De manera similar, a medida que el denominador de una fracción unitaria se hace más grande, la fracción unitaria se vuelve más pequeña. De manera similar, a medida que el denominador de una fracción unitaria se hace más pequeño, la fracción se vuelve más grande`,
          },
            {
            en:  `All values are unit fractions. Comparing the three fractions, the largest denominator is 6. This means that the unit fraction representing the teaspoon of salt is the smallest - Answer: 1/6 `,
            es:  `Todos los valores son fracciones unitarias. Comparando las tres fracciones, el denominador más grande es 6. Esto significa que la fracción unitaria que representa la cucharadita de sal es la más pequeña. Respuesta: 1/6`,
          }],
        "fraction",
    
        ))
    
        }

    //question 1 Brownie
    if (recipe.name.en == "Brownie with ice cream") {
      let randomNum = randomInt(2,7)
      let first_ingredient_key = Object.keys(recipe.ingredients)[0];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let answer = first_ingredient_key_amount* randomNum
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria wants to make ${randomNum} servings of brownies with ice cream for Christmas. How many cups of flour will she need?`,
              es:  `Tía María quiere hacer ${randomNum} porciones de brownies con helado para Navidad. ¿Cuántas tazas de harina necesitará?`,
          
          },
          answer,
          [{
            en: `Total cups of flour = (${first_ingredient_key_amount} cups of flour per serving) * servings needed`,
            es: `Total de tazas de harina = (${first_ingredient_key_amount} tazas de harina por porción) * porciones necesarias`,
          },
            {
            en:  `Total cups of flour = (${first_ingredient_key_amount} cups of flour per serving) * ${randomNum} = ${answer} `,
            es:  `Total de tazas de harina= (${first_ingredient_key_amount} tazas de harina por porción) * ${randomNum} = ${answer} `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 2 Brownie
    if (recipe.name.en == "Brownie with ice cream") {
      let randomNum = randomInt(2,9)
      let first_ingredient_key = Object.keys(recipe.ingredients)[6];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let first_step = first_ingredient_key_amount/2
      let answer = randomNum
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `You and Auntie Maria are making ${randomNum} servings of brownies with ice cream. At the market, 1 container of ice cream holds 4 cups. How many ice cream containers will Auntie need to buy to make ${randomNum} servings? Hint: 1 cup of ice cream = 2 scoops.`,
              es: `Tía María y tú están haciendo ${randomNum} porciones de brownies con helado. En el mercado, 1 envase de helado contiene 4 tazas. ¿Cuántos envases de helado deberá comprar Tía María para hacer ${randomNum} porciones? Pista: 1 taza de helado equivale a 2 bolas.`,
          
          },
          answer,
          [{
            en: `Step 1: Cups of ice cream per serving = scoops per serving / scoops in a cup 
            Step 2: Cups in container = cups per serving 
            Step 3: Total Containers = total servings 
            `,
            es: `Paso 1: Tazas de helado por porción = bolas por porción / bolas en una taza
            Paso 2: Tazas en el envase = tazas por porción
            Paso 3: Envases totales = porciones totales
            `,
          },
            {
            en:  `Step 1: Cups of ice cream per serving = ${first_ingredient_key_amount} / 2 = ${first_step} cups 
            Step 2: Cups in container = cups per serving = ${first_step} cups
            Step 3: Total Containers = total servings = ${randomNum} containers 
            `,
            es:  `Paso 1: Tazas de helado por porción = 8 / 2 = 4 tazas
            Paso 2: Tazas en el envase = tazas por porción = 4 tazas
            Paso 3: Envases totales = porciones totales = ${randomNum} envases
             `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 3 Brownie
    if (recipe.name.en == "Brownie with ice cream") {
      let randomNum = randomInt(2,11)
      let prepTime = 5
      let answer = randomNum*prepTime
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `You are helping Auntie Maria prepare ${randomNum} servings of brownies with ice cream. If each serving takes 5 minutes to prepare, how long will it take you to prepare all servings? Please type your answer in minutes. `,
              es: `Estás ayudando a Tía María a preparar ${randomNum} porciones de brownies con helado. Si cada porción lleva 5 minutos de preparación, ¿cuánto tiempo te llevará preparar todas las porciones? Por favor, escribe tu respuesta en minutos. `,
          
          },
          answer,
          [{
            en: `Preparation time = prep time for 1 serving * required servings`,
            es: `Tiempo de preparación = tiempo de preparación por 1 porción * porciones requeridas`,
          },
            {
            en:  `Preparation time = ${prepTime} minutes * ${randomNum} servings = ${answer} minutes`,
            es:  `Tiempo de preparación = ${prepTime} minutos * ${randomNum} porciones = ${answer} minutos`,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 4 Brownie
    if (recipe.name.en == "Brownie with ice cream") {
      let randomNum = randomInt(2,11)
      let serving_size = recipe.servingSize
      let answer = randomNum*serving_size
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `
              Auntie Maria needs to make ${randomNum} servings of brownies with ice cream. Each serving has ${serving_size} brownies. How many brownies does she need to bake in total?`,
              es: `Tía María necesita hacer ${randomNum} porciones de brownies con helado. Cada porción tiene ${serving_size} brownies. ¿Cuántos brownies necesita hornear en total? `,
          
          },
          answer,
          [{
            en: `Total brownies = brownie servings * brownies per serving `,
            es: `Total de brownies = porciones de brownies * brownies por porción`,
          },
            {
            en:  `Total brownies = ${randomNum} servings * ${serving_size} = ${answer}`,
            es:  `Total de brownies= ${randomNum} porciones * ${serving_size} = ${answer}`,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 5 Brownie
    if (recipe.name.en == "Brownie with ice cream") {
      let randomNum = randomInt(2,11)
      let prepTime = 20
      let start = randomInt(0,39)
      let finalTimeMin = start.toString().padStart(2, '0');
      let original = "10:"+finalTimeMin+"AM"
      let newTime = start+20
      let answer = "10:"+newTime+"AM"
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria's brownies take ${prepTime} minutes to bake. If she starts baking at ${original}, at what time will the brownies be ready to come out of the oven?  `,
              es: `Los brownies de Tía María tardan ${prepTime} minutos en hornearse. Si ella comienza a hornear a las ${original}, ¿a qué hora estarán listos los brownies para sacarlos del horno?`,
          
          },
          answer,
          [{
            en: `Ready time = Start time + ${prepTime} minutes  `,
            es: `Hora de finalización = Hora de inicio + ${prepTime} minutos`,
          },
            {
            en:  `Ready time = ${original} + ${prepTime} minutes = ${answer} `,
            es:  `Hora de finalización = ${original} + ${prepTime} minutos = ${answer}`,
          }],
        "time",
    
        ))
    
        }

    //question 6 Brownie
    if (recipe.name.en == "Brownie with ice cream") {
      const fractions = [20,40,60,80];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let first_step = randomFraction*2
      let answer = first_step/8
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `If Auntie Maria wants to bake enough brownies with ice cream to serve ${randomFraction} people, and each person gets 2 brownies, how many servings of brownies with ice cream does she need to make?`,
              es: `Si Tía María quiere hornear suficientes brownies con helado para servir a ${randomFraction} personas, y cada persona recibe 2 brownies, ¿cuántas porciones de brownies con helado necesita hacer?`,
          
          },
          answer,
          [{
            en: `Step 1: Total brownies = number of people * brownies per person 
            Step 2: Total servings = total brownies / brownies per serving 
            `,
            es: `Paso 1: Total de brownies = número de personas * brownies por persona
            Paso 2: Total de porciones = total de brownies / brownies por porción
            `,
          },
            {
            en:  `Step 1: Total brownies = ${randomFraction} people * 2 brownies per person = ${first_step}
            Step 2: Total servings = ${first_step} total brownies / 8  = ${answer}
            `,
            es:  `Paso 1: Total de brownies = ${randomFraction} personas * 2 brownies por persona = ${first_step}
            Paso 2: Total de porciones =${first_step} total de brownies / 8 = ${answer}
            `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 7 Brownie
    if (recipe.name.en == "Brownie with ice cream") {
      const fractions = [2,4,6,8,10];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide(fractionOrInteger, randomFraction, 'multiply')
      let answer = simplifyFraction(multipliedResult.result)
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `You and Auntie Maria are cooking a batch of brownies with ice cream that yields ${randomFraction} recipe servings. If the original recipe calls for ${first_ingredient_key_amount} cup of butter per serving, how much butter do you need in total for the batch? Please type your answer in cups.`,
              es: `Tía María y tú están cocinando una tanda de brownies con helado que rinde ${randomFraction} porciones de la receta. Si la receta original requiere ${first_ingredient_key_amount} taza de mantequilla por porción, ¿cuánta mantequilla necesitas en total para la tanda? Por favor, escribe tu respuesta en tazas.`,
          
          },
          answer.result,
          [{
            en: `Total cups of butter = batch servings * (${first_ingredient_key_amount}) cup of butter per serving`,
            es: `Total de tazas de mantequilla = porciones de la tanda * (${first_ingredient_key_amount}) taza de mantequilla por porción`,
          },
            {
            en:  `Total de tazas de mantequilla = ${randomFraction} porciones de la tanda * (${first_ingredient_key_amount}) taza de mantequilla por porción = ${answer.result}`,
            es:  `Total cups of butter = ${randomFraction} batch servings * ${first_ingredient_key_amount} cup of butter per serving = ${answer.result} `,
          }],
        answer.types,
    
        ))
    
        }

    //question 8 Brownie
    if (recipe.name.en == "Brownie with ice cream") {
      let randomNum = randomInt(2,11)
      let prepTime = 5
      let cookTime = 20
      let time = prepTime+cookTime
      let start = randomInt(0,35)
      let finalTimeMin = start.toString().padStart(2, '0');
      let original = "1:"+finalTimeMin+"PM"
      let newTime = start+time
      let answer = "1:"+newTime+"PM"
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `If Auntie Marie starts preparing 1 serving of brownies with ice cream at ${original}, at what time will she finish making the recipe? The prep time is 5 minutes and the cook time is 20 minutes per recipe. `,
              es: `Si Tía María comienza a preparar 1 porción de brownies con helado a las ${original}, ¿a qué hora terminará de hacer la receta? El tiempo de preparación es de 5 minutos y el tiempo de cocción es de 20 minutos por receta.`,
          
          },
          answer,
          [{
            en: `Step 1: Total Time for 1 serving = prep time + cook time 
            Step 2: Finish Time = Start Time + total time for 1 serving 
             `,
            es: `Paso 1: Tiempo total para 1 porción = tiempo de preparación + tiempo de cocción
            Paso 2: Hora de finalización = Hora de inicio + tiempo total para 1 porción
            `,
          },
            {
            en:  `
            Step 1: Total Time for 1 serving = ${prepTime} min + ${cookTime} min = ${time} minutes 
            Step 2: Finish Time = ${original} + ${time} minutes = ${answer}
             `,
            es:  `Paso 1: Tiempo total para 1 porción = ${prepTime} min + ${cookTime} min = ${time} minutos
            Paso 2: Hora de finalización = ${original} + ${time} minutos = ${answer}
            `,
          }],
        "time",
    
        ))
    
        }

    //question 9 Brownie
    if (recipe.name.en == "Brownie with ice cream") {
      let randomNum = randomInt(2,11)
      let first_ingredient_key = Object.keys(recipe.ingredients)[0];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let second_ingredient_key = Object.keys(recipe.ingredients)[3];
      let second_ingredient_key_amount = recipe.ingredients[second_ingredient_key].amount;
      let fractionOrInteger1 = convertToFraction(second_ingredient_key_amount)
      let first_step = randomNum* fractionOrInteger
      let second_step = randomNum* fractionOrInteger1
      let answer = first_step+ second_step
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria is baking ${randomNum} servings of brownies with ice cream for your school event. Each serving requires 2 cups of flour and 1 cup of sugar. How many total cups of flour and sugar does she need in total? Hint: type your answer in cups.`,
              es: `Tía María está horneando ${randomNum} porciones de brownies con helado para el evento de tu escuela. Cada porción requiere 2 tazas de harina y 1 taza de azúcar. ¿Cuántas tazas de harina y azúcar necesita en total? Pista: escribe tu respuesta en tazas.`,
          
          },
          answer,
          [{
            en: `
            Step 1: Cups of flour  = servings * cups of flour per serving 
            Step 2: Cups of sugar = servings * cups of sugar per serving
            Step 3: Total cups = cups of flour + cups of sugar 
            `,
            es: `Paso 1: Tazas de harina = porciones * tazas de harina por porción
            Paso 2: Tazas de azúcar = porciones * tazas de azúcar por porción
            Paso 3: Total de tazas= tazas de harina + tazas de azúcar
            `,
          },
            {
            en:  `Step 1: Cups of flour  = ${randomNum} servings * ${first_ingredient_key_amount} cups flour per serving = ${first_step}
            Step 2: Cups of sugar = ${randomNum} servings * ${second_ingredient_key_amount} cup sugar per serving = ${second_step}
            Step 3: Total cups = ${first_step} cups of flour + ${second_step} cups of sugar = ${answer}
            `,
            es:  `Paso 1: Tazas de harina = ${randomNum} porciones * ${first_ingredient_key_amount} tazas de harina por porción = ${first_step}
            Paso 2: Tazas de azúcar = ${randomNum} porciones * ${second_ingredient_key_amount} taza de azúcar por porción = ${second_step}
            Paso 3: Total de tazas= ${first_step} tazas de harina + ${second_step} tazas de azúcar= ${answer}
            `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 10 Brownie
    if (recipe.name.en == "Brownie with ice cream") {
      let answer = 2
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `
              Auntie Maria is running low on butter and cocoa powder. She uses a measuring cup to see if she has enough for one serving of brownies with ice cream. She discovers that she has 1/6 cup of butter and 1/8 cup of cocoa powder. Are these quantities enough for her to make one serving of brownies with ice cream? Type 1 for ‘yes’ or  2 for ‘no’ in the answer box`,
              es: `A Tía María le queda poca mantequilla y cacao en polvo. Usa una taza medidora para ver si tiene suficiente para una porción de brownies con helado. Descubre que tiene 1/6 de taza de mantequilla y 1/8 de taza de cacao en polvo. ¿Son estas cantidades suficientes para hacer una porción de brownies con helado? Escribe 1 para responder "sí" o 2 para responder "no" en el cuadro de respuesta`,
          
          },
          answer,
          [{
            en: `Compare the fractions from Auntie’s amounts with the fractions from the recipe. Remember, unit fractions get smaller as the denominator increases. In a similar way, as the denominator of a unit fraction gets smaller, the fraction becomes bigger. `,
            es: `Compara las fracciones de las cantidades de Tía María con las fracciones de la receta. Recuerda que las fracciones unitarias son más pequeñas a medida que el denominador aumenta. De manera similar, a medida que el denominador de una fracción unitaria se hace más pequeño, la fracción se vuelve más grande.`,
          },
            {
            en:  `
            Comparing the four fractions: 
            1/6 cup of butter is less than (<) 1/2 cup of butter 
            1/4 cup of cocoa powder is less than (<) 1/2 cup of cocoa powder
            Answer: No = 2
            `,
            es:  `
            Comparando las cuatro fracciones:
            1/6 de taza de mantequilla es menor (<) que 1/2 de taza de mantequilla
            1/4 de taza de cacao en polvo es menor (<) que 1/2 de taza de cacao en polvo
            Respuesta: No = 2
            `,
          }],
        "wholeNumber",
    
        ))
    
        }

    
    


  return generatedQuestions;
}


function generateLevel2AuntQuestions(recipe, randomInt){
    let generatedQuestions = [];
  
    //question 1 vegetable soup 
    if (recipe.name.en == "Vegetable Noodle Soup") {
      let randomNum = randomInt(5,9)
      let randomNum1 = randomInt(3,10)
      let first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide(fractionOrInteger, randomNum, 'multiply')
      let simplify  = simplifyFraction(multipliedResult.result)
      let multipliedResult2 = multiplyOrDivide(fractionOrInteger, randomNum1, 'multiply')
      let simplify2  = simplifyFraction(multipliedResult2.result)
      let addedResult = addOrSubtract(multipliedResult.result,multipliedResult2.result, 'add')
      let answer = simplifyFraction(addedResult.result)
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria made ${randomNum} vegetable noodle soups on Monday and ${randomNum1} soups on Tuesday. How many cups of chopped carrots did she use in total?`,
              es:  `Tía María hizo ${randomNum} sopas de fideos con verduras el lunes y ${randomNum1} sopas el martes. ¿Cuántas tazas de zanahoria picada utilizó en total?`,
          
          },
          answer.result,
          [{
            en: `1) Monday = ${randomNum} x ${first_ingredient_key_amount}  
           2)  Tuesday = ${randomNum1} x ${first_ingredient_key_amount}  
           3)  Total Cups = Monday + Tuesday 
            `,
            es: `1) Lunes = ${randomNum} x ${first_ingredient_key_amount}  
            2) Martes = ${randomNum1} x ${first_ingredient_key_amount}  
            3) Tazas Totales = Lunes + Martes
            `,
          },
            {
            en:  `1) Monday = ${randomNum} x ${first_ingredient_key_amount} = ${simplify.result} 
            2) Tuesday = ${randomNum1} x ${first_ingredient_key_amount} = ${simplify2.result} 
            3) Total Cups = ${simplify.result} + ${simplify2.result} = ${answer.result}
            `,
            es:  `1) Lunes = ${randomNum} x ${first_ingredient_key_amount} = ${simplify.result} 
            2) Martes = ${randomNum1} x ${first_ingredient_key_amount} = ${simplify2.result} 
            3) Tazas Totales = ${simplify.result} + ${simplify2.result} = ${answer.result}
            `,
          }],
        answer.types,
    
        ))
    
        }

    //question 2 vegetable soup 
    if (recipe.name.en == "Vegetable Noodle Soup") {
      let randomNum = randomInt(5,9)
      let randomNum1 = [4,6,8][Math.floor(Math.random() * 6)]
      let serving_size = recipe.servingSize
      let firstStep = randomNum* serving_size
      let secondStep = firstStep- randomNum1
      let amount = convertToFraction(secondStep+"/"+firstStep)
      let answer = simplifyFraction(amount)

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria made ${randomNum} vegetable noodle soups today. If you eat ${randomNum1} servings, what fraction of the total servings will be left? Please type your answer as a fraction.`,
              es:  `Tía María hizo ${randomNum} sopas de fideos con verduras hoy. Si consumes ${randomNum1} porciones, ¿qué fracción de las porciones totales quedará? Por favor escribe la respuesta en fracción`,
          
          },
          answer.result,
          [{
            en: `1) ${randomNum} vegetable soups x ${serving_size} = total servings
            2) Total servings - ${randomNum1} = servings left
            3)  Fraction of the total servings left = servings left/ total servings
            `,
            es: `1) ${randomNum} sopas de verduras x ${serving_size} = porciones totales
            2) Total de porciones - ${randomNum1} = porciones restantes
              3) Fracción del total de porciones restantes = porciones restantes/total de porciones
            `,
          },
            {
            en:  `1) ${randomNum} vegetable soups x ${serving_size} = ${firstStep}
            2) ${firstStep} - ${randomNum1} = ${secondStep}
            3)  Fraction of the total servings left =${secondStep}/${firstStep} = ${answer.result}
            `,
            es:  `1) ${randomNum} sopas de verduras x ${serving_size} = ${firstStep}
            2) ${firstStep} - ${randomNum1} = ${secondStep}
              3) Fracción del total de porciones restantes = ${secondStep}/${firstStep} = ${answer.result}
            `,
          }],
        answer.types,
    
        ))
    
        }

    //question 3 vegetable soup 
    if (recipe.name.en == "Vegetable Noodle Soup") {
      let randomNum = randomInt(2,6)
      let first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let second_ingredient_key = Object.keys(recipe.ingredients)[2];
      let second_ingredient_key_amount = recipe.ingredients[second_ingredient_key].amount;
      let fractionOrInteger1 = convertToFraction(second_ingredient_key_amount)
      let third_ingredient_key = Object.keys(recipe.ingredients)[4];
      let third_ingredient_key_amount = recipe.ingredients[third_ingredient_key].amount;
      let fractionOrInteger2 = convertToFraction(third_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide(fractionOrInteger, randomNum, 'multiply')
      let multipliedResult1 = multiplyOrDivide(fractionOrInteger1, randomNum, 'multiply')
      let multipliedResult2 = multiplyOrDivide(fractionOrInteger2, randomNum, 'multiply')
      let addedResult = addOrSubtract(multipliedResult1.result, multipliedResult.result, 'add')
      let addedResult2 = addOrSubtract(addedResult.result, multipliedResult2.result, 'add')
      let simplify = simplifyFraction(multipliedResult.result)
      let simplify1 = simplifyFraction(multipliedResult1.result)
      let simplify2 = simplifyFraction(multipliedResult2.result)
      let answer = simplifyFraction(addedResult2.result)

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `If Auntie Maria makes  ${randomNum} vegetable noodle soups, what is the total amount of cups of chopped carrots, noodles, and cilantro she will need?`,
              es:  `Si Tía María hace ${randomNum} sopas de fideos con verduras, ¿cuántas tazas de zanahoria picada, fideos y cilantro necesitará en total?`,
          
          },
          answer.result,
          [{
            en: `1) Total carrots: ${randomNum} * ${first_ingredient_key_amount} 
            2) Total noodles: ${randomNum} * ${second_ingredient_key_amount} 
            3) Total cilantro: ${randomNum} * ${third_ingredient_key_amount}
            4) Total cups = add the three fractions together 
            `,
            es: `Total de zanahorias: ${randomNum} * ${first_ingredient_key_amount} 
            Total de fideos: ${randomNum} * ${second_ingredient_key_amount} 
            Total de cilantro:${randomNum} * ${third_ingredient_key_amount}
            Total de tazas = sumar las tres fracciones
            `,
          },
            {
            en:  `1) Total carrots:  ${randomNum} * ${first_ingredient_key_amount} = ${simplify.result}
            2) Total noodles:   ${randomNum} * ${second_ingredient_key_amount} =${simplify1.result}
            3) Total cilantro: ${randomNum} * ${third_ingredient_key_amount} =${simplify2.result}
            4) Total Cups = ${simplify.result} + ${simplify1.result} + ${simplify2.result} = ${answer.result}
            `,
            es:  `Total de zanahorias: ${randomNum} * ${first_ingredient_key_amount}  = ${simplify.result}
            Total de fideos: ${randomNum} * ${second_ingredient_key_amount} = ${simplify1.result}
            Total de cilantro:${randomNum} * ${third_ingredient_key_amount} =${simplify2.result}
            Total de tazas =  ${simplify.result} + ${simplify1.result} + ${simplify2.result} = ${answer.result}
            `,
          }],
        answer.types,
    
        ))
    
        }

    //question 4 vegetable soup 
    if (recipe.name.en == "Vegetable Noodle Soup") {
      let randomNum = randomInt(6,9)
      let serving_size = recipe.servingSize
      let firstStep = randomNum*serving_size
      let secondStep = firstStep*2
      let answer = firstStep + secondStep

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `On Wednesday, Auntie Maria made ${randomNum} vegetable soups. On Saturday, she made double the amount of vegetable soups as she did on Wednesday. How many total cups of vegetable broth did she use?`,
              es:  `El miércoles, Tía María hizo ${randomNum} sopas de verduras. El sábado, hizo el doble de la cantidad de sopas de verduras que hizo el miércoles. ¿Cuántas tazas de caldo de verduras en total utilizó?`,
          
          },
          answer,
          [{
            en: `1) ${randomNum} x ${serving_size} = total of wednesday
            2) 2 x (total of wednesday) = total of saturday
            3) Total cups broth = Total of wednesday + total of saturday 
            `,
            es: `1) ${randomNum} x ${serving_size} = total del miércoles
            2) 2 x (total del miércoles) = total del sábado
            3) Total de tazas de caldo = Total del miércoles + total del sábado
            `,
          },
            {
            en:   `1) ${randomNum} x ${serving_size} = ${firstStep}
            2) 2 x ${firstStep} = ${secondStep}
            3) Total cups of vegetable broth  = ${firstStep} + ${secondStep} = ${answer}
            `,
            es:  `1) ${randomNum} x ${serving_size} = ${firstStep}
            2) 2 x ${firstStep} = ${secondStep}
            3) Total de tazas de caldo = ${firstStep} + ${secondStep} = ${answer}
            `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 5 vegetable soup 
    if (recipe.name.en == "Vegetable Noodle Soup") {
      let randomNum = randomInt(1,3);
      let randomNum3 = randomInt(10,30)

      let cookTime = 10
      let randomNum1 = randomNum + ":"+  randomNum3

            // Convert start time to minutes
      let totalMinutes = randomNum * 60 + randomNum3;
            // Add the desired number of minutes
            totalMinutes += 90;
      
            // Calculate the new hours and minutes
            let newHours = Math.floor(90 / 60);
            let newMinutes = 90 % 60;
      
            let finalTimeHr = (randomNum+newHours)
            let finalTimeSec = (randomNum3+newMinutes)
            let done = finalTimeHr + ":" + finalTimeSec + "PM"

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `The vegetable noodle soup cook time takes double the amount of prep time. Auntie Maria spent a total of 60 minutes cooking (NOT including prep time) on Sunday. If Auntie Maria started at ${randomNum1} PM, what time would she have finished? Include prep time and cook time in your calculation! Hint: 1 hour = 60 minutes.`,
              es:  `El tiempo de cocción de la sopa de fideos con verduras suele ser el doble del tiempo de preparación. Tía María pasó un total de 60 minutos cocinando, (sin incluir el tiempo de preparación), el domingo. Si Tía María comenzó a las ${randomNum1}PM, ¿a qué hora habría terminado? ¡Incluye el tiempo de preparación y el tiempo de cocción en tu cálculo! Pista: 1 hora = 60 minutos.`,
          
          },
          done,
          [{
            en: `1) Total prep time: Cook Time / 2
            2) Total time = prep time + cook time 
            3) Finish Time = Start Time + Total Time
            Hint: type your answer using this format: HH:MM AM or PM
            `,
            es: `1) Tiempo total de preparación: Tiempo de cocción / 2
            2) Tiempo total = tiempo de preparación + tiempo de cocción
            3) Hora de finalización = Hora de inicio + Tiempo total
            Sugerencia: escriba su respuesta usando este formato: HH:MM AM o PM
            `,
          },
            {
            en:   `1) Total prep time: 60 / 2 = 30 minutes
            2) Total time = 30 + 60 = 90 minutes OR 1 hour 30 mins
            3) Finish Time = ${randomNum1} + 1 hour 30 mins = ${done}
            `,
            es:  `1) Tiempo total de preparación: 60 / 2 = 30 minutos
            2) Tiempo total = 30 + 60 = 90 minutos O 1 hora 30 minutos
            3) Hora de finalización = ${randomNum1} + 1 hora 30 minutos = ${done}
            `,
          }],
        "time",
    
        ))
    
        }

    //question 6 vegetable soup 
    if (recipe.name.en == "Vegetable Noodle Soup") {
      let randomNum = randomInt(300,500)
      let randomNum1 = randomInt(5,10)
      let firstStep = randomNum*randomNum1
      let answer = firstStep/1000
      //answer = Number(answer.toFixed(2));

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `One bag of fresh cilantro weighs about ${randomNum} grams. If Auntie Maria purchased ${randomNum1} bags, how many kilograms of cilantro does she have? Hint: 1 kilogram = 1,000 grams.`,
              es:  `Una bolsa de cilantro fresco pesa alrededor de ${randomNum} gramos. Si Tía María compró ${randomNum1} bolsas, ¿cuántos kilogramos de cilantro tiene? Pista: 1 kilogramo = 1000 gramos.`,
          
          },
          answer,
          [{
            en: `1) Total weight grams = One bag weight * bag amount
            2) Total weight kilograms = Total weight grams / 1000
            `,
            es: `1) Peso total de gramos = peso de una bolsa * cantidad de bolsa
                2) Peso total de kilogramos = peso total de gramos / 1000
                `,
          },
            {
            en:   `1) Total weight grams =  ${randomNum} * ${randomNum1} = ${firstStep}
            2) Total weight kilograms = ${firstStep}/ 1000 = ${answer}
            `,
            es:  `1) Peso total de gramos = ${randomNum} * ${randomNum1} = ${firstStep}
            2) Peso total de kilogramos = ${firstStep}/ 1000 = ${answer}
            `,
          }],
        "decimal",
    
        ))
    
        }

    //question 7 vegetable soup 
    if (recipe.name.en == "Vegetable Noodle Soup") {
      let randomNum = randomInt(4,17)
      let first_ingredient_key = Object.keys(recipe.ingredients)[3];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide(fractionOrInteger, randomNum, 'multiply')
      let simplify  = simplifyFraction(multipliedResult.result)
      let multipliedResult1 = multiplyOrDivide(multipliedResult.result, 6, 'divide')
      let answer  = simplifyFraction(multipliedResult1.result)

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `One bag of onions contains 6 medium onions. Auntie Maria makes ${randomNum} Vegetable soups. Represent the total fraction of onions used from the total of 6 medium onions. Please type your answer as a fraction.`,
              es:  `Una bolsa de cebollas contiene 6 cebollas medianas. La tía María hace ${randomNum} sopas de verduras. Representa la fracción total de cebollas usadas del total de 6 cebollas medianas. Por favor escriba su respuesta como una fracción.`,
          
          },
          answer.result,
          [{
            en: `1) Total onions used = Vegetables soups * onions per soup
            2) Total fraction of onions used = Total onions used / Total onions`,
            
            es:`1) Total de cebollas utilizadas = sopas de verduras * cebollas por sopa
            2) Fracción total de cebollas utilizadas = Total de cebollas utilizadas / Total de cebollas
            `,
          },
          {
          en:   `1) Total onions used = ${randomNum} * ${first_ingredient_key_amount} = (${simplify.result})
          2) Total fraction of onions used = (${simplify.result}) / 6 = ${answer.result}
          `,
          es:  `1) Total de cebollas usadas = ${randomNum} * ${first_ingredient_key_amount} = (${simplify.result})
          2) Fracción total de cebollas usadas = (${simplify.result}) / 6 = ${answer.result}
          `,
        }],
        answer.types,
    
        ))
    
        }

    //question 8 vegetable soup 
    if (recipe.name.en == "Vegetable Noodle Soup") {
      let randomNum = randomInt(8,16)
      let randomNum1 = randomInt(6,15)

      let first_ingredient_key = Object.keys(recipe.ingredients)[2];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)

      let second_ingredient_key = Object.keys(recipe.ingredients)[3];
      let second_ingredient_key_amount = recipe.ingredients[second_ingredient_key].amount;
      let fractionOrInteger1 = convertToFraction(second_ingredient_key_amount)

      let multipliedResult = multiplyOrDivide(fractionOrInteger, randomNum, 'multiply')
      let simplify  = simplifyFraction(multipliedResult.result)
      let multipliedResult1 = multiplyOrDivide(fractionOrInteger1, randomNum1, 'multiply')
      let simplify2  = simplifyFraction(multipliedResult1.result)

      let compare = compareNumbers(multipliedResult.result, multipliedResult1.result)
      let symbol;

      switch (compare) {
        case "greater_than":
          symbol = ">";
          break;
        case "less_than":
          symbol = "<";
          break;
        case "equal_to":
          symbol = "=";
          break;
        default:
          symbol = "";
          break;
      }
      
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria made ${randomNum} soups on Monday, and ${randomNum1} soups on Tuesday. Compare the total amount of noodles used on Monday with the total amount of onions used on Tuesday. Type your answer using >, =, or < symbols.`,
              es:  `Tía María hizo ${randomNum} porciones de sopa el lunes y ${randomNum1} porciones el martes. Compara la cantidad total de fideos utilizados el lunes con la cantidad total de cebollas utilizadas el martes. Escribe tu respuesta utilizando los símbolos >, = o <. `,
          
          },
          compare,
          [{
            en: `1)Total noodles Monday = Monday soups * cups of noodles per soup 
            2) Total onions Tuesday = Tuesday soups * onions per soup 
            3) Compare answer from (i) to answer from (ii) using >,=,<
            `,
            
            es:`1) Total de fideos el lunes = sopas del lunes * tazas de fideos por sopa
            2) Total de cebollas el martes = sopas del martes* cebollas por sopa
            3) Compare la respuesta de (i) con la respuesta de (ii) usando >,=,<
            `,
          },
          {
          en:   `1) Total noodles Monday = ${randomNum} * ${first_ingredient_key_amount} = ${simplify.result}
          2) Total onions Tuesday = ${randomNum1} * ${second_ingredient_key_amount} = ${simplify2.result}
          3) ${simplify.result}  ${symbol} ${simplify2.result} 
          `,
          es:  `1) Total de fideos el lunes =  ${randomNum} * ${first_ingredient_key_amount} = ${simplify.result}
          2) Total de cebollas el martes =  ${randomNum1} * ${second_ingredient_key_amount} = ${simplify2.result}
          3)${simplify.result}  ${symbol} ${simplify2.result} 
          `,
        }],
        "inequality",
    
        ))
    
        }

    //question 1 Mangu
    if (recipe.name.en == "Mangu with salami and fried cheese") {
      let randomNum = randomInt(3,10)

      let first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide(fractionOrInteger, randomNum, 'multiply')
      let answer  = simplifyFraction(multipliedResult.result)
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `How many tablespoons of salt are needed to make this recipe ${randomNum} times?`,
              es:  `¿Cuántas cucharadas de sal se necesitan para hacer esta receta ${randomNum} veces?`,
          
          },
          answer.result,
          [{
            en: `Total tablespoons = times recipe is made * tablespoon of salt for 1 recipe`,
            es: `Total de cucharadas = veces que se hace la receta * cucharada de sal para 1 receta`,
          },
            {
            en:  `Total tablespoons = ${randomNum} * ${first_ingredient_key_amount} = ${answer.result}`,
            es:  `Total de cucharadas = ${randomNum} * ${first_ingredient_key_amount} = ${answer.result}`,
          }],
        answer.types,
    
        ))
    
        }

    //question 2 Mangu
    if (recipe.name.en == "Mangu with salami and fried cheese") {
      let randomNum = randomInt(20,81)

      let serving_size = recipe.servingSize
      let first_ingredient_key = Object.keys(recipe.ingredients)[6];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let multipliedResult1 = fractionOrInteger/serving_size
      let multipliedResult = multiplyOrDivide(multipliedResult1, randomNum, 'multiply')
      let answer  = simplifyFraction(multipliedResult.result)
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `How many slices of salami does Auntie Maria need to make ${randomNum} servings of mangu with salami and fried cheese?`,
              es: `¿Cuántas rebanadas de salami necesita la tía María para hacer ${randomNum} porciones de mangu con salami y queso frito?`,
          
          },
          answer.result,
          [{
            en: `1) Salami slice for 1 serving = recipe salami amount / servings per recipe 
            2) Total salami needed = ${randomNum} x Salami slice for 1 serving `,
            es: `1) Rebanada de salami para 1 porción = cantidad de salami por receta / porciones por receta
            2) Total de salami necesario = ${randomNum} x rebanada de salami para 1 porción
            `,
          },
            {
            en:  `1) Salami slice for 1 serving = ${first_ingredient_key_amount} slices / ${serving_size} servings = ${multipliedResult1} slices
            2) Total salami needed = ${randomNum} x ${multipliedResult1} slices = ${answer.result}`,
            es:  `1) Rebanada de salami para 1 porción = ${first_ingredient_key_amount} rebanadas / ${serving_size} porciones = ${multipliedResult1} rebanadas
            2) Total de salami necesario= ${randomNum} x ${multipliedResult1} rebanadas = ${answer.result}`,            
          }],
        answer.types,
    
        ))
    
        }

    //question 3 Mangu
    if (recipe.name.en == "Mangu with salami and fried cheese") {
      let randomNum = randomInt(4,6)
      let first_step = randomNum*18
      let fractionOrInteger = convertToFraction('1/6')
      let multipliedResult = multiplyOrDivide(fractionOrInteger, first_step, 'multiply')
      let answer  = simplifyFraction(multipliedResult.result)
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `A large carton of eggs contains 18 eggs. Auntie Maria finds that 1/6 of all the eggs she bought were damaged. If she bought ${randomNum} large cartons of eggs that day, how many eggs were damaged?`,
              es: `Un cartón grande de huevos contiene 18 huevos. La tía María descubre que 1/6 de todos los huevos que compró estaban dañados. Si compró ${randomNum} cartones grandes de huevos ese día, ¿cuántos huevos se dañaron?`,
          
          },
          answer.result,
          [{
            en: `1) Total eggs bought = number of cartons of eggs * eggs per 1 carton
            2) Total eggs damaged = total eggs bought * fraction of damaged eggs`,
            es: `1) Total de huevos comprados = número de cajas de huevos * huevos por 1 caja
            2) Total de huevos dañados = total de huevos comprados * fracción de huevos dañados
            `,
          },
            {
            en:  `Total eggs bought = 18 * ${randomNum} = = ${first_step}
            Total eggs damaged = ${first_step} * (1/6) = ${answer.result}`,
            es:  `1) Total de huevos comprados = 18 * ${randomNum} = ${first_step}
            2) Total de huevos dañados = ${first_step} * (1/6) = ${answer.result}`,            
          }],
        answer.types,
    
        ))
    
        }

    //question 4 Mangu
    if (recipe.name.en == "Mangu with salami and fried cheese") {
      let randomNum = randomInt(300,700)
      let first_ingredient_key = Object.keys(recipe.ingredients)[0];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let answer  = Math.floor(randomNum/fractionOrInteger)

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `If Auntie Maria uses ${randomNum} plantains for this recipe in a month, how many times has she made this recipe? Please round your answer down to the nearest whole number.`,
              es: `Si la tía María usa ${randomNum} plátanos para esta receta en un mes, ¿cuántas veces ha hecho esta receta? Por favor redondee su respuesta al número entero más cercano.`,
          
          },
          answer,
          [{
            en: `Total recipes made = Total plantains / plantains per recipe`,
            es: `Total de recetas hechas = Total plátanos/plátanos por receta`,
          },
            {
            en:  `Total recipes made = ${randomNum} / ${first_ingredient_key_amount} = ${answer}`,
            es:  `Total de recetas hechas = ${randomNum} / ${first_ingredient_key_amount} = ${answer}`,            
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 5 Mangu
    if (recipe.name.en == "Mangu with salami and fried cheese") {
      let randomNum = randomInt(2,6)
      let first_step = randomNum*4*8
      let first_ingredient_key = Object.keys(recipe.ingredients)[3];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let answer  = Math.floor(first_step/fractionOrInteger)

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `One pack of butter contains 4 sticks of butter. If each stick of butter is equivalent to 8 tablespoons of butter, how many total times can Auntie Maria make this recipe if she has ${randomNum} packs of butter?`,
              es: `Un paquete de mantequilla contiene 4 barras de mantequilla. Si cada barra de mantequilla equivale a 8 cucharadas de mantequilla, ¿cuántas veces en total puede hacer esta receta la tía María si tiene ${randomNum} paquetes de mantequilla?`,
          
          },
          answer,
          [{
            en: `1) Total tablespoons of butter = packs of butter * sticks per 1 pack * tablespoons per 1 stick 
            2) Total recipes made = total tablespoons butter / tablespoons needed for 1 recipe
            `,
            es: `1) Total de cucharadas de mantequilla = paquetes de mantequilla * barras por 1 paquete * cucharadas por 1 barra
            2) Total de recetas hechas = total de cucharadas de mantequilla / cucharadas necesarias para 1 receta
            `,
          },
            {
            en:  `Total tablespoons of butter = ${randomNum} * 4 * 8 = ${first_step}
            Total recipes made = ${first_step} / ${first_ingredient_key_amount} = ${answer}`,
            es:  `1) Total de cucharadas de mantequilla = ${randomNum} * 4 * 8 = ${first_step}
            2) Total de recetas hechas =${first_step} / ${first_ingredient_key_amount} = ${answer}`, 
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 6 Mangu
    if (recipe.name.en == "Mangu with salami and fried cheese") {
      let randomNum = randomInt(10,16)
      let cookTime = recipe.cookTime
      let prepTime = recipe.prepTime
      let cookTime2 = cookTime*2
      let timeTotal = cookTime2+prepTime
      let answer1 = timeTotal* randomNum

      let totalMinutes = 9 * 60 + 15;

      let part1 = answer1

            // Add the desired number of minutes
            totalMinutes += part1;
      
            // Calculate the new hours and minutes
            let newHours = Math.floor(part1 / 60);
            let newMinutes = part1 % 60;

            // Handle the case when the minutes exceed 59
            if (newMinutes > 59) {
              newHours += Math.floor(newMinutes / 60);
              newMinutes %= 60;
            }
      
            let finalTimeHr = (9+newHours)
            let finalTimeSec = (15+newMinutes)

              // Adjust the finalTimeHr and finalTimeMin if necessary
            if (finalTimeSec >= 60) {
              finalTimeHr += Math.floor(finalTimeSec / 60);
              finalTimeSec %= 60;
            }
            // Convert finalTimeHr to 12-hour format and add AM or PM
            let formattedTimeHr = finalTimeHr % 12 || 12;
            let amPm = finalTimeHr < 12 ? 'AM' : 'PM';
            // Add leading zeros if finalTimeMin is 9 or less
            finalTimeSec = finalTimeSec.toString().padStart(2, '0');
            let done = formattedTimeHr + ":" + finalTimeSec + amPm

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Auntie Maria’s goal is to prepare the mangu with salami and fried cheese recipe ${randomNum} times. However, half of her stovetops are not working. This means it takes her double the amount of cooking time than normal. The normal prep time is 10 minutes and the normal cook time is 20  minutes. If Auntie Maria began making the food at 9:15 A.M, at what time did she finish? Hint: 1 hour = 60 minutes. Please type your answer in time format (HH:MM AM or PM)`,
              es: `El objetivo de la tía María es preparar la receta de mangu con salami y queso frito ${randomNum} veces. Sin embargo, la mitad de sus estufas no funcionan. Esto significa que le toma el doble de tiempo de cocción de lo normal. El tiempo normal de preparación es de 10  minutos y el tiempo de cocción de 20 minutos. Si la tía María comenzó a preparar la comida a las 9:15 a. m., ¿a qué hora terminó? Pista: 1 hora = 60 minutos. Escriba su respuesta en formato de hora (HH:MM AM o PM).`,
          
          },
          done,
          [{
            en: `1) New cook time per recipe = original cook time * 2
            2) Total time per recipe = new cook time per recipe + prep time
            3) Total time for all recipes = total time per recipe * number of recipes made
            4) Finish Time = Start time + total time for all recipes 
            `,
            es: `1) Nuevo tiempo de cocción por receta = tiempo de cocción original * 2
            2) Tiempo total por receta = nuevo tiempo de cocción por receta + tiempo de preparación
            3) Tiempo total para todas las recetas = tiempo total por receta * número de recetas hechas
            4) Hora de finalización = Hora de inicio + tiempo total para todas las recetas
            `,
          },
            {
            en:  `1) New cook time per recipe = ${cookTime} * 2= ${cookTime2} minutes
            2) Total time per recipe = ${cookTime2} + ${prepTime} = ${timeTotal} minutes
            3) Total time for all recipes = ${timeTotal} * ${randomNum} = ${answer1} minutes
            4) Finish Time = 9:15 AM + ${answer1} minutes = ${done}
            `,
            es:  `1) Nuevo tiempo de cocción por receta = ${cookTime} * 2 = ${cookTime2} minutos
            2) Tiempo total por receta = ${cookTime2} + ${prepTime} = ${timeTotal} minutos
            3) Tiempo total para todas las recetas = ${timeTotal} * ${randomNum} = ${answer1} minutos
            4) Hora de finalización = 9:15 a. m. + ${answer1} minutos = ${done}
            `, 
          }],
        "time",
    
        ))
    
        }

    //question 7 Mangu
    if (recipe.name.en == "Mangu with salami and fried cheese") {
      let randomNum = randomInt(4,81)
      let serving_size = recipe.servingSize
      let first_ingredient_key = Object.keys(recipe.ingredients)[0];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide(fractionOrInteger, serving_size, 'divide')
      let simplify = simplifyFraction(multipliedResult.result)
      let multipliedResult1 = multiplyOrDivide(multipliedResult.result, randomNum, 'multiply')
      let answer = simplifyFraction(multipliedResult1.result)

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `How many plantains did Auntie Maria use to make ${randomNum} servings? Represent your answer in a fraction form and make sure to simplify!`,
              es: `¿Cuántos plátanos usó la tía María para hacer ${randomNum} porciones? ¡Represente su respuesta en forma de fracción y asegúrese de simplificar!`,
          
          },
          answer.result,
          [{
            en: `1) Plantains per serving = plantains for 1 recipe / servings for 1 recipe
            2) Total plantains used = Plantains per serving * total servings 
            `,
            es: `1) Plátanos por porción = plátanos para 1 receta / porciones para 1 receta
            2) Total de plátanos usados= Plátanos por porción * porciones totales
            `,
          },
            {
            en:  `1) Plantains per serving = ${first_ingredient_key_amount} plantains / ${serving_size} servings = ${simplify.result}
            2) Total plantains used = ${simplify.result} * ${randomNum} = ${answer.result}
            `,
            es:  `1)Plátanos por porción = ${first_ingredient_key_amount} plátanos / ${serving_size} porciones = ${simplify.result}
            2) Total de plátanos usados = ${simplify.result} * ${randomNum} = ${answer.result}
            `, 
          }],
        answer.types,
    
        ))
    
        }

    //question 8 Mangu
    if (recipe.name.en == "Mangu with salami and fried cheese") {
      let randomNum = randomInt(10,31)
      let first_ingredient_key = Object.keys(recipe.ingredients)[5];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let amount = "3/2"
      let fractionOrInteger1 = convertToFraction(amount)
      let multipliedResult = multiplyOrDivide(fractionOrInteger1,fractionOrInteger, 'multiply')
      let simplify = simplifyFraction(multipliedResult.result)
      let multipliedResult1 = multiplyOrDivide(multipliedResult.result, randomNum, 'multiply')
      let answer = simplifyFraction(multipliedResult1.result)

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Today, Auntie Maria has decided to increase the amount of fried cheese in this recipe by 1 ½ times. Using this updated amount of cheese, calculate how many fried cheese strips were used to make the mangu with salami and fried cheese recipe ${randomNum} times?`,
              es: `Hoy, la tía María ha decidido aumentar 1 ½ veces la cantidad de queso frito en esta receta. Usando esta cantidad actualizada de queso, ¿cuántas tiras de queso frito se usaron para hacer la receta de mangu con salami y queso frito ${randomNum} veces?`,
          
          },
          answer.result,
          [{
            en: `1) New cheese amount = original cheese amount * increase factor ${first_ingredient_key_amount} x 1 ½ = ${simplify.result}
            2) Total cheese strips = new cheese amount * desired recipe amount`,
            es: `1) Nueva cantidad de queso = cantidad de queso original * factor de aumento ${first_ingredient_key_amount} x 1 ½ = ${simplify.result}
            2) Total de tiras de queso = nueva cantidad de queso  * cantidad de receta deseada
            `,
          },
            {
            en:  `1) New cheese amount = ${first_ingredient_key_amount} * 1 ½ = ${simplify.result} cheese strips 
            2) Total cheese strips = ${simplify.result} * ${randomNum} = ${answer.result} 
            `,
            es:  `1) Nueva cantidad de queso  = ${first_ingredient_key_amount} * 1 ½ = ${simplify.result} tiras de queso
           2)  Total de tiras de queso = ${simplify.result} * ${randomNum} = ${answer.result}
            `, 
          }],
        answer.types,
    
        ))
    
        }

    //question 1 Fruit Salad
    if (recipe.name.en == "Fruit Salad") {
      let randomNum = randomInt(10,21)

      let first_ingredient_key = Object.keys(recipe.ingredients)[0];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide(fractionOrInteger, randomNum, 'multiply')
      let answer  = simplifyFraction(multipliedResult.result)
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `How many total whole papayas will Auntie Maria need to purchase to make ${randomNum} servings of fruit salad? Round up to the nearest whole number.`,
              es: `¿Cuántas papayas enteras en total necesitará comprar la tía María para hacer ${randomNum} porciones de ensalada de frutas? Redondea al número entero más cercano.`,
          
          },
          answer.result,
          [{
            en: `Total papayas = papayas per serving * number of servings  `,
            es: `Total de papayas = papayas por porción * número de porciones `,
          },
            {
            en:  `Total papayas = ${randomNum} * (${first_ingredient_key_amount}) = ${answer.result} `,
            es:  `Total de papayas = ${randomNum}] * (${first_ingredient_key_amount}) = ${answer.result}`,            
          }],
        answer.types,
    
        ))
    
        }

    //question 2 Fruit Salad
    if (recipe.name.en == "Fruit Salad") {
      let randomNum = randomInt(5,25)

      let first_ingredient_key = Object.keys(recipe.ingredients)[2];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide(fractionOrInteger, randomNum, 'multiply')
      let answer  = simplifyFraction(multipliedResult.result)
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `How many cups of berries will Auntie use to make ${randomNum} servings of fruit salad? Please type your answer as a fraction.`,
              es: `¿Cuántas tazas de bayas usará la tía para hacer ${randomNum} porciones de ensalada de frutas? Por favor escriba su respuesta como una fracción.`,
          
          },
          answer.result,
          [{
            en: `Total cups berries = berries per 1 serving * number of servings   `,
            es: `Total de tazas de bayas = bayas por 1 porción * número de porciones `,
          },
            {
            en:  `Total cups berries = ${randomNum} x (${first_ingredient_key_amount})  = ${answer.result}  `,
            es:  `Total de tazas de bayas = ${randomNum} x (${first_ingredient_key_amount})  = ${answer.result}  
            `,            
          }],
        answer.types,
    
        ))
    
        }

    //question 3 Fruit Salad
    if (recipe.name.en == "Fruit Salad") {
      let randomNum = randomInt(5,7)
      let randomNum1 = randomInt(2,5)
      let first_step = randomNum*randomNum1
      let first_ingredient_key = Object.keys(recipe.ingredients)[3];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide(first_step, fractionOrInteger, 'divide')
      let answer  = simplifyFraction(multipliedResult.result)

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `In one box of kiwis, there are ${randomNum} kiwis. How many servings of fruit salad can Auntie Maria make if she buys ${randomNum1} kiwi boxes?`,
              es: `En una caja de kiwis, hay ${randomNum} kiwis. ¿Cuántas porciones de ensalada de frutas puede hacer Tía María si compra ${randomNum1} cajas de kiwis?`,
          
          },
          answer.result,
          [{
            en: `1) Total kiwis = kiwi boxes * number of kiwis per 1 box 
            2) Total servings = total kiwis / kiwi amount per 1 serving
              `,
            es: `1) Total de kiwis = cajas de kiwi x número de kiwis por 1 caja
            2) Total de porciones = cantidad total de kiwis / kiwi por 1 porción
             `,
          },
            {
            en:  `Total kiwis = ${randomNum} x ${randomNum1} = ${first_step}
            Total servings = ${first_step}/ (${first_ingredient_key_amount}) = ${answer.result}
             `,
            es:  `1) Total de kiwis  = ${randomNum} x ${randomNum1} = ${first_step}
            2) Total de porciones= ${first_step}/ (${first_ingredient_key_amount}) = ${answer.result}
            `,            
          }],
        answer.types,
    
        ))
    
        }

    //question 4 Fruit Salad
    if (recipe.name.en == "Fruit Salad") {
      let randomNum = randomInt(10,20)
      let first_ingredient_key = Object.keys(recipe.ingredients)[3];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide( fractionOrInteger, randomNum, 'multiply')
      let answer  = simplifyFraction(multipliedResult.result)
      if (answer.types == "fraction"){
        answer.result = Math.ceil(multipliedResult.result.numerator/multipliedResult.result.denominator)
      }
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `How many kiwis are used to make ${randomNum} servings? Round your answer up to the nearest whole number.`,
              es: `¿Cuántos kiwis se usan para hacer ${randomNum} porciones? Redondea tu respuesta al número entero más cercano`,
          
          },
          answer.result,
          [{
            en: `Total kiwis = number of servings * kiwi amount per 1 serving `,
            es: `Total de kiwis = número de porciones * cantidad de kiwi por 1 porción`,
          },
            {
            en:  `Total kiwis = ${randomNum} *${first_ingredient_key_amount} = ${answer.result}`,
            es:  `Total de kiwis = ${randomNum} * ${first_ingredient_key_amount} = ${answer.result}`,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 5 Fruit Salad
    if (recipe.name.en == "Fruit Salad") {
      let randomNum = randomInt(5,26)
      let first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide( fractionOrInteger, randomNum, 'multiply')
      let answer  = simplifyFraction(multipliedResult.result)

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `How many cups of mango are used to make ${randomNum} servings?`,
              es: `¿Cuántas tazas de mango se usan para hacer ${randomNum} porciones?`,
          
          },
          answer.result,
          [{
            en: `Total cups of mango = number of servings * cups of mango per 1 serving `,
            es: `Total de tazas de mango = número de porciones * tazas de mango por 1 porción`,
          },
            {
            en:  `Total cups of mango = ${randomNum} x (${first_ingredient_key_amount}) = ${answer.result}`,
            es:  `Total de tazas de mango = ${randomNum} x (${first_ingredient_key_amount}) = ${answer.result}`,
          }],
        answer.types,
    
        ))
    
        }

    //question 6 Fruit Salad
    if (recipe.name.en == "Fruit Salad") {
      let randomNum = randomInt(25,41)
      let first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide( fractionOrInteger, randomNum, 'multiply')
      let answer  = simplifyFraction(multipliedResult.result)
      if (answer.types == "fraction"){
        answer.result = Math.ceil(multipliedResult.result.numerator/multipliedResult.result.denominator)
      }

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `How many whole mangoes will Auntie Maria need to buy to make ${randomNum} servings of fruit salad? Assume 1 mango equals 1 cup of mango. Round up to the nearest whole number. `,
              es: `¿Cuántos mangos enteros necesitará comprar la tía María para hacer ${randomNum} porciones de ensalada de frutas? Suponga que 1 mango equivale a 1 taza de mango. Redondea al número entero más cercano.`,
          
          },
          answer.result,
          [{
            en: `Total mangoes = number of servings * cups of mango per 1 serving`,
            es: `Total de mangos = número de porciones * tazas de mango por 1 porción`,
          },
            {
            en:  `Total mangoes =${randomNum} x (${first_ingredient_key_amount}) = ${answer.result}`,
            es:  `Total de mangos  =${randomNum} x (${first_ingredient_key_amount}) = ${answer.result}`,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 7 Fruit Salad
    if (recipe.name.en == "Fruit Salad") {
      let randomNum = randomInt(20,50)
      let first_ingredient_key = Object.keys(recipe.ingredients)[3];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide( fractionOrInteger, randomNum, 'multiply')
      let answer  = simplifyFraction(multipliedResult.result)
      if (answer.types == "fraction"){
        answer.result = Math.ceil(multipliedResult.result.numerator/multipliedResult.result.denominator)
      }

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `How many whole kiwis are needed to make ${randomNum} servings of fruit salad? Round up to the nearest whole number. `,
              es: `¿Cuántos kiwis enteros se necesitan para hacer ${randomNum} porciones de ensalada de frutas? Redondea al número entero más cercano.`,
          
          },
          answer.result,
          [{
            en: `Total kiwis = number of servings * kiwis per 1 serving`,
            es: `Total de kiwis = número de porciones * kiwis por 1 porción `,
          },
            {
            en:  `Total kiwis =${randomNum} x (${first_ingredient_key_amount}) = ${answer.result}`,
            es:  `Total de kiwi  =${randomNum} x (${first_ingredient_key_amount}) = ${answer.result}`,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 8 Fruit Salad
    if (recipe.name.en == "Fruit Salad") {
      let randomNum = randomInt(5,10)
      let answer = randomNum * 4

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `If Auntie Maria used a total of ${randomNum} whole mangoes last week to make fruit salad, how many total servings did she make? Assume 1 mango equals 1 cup of mango. `,
              es: `Si la tía María usó un total de ${randomNum} mangos enteros la semana pasada para hacer una ensalada de frutas, ¿cuántas porciones hizo en total? Suponga que 1 mango equivale a 1 taza de mango.`,
          
          },
          answer,
          [{
            en: `Hint: 1 mango makes 4 servings of fruit salad!
             Total servings = number of mangoes * 4 servings for 1 mango`,
            es: `Pista: ¡1 mango rinde 4 porciones de ensalada de frutas!
            Total de porciones = número de mangos * 4 porciones por 1 mango
            `,
          },
            {
            en:  `Total servings = ${randomNum} * 4 = ${answer}`,
            es:  `Total de porciones = ${randomNum} * 4 = ${answer}`,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 9 Fruit Salad
    if (recipe.name.en == "Fruit Salad") {
      let randomNum = randomInt(3,12)
      let prepTime = recipe.prepTime
      let first_step = randomNum *10
      let answer = first_step * 60


         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `How many total seconds will it take Auntie Maria to prep ${randomNum} servings of fruit salad? The prep time for one recipe es 10 minutes Hint: there are 60 seconds in 1 minute.  `,
              es: `¿Cuántos segundos en total le tomará a la tía María preparar ${randomNum} porciones de ensalada de frutas? El tiempo de preparación de una receta es de 10 minutos. Pista: hay 60 segundos en 1 minuto.`,
          
          },
          answer,
          [{
            en: `1) Total minutes = prep time for 1 serving * number of servings 
            2) Total seconds = total minutes * 60 seconds per 1 minute
            `,
            es: `1) Total de minutos = tiempo de preparación para 1 porción * número de porciones
            2) Total de segundos = total de minutos * 60 segundos por 1 minuto
             `,
          },
            {
            en:  `Total minutes =  ${prepTime} * ${randomNum} = ${first_step}
            Total seconds = ${first_step} * 60 = ${answer}
            `,
            es:  `1) Total de minutos = ${prepTime} * ${randomNum} = ${first_step}
            2) Total de segundos = ${first_step} * 60 = ${answer}
            `,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 10 Fruit Salad
    if (recipe.name.en == "Fruit Salad") {
      let length = 19.5 
      let width = 9
      let answer = length*2 + width*2


         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `To cut all the fruit, Auntie Maria uses a rectangular cutting board. The dimensions of the cutting board are as follows: Width 9 cm, Length 19.5 cm. What is the perimeter of this board in cm? `,
              es: `Para cortar toda la fruta, la tía María usa una tabla de cortar rectangular. Las dimensiones de la tabla de cortar son las siguientes: Ancho 9 cm, Largo 19.5 cm. ¿Cuál es el perímetro de esta tabla en cm?`,
          
          },
          answer,
          [{
            en: `Hint: Perimeter = sum of all sides
            Perimeter = Width + Width + Length + Length  OR (2*Length) + (2*Width)
             `,
            es: `Pista: Perímetro = suma de todos los lados
            Perímetro = Ancho + Ancho + Largo + Largo O (2*Largo) + (2*Ancho)
            `,
          },
            {
            en:  `Board perimeter = ${length} + ${length} + ${width} + ${width} = ${answer} centimeters  `,
            es:  `Perímetro del tablero  = ${length} + ${length} + ${width} + ${width} = ${answer} centímetros`,
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 1 ginger juice
    if (recipe.name.en == "Pineapple ginger juice") {
      let randomNum = randomInt(10,21)
      let answer = randomNum* 16

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `One gallon of pineapple juice is equal to 16 cups of juice. How many total cups of juice are in ${randomNum} gallons?`,
              es: `Un galón de jugo de piña equivale a 16 tazas de jugo. ¿Cuántas tazas de jugo hay en total en ${randomNum} galones?`,
          
          },
          answer,
          [{
            en: `Total cups juice = total gallons * cups of juice per 1 gallon`,
            es: `Total de tazas de jugo = total de galones * tazas de jugo por 1 galón `,
          },
            {
            en:  `Total cups juice = ${randomNum} * 16 = ${answer}  `,
            es:  `Total de tazas de jugo = ${randomNum} * 16 = ${answer}`,            
          }],
        "wholeNumber",
    
        ))
    
        }

    //question 2 ginger juice
    if (recipe.name.en == "Pineapple ginger juice") {
      let randomNum = randomInt(10,21)
      let serving_size = recipe.servingSize
      let first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount+"/"+serving_size)
      let simplify = simplifyFraction(fractionOrInteger)
      let multipliedResult = multiplyOrDivide( fractionOrInteger, randomNum, 'multiply')
      let answer  = simplifyFraction(multipliedResult.result)


         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `How many total cups of water will Auntie Maria need to make ${randomNum} servings of pineapple ginger juice?`,
              es: `¿Cuántas tazas de agua en total necesitará la tía María para hacer ${randomNum} porciones de jugo de piña y jengibre?`,
          
          },
          answer.result,
          [{
            en: `1) Cups of water per 1 serving = recipe water amount / recipe servings 
            2) Total cups of water = cups of water per 1 serving * number of servings needed`,
            es: `1) Tazas de agua por 1 porción = cantidad de agua de la receta / porciones de la receta
            2) Total de tazas de agua = tazas de agua por 1 porción * número de porciones necesarias
             `,
          },
            {
            en:  `1) Cups of water per 1 serving = ${first_ingredient_key_amount} cups / ${serving_size} recipe servings =  ${simplify.result} cups 
            2) Total cups of water = (${simplify.result}) * ${randomNum} = ${answer.result}
             `,
            es:  `1) Tazas de agua por 1 porción = ${first_ingredient_key_amount} tazas / ${serving_size} porciones de recetas =  ${simplify.result} tazas
            2) Total de tazas de agua =(${simplify.result}) * ${randomNum} = ${answer.result}
            `,            
          }],
        answer.types,
    
        ))
    
        }

    //question 3 ginger juice
    if (recipe.name.en == "Pineapple ginger juice") {
      const fractions = [6,12,18,24,30];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let serving_size = recipe.servingSize
      let first_ingredient_key = Object.keys(recipe.ingredients)[2];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount+"/"+serving_size)
      let simplify = simplifyFraction(fractionOrInteger)
      let multipliedResult = multiplyOrDivide( fractionOrInteger, randomFraction, 'multiply')
      let answer  = simplifyFraction(multipliedResult.result)


         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `How many total inches of ginger will Auntie Maria need to make ${randomFraction} servings of pineapple ginger juice?`,
              es: `¿Cuántas pulgadas en total de jengibre necesitará la tía María para hacer ${randomFraction} porciones de jugo de piña y jengibre?`,
          
          },
          answer.result,
          [{
            en: `1) Ginger per 1 serving = recipe ginger amount / recipe servings 
            2) Total ginger inches = Ginger per 1 serving * needed servings 
            `,
            es: `1) Jengibre por 1 porción = cantidad de jengibre por receta  / porciones de receta
            2) Pulgadas totales de jengibre = Jengibre por 1 porción * porciones necesarias
            `,
          },
            {
            en:  `1) Ginger per 1 serving = (${first_ingredient_key_amount}) / ${serving_size} = ${simplify.result} inches
            2) Total ginger inches = (${simplify.result}) *${randomFraction} = ${answer.result}
            `,
            es:  `1) Jengibre por 1 porción = (${first_ingredient_key_amount}) / ${serving_size} = ${simplify.result} pulgadas
            2) Pulgadas de jengibre totales = (${simplify.result}) * ${randomFraction} = ${answer.result}
            `,            
          }],
        answer.types,
    
        ))
    
        }

    //question 4 ginger juice
    if (recipe.name.en == "Pineapple ginger juice") {
      let randomNum = randomInt(200,401)
      let randomNum1 = randomInt(2,6)
      let serving_size = recipe.servingSize
      let first_step = randomNum/serving_size
      let first_step2 = Number(first_step.toFixed(2));
      let answer1 = first_step2* randomNum1
      let answer = Number(answer1.toFixed(2));

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `If six servings of pineapple ginger juice contain ${randomNum} grams of sugar, how many grams of sugar are in ${randomNum1} servings?`,
              es: `Si seis porciones de jugo de piña y jengibre contienen ${randomNum} gramos de azúcar, ¿cuántos gramos de azúcar hay en ${randomNum1} porciones?`,
          
          },
          answer,
          [{
            en: `1) Sugar grams per 1 serving = sugar grams per 6 servings / ${serving_size} juice servings
            2) Total grams of sugar = sugar grams per 1 serving * needed servings
            `,
            es: `1) Gramos de azúcar por 1 porción = gramos de azúcar por 6 porciones / ${serving_size} porciones de jugo
            2) Total de gramos de azúcar = gramos de azúcar por 1 porción * porciones necesarias
            `,
          },
            {
            en:  `1) Sugar grams per 1 serving = ${randomNum} / ${serving_size} = ${first_step2}
            2) Total grams of sugar = ${first_step2} * ${randomNum1} =  ${answer} grams
            `,
            es:  `1) Gramos de azúcar por 1 porción = ${randomNum} / ${serving_size} = ${first_step2}
            Total de gramos de azúcar = ${first_step2} *  ${randomNum1} = ${answer} gramos
            `,            
          }],
        "decimal",
    
        ))
    
        }

    //question 5 ginger juice
    if (recipe.name.en == "Pineapple ginger juice") {
      let randomNum = randomInt(5,31)
      let prepTime = recipe.prepTime
      let first_step = randomNum * prepTime
      

      let totalMinutes = 16 * 60 + 30;


            // Subtract the desired number of minutes
      totalMinutes -= first_step;

      // Calculate the new hours and minutes
      let newHours = Math.floor(totalMinutes / 60);
      let newMinutes = totalMinutes % 60;

      // Handle the case when the minutes exceed 59
      if (newMinutes < 0) {
        newHours -= Math.ceil(Math.abs(newMinutes) / 60);
        newMinutes = 60 - Math.abs(newMinutes) % 60;
      }
      if (newHours < 0) {
        newHours = 24 - Math.abs(newHours) % 24;
      }

            // Adjust the finalTimeHr and finalTimeMin if necessary
      if (newMinutes >= 60) {
        newHours += Math.floor(newMinutes / 60);
        newMinutes %= 60;
      } else if (newMinutes < 0) {
        newHours -= Math.ceil(Math.abs(newMinutes) / 60);
        newMinutes = 60 - Math.abs(newMinutes) % 60;
      }


      // Convert finalTimeHr to 12-hour format and add AM or PM
      let formattedTimeHr = newHours % 12 || 12;
      let amPm = newHours < 12 ? 'AM' : 'PM';

      // Add leading zeros if finalTimeMin is 9 or less
      let formattedTimeMin = newMinutes.toString().padStart(2, '0');
      let done = formattedTimeHr + ":" + formattedTimeMin  + amPm;

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Aunt Maria wants to prepare ${randomNum} pineapple ginger juices by 4:30 PM. Prep time for each recipe is 5 minutes What is the latest time Aunt Maria can start prepping to make this recipe? Hint: 1 hour = 60 minutes. Type your answer in an hour-minute format (ex. 1:15 PM).`,
              es: `La tía María quiere preparar ${randomNum} jugos de piña y jengibre para las 4:30 p. m. El tiempo de preparación por receta es de 5 minutos.  ¿A que hora por mas tardar puede la tía María comenzar a prepararse para hacer esta receta? Pista: 1 hora = 60 minutos. Escriba su respuesta en un formato de hora y minuto (por ejemplo, 1:15 p. m.).`,
          
          },
          done,
          [{
            en: `1) Total prep time = prep time for 1 juice * number of juices 
            2) Start time = Finish time - Total prep time needed`,
            es: `1) Tiempo total de preparación = tiempo de preparación para 1 jugo * número de jugos
             2) Hora de inicio = Hora de finalización - Tiempo total de preparación necesario
            `,
          },
            {
            en:  `1) Total prep time = 5 * ${randomNum} = ${first_step} minutes
            2) Start time = 4:30 PM - ${first_step} minutes = ${done}
            `,
            es:  `1) Tiempo total de preparación = 5 * ${randomNum} = ${first_step} minutos
            2) Hora de inicio = 4:30 p. m. - ${first_step} minutos = ${done}
            `,            
          }],
        "time",
    
        ))
    
        }

    //question 6 ginger juice
    if (recipe.name.en == "Pineapple ginger juice") {
      let randomNum = randomInt(10,41)
      let prepTime = recipe.prepTime
      let cookTime = recipe.cookTime
      let first_step =  prepTime + cookTime
      let second_step = first_step*randomNum
      let third_step = second_step + 45
      
      let totalMinutes = 11 * 60 + 0;

      let part1 = third_step

            // Add the desired number of minutes
            totalMinutes += part1;
      
            // Calculate the new hours and minutes
            let newHours = Math.floor(part1 / 60);
            let newMinutes = part1 % 60;

            // Handle the case when the minutes exceed 59
            if (newMinutes > 59) {
              newHours += Math.floor(newMinutes / 60);
              newMinutes %= 60;
            }
      
            let finalTimeHr = (9+newHours)
            let finalTimeSec = (15+newMinutes)

              // Adjust the finalTimeHr and finalTimeMin if necessary
            if (finalTimeSec >= 60) {
              finalTimeHr += Math.floor(finalTimeSec / 60);
              finalTimeSec %= 60;
            }
            // Convert finalTimeHr to 12-hour format and add AM or PM
            let formattedTimeHr = finalTimeHr % 12 || 12;
            let amPm = finalTimeHr < 12 ? 'AM' : 'PM';
            // Add leading zeros if finalTimeMin is 9 or less
            finalTimeSec = finalTimeSec.toString().padStart(2, '0');
            let done = formattedTimeHr + ":" + finalTimeSec + amPm
    

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Aunt Maria wants to make pineapple ginger juice ${randomNum} times today. Prep time for one recipe is 5 minutes and blend time is 2 minutes. She starts prepping at 11:00 AM but she takes a 45 minute break at 12:00 PM. At what time will she finish? Type your answer in an hour-minute format (ex. 1:15 PM).`,
              es: `La tía María quiere hacer jugo de piña y jengibre ${randomNum} veces hoy. El tiempo de preparación de una receta es 5 minutos y el tiempo de licuado es de 2 minutos. Comienza a prepararse a las 11:00 a. m. pero toma un descanso de 45 minutos a las 12:00 p. m. ¿A qué hora terminará? Escriba su respuesta en un formato de hora y minuto (por ejemplo, 1:15 p. m.).`,
          
          },
          done,
          [{
            en: `1) Time for 1 juice = prep time + blend time 
            2) Time for all juices = juice quantity * time for 1 juice
           3)  Total time needed = time for all juices + break time 
            4) Finish time = Start time + total time needed
            `,
            es: `1)Tiempo para 1 jugo = tiempo de preparación + tiempo de licuado
            2) Tiempo para todos los jugos = cantidad de jugo * tiempo para 1 jugo
            3) Tiempo total necesario = tiempo para todos los jugos + tiempo de descanso
           4)  Hora de finalización = hora de inicio + tiempo total necesario
            `,
          },
            {
            en:  `1) Time for 1 juice = ${prepTime} minutes + ${cookTime} minutes = ${first_step} minutes
            2) Time for all juices = ${randomNum} * ${first_step} = ${second_step} minutes
           3) Total time needed = ${second_step} + 45 minutes = ${third_step} minutes
            4) Finish time = 11:00 AM + ${third_step} minutes = ${done}
            `,
            es:  `1) Tiempo para 1 jugo = ${prepTime} minutos + ${cookTime} minutos = ${first_step} minutos
            2) Tiempo para todos los jugos = ${randomNum} * ${first_step} = ${second_step} minutos
           3)  Tiempo total necesario = ${second_step} + 45 minutos = ${third_step} minutos
           4)  Hora de finalización = 11:00 a. m. + ${third_step} minutos = ${done}
            `,            
          }],
        "time",
    
        ))
    
        }

    //question 7 ginger juice
    if (recipe.name.en == "Pineapple ginger juice") {
      let answer = 28.272

         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Aunt Maria bought three gingers from the store and then she weighed them. What is the weight of the heaviest ginger, in grams, from the table below? Hint: 1 milligram = 1000 grams; 1 kilogram = 1000 grams.`,
              es: `La tía María compró tres jengibres en la tienda y luego los pesó. ¿Cuál es el peso del jengibre más pesado, en gramos, de la siguiente tabla? Pista: 1 miligramo = 1000 gramos; 1 kilogramo = 1000 gramos. `,
          
          },
          answer,
          [{
            en: `1) Convert weight of Ginger C to grams (multiply by 1000)
            2) Convert weight of Ginger B to grams (divide by 1000)
            3) Compare weights of Ginger A, Ginger B, Ginger C. 
            `,
            es: `Convertir peso de Jengibre C a gramos (multiplicar por 1000)
            Convertir peso de Jengibre B a gramos (dividir por 1000)
            Compara los pesos de Jengibre A, Jengibre B, Jengibre C.
            `,
          },
            {
            en:  `1) Ginger A = 27.32 g, Ginger B = 28.272 g , Ginger C =  28 g  -> Answer is Ginger B = 28.272 g`,
            es:  `1) Jengibre A = 27.32 g, Jengibre B = 28.272 g, Jengibre C = 28 g  -> Respuesta es Jengibre B = 28.272 g  `,            
          }],
        "decimal",
        null,
        "gingerTable"
    
        ))
    
        }


    return generatedQuestions;
}

function generateLevel3AuntQuestions(recipe, randomInt){
    let generatedQuestions = [];
    let answer = null;


    //Mango Juice 1
    if (recipe.name.en == "Mango Juice"){
        let randomNum = randomInt(10,31);
        let randomNum2 = randomInt(10,21);

        answer = randomNum*randomNum2
  

       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `You are preparing ${randomNum} servings everyday for ${randomNum2} days. How many total minutes have you spent preparing mango juice?`,
            es: `Estás preparando ${randomNum} porciones todos los días durante ${randomNum2} días. ¿Cuántos minutos totales has pasado preparando jugo de mango?`
        
        },
        answer,
        [{
            en:  randomNum + " x " + randomNum2 + " = ??? " ,
            es:  randomNum + " x " + randomNum2 + " = ??? " , 
        },
        {
          en:  randomNum + " x " + randomNum2 + " = " + answer ,
          es:  randomNum + " x " + randomNum2 + " = " + answer , 
      }],
        "wholeNumber",
  
      ))
    }

    //Mango Juice 2
    if (recipe.name.en == "Mango Juice"){

    let cookTime = 5//recipe.cookTime
    let prepTime = 5//recipe.prepTime
    let totalTime = cookTime+prepTime

      answer = (35*totalTime) - (35*(totalTime/2))


     // create question
     generatedQuestions.push(createGameQuestion(
      {
          en: `You’re super fast at this recipe and it will take you half the amount of time to make 1 mango juice. Your friend takes the normal amount of time to make 1 mango juice. After making 35 juices, how much less time did it take you to make the mango juice than your friend? (Cook time = ${cookTime}, Preparation time = ${prepTime}) Type your answer in minutes.`,
          es: `Eres súper rápido con esta receta y te tomará la mitad de tiempo hacer 1 jugo de mango. Tu amigo se toma la cantidad normal de tiempo para hacer 1 jugo de mango. Después de hacer 35 jugos, ¿cuánto tiempo menos te tomó  a ti hacer el jugo de mango que tu amigo? Escriba su respuesta en minutos`
      
      },
      answer,
      [{
          en:  "35 x (" + totalTime + ") - 35 x ("+totalTime+"/2)= ??? " ,
          es:  "35 x (" + totalTime + ") - 35 x ("+totalTime+"/2)= ??? " ,
      },
      {
        en:  "35 x (" + totalTime + ") - 35 x ("+totalTime+"/2)= " + answer + " minutes",
        es:  "35 x (" + totalTime + ") - 35 x ("+totalTime+"/2)= " + answer + " minutos" , 
    }],
      "wholeNumber",

    ))
  }

    //Mango Juice 3
    if (recipe.name.en == "Mango Juice"){

      let randomNum = randomInt(10,31);

  
      let first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      answer = randomNum*100*first_ingredient_key_amount
  
  
       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `The only measuring cup you have is a one-hundredth cup. You want to make ${randomNum} mango juices. How many one-hundredth cups of water do you need to make the mango juices? Hint: 1 one-hundredth cup = 0.01 cups.`,
            es: `La única taza de medir que tienes es una taza de una centésima. Quieres hacer ${randomNum} jugos de mango. ¿Cuántas tazas de una centésima de agua necesitas para hacer los jugos de mango? Pista: 1 centésima taza = 0.01 tazas`,
        
        },
        answer,
        [{
          en: first_ingredient_key_amount +" x "+randomNum+" x 100 = ??? " ,
          es: first_ingredient_key_amount+" x "+randomNum+" x 100 = ??? " ,
        },
        {
          en:  first_ingredient_key_amount+" x "+randomNum+" x 100 = " + answer ,
          es:  first_ingredient_key_amount+" x "+randomNum+" x 100 = " + answer,
      }],
        "wholeNumber",
  
      ))
    }

    //Mango Juice 4
    if (recipe.name.en == "Mango Juice"){

      let randomNum = randomInt(20,31);
      let randomNum2 = randomInt(30,51);
      let cookTime = 5//recipe.cookTime

      answer = cookTime*randomNum*randomNum2
  
  
       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `Based on your recipe’s cook time (5 minutes), if you made ${randomNum} servings every day for ${randomNum2} days, how much time did you spend cooking?`,
            es: `Según el tiempo de cocción de su receta (5 minutos), si preparó ${randomNum} porciones todos los días durante ${randomNum2} días, ¿cuánto tiempo pasó cocinando?`,
        
        },
        answer,
        [{
          en: cookTime+" x "+randomNum+" x " +randomNum2+" = ??? " ,
          es: cookTime+" x "+randomNum+" x " +randomNum2+" = ??? " ,
        },
        {
          en:  cookTime+" x "+randomNum+" x " +randomNum2+" = " + answer ,
          es:  cookTime+" x "+randomNum+" x " +randomNum2+" = " + answer ,
      }],
        "wholeNumber",
  
      ))
    }

    //Mango Juice 5
    if (recipe.name.en == "Mango Juice"){

      const fractions = ["1/2", "1/4", "1/5","1/6"];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];  

      let first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(randomFraction)
      let fractionOrInteger1 = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide(fractionOrInteger, first_ingredient_key_amount, 'multiply')
      let addedResult = addOrSubtract(fractionOrInteger1, multipliedResult.result, 'subtract')
      let simplify = simplifyFraction(addedResult.result)
      answer = simplify
  
  
       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `Your recipe calls for a specific amount of water. Your friend uses a different recipe that requires ${randomFraction} of the amount of water you use. How much more water do you use than your friend? Type your answer as a fraction.`,
            es: `Su receta requiere una cantidad específica de agua. Tu amigo usa una receta diferente que requiere ${randomFraction} de la cantidad de agua que usas. ¿Cuánta más agua usas tú que tu amigo? Escriba su respuesta como una fracción.`,
        
        },
        simplify.result,
        [{
          en: first_ingredient_key_amount+" - ("+randomFraction+" x " +first_ingredient_key_amount+") = ??? " ,
          es: first_ingredient_key_amount+" - ("+randomFraction+" x " +first_ingredient_key_amount+") = ??? " ,
        },
        {
          en:  first_ingredient_key_amount+" - ("+randomFraction+" x " +first_ingredient_key_amount+") = " + simplify.result  ,
          es:  first_ingredient_key_amount+" - ("+randomFraction+" x " +first_ingredient_key_amount+") = ??? "+ simplify.result ,
      }],
        simplify.types,
  
      ))
    }

    //Mango Juice 6
    if (recipe.name.en == "Mango Juice"){

      const denominator = Math.floor(Math.random() * 9) + 2;
      const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
      const randomFraction = numerator + '/' + denominator;

      let first_ingredient_key = Object.keys(recipe.ingredients)[0];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(randomFraction)
      let fractionOrInteger1 = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide(fractionOrInteger, fractionOrInteger1,  'multiply')
      let simplify = simplifyFraction(multipliedResult.result)
  
  
       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `Auntie Maria asks you to make ${randomFraction} of one mango juice. How many cups of mango chunks will you need to make the mango juice?`,
            es: `La tía María te pide que hagas ${randomFraction} de un jugo de mango. ¿Cuántas tazas de trozos de mango necesitarás para hacer el jugo de mango?`,
        
        },
        simplify.result,
        [{
          en: first_ingredient_key_amount + " x " + randomFraction + " = ???",
          es: first_ingredient_key_amount + " x " + randomFraction + " = ???",
        },
        {
          en:  first_ingredient_key_amount + " x " + randomFraction + " = " + simplify.result,
          es:  first_ingredient_key_amount + " x " + randomFraction + " = " + simplify.result,
      }],
        simplify.types,
  
      ))
    }

    //Mango Juice 7
    if (recipe.name.en == "Mango Juice"){

      let randomNum = randomInt(1,7);
      let randomNum3 = randomInt(10,30)
      let randomNum2 = randomInt(10,31)
      let cookTime = 10
      let randomNum1 = randomNum + ":"+  randomNum3

            // Convert start time to minutes
      let totalMinutes = randomNum * 60 + randomNum3;

      let part1 = cookTime*randomNum2

            // Add the desired number of minutes
            totalMinutes += part1;
      
            // Calculate the new hours and minutes
            let newHours = Math.floor(part1 / 60);
            let newMinutes = part1 % 60;
      
            let finalTimeHr = (randomNum+newHours)
            let finalTimeSec = (randomNum3+newMinutes)
            let done = finalTimeHr + ":" + finalTimeSec
      
       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `If you start making mango juice at ${randomNum1} PM, and you make ${randomNum2} juices (cook time is 5 minutes, prep time is 5 minutes), at what time will you finish? Hint: 1 hour = 60 minutes. Type your answer in time format (ex. HH:MM)`,
            es: `Si comienza a hacer jugo de mango a las ${randomNum1} PM y hace ${randomNum2} jugos (tiempo de preparación 5 minutos, tiempo de cocción 5 minutos), ¿a qué hora terminarás? Pista: 1 hora = 60 minutos. Escriba su respuesta en formato de tiempo (ej. HH:MM)`,
      
        },
        done,
        [{
          en: `1) Total Time = (prep + cook time) * juices needed
               2) Finish Time = Start Time + Total Time`,
          es: `1) Tiempo total = (preparación + tiempo de cocción) * jugos necesarios
              2) Hora de finalización = Hora de inicio + Tiempo total`
        },{
          en: "1) Total time = " + cookTime+ " x " + randomNum2 + " = "+part1+" minutes 2) Finish Time = " + randomNum1 + " PM + "+part1+" = " + done,
          es: "1) Tiempo total = " + cookTime+ " x " + randomNum2 + " = "+part1+" minutos 2) Tiempo de finalización = " + randomNum1 + " PM + "+part1+" = " + done,
        }],
        "time",
  
      ))
    }

    //Mango Juice 8
    if (recipe.name.en == "Mango Juice"){

      let randomNum = randomInt(1,7);
      let randomNum3 = randomInt(10,30)
      let randomNum2 = randomInt(20,41)
      let cookTime = 10
      let cookTime2 = 5
      let randomNum1 = randomNum + ":"+  randomNum3

            // Convert start time to minutes
      let totalMinutes = randomNum * 60 + randomNum3;

      let part1 = (cookTime+cookTime2)*randomNum2

            // Add the desired number of minutes
            totalMinutes += part1;
      
            // Calculate the new hours and minutes
            let newHours = Math.floor(part1 / 60);
            let newMinutes = part1 % 60;
      
            let finalTimeHr = (randomNum+newHours)
            let finalTimeSec = (randomNum3+newMinutes)
            let done = finalTimeHr + ":" + finalTimeSec
      
       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `You made ${randomNum2} mango juices. This time it took you double the amount of time to prep the recipes but the same amount of time to cook them (original prep time 5 minutes, cook time 5 minutes). If you started making the mango juices at ${randomNum1} PM, at what time did you finish? Hint: 1 hour = 60 minutes. Type your answer in time format (ex. HH:MM)`,
            es: `Hiciste ${randomNum2} jugos de mango. Esta vez te tomó el doble de tiempo preparar las recetas pero la misma cantidad de tiempo para cocinarlas (tiempo original de preparación 5 minutos y tiempo de cocción 5 minutos). Si comenzaste a hacer los jugos de mango a las ${randomNum1} PM, ¿a qué hora terminaste? Pista: 1 hora = 60 minutos. Escriba su respuesta en formato de tiempo (ej. HH:MM)`,
      
        },
        done,
        [{
          en: `1) Total Time = (prep + cook time) * juices quantity
               2) Finish Time = Start Time + Total Time`,
          es: `1) Tiempo total = (preparación + tiempo de cocción) * cantidad de jugo
              2) Hora de finalización = Hora de inicio + Tiempo total`
        },{
          en: "1) Total time = (" + cookTime+ " + 5) x " + randomNum2 + " = "+part1+" minutes 2) Finish Time = " + randomNum1 + " PM + "+part1+" = " + done,
          es: "1) Tiempo total = (" + cookTime+ " + 5) x " + randomNum2 + " = "+part1+" minutos 2) Tiempo de finalización = " + randomNum1 + " PM + "+part1+" = " + done,
        }],
        "time",
  
      ))
    }

    //Enchiladas 1
    if (recipe.name.en == "Vegetarian enchiladas"){
      const denominator = Math.floor(Math.random() * 9) + 2;
      const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
      const randomFraction = numerator + '/' + denominator;

      let servings = '1/2'
      let fractionOrInteger = convertToFraction(randomFraction)
      let fractionOrInteger1 = convertToFraction(servings)
      let multipliedResult = multiplyOrDivide(fractionOrInteger, fractionOrInteger1, 'multiply')
      let answer = simplifyFraction(multipliedResult.result)

       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `How many cups of black beans are in a ${randomFraction} of one recipe serving? Type your answer as a fraction.`,
            es: `¿Cuántas tazas de frijoles negros hay en una ${randomFraction} de una porción de la receta? Escriba su respuesta como una fracción`,
        
        },
        answer.result,
        [{
            en:  "1) Cup of beans per 1 serving = 1 cup / 2 servings  2) Final answer = Cup of beans per 1 serving x " + randomFraction ,
            es:  "1) Taza de frijoles por 1 porción = 1 taza / 2 porciones 2) Respuesta final = taza de frijoles por 1 porción x " + randomFraction , 
        },
        {
          en:  "1) Cup of beans per 1 serving = 1/2 cups  2) Final answer = (1/2) x " + randomFraction + " = "  + answer.result,
          es:  "1) Taza de frijoles por 1 porción = 1/2 tazas 2) Respuesta final = (1/2) x " + randomFraction  + " = "+ answer.result, 
      }],
        answer.types,
  
      ))
    }

    //Enchiladas 2
    if (recipe.name.en == "Vegetarian enchiladas"){
      const denominator = Math.floor(Math.random() * 9) + 2;
      const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
      const randomFraction = numerator + '/' + denominator;

      let servings = '1/4'
      let fractionOrInteger = convertToFraction(randomFraction)
      let fractionOrInteger1 = convertToFraction(servings)
      let multipliedResult = multiplyOrDivide(fractionOrInteger, fractionOrInteger1, 'multiply')
      let answer = simplifyFraction(multipliedResult.result)

       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `How many onions are in a ${randomFraction} of one recipe serving? Type your answer as a fraction.`,
            es: `¿Cuántas cebollas hay en una ${randomFraction} de una porción de receta? Escriba su respuesta como una fracción.`,
        
        },
        answer.result,
        [{
            en:  "1) Onions per 1 serving = 1/2 onion / 2 servings   2) Final answer = Onions per 1 serving x " + randomFraction ,
            es:  "1) Cebollas por 1 ración = 1/2 cebolla / 2 porciones 2) Respuesta final = Cebollas por 1 porción x " + randomFraction , 
        },
        {
          en:  "1) Onions per 1 serving = 1/4 onion   2) Final answer = (1/4) x " + randomFraction + " = "  + answer.result,
          es:  "1) Cebollas por 1 porción = 1/4 cebolla 2) Respuesta final = (1/4) x " + randomFraction  + " = "+ answer.result, 
      }],
        answer.types,
  
      ))
    }

    //Enchiladas 3
    if (recipe.name.en == "Vegetarian enchiladas"){
      let randomNum = randomInt(4,31);

      let first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger1 = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide( fractionOrInteger1,randomNum,  'multiply')
      let simplify2 = simplifyFraction(multipliedResult.result)
      let multipliedResult1 = multiplyOrDivide(multipliedResult.result,170, 'multiply')
      let simplify = simplifyFraction(multipliedResult1.result)

       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `The average weight of a medium-sized onion is around 170 grams. You and Auntie Maria decide to make ${randomNum} vegetarian enchiladas. How many grams of onions will you need?`,
            es: `El peso medio de una cebolla de tamaño mediano es de aproximadamente 170 gramos. La tía María y tú deciden hacer ${randomNum} enchiladas vegetarianas. ¿Cuántos gramos de cebolla necesitarás?`,
        
        },
        simplify.result,
        [{
            en:  "1) Total onions needed = onions amount for 1 recipe * number of enchiladas 2) Grams of onions = total onions needed * grams per 1 onion",
            es:  "1) Total de cebollas necesarias = cantidad de cebollas para 1 receta * cantidad de enchiladas 2) Gramos de cebollas = total de cebollas necesarias * gramos por 1 cebolla",
        },
        {
          en:  "Total onions needed = "+first_ingredient_key_amount+  " x " + randomNum +" = " + simplify2.result  + " 2) Grams of onions = "+simplify2.result+" x 170 = " + simplify.result,
          es:  "Total de cebollas necesarias = "+first_ingredient_key_amount+  " x " + randomNum +" = " + simplify2.result  + " 2) Gramos de cebolla = "+simplify2.result+" x 170 = " + simplify.result,
      }],
        simplify.types,
  
      ))
    }

    //Enchiladas 4
    if (recipe.name.en == "Vegetarian enchiladas"){
      let randomNum = randomInt(2,11);
      let first_step = randomNum*3

      let servings = '1/8'

      let fractionOrInteger1 = convertToFraction(servings)
      let multipliedResult = multiplyOrDivide( first_step,fractionOrInteger1,  'divide')
      let simplify = simplifyFraction(multipliedResult.result)

       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `One container of tomatillo sauce contains 3 cups. If Auntie Maria has ${randomNum} containers of tomatillo sauce, how many servings of vegetarian enchiladas can she make? Round your answer down to the nearest whole number`,
            es: `Un recipiente de salsa de tomatillo contiene 3 tazas. Si la tía María tiene ${randomNum} recipientes de salsa de tomatillo, ¿cuántas porciones de enchiladas vegetarianas puede preparar? Redondea tu respuesta al número entero más cercano`,
        
        },
        simplify.result,
        [{
            en:  "1) Tomatillo sauce per serving = recipe amount / number of servings 2) Total cups of tomatillo sauce = containers * cups per 1 container 3) Total servings = Total cups of tomatillo sauce / Tomatillo sauce per serving",
            es:  "1) Salsa de tomatillo por porción = cantidad de la receta / número de porciones 2) Total de tazas de salsa de tomatillo = recipientes * tazas por 1 recipiente 3) Total de porciones = Tazas totales de salsa de tomatillo / Salsa de tomatillo por porción",
        },
        {
          en:  "1) Tomatillo sauce per seving = 1/4 / 2 = 1/8 2) Total cups of tomatillo sauce = "+randomNum +" x 3 = "+first_step+" 3) Total servings = "+first_step+" /(1/8) = " + simplify.result,
          es:  "1) Salsa de tomatillo por porción = 1/4 / 2 = 1/8 2) Total de tazas de salsa de tomatillo = "+randomNum +" x 3 = "+first_step+" 3) Total de porciones = "+first_step+" /(1/8) = " + simplify.result
      }],
        simplify.types,
  
      ))
    }

  
    //Enchiladas 5
    if (recipe.name.en == "Vegetarian enchiladas"){
      let tort;
      let serving;  
      let randomNum = Math.random() < 0.5 ? 8 : 10;
      let randomNum1 = randomNum + ":00"

      if (randomNum === 8) {
        tort = 4;
        serving = 24;
      } else if (randomNum === 10) {
        tort = 8;
        serving = 28;
      }
     

       // create question
       generatedQuestions.push(createGameQuestion(
        {en: `This schedules shows how many servings of vegetarian enchilada we should make during the day: If we follow the schedule throughout the day, how many servings should we have done by ${randomNum1} PM?`,
        es: `Estos horarios muestran cuántas porciones de enchiladas vegetariana debemos hacer durante el día: Si seguimos el horario a lo largo del día, ¿cuántas porciones deberíamos haber hecho para las ${randomNum1} PM?`,
        },
        serving,
        [{
          en:  "Hint: Table shows that we make 4 servings every 2 hours.",
          es:  "Pista: La tabla muestra que hacemos 4 porciones cada 2 horas.",
         },
        {
          en: `At ${randomNum1} PM we will have ${tort} more servings for a total of ${serving}` ,
          es: `A las ${randomNum1} PM tendremos ${tort} porciones más para un total de ${serving}.`,
         }],
        "wholeNumber",
        null,
        "level3_enchilada",
  
      ))
    }

    //Enchiladas 6
    if (recipe.name.en == "Vegetarian enchiladas"){
      let randomNum = randomInt(10,21);
      let randomNum1 = randomInt(15,51);
      let serving = "1/8"
      let part1 =  randomNum*randomNum1
      let fractionOrInteger = convertToFraction(serving)
      let multipliedResult = multiplyOrDivide(fractionOrInteger, part1, 'multiply')
      let simplify = simplifyFraction(multipliedResult.result)



       // create question
       generatedQuestions.push(createGameQuestion(
        {
          en: `You and Auntie Maria are making ${randomNum} servings of vegetarian enchiladas at a time. You do this ${randomNum1} times to meet your goal for the week. How many cups of tomatillo sauce did you use to meet your goal for the week?`,
          es: `La tía María y tú están haciendo ${randomNum} porciones de enchiladas vegetarianas a la vez. Haces esto ${randomNum1} veces para alcanzar tu meta de la semana. ¿Cuántas tazas de salsa de tomatillo usaste para alcanzar tu meta de la semana?`,
        },
        simplify.result,
        [{
          en:  `((1/4) / 2) x ${randomNum} x ${randomNum1}  = ???`,
          es:  `((1/4) / 2) x ${randomNum} x ${randomNum1}  = ???`,
         },
        {
          en:`((1/4) / 2) x ${randomNum} x ${randomNum1}  = ${simplify.result}`,
          es: `((1/4) / 2) x ${randomNum} x ${randomNum1}  = ${simplify.result}`,
         }],
        simplify.types,
  
      ))
    }

    //Lentil 1
    if (recipe.name.en == "Lentil soup"){

      let randomNum = randomInt(4,15)
      let servings = '3/4'
      let serving_size = recipe.servingSize
      let fractionOrInteger1 = convertToFraction(servings)
      let multipliedResult = multiplyOrDivide( fractionOrInteger1,serving_size, 'divide')
      let part1 = simplifyFraction(multipliedResult.result)
      let multipliedResult1 = multiplyOrDivide( multipliedResult.result,randomNum, 'multiply')
      let answer = simplifyFraction(multipliedResult1.result)

       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `How many cups of olive oil are in ${randomNum} servings of Lentil Soup? Type your answer in fraction format (ex. 1/2)`,
            es: `¿Cuántas tazas de aceite de oliva hay en ${randomNum} porciones de sopa de lentejas? Escribe tu respuesta en formato de fracción (ej. 1/2).`,
        
        },
        answer.result,
        [{
            en:  `1) Calculate how many cups of olive oil are in 1 serving: y = (3/4) /  ${serving_size}) 2) Multiply y by the number of servings required: y x ${randomNum} = ???`,
            es:  `1) Calcula cuantas tazas de aceite de oliva hay en 1 porción: y = (3/4) /  ${serving_size}) 2) Multiplique y por el número de porciones requeridas: y x ${randomNum} = ???`,
        },
        {
          en:  `Cups of olive oil = ${part1.result} x ${randomNum} = ${answer.result}`,
          es:   `Tazas de aceite de oliva = ${part1.result} x ${randomNum} = ${answer.result}`,
      }],
        answer.types,
  
      ))
    }

    //Lentil 2
    if (recipe.name.en == "Lentil soup"){

      const fractions = [24,36,48,60,72,84,96];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];

      let firstpart = randomFraction/12
      let secondpart = firstpart*55
      let answer = secondpart/60
      answer = Number(answer.toFixed(2));

       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `How many hours will it take to make ${randomFraction} servings? (Cook time is 45 minutes and prep time is 10 minutes ) Include both prep time and cook time in your calculation. Type your final answer in decimal form and round to the nearest tenth. Hint: 1 hour = 60 minutes`,
            es: `¿Cuántas horas tomará hacer ${randomFraction} porciones? (Tiempo de preparación es de 10 minutos y tiempo de cocción es 45 minutos) Incluya tanto el tiempo de preparación como el tiempo de cocción en su cálculo. Escribe tu respuesta final en forma decimal y redondea a la décima más cercana. Pista: 1 hora = 60 minutos.`,
        
        },
        answer,
        [{
            en:  `1) Convert the total number of servings to total number of lentil soups: Y = ${randomFraction} / 12 
            2) Calculate the total time in minutes: Z = (prep time + cook time) * Y 
            3) Convert minutes to hours: Hours = Z / 60 `,
            es:  `1) Convierta el número total de porciones al número total de sopas de lentejas: Z = ${randomFraction} / 12
            2) Calcula el tiempo total en minutos: Z = (tiempo de preparación + tiempo de cocción) * Y
            3) Convertir minutos a horas: Horas = Z / 60 `,
        },
        {
          en:  `1) Convert the total number of servings to total number of lentil soups: ${firstpart} = ${randomFraction } / 12 
          2) Calculate the total time in minutes: ${secondpart} = 55 x ${firstpart}
          3) Convert minutes to hours: Hours = ${secondpart} / 60 = ${answer}`,
          es:   `1) Convierta el número total de porciones al número total de sopas de lentejas: ${firstpart} = ${randomFraction} / 12
          2) Calcula el tiempo total en minutos: ${secondpart} = 55 * ${firstpart}
          3) Convertir minutos a horas: Horas = ${secondpart} / 60 = ${answer}`,
      }],
        "decimal",
  
      ))
    }

    //Lentil 3
    if (recipe.name.en == "Lentil soup"){

      let randomNum = randomInt(3,9);
      let first_ingredient_key = Object.keys(recipe.ingredients)[8];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let firstPart = first_ingredient_key_amount*3
      let answer = firstPart*randomNum


       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `Auntie Maria doesn’t have a tablespoon but knows that 1 tablespoon is equivalent to 3 teaspoons. How many teaspoons of lemon juice will she need to make ${randomNum} lentil soups?`,
            es: `La tía María no tiene una cucharada pero sabe que 1 cucharada equivale a 3 cucharaditas. ¿Cuántas cucharaditas de jugo de limón necesitará para hacer ${randomNum} sopas de lentejas?`,
        
        },
        answer,
        [{
            en: `1) Teaspoons per 1 soup = ${first_ingredient_key_amount} * 3 
            2) Total teaspoons = Teaspoons per 1 soup * number of soups`,
            es:   `1) Cucharaditas por 1 sopa = ${first_ingredient_key_amount} * 3
            2) Total de cucharaditas = cucharaditas por 1 sopa * número de sopas`,
        },
        {
          en:  `1) Teaspoons per 1 soup = ${first_ingredient_key_amount} * 3 = ${firstPart}
          2) Total teaspoons = ${firstPart} x ${randomNum} = ${answer}`,
          es:   `1) Cucharaditas por 1 sopa = ${first_ingredient_key_amount} * 3 = ${firstPart}
          2) Total de cucharaditas = ${firstPart} x ${randomNum} = ${answer}`,
      }],
        "wholeNumber",
  
      ))
    }

    //Lentil 4
    if (recipe.name.en == "Lentil soup"){

      let randomNum = randomInt(20,41);
      let serving_size = recipe.servingSize
      let first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fract = convertToFraction(first_ingredient_key_amount+"/"+serving_size)
      let simplify = simplifyFraction(fract)
      let multipliedResult = multiplyOrDivide(fract, randomNum, 'multiply')
      let simplify2 = simplifyFraction(multipliedResult.result)
      let fraction = convertToFraction("1/2")
      let multipliedResult1 = multiplyOrDivide(multipliedResult.result, fraction, 'divide' )
      let answer = simplifyFraction(multipliedResult1.result)
      let answer2 = Math.ceil(multipliedResult1.result.numerator/multipliedResult1.result.denominator)



       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `If one onion can fill ½ of a cup, how many onions are needed to make ${randomNum} servings of lentil soup? Round your answer up to the nearest whole number.`,
            es: `La tía María no tiene una cucharada pero sabe que 1 cucharada equivale a 3 cucharaditas. ¿Cuántas cucharaditas de jugo de limón necesitará para hacer ${randomNum} sopas de lentejas?`,
        
        },
        answer2,
        [{
            en: `1) Cups of onion per 1 serving = ${first_ingredient_key_amount} / ${serving_size} =${simplify.result}
            2) Total cups of onion = ${simplify.result} x ${randomNum} = y
            3) Total onions = y / (1/2) 
            `,
            es:   `1) Tazas de cebolla por 1 porción = ${first_ingredient_key_amount} /${serving_size} = ${simplify.result}
            2) Total de tazas de cebolla =${simplify.result} x ${randomNum} = y
            3) Total de cebollas = y /(1/2)
            `,
        },
        {
          en: `1) Cups of onion per 1 serving = ${first_ingredient_key_amount} / ${serving_size} =${simplify.result}
            2) Total cups of onion = ${simplify.result} x ${randomNum} = ${simplify2.result}
            3) Total onions = ${simplify2.result} / (1/2) = ${answer.result} = ${answer2}
            `,
            es:   `1) Tazas de cebolla por 1 porción = ${first_ingredient_key_amount} /${serving_size} = ${simplify.result}
            2) Total de tazas de cebolla =${simplify.result} x ${randomNum} = ${simplify2.result}
            3) Total de cebollas = ${simplify2.result} /(1/2) = ${answer.result} = ${answer2}
            `,
      }],
        "wholeNumber",
  
      ))
    }

    //Lentil 5
        if (recipe.name.en == "Lentil soup"){

          let randomNum = randomInt(15,41);
          let firstStep = randomNum*3
          let secondStep = firstStep*210
          let answer = Math.ceil(secondStep/454)
    
           // create question
           generatedQuestions.push(createGameQuestion(
            {
                en: `Auntie Maria says one cup of lentils is about 210 grams. She makes a total of ${randomNum} lentil soups. If 1 pound is roughly equal to 454 grams, how many total pounds of lentils were used? Round your answer to the nearest whole number.`,
                es: `La tía María dice que una taza de lentejas son unos 210 gramos. Hace un total de ${randomNum} sopas de lentejas. Si 1 libra equivale aproximadamente a 454 gramos, ¿cuántas libras de lentejas se usaron en total? Redondea tu respuesta al número entero más cercano. `,
            
            },
            answer,
            [{
                en: `1) Total cups of lentils used = 3 x ${randomNum} 
                2) Total grams of lentils used = total cups of lentils x 210 = z
                3) Convert grams to pounds = total grams of lentils / 454
                4) Round up to the nearest whole number 
                `,
                es:   `1) Total de tazas de lentejas usadas = 3 x ${randomNum}
                2) Gramos totales de lentejas usadas = tazas totales de lentejas x 210 = z
                3) Convertir gramos a libras = gramos totales de lentejas / 454
                4) Redondea al número entero más cercano
                `,
            },
            {
              en: `1) Total cups of lentils used = 3 x ${randomNum} = ${firstStep}
              2) Total grams of lentils used = ${firstStep} * 210 = ${secondStep}
              3) Convert grams to pounds = ${secondStep} / 454 = ${answer}
              `,
                es:   `1) Total de tazas de lentejas usadas = 3 x ${randomNum} = ${firstStep}
                2) Gramos totales de lentejas utilizadas = ${firstStep} x 210 = ${secondStep}
                3) Convertir gramos a libras = ${secondStep} / 454 = ${answer}
                `,
          }],
            "wholeNumber",
      
          ))
        }

    //Lentil 6
    if (recipe.name.en == "Lentil soup"){

      let randomNum = randomInt(60,121);
      let firstStep = randomNum *220;
      let answer = firstStep/1000
      answer = Number(answer.toFixed(1));

       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `If each serving of lentil soup is about 220 milliliters, how many liters of soup are in ${randomNum} servings? Hint: 1L = 1,000 mL. Round to the nearest tenth.`,
            es: `Si cada porción de sopa de lentejas tiene aproximadamente 220 mililitros, ¿cuántos litros de sopa hay en ${randomNum} porciones? Sugerencia: 1L = 1000 mL. Redondea a la décima más cercana.`,
        
        },
        answer,
        [{
            en: `1) Total mL soup = number of servings * mL per serving
            2) Total L soup = Total mL soup / 1,000`,
            es:   `1) Total mL de sopa = número de porciones * mL por porción
            2) Total L sopa = Total mL de sopa / 1,000
            `,
        },
        {
          en: `1) Total mL soup = ${randomNum} * 220 = ${firstStep}
          2) Total L soup = ${firstStep} / 1,000 = ${answer}`,
            es:   `1) Total mL de sopa= ${randomNum} * 220 = ${firstStep}
            2) Total L sopa = ${firstStep} / 1,000 = ${answer}
            `,
      }],
        "decimal",
  
      ))
    }
    
    //Lentil 7
    if (recipe.name.en == "Lentil soup"){

      let randomNum = randomInt(15,61);
      let first_ingredient_key = Object.keys(recipe.ingredients)[0];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide(250, fractionOrInteger, 'divide')
      let simplify = simplifyFraction(multipliedResult.result)
      let multipliedResult1 = multiplyOrDivide(multipliedResult.result, randomNum, 'multiply')
      let simplify2 = simplifyFraction(multipliedResult1.result)
      //answer = Number(answer.toFixed(1));

       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `If one cup of olive oil is about 250 milliliters, how many milliliters of olive oil are needed to make ${randomNum} lentil soups?`,
            es: `Si una taza de aceite de oliva tiene aproximadamente 250 mililitros, ¿cuántos mililitros de aceite de oliva se necesitan para hacer ${randomNum} sopas de lentejas?`,
        
        },
        simplify2.result,
        [{
            en: `1 ) mL olive oil in ${first_ingredient_key_amount} cup = 250 / (${first_ingredient_key_amount})
            2) Total mL = mL olive oil in ${first_ingredient_key_amount} cup x ${randomNum}
            `,
            es:   `1) mL  aceite de oliva en ${first_ingredient_key_amount} taza = 250 / (${first_ingredient_key_amount})
            2) Total mL = mL aceite de oliva en ${first_ingredient_key_amount} taza x ${randomNum}
            `,
        },
        {
          en: `1) mL olive oil in ${first_ingredient_key_amount} cup = 250 /(${first_ingredient_key_amount}) = ${simplify.result}
          2) Total mL = ${simplify.result} x ${randomNum} = ${simplify2.result}`,
            es:   `1) mL aceite de oliva en ${first_ingredient_key_amount} taza = 250 / (${first_ingredient_key_amount} )= ${simplify.result}
            2) mL totales = ${simplify.result} x ${randomNum} = ${simplify2.result}
            `,
      }],
        simplify2.types,
  
      ))
    }


    //Lentil 8
    if (recipe.name.en == "Lentil soup"){

      let randomNum = randomInt(40,71);
      let servingSize = recipe.servingSize
      let first_ingredient_key = Object.keys(recipe.ingredients)[0];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let amoutn = '5/12'
      let fractionOrInteger = convertToFraction(amoutn)
      let multipliedResult = multiplyOrDivide( fractionOrInteger, randomNum, 'multiply')
      let simplify = simplifyFraction(multipliedResult.result)
      let multipliedResult1 = multiplyOrDivide(multipliedResult.result, 3, 'multiply')
      let simplify2 = simplifyFraction(multipliedResult1.result)
      //answer = Number(answer.toFixed(1));

       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `If a big pot can hold ${randomNum} lentil soup servings, how many teaspoons of lemon juice were used in this big pot? Remember, 1 tablespoon (tbsp) = 3 teaspoons (tsp)! `,
            es: `Si una olla grande puede contener ${randomNum} porciones de sopa de lentejas, ¿cuántas cucharaditas de jugo de limón se usaron en esta olla grande? ¡Recuerde, 1 cucharada (tbsp) = 3 cucharaditas (tsp)!`,
        
        },
        simplify2.result,
        [{
            en: `1) Tbsp of lemon juice per 1 serving = 5/12 tbsp
            2) Total tbsp of lemon juice = 5/12 x ${randomNum} = y
            3) Total tsp of lemon juice = y x 3
            `,
            es:   `1) Cucharada de jugo de limón por 1 porción = 5/12 cucharadas
            2) Cucharada total de jugo de limón = 5/12 x ${randomNum} = y
            3) Cucharadita total de jugo de limón = y x 3
            `,
        },
        {
          en: `1) Tbsp of lemon juice per 1 serving = 5/12 tbsp
          2) Total tbsp of lemon juice = 5/12 x ${randomNum} = ${simplify.result}
          3) Total tsp of lemon juice = ${simplify.result} x 3 = ${simplify2.result} 
          `,
            es:   `Cucharada de jugo de limón por 1 porción = 5/12 cucharadas
            Cucharada total de jugo de limón = 5/12 x ${randomNum} = ${simplify.result}
            Total de cucharaditas de jugo de limón = ${simplify.result} x 3 = ${simplify2.result}
            `,
      }],
        simplify2.types,
  
      ))
    }

    //Lentil 9
    if (recipe.name.en == "Lentil soup"){

      const fractions = ["1/2", "3/4", "5/6", "1/3", "7/8"];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];

      let amoutn = '1/2'
      let fractionOrInteger = convertToFraction(amoutn)
      let fractionOrInteger1 = convertToFraction(randomFraction)
      let multipliedResult = multiplyOrDivide( fractionOrInteger, fractionOrInteger1, 'multiply')
      let simplify = simplifyFraction(multipliedResult.result)

      //answer = Number(answer.toFixed(1));

       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `How many cups of water are needed to make ${randomFraction} of a serving of Lentil Soup? Type your answer as a fraction (ex. 1/2).`,
            es: `¿Cuántas tazas de agua se necesitan para hacer ${randomFraction} de una porción de sopa de lentejas? Escriba su respuesta como una fracción (ej. 1/2)`,
        
        },
        simplify.result,
        [{
            en: `1) Cups of water for 1 serving = 6 / 12 = (1/2) 
            2) Cups of water needed for ${randomFraction} serving = (1/2) x ${randomFraction}
            `,
            es:  `1) Tazas de agua por 1 porción = 6 / 12 = (1/2)
            2) Tazas de agua necesarias para ${randomFraction} porción = (1/2) x ${randomFraction}
            `,
        },
        {
          en: `1) Cups of water needed for ${randomFraction} serving = (1/2) * ${randomFraction} = ${simplify.result}`,
            es:   `2) Tazas de agua necesarias para ${randomFraction} porción = (1/2) x ${randomFraction} = ${simplify.result}`,
      }],
        "fraction",
  
      ))
    }


    //Lentil 10
    if (recipe.name.en == "Lentil soup"){

      let randomNum = randomInt(10,41);
      let firststep = randomNum*12
      let fractionOrInteger = convertToFraction(firststep+"/15")
      let simplify = simplifyFraction(fractionOrInteger)

      //answer = Number(answer.toFixed(1));

       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `One box of vegetable broth is equal to exactly 15 cups. How many boxes of vegetable broth are needed to make ${randomNum} lentil soups? Type your answer as a fraction. Hint: Simplify your answer.`,
            es: `Una caja de caldo de verduras equivale exactamente a 15 tazas. ¿Cuántas cajas de caldo de verduras se necesitan para hacer ${randomNum} sopas de lentejas? Escriba su respuesta como una fracción. Pista: simplifica tu respuesta.`,
        
        },
        simplify.result,
        [{
            en: `1) Total cups of broth = cups per 1 soup x number of soups 
            2) Total boxes = total cups of broth / cups per 1 box 
            `,
            es:  `1) Total de tazas de caldo = tazas por 1 sopa x número de sopas
            2) Total de cajas de caldo = tazas totales de caldo / tazas por 1 caja
            `,
        },
        {
          en: `1) Total cups of broth = 12 x ${randomNum} = ${firststep}
          2) Total boxes = ${firststep} / 15 = ${simplify.result}
          `,
            es:  `1) Total de tazas de caldo = 12 x ${randomNum} = ${firststep}
            2) Total de cajas de caldo = ${firststep} / 15 = ${simplify.result}
            `,
      }],
        "fraction",
  
      ))
    }

    //Strawberry Cake 1
    if (recipe.name.en == "Strawberry cake"){

      const fractions = ["1/2", "3/4", "5/8", "2/3","7/8", "3/8"];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];

      let first_ingredient_key = Object.keys(recipe.ingredients)[4];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(randomFraction)
      let fractionOrInteger1 = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide(fractionOrInteger, fractionOrInteger1, 'multiply')
      let answer = simplifyFraction(multipliedResult.result)

       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `Following the recipe, how many cups of sugar will we need for ${randomFraction} of the recipe? Type your answer as a fraction. `,
            es: `Siguiendo la receta, ¿cuántas tazas de azúcar necesitaremos para ${randomFraction} de la receta? Escriba su respuesta como una fracción.`,
        
        },
        answer.result,
        [{
            en:  `${first_ingredient_key_amount}  x ${randomFraction} = ???`,
            es:  `${first_ingredient_key_amount}  x ${randomFraction} = ???`,
        },
        {
          en:  `${first_ingredient_key_amount}  x ${randomFraction} = ${answer.result}`,
          es:  `${first_ingredient_key_amount}  x ${randomFraction} = ${answer.result}`,
      }],
        answer.types,
  
      ))
    }

    //Strawberry Cake 2
    if (recipe.name.en == "Strawberry cake"){

      let randomNum = randomInt(10,21);
      let randomNum1 = randomInt(30,50);

      let first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      //let fractionOrInteger = convertToFraction(randomFraction)
      let serving_size = recipe.servingSize
      let fractionOrInteger1 = convertToFraction(first_ingredient_key_amount+"/"+serving_size)
      let simplify = simplifyFraction(fractionOrInteger1)
      let multipliedResult = multiplyOrDivide( fractionOrInteger1,randomNum1, 'multiply')
      let simplify2 = simplifyFraction(multipliedResult.result)
      let multipliedResult1 = multiplyOrDivide(multipliedResult.result, randomNum, 'multiply')
      let answer = simplifyFraction(multipliedResult1.result)

       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `You and Auntie Maria are making ${randomNum1} servings of strawberry cake every day for ${randomNum} days. How many cups of flour did you use?`,
            es: `Tú y la tía María prepararán ${randomNum1} porciones de pastel de fresa todos los días durante ${randomNum} días. ¿Cuántas tazas de harina usaste? `,
        
        },
        answer.result,
        [{
            en:  `1) Cups flour for 1 serving = ${first_ingredient_key_amount}/${serving_size}
            2) Total cups of flour for 1 day = ${first_ingredient_key_amount}/${serving_size} x number of servings 
            3) Total cups of flour = Total cups of flour for 1 day x number of days
            `,
            es:  `1) Tazas de harina para 1 porción = ${first_ingredient_key_amount}/${serving_size}
            2) Total de tazas de harina para 1 día = ${first_ingredient_key_amount}/${serving_size} x número de porciones
            3) Total de tazas de harina = Total de tazas de harina para 1 día x número de días
            `,
        },
        {
          en:  `1) Cups flour for 1 serving = ${first_ingredient_key_amount}/${serving_size} = ${simplify.result}
          2) Total cups of flour for 1 day = ${simplify.result} x ${randomNum1} = ${simplify2.result}
          3) Total cups of flour = ${simplify2.result} * ${randomNum} = ${answer.result}
          `,
          es:  `1) Tazas de harina para 1 porción =${first_ingredient_key_amount}/${serving_size} = ${simplify.result}
          2) Total de tazas de harina para 1 día = ${simplify.result} x ${randomNum1} = ${simplify2.result}
          3) Total de tazas de harina =  ${simplify2.result} * ${randomNum} = ${answer.result}
          `,
      }],
        answer.types,
  
      ))
    }

    //Strawberry Cake 3
    if (recipe.name.en == "Strawberry cake"){

      let randomNum = randomInt(10,21);
      let randomNum1 = randomInt(15,51);

      let first_ingredient_key = Object.keys(recipe.ingredients)[0];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let serving_size = recipe.servingSize
      let randoms = randomNum*randomNum1
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      //let fractionOrInteger1 = convertToFraction(first_ingredient_key_amount+"/"+serving_size)
      //let simplify = simplifyFraction(fractionOrInteger1)
      let multipliedResult = multiplyOrDivide( fractionOrInteger,serving_size, 'divide')
      let simplify2 = simplifyFraction(multipliedResult.result)
      let multipliedResult1 = multiplyOrDivide(multipliedResult.result, randoms, 'multiply')
      let answer = simplifyFraction(multipliedResult1.result)

       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `You are making ${randomNum} servings of strawberry cake at a time. You do this ${randomNum1} times to meet your goal for the day. How many cups of milk did you use to meet your goal for the day?`,
            es: `Estás haciendo ${randomNum} porciones de pastel de fresa a la vez. Haces esto ${randomNum1} veces para alcanzar tu objetivo del día. ¿Cuántas tazas de leche usaste para alcanzar tu meta del día?`,
        
        },
        answer.result,
        [{
            en:  `1) Cups of milk per serving = ${first_ingredient_key_amount} / ${serving_size} = ${simplify2.result}
            2) Total cups of milk = Cups of milk per serving x servings * goal requirement
            `,
            es:  `1) Tazas de leche por porción = ${first_ingredient_key_amount} / ${serving_size} = ${simplify2.result}
            2) Total de tazas de leche = tazas de leche por porción * porciones * objetivo requerido
            `,
        },
        {
          en:  `1) Cups of milk per serving = ${first_ingredient_key_amount} / ${serving_size} = ${simplify2.result}
          2) Total cups of milk = ${simplify2.result} x ${randomNum} x ${randomNum1} = ${answer.result}
          `,
          es:  `Tazas de leche por porción = ${first_ingredient_key_amount} / ${serving_size} = ${simplify2.result}
          Total de tazas de leche = ${simplify2.result} x ${randomNum} x ${randomNum1} = ${answer.result}
          `,
      }],
        answer.types,
  
      ))
    }

    //Strawberry Cake 4
    if (recipe.name.en == "Strawberry cake"){
      const fractions = [8,16,24,32];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      let cookTime = recipe.cookTime
      let prepTime = recipe.prepTime
      let totalTimes = cookTime + prepTime*3
      let serving_size = recipe.servingSize
      let firstStep = randomFraction/serving_size
      let second_step = firstStep*totalTimes

      let randomNum2 = randomInt(1,4);
      let randomNum3 = randomInt(10,30)
      let randomNum4 = randomNum2 + ":"+  randomNum3

            // Convert start time to minutes
      let totalMinutes = randomNum2 * 60 + randomNum3;

            // Add the desired number of minutes
            totalMinutes += second_step;
      
            // Calculate the new hours and minutes
            let newHours = Math.floor(second_step / 60);
            let newMinutes = second_step % 60;
      
            let finalTimeHr = (randomNum2+newHours)
            let finalTimeSec = (randomNum3+newMinutes)
            let done = finalTimeHr + ":" + finalTimeSec



       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `You and Auntie Maria start making strawberry cake at ${randomNum4}PM. Today, it takes you triple the amount of prep time and the same amount of cook time to make the strawberry cake. The original prep time is 10 minutes and cook time is 15 minutes. If you made ${randomFraction} servings, at what time did you finish? Type your answer in time format (ex. HH:MM). Hint: 1 hour = 60 minutes. `,
            es: `La tía María y tú empiezan a hacer pastel de fresas a las ${randomNum4}PM. Hoy en día, se necesita el triple de tiempo de preparación y la misma cantidad de tiempo de cocción para hacer el pastel de fresas.El tiempo original de preparación es de 10 minutos y de coccción 15 minutos. Si hiciste ${randomFraction} porciones, ¿a qué hora terminaste? Escriba su respuesta en formato de hora (por ejemplo, HH:MM). Pista: 1 hora = 60 minutos.`,
        
        },
        done,
        [{
            en:  `1) Time per cake = new prep time + cook time 
            2) Total cakes = total servings / servings for 1 cake  
            3) Total Time = total cakes x time per cake 
            4) Finish Time = Start Time + Total Time
            `,
            es:  `1) Tiempo por pastel = nuevo tiempo de preparación + tiempo de cocción
            2) Total de tortas = porciones totales / porciones para 1 torta
            3) Tiempo total = total de tortas x tiempo por torta
            4) Hora de finalización = Hora de inicio + Tiempo total
            `,
        },
        {
          en:  `Time per cake = (${prepTime}x3) + ${cookTime} = ${totalTimes} 
          Total cakes = ${randomFraction} / ${serving_size} = ${firstStep}  
          Total Time = ${firstStep}  x ${totalTimes} = ${second_step}
          Finish Time = ${randomNum4}PM + ${second_step} = ${done}
          `,
          es:  `Tiempo por torta = (${prepTime}x3) + ${cookTime} = ${totalTimes} 
          Tortas totales =  ${randomFraction} / ${serving_size} = ${firstStep}
          Tiempo Total = ${firstStep}  x ${totalTimes} = ${second_step}
          Hora de finalización = ${randomNum4}PM + ${second_step} = ${done}
          `,
      }],
        "time",
  
      ))
    }

    //Strawberry Cake 5
    if (recipe.name.en == "Strawberry cake"){
      let randomNum = randomInt(2,9);
      let randomNum1 = randomInt(2,11);

      let first_ingredient_key = Object.keys(recipe.ingredients)[5];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide(fractionOrInteger, randomNum, 'multiply')
      let simplify = simplifyFraction(multipliedResult.result)
      let multipliedResult1 = multiplyOrDivide(multipliedResult.result, randomNum1, 'multiply')
      let answer = simplifyFraction(multipliedResult1.result)

       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `Auntie Maria’s recipe uses a specific amount of strawberries. Your friend uses a different recipe that uses ${randomNum} times as many strawberries as Auntie’s recipe. If your friend made ${randomNum1} cakes, how many cups of strawberries did your friend use? Write your answer in decimal form. Round to the nearest tenth.`,
            es: `La receta de la tía María utiliza una cantidad específica de fresas. Tu amigo utiliza una receta diferente que utiliza ${randomNum} veces más fresas que la receta de la tía María. Si tu amigo hizo ${randomNum1} pasteles, ¿cuántas tazas de fresas utilizó tu amigo? Escribe tu respuesta en forma decimal. Redondea al décimo más cercano.`,
        
        },
        answer.result,
        [{
            en:  `1) Friend cups of strawberry per cake = Auntie’s cups of strawberries x ${randomNum}
            2) Total cups of strawberry for friend = Friend cups of strawberry per cake x ${randomNum1}
            `,
            es:  `1) Tazas de fresas del amigo por pastel = Tazas de fresas de la tía María x ${randomNum}
            2) Total de tazas de fresas para el amigo = Tazas de fresas del amigo por pastel x ${randomNum1}
            `,
        },
        {
          en:  `1) Friend cups of strawberry per cake = ${first_ingredient_key_amount} x ${randomNum} = ${simplify.result}
          2) Total cups of strawberry for friend = ${simplify.result} x ${randomNum1} = ${answer.result}
          `,
          es:  `1) Tazas de fresas del amigo por pastel = ${first_ingredient_key_amount} x ${randomNum} = ${simplify.result}
          2) Total de tazas de fresas para el amigo = ${simplify.result} x ${randomNum1} = ${answer.result} 
          `,
      }],
        answer.types,
  
      ))
    }
    
    //Strawberry Cake 6
    if (recipe.name.en == "Strawberry cake"){
      let cookTime = recipe.cookTime
      let prepTime = recipe.prepTime
      let totalTime = cookTime*2 + prepTime*2
      const fractions = [8,16,24,32,40,48,56];
      const randomIndex = Math.floor(Math.random() * fractions.length);
      const randomFraction = fractions[randomIndex];
      const servingSize = recipe.servingSize
      let fractionOrInteger = convertToFraction(randomFraction+"/"+servingSize)
      let simplify = simplifyFraction(fractionOrInteger)
      let multipliedResult = multiplyOrDivide(fractionOrInteger, totalTime, 'multiply')
      let simplify2 = simplifyFraction(multipliedResult.result)




       // create question
       generatedQuestions.push(createGameQuestion(
        {
            en: `The original prep time is 10 minutes and cook time is 15. Yesterday you took double the amount of prep time and double the amount of cook time to make 8 servings of strawberry cake following the recipe. You’re making ${randomFraction} servings today. How many minutes will it take you to make these servings if you are working at the same speed as yesterday?`,
            es: `El tiempo original de preparación 10 minutos y 15 de cocción. Ayer te tomaste el doble de tiempo en la preparación y el doble de tiempo en la cocción para hacer 8 porciones de pastel de fresas siguiendo la receta. Hoy estás haciendo ${randomFraction} porciones. ¿Cuántos minutos te llevará hacer estas porciones si estás trabajando a la misma velocidad que ayer?`,
        
        },
        simplify2.result,
        [{
            en:  `1) Time per cake = new prep time + new cook time 
            2) Total cakes = total servings / servings for 1 cake  
            3) Total Time = total cakes * time per cake
            `,
            es:  `1) Tiempo por pastel = nuevo tiempo de preparación + nuevo tiempo de cocción
            2) Total de pasteles = total de porciones / porciones por 1 pastel
            3) Tiempo total = total de pasteles * tiempo por pastel
            `,
        },
        {
          en:  `1) Time per cake = (${cookTime}x2) + (${prepTime}x2) = ${totalTime} minutes 
          2) Total cakes = ${randomFraction} / ${servingSize} = ${simplify.result}  
          3) Total Time = ${simplify.result} x ${totalTime} = ${simplify2.result} minutes 
          `,
          es:  `1) Tiempo por pastel = (${cookTime}x2) + (${prepTime}x2) = ${totalTime} minutes 
          2) Total de pasteles = ${randomFraction} / ${servingSize} = ${simplify.result}
          3) Tiempo total = ${simplify.result} x ${totalTime} = ${simplify2.result} minutos 
          `,
      }],
        simplify2.types,
  
      ))
    }

    return generatedQuestions;
}

export default function generateAuntOperationsAndAlgebraQuestions(recipe,randomGenerator) {
    // array of questions
    let questions = [];
    // array of dishes

    const { randomInt } = randomGenerator;

    // random number to choose a dish
    if (recipe.level == 1) {
      // add the A section
      let generatedQuestions = generateLevel1AuntQuestions(recipe, randomInt);
      questions = questions.concat(generatedQuestions);
  }
    if (recipe.level == 2) {
        // add the A section
        let generatedQuestions = generateLevel2AuntQuestions(recipe, randomInt);
        questions = questions.concat(generatedQuestions);
    }  
    if (recipe.level == 3) {

        // add the A section
        let generatedQuestions = generateLevel3AuntQuestions(recipe ,randomInt);
        questions = questions.concat(generatedQuestions);

    }




    return questions;
}