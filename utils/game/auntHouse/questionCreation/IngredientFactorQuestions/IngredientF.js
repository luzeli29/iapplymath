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
        type: 'integer',
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


function generateLevel2AuntQuestions(recipe, randomInt){
    let generatedQuestions = [];


    // ***********************************************************************************************************************
    // question 1

    // Aunt Maria needs to make a total of (number between 200-500 that is divisible by 2) servings of Strawberry Milkshake. How many cups of vanilla ice cream will be needed?  (NC.4.NF.3, NC.4.NF.4) (Hard) (word problem) 
    //Aunt Maria is preparing to make [15-35] limeades. How many total cups of lime juice does she need? (NC.4.NF.4) (Medium) (word problem) 

    // choose random number between 15 and 35
    // let randomNum = Math.floor(Math.random() * 41 + 10);
let randomNum;

    if (recipe.name.en == "Limeade"){
      randomNum = randomInt(15,36);
    }else if (recipe.name.en == "Milkshake"){
       randomNum = randomInt(200,501);
       if (randomNum % 2 !== 0) {
        randomNum += 1; // Add 1 to make it even
      }
    }else if (recipe.name.en == "Pudding"){
      randomNum = randomInt(10,21);
    }else if (recipe.name.en == "Samoa Pretzel Stick"){
        randomNum = randomInt(20,26);
    }else{
      randomNum = randomInt(10,21);
    }

    let first_ingredient_key = Object.keys(recipe.ingredients)[0];
    let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;

    // Convert the amount to a fraction or integer
    let fractionOrInteger = convertToFraction(first_ingredient_key_amount);

    //multiply integer of fraction y random
    const multipliedResult = multiplyOrDivide(fractionOrInteger, randomNum, 'multiply');

    

    //let first_ingredient = recipe["ingredients"][first_ingredient_key]["ingredient"]
    // answer
    
    let result ;
    let types  = 'wholeNumber';
    

    const simplifiedMultipliedResult = simplifyFraction(multipliedResult.result);


    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en: `Aunt Maria is preparing to make ${randomNum} ${recipe.name.en}s. How many total cups of ${first_ingredient_key} does she need?`,
            es: `Tía Maria está preparando ${randomNum} ${recipe.name.es}s. ¿Cuántas tazas de ${first_ingredient_key} necesita en total?`,
        
        },
        simplifiedMultipliedResult.result,
        [{
            en:  randomNum + " x " + (first_ingredient_key_amount) + " = ???" ,
            es:  randomNum + " x " + (first_ingredient_key_amount) + " = ???" 
        },{
            en: randomNum + " x " + (first_ingredient_key_amount) + " = " + simplifiedMultipliedResult.result ,
            es: randomNum + " x " + (first_ingredient_key_amount) + " = " + simplifiedMultipliedResult.result ,
        }],
        simplifiedMultipliedResult.types,
    ))

    // ***********************************************************************************************************************
    // question 2

    //Aunt Maria is preparing the ingredients needed to make (random number between 2-8) Strawberry Milkshakes. Combine the total cups of whipped cream and frozen strawberries she will use. (NC.4.NF.3, NC.4.NF.4) (Hard) (word problem) 
    // choose random number between 15 and 35
    // let randomNum = Math.floor(Math.random() * 41 + 10);
    
    if (recipe.name.en == 'Milkshake') {
      randomNum = randomInt(2,9);

      let ing1 ;
      let ing2 ; 
      let ing1_amount;
      let ing2_amount;

      ing1 =  Object.keys(recipe.ingredients)[0];
      ing1_amount = recipe.ingredients[ing1].amount;
      ing2 =  Object.keys(recipe.ingredients)[3];
      ing2_amount = recipe.ingredients[ing2].amount;

      let fractionOrInteger1 = convertToFraction(ing1_amount);
      let fractionOrInteger2 = convertToFraction(ing2_amount);

      //multiply integer of fraction y random
      const multipliedResult1 = multiplyOrDivide(fractionOrInteger1, randomNum, 'multiply');
      const multipliedResult2 = multiplyOrDivide(fractionOrInteger2, randomNum, 'multiply');

    
      //let first_ingredient = recipe["ingredients"][first_ingredient_key]["ingredient"]
      // answer
      
      
      let types  = 'wholeNumber';
    
      const simplifiedMultipliedResult1 = simplifyFraction(multipliedResult1.result);
      const simplifiedMultipliedResult2 = simplifyFraction(multipliedResult2.result);

     

      const convert1 = convertToFraction(simplifiedMultipliedResult1.result)
      const convert2 = convertToFraction(simplifiedMultipliedResult2.result)

      let casiresult = addOrSubtract(convert1, convert2, 'add')

      result = simplifyFraction(casiresult.result)
      

      //result = fractionOrInteger1 * randomNum
     // create question
     generatedQuestions.push(createGameQuestion(
      {
          en: `Aunt Maria is preparing to make ${randomNum} ${recipe.name.en}s. How many total cups of ${ing1} and ${ing2} will she need?`,
          es: `Tía Maria está preparando ${randomNum} ${recipe.name.es}s. ¿Cuántas tazas de ${ing1} y ${ing2} necesita en total?`,
      
      },
      result.result,
      [{
          en:  randomNum + " x " + (ing1_amount) + " = Amount of " + ing1 ,
          es:  randomNum + " x " + (ing1_amount) + " = Cantidad de  " + ing1 
      },{
        en:  randomNum + " x " + (ing1_amount) + " = " + simplifiedMultipliedResult1.result ,
        es:   randomNum + " x " + (ing1_amount) + " = " + simplifiedMultipliedResult1.result ,
      },{
          en: randomNum + " x " + (ing2_amount) + " = Amount of " + ing2 ,
          es:  randomNum + " x " + (ing2_amount) + " = Cantidad de  " + ing2
      },{
        en: randomNum + " x " + (ing2_amount) + " = "  + simplifiedMultipliedResult2.result ,
        es:  randomNum + " x " + (ing2_amount) + " = " + simplifiedMultipliedResult2.result  ,
      },{
        en: simplifiedMultipliedResult1.result  + " + " +  simplifiedMultipliedResult2.result + " = " + result.result,
        es: simplifiedMultipliedResult1.result  + " + " +  simplifiedMultipliedResult2.result + " = ",
      }],
      result.types,

    ))

    }

    // ***********************************************************************************************************************
    // question 3

    //Aunt Maria measures that following this recipe makes [1-2] liters of strawberry milkshake. How many milliliters of strawberry milkshake are in one serving?
    if (recipe.name.en == 'Milkshake') {
      randomNum = randomInt(1,3);

      let result1 = randomNum * 1000
      result = result1/2
 
     // create question
     generatedQuestions.push(createGameQuestion(
      {
          en: `Aunt Maria measures that following this recipe makes ${randomNum} liters of ${recipe.name.en}. How many milliliters of ${recipe.name.en} are in one serving?`,
          es: `Tía Maria mide que al preparar esta receta se hacen ${randomNum} litros de  ${recipe.name.es}. ¿Cuántos mililitros de  ${recipe.name.es} hay en una servida?`,
      
      },
      result,
      [{
          en:  "Hint: 1 L= 1000 mL",
          es:  "Pista: 1 L = 1000 mL"
      },{
        en:  randomNum + " x 1000 = ???" ,
        es:  randomNum + " x 1000 = ???" ,
      },{
        en:  randomNum + " x 1000 = " + result1 + "(two servings)",
        es:  randomNum + " x 1000 = " + result1 + "(dos porciones)",
      },{
        en:  result1+ " ÷ 2 = " + result + "mL" ,
        es:  result1 + " ÷ 2 = " + result + "mL",
      }],
      "wholeNumber",

    ))

    }

        // ***********************************************************************************************************************
    // question 4

    // One bag of frozen strawberries contains [3-9] cups of strawberries per bag. If one bag of frozen strawberries weighs (a random whole number 450-999), how much does each cup of strawberries weigh? If any, include remainders in your answer!
    if (recipe.name.en == 'Milkshake') {
      randomNum = randomInt(3,10);
      let randomNum2 = randomInt(450,1000);

      first_ingredient_key = Object.keys(recipe.ingredients)[0];

      result = Math.round((randomNum2 / randomNum),2)
      
     // create question
     generatedQuestions.push(createGameQuestion(
      {
          en: `One bag of  ${first_ingredient_key} contains ${randomNum} cups per bag. If one bag of ${first_ingredient_key} weighs ${randomNum2}, how much does each cup weigh?`,
          es: `Una bolsa de ${first_ingredient_key} contiene ${randomNum} tazas por bolsa. Si una bolsa de ${first_ingredient_key} pesa ${randomNum2}, cuánto pesa cada taza?`,
      },
      result,
      [{
        en:  "Round to the nearest whole number",
        es:  "Redondea al número entero más cercano",
      },{
          en:  randomNum2+ " ÷ "+ randomNum + " = ???",
          es:  randomNum2+ " ÷ "+ randomNum + " = ???",
      },{
        en:  randomNum2+ " ÷ "+ randomNum + " = " + result ,
        es:  randomNum2+ " ÷ "+ randomNum + " = "+ result,
      }],
      "wholeNumber",

    ))

    }

        // question 5

    // One bag of cherries contains [20-35] cherries. How many cherries does Aunt Maria have if she buys [11-30] bags?
    if (recipe.name.en == 'Milkshake') {
      randomNum = randomInt(20,36);
      let randomNum2 = randomInt(11,31);

      first_ingredient_key = Object.keys(recipe.ingredients)[4];

      result = randomNum * randomNum2
      
     // create question
     generatedQuestions.push(createGameQuestion(
      {
          en: `One bag of  ${first_ingredient_key}s contains ${randomNum}  ${first_ingredient_key}s. How many  ${first_ingredient_key}s does Aunt Maria have is she buys  ${randomNum2} bags?`,
          es: `Una bolsa de ${first_ingredient_key} contiene ${randomNum}  ${first_ingredient_key}s. ¿Cuántas ${first_ingredient_key} tiene Tía Maria si compra ${randomNum2} bolsas?`,
      },
      result,
      [{
          en:  randomNum+ " x "+ randomNum2 + " = ???",
          es:  randomNum+ " x "+ randomNum2 + " = ???",
      },{
        en:  randomNum+ " x "+ randomNum2 + " = " + result ,
        es:  randomNum+ " x "+ randomNum2 + " = "+ result,
      }],
      "wholeNumber",

    ))

    }

    // question 6

    //Aunt Maria has [a mixed fraction between 2-5 w/ denominators 3,4,5,6,8,10,12,or100] cups of milk inside the fridge. How many cups of milk will she have after making 1 strawberry milkshake?
    if (recipe.name.en == 'Milkshake') {
      randomNum = randomInt(2,6);
      let randomNum2 = randomInt(3,7);

      first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;

      let strings = randomNum + "/" + randomNum2
  
      // Convert the amount to a fraction or integer
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount);
      let fractionOrIntegerStrings = convertToFraction(strings);
  
      //multiply integer of fraction y random
      let preresult = addOrSubtract(fractionOrIntegerStrings, fractionOrInteger, 'subtract')

      result = simplifyFraction(preresult.result)

      
     // create question
     generatedQuestions.push(createGameQuestion(
      {
          en: `Aunt Maria has  ${strings} cups of ${first_ingredient_key} inside the fridge. How many cups of ${first_ingredient_key} does she have left after making 1 ${recipe.name.en}?`,
          es: `Tía Maria tiene  ${strings} tazas de ${first_ingredient_key} en el refrigerador. ¿Cuántas tazas de ${first_ingredient_key} tiene después de haber hecho 1 ${recipe.name.es}?`,
      },
      result.result,
      [{
          en:  strings+ " - "+ first_ingredient_key_amount + " = ???",
          es:  strings+ " - "+ first_ingredient_key_amount + " = ???",
      },{
        en:  strings+ " - "+ first_ingredient_key_amount + " = " + result.result,
        es:  strings+ " - "+ first_ingredient_key_amount + " = " + result.result,
      }],
      result.types,

    ))

    }

    // question 7

    //On the first night, Aunt made [2-4] milkshakes. On the second night, Aunt made [2-6] milkshakes. Compare how many cups of milk were used on the first day to how many cups of whipped cream were used on the second day. Compare the fractions using >, =, or <. 
    if (recipe.name.en == 'Milkshake') {
      randomNum = randomInt(2,5);
      let randomNum2 = randomInt(2,7);

      first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let second_ingredient_key = Object.keys(recipe.ingredients)[3];
      let second_ingredient_key_amount = recipe.ingredients[second_ingredient_key].amount;

  
      // Convert the amount to a fraction or integer
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount);
      let fractionOrInteger2 = convertToFraction(second_ingredient_key_amount);

      let first_day = multiplyOrDivide(fractionOrInteger,randomNum, 'multiply')
      let second_day = multiplyOrDivide( fractionOrInteger2,randomNum2, 'multiply')

      let simplifiedMultipliedResult1 = simplifyFraction(first_day.result)
      let simplifiedMultipliedResult2 = simplifyFraction(second_day.result)

      let compare = compareNumbers(simplifiedMultipliedResult1.result, simplifiedMultipliedResult2.result)



     // create question
     generatedQuestions.push(createGameQuestion(
      {
          en: `On the first night, Aunt made ${randomNum} ${recipe.name.en}. On the second night, Aunt made ${randomNum2} ${recipe.name.en}s. Compare how many cups of ${first_ingredient_key} were used on the first day to how many cups of ${second_ingredient_key} were used on the second day.`,
          es: `En la primera noche, tía Maria hizo ${randomNum} ${recipe.name.es}. En la segunda noche, Maria hizo ${randomNum2} ${recipe.name.es}s. Compare cuantas tazas de ${first_ingredient_key}se utilizaron en el primer día a cuantas tazas de ${second_ingredient_key} se utilizaron en el segundo día.`,
      },
      compare,
      [{
        en: "Choose the correct symbol to compare the fractions.",
        es: "Elige el símbolo correcto para comparar las fracciones.",
      },{
        en: simplifiedMultipliedResult1.result + " {< , = , > } " + simplifiedMultipliedResult2.result ,
        es: "Elige el símbolo correcto para comparar las fracciones.",
      }],
      "inequality",

    ))

    }

        // question 8

    //The base of one milk carton has the following width: [a mixed number between 5-8 with fraction denominator 2,3,4,5,6,8,10,12 = “width”] cm, and a length of “x.” The area of the milk carton base is [10-30, can be a mixed number= “Area”].
    if (recipe.name.en == 'Milkshake') {
      randomNum = randomInt(5,9);
      let randomNum2 = randomInt(2,7);
      let randomNum3 = randomInt(10,31);

      let strings = randomNum + "/" + randomNum2
  
      // Convert the amount to a fraction or integer
      let fractionOrIntegerStrings = convertToFraction(strings);
  
      //multiply integer of fraction y random
      let preresult = multiplyOrDivide(fractionOrIntegerStrings, randomNum3, 'multiply')

      result = simplifyFraction(preresult.result)

      
     // create question
     generatedQuestions.push(createGameQuestion(
      {
          en: `The base of one milk carton has the following width: ${strings} cm, and a length of ${randomNum3}. What is the area of the milk cartons`,
          es: `La base de un cartón de leche tiene el siguiente ancho: ${strings} cm, y ${randomNum3} de largo. ¿Cuál es el área de el cartón de leche?`,
      },
      result.result,
      [{
          en: "Area = width x height",
          es:  "Área = ancho x largo",
      },{
        en:  strings+ " x " +randomNum3+ " = " + result.result ,
        es:  strings + " x " +randomNum3+ " = " + result.result,
      }],
      result.types,

    ))

    }


    

    //question 2 limeade 
    //Aunt Maria wants to make a total of [100-230] servings of Limeade for an event. How many cups of water does she need?
    
    if (recipe.name.en == "Limeade"){
      randomNum = randomInt(100,231);

      let first_ingredient_key = Object.keys(recipe.ingredients)[2];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let serving_size = recipe.servingSize


      // Convert the amount to a fraction or integer
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount);

      //multiply integer of fraction y random
      let multipliedResult = multiplyOrDivide(randomNum, serving_size, 'divide');

      let simplifiedMultipliedResult = simplifyFraction(multipliedResult.result);

      let fractionOrInteger2 = convertToFraction(simplifiedMultipliedResult.result)

      let multipliedResult2 = multiplyOrDivide(fractionOrInteger2, first_ingredient_key_amount, 'multiply')

      let simplifiedMultipliedResult2 = simplifyFraction(multipliedResult2.result)


    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en: `Aunt Maria wants to make a total of ${randomNum} ${recipe.name.en}s. How many total cups of ${first_ingredient_key} will she need?`,
            es: `Tía Maria quiere hacer un total de ${randomNum} ${recipe.name.en}s. ¿Cuántas tazas de ${first_ingredient_key} va a necesitar?`,
        
        },
        simplifiedMultipliedResult2.result,
        [{
            en:  randomNum + " ÷ " + serving_size + " = ???" ,
            es:  randomNum + " ÷ " + serving_size + " = ???" ,
        },{
          en:  randomNum + " ÷ " + serving_size + " = " + simplifiedMultipliedResult.result ,
          es:  randomNum + " ÷ " + serving_size + " = " + simplifiedMultipliedResult.result,
        },{
          en:  simplifiedMultipliedResult.result + " x " + first_ingredient_key_amount + " = ???" ,
          es:  simplifiedMultipliedResult.result + " x " + first_ingredient_key_amount + " = ???",
        },{
          en:  simplifiedMultipliedResult.result + " x " + first_ingredient_key_amount + " = " + simplifiedMultipliedResult2.result ,
          es:  simplifiedMultipliedResult.result + " x " + first_ingredient_key_amount + " = " + simplifiedMultipliedResult2.result,
        }],
        simplifiedMultipliedResult2.types,
    ))

    }

    //question 3 limeade 
    //Aunt Maria spent a total of [3-8] hours of prep time to make limeades. According to the recipe, how many limeades did she prepare in total? 
    
    if (recipe.name.en == "Limeade"){
      randomNum = randomInt(3,9);

      let serving_time = recipe.time
      let mintohours= 60 * randomNum
    

      //multiply integer of fraction y random
      let multipliedResult = multiplyOrDivide(mintohours, serving_time, 'divide');

      let simplifiedMultipliedResult = simplifyFraction(multipliedResult.result);


    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en: `Aunt Maria takes ${serving_time} minutes to make one recipe. She took ${randomNum} hours to make ${recipe.name.en}. How many ${recipe.name.en} did she prepare in total?`,
            es: `Tía Maria se toma ${serving_time} minutos hacer una receta. Se tomo ${randomNum} horas para hacer  ${recipe.name.es}. ¿Cuántas ${recipe.name.es} preparo en total?`,
        
        },
        simplifiedMultipliedResult.result,
        [{
            en:  "( " + randomNum + " x 60 ) " + " ÷ " + serving_time + " = ???" ,
            es:  "( " + randomNum + " x 60 ) " + " ÷ " + serving_time + " = ???" ,
        },{
          en:  "( " + randomNum + " x 60 ) " + " ÷ " + serving_time + " = " + simplifiedMultipliedResult.result ,
          es:  "( " + randomNum + " x 60 ) " + " ÷ " + serving_time + " = " + simplifiedMultipliedResult.result ,
        }],
        simplifiedMultipliedResult.types,
    ))

    }

      //question 4 limeade 
     //A cup of ice is nearly equal to half a pound of ice. However, ice is only sold in 3 lb bags. To make [5-25] limeades, how many 3 lb ice bags will Aunt Maria need to buy?
    
    if (recipe.name.en == "Limeade"){
      randomNum = randomInt(5,26);

      first_ingredient_key = Object.keys(recipe.ingredients)[3];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      

      //multiply integer of fraction y random
      let amoutn = convertToFraction(first_ingredient_key_amount)
      let first_step = multiplyOrDivide(amoutn, randomNum, 'multiply') 
      let simplifiedMultipliedResult = simplifyFraction(first_step.result)

      let second_step =multiplyOrDivide(simplifiedMultipliedResult.result, 2 , 'divide')
      let simplifiedMultipliedResult2 = simplifyFraction(second_step.result)

      let fractionOrInteger1 = convertToFraction(simplifiedMultipliedResult2.result)
      let third_step =multiplyOrDivide(fractionOrInteger1, 3 , 'divide')

      let simplifiedMultipliedResult3 = simplifyFraction(third_step.result)

      let done =  Math.ceil(third_step.result.numerator/third_step.result.denominator)
     // create question
    generatedQuestions.push(createGameQuestion(
        {
            en: `A cup of ${first_ingredient_key} is nearly equal to half a pound of ${first_ingredient_key}. However, ${first_ingredient_key} is only sold in 3 lb bags. To make ${randomNum} ${recipe.name.en}, how many  3 lb ${first_ingredient_key} bags will Aunt Maria need?`,
            es:`Una taza de ${first_ingredient_key} es casi igual a media libra de  ${first_ingredient_key}. El ${first_ingredient_key} solo lo venden en bolsas de 3 libras. Para hacer ${randomNum} ${recipe.name.es}, cuantas bolsas de 3 lb ${first_ingredient_key}  necesita Tía Maria?`,
        
        },
        done,
        [{
            en:  first_ingredient_key_amount + " x " + randomNum + " = Total cups of ice nededed"  ,
            es:  first_ingredient_key_amount + " x " + randomNum + " = Total de tazas hielo a utilizar"  ,
        },{
          en:  first_ingredient_key_amount + " x " + randomNum + " = " + simplifiedMultipliedResult.result ,
          es:  first_ingredient_key_amount + " x " + randomNum + " = " + simplifiedMultipliedResult.result   ,
        },{
          en:  simplifiedMultipliedResult.result + " ÷  2  = Total pounds of ice nededed"  ,
          es:  simplifiedMultipliedResult.result + " ÷  2  = Total de libras hielo a utilizar"  ,
      },{
        en:  simplifiedMultipliedResult.result + " ÷  2  = " + simplifiedMultipliedResult2.result ,
        es:  simplifiedMultipliedResult.result + " ÷  2  = " + simplifiedMultipliedResult2.result ,
      },{
        en:  simplifiedMultipliedResult2.result + " ÷  3  = Total ice bags needed"  ,
        es:  simplifiedMultipliedResult2.result + " ÷  3  = Total de bolsas de huelo"  ,
    },{
      en:  simplifiedMultipliedResult2.result + " ÷  3  = " + simplifiedMultipliedResult3.result  ,
      es:  simplifiedMultipliedResult2.result + " ÷  3  = " + simplifiedMultipliedResult3.result ,
    },{
      en: "Round to the nearest whole number  " ,
      es:  "Redondea al número completo más cercano"
    },{
      en: (third_step.result.numerator) + " ÷ " + (third_step.result.denominator) + " = " + (third_step.result.numerator/third_step.result.denominator),
      es: (third_step.result.numerator) + " ÷ " + (third_step.result.denominator) + " = " + (third_step.result.numerator/third_step.result.denominator),
    }],
        "wholeNumber",
    ))

    }

      //question 5 limeade 
     //One bottle of lime juice is equal to 2 ½ cups of lime juice. In order to make [5-25] lime juices, how many bottles of lime juice will Aunt Maria use?
     if (recipe.name.en == "Limeade"){
      randomNum = randomInt(5,26);
      let amount = '5/2'

      //get ingredient and amount
      let first_ingredient_key = Object.keys(recipe.ingredients)[0];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;


      //convert to fraction or decimal
      fractionOrInteger = convertToFraction(amount)
      let fractionOrInteger1 = convertToFraction(first_ingredient_key_amount)

      let multipliedResult = multiplyOrDivide(fractionOrInteger, randomNum, 'multiply')
      let simplifiedMultipliedResult = simplifyFraction(multipliedResult.result)

      let multipliedResult1 = convertToFraction(simplifiedMultipliedResult.result)
      let multipliedResult2 = multiplyOrDivide(multipliedResult1, fractionOrInteger1, 'divide')
      let simplifiedMultipliedResult1 = simplifyFraction(multipliedResult2.result)

      let done =  Math.ceil(multipliedResult2.result.numerator/multipliedResult2.result.denominator)


    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en: `One bottle of ${first_ingredient_key} juice is equal to 2 and 1/2 cups (or 5/2 cups) of ${first_ingredient_key}. In order to make ${randomNum} ${first_ingredient_key} juices, how many bottles of ${first_ingredient_key} juice will Aunt Maria use? `,
            es: `Una botella de jugo de  ${first_ingredient_key} es igual a 2  1/2 tazas ( o 5/2 tazas) de  ${first_ingredient_key}. Para hacer ${randomNum} jugos de ${first_ingredient_key}. ¿Cuántas botellas de jugo de  ${first_ingredient_key} necesitara Tía Maria? `,
        
        },
        done,
        [{
            en: '(5/2) x ' + randomNum + " = Total cups "+ first_ingredient_key +" juice",
            es: '(5/2) x ' + randomNum + " = Tazas totales de jugo de "+ first_ingredient_key ,
        },{
          en: '(5/2) x ' + randomNum + " = " + simplifiedMultipliedResult.result,
          es: '(5/2) x ' + randomNum + " = " + simplifiedMultipliedResult.result,
      },{
        en: simplifiedMultipliedResult.result +" ÷ "+ first_ingredient_key_amount + " = Total bottles of "+ first_ingredient_key +" juice",
        es: simplifiedMultipliedResult.result +" ÷ "+first_ingredient_key_amount + " = Botellas totales de jugo de "+ first_ingredient_key ,
    },{
      en: simplifiedMultipliedResult.result +" ÷ "+ first_ingredient_key_amount + " = " + simplifiedMultipliedResult1.result,
      es: simplifiedMultipliedResult.result +" ÷ "+first_ingredient_key_amount + " =  " + simplifiedMultipliedResult1.result,
  },{
    en: "Round to the nearest whole number  " ,
    es:  "Redondea al número completo más cercano"
  },{
    en: (multipliedResult2.result.numerator) + " ÷ " + (multipliedResult2.result.denominator) + " = " + (multipliedResult2.result.numerator/multipliedResult2.result.denominator),
    es: (multipliedResult2.result.numerator) + " ÷ " + (multipliedResult2.result.denominator) + " = " + (multipliedResult2.result.numerator/multipliedResult2.result.denominator),
  }],
        "wholeNumber",
    ))

    }


      //question 6 limeade 
     // One bag of sugar contains about 34 ½ cups of sugar. If Aunt has [2-6] bags of sugar, how many servings of limeade can she make with them? 
    
     if (recipe.name.en == "Limeade"){
      randomNum = randomInt(2,7);
      let amount = '69/2'

      //get ingredient and amount
      let first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let serving_size = recipe.servingSize

      //convert to fraction or decimal
      fractionOrInteger = convertToFraction(amount)
      let fractionOrInteger1 = convertToFraction(first_ingredient_key_amount)

      let multipliedResult = multiplyOrDivide(fractionOrInteger, randomNum, 'multiply')
      let simplifiedMultipliedResult = simplifyFraction(multipliedResult.result)

      let multipliedResult1 = convertToFraction(simplifiedMultipliedResult.result)
      let multipliedResult2 = multiplyOrDivide(multipliedResult1, serving_size, 'multiply')
      let simplifiedMultipliedResult1 = simplifyFraction(multipliedResult2.result)

      let done =  Math.ceil(multipliedResult2.result.numerator/multipliedResult2.result.denominator)


    // create question
    
    generatedQuestions.push(createGameQuestion(
        {
            en: `One bag of ${first_ingredient_key} is equal to 34 and 1/2 cups (or 69/2 cups) of ${first_ingredient_key}. If Aunt has ${randomNum} bags of ${first_ingredient_key},  how many servings of ${recipe.name.en} can she make with them?`,
            es: `Una bolsa de ${first_ingredient_key} es igual a 34 tazas y  1/2 (o 69/2 tazas) de ${first_ingredient_key}. Si Tía Maria tiene ${randomNum} bolsas de ${first_ingredient_key}, ¿Cuántas porciones de ${recipe.name.es} se pueden hacer?`,
        
        },
        done,
        [{
            en: '(69/2) x ' + randomNum + " = Total cups "+ first_ingredient_key,
            es: '(69/2) x ' + randomNum + " = Tazas totales de "+ first_ingredient_key ,
        },{
          en: '(69/2) x ' + randomNum + " = " + simplifiedMultipliedResult.result,
          es: '(69/2) x ' + randomNum + " = " + simplifiedMultipliedResult.result,
      },{
        en: simplifiedMultipliedResult.result +" x "+ serving_size + " = Total servings",
        es: simplifiedMultipliedResult.result +" x "+ serving_size + " = Porciones totales" ,
    },{
      en: simplifiedMultipliedResult.result +" x "+ serving_size + " = " + simplifiedMultipliedResult1.result,
      es: simplifiedMultipliedResult.result +" x "+ serving_size + " =  " + simplifiedMultipliedResult1.result,
  },{
    en: (multipliedResult2.result.numerator) + " ÷ " + (multipliedResult2.result.denominator) + " = " + (multipliedResult2.result.numerator/multipliedResult2.result.denominator),
    es: (multipliedResult2.result.numerator) + " ÷ " + (multipliedResult2.result.denominator) + " = " + (multipliedResult2.result.numerator/multipliedResult2.result.denominator),
  },{
    en: "Round to the nearest whole number  = " + done  ,
    es:  "Redondea al número completo más cercano =" + done,
  }],
        "wholeNumber",
    ))

    }

          //question 7 limeade 
     //  If one limeade is equal to [2.5 - 3.5] liters, how many mL are in each serving?
    
     if (recipe.name.en == "Limeade"){

      const generateRandomNum = () => {
        const randomNum = 2.5 + Math.random() * (3.5 - 2.5);
        return randomNum.toFixed(1);
      };
      randomNum = generateRandomNum()

      let done = randomNum * 1000
      let done2 = (done/9).toFixed(0)

      

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en: `If one ${recipe.name.en} is equal to ${randomNum} liters, how many mL are in each serving?`,
            es: `Si una ${recipe.name.es} es igual a  ${randomNum} litros, ¿ Cuántos mL hay en cada porción?`,
        
        },
        done2,
        [{
            en: "Hint: 1 liter = 1,000 milliliters",
            es: "Pista: 1 litro = 1,000 millilitros",
        },{
          en: randomNum + " x 1000 = ???", 
          es: randomNum + " x 1000 = ???", 
      },{
        en: randomNum + " x 1000 = " + done, 
        es: randomNum + " x 1000 = " + done, 
    },{
      en:  done + " ÷ 9 = ???", 
      es:  done + " ÷ 9 = ???", 
    },{
      en:  "Round to the nearest whole number: "+ done + " ÷ 9 = " + done2, 
      es:  "Redonda al número entero más cercano:  " + done + " ÷ 9 = " + done2, 
  }],
        "wholeNumber",
    ))

    }

      //question 8 limeade 
     // Aunt Maria finished preparing limeades at 4:36pm with a [25-40] minute break. If she began at [anytime between 2:00 pm to 3:30 pm], how many limeades did she prepare in total?
    
     if (recipe.name.en == "Limeade"){
      randomNum = randomInt(25,40);
      let randomNum1 = randomInt(2,5);
      let randomNum2 = randomInt(10,31);
      let finishTime = 4
      let finishTimeSec = 36

      let time = finishTime - randomNum1
      let time2 = finishTimeSec - randomNum2
      let time3 = time*60+time2
      let time4 = time3- randomNum
      let time5 = time4/5


      let done =  Math.floor(time5)

     

    // create question
    //Aunt Maria finished preparing limeades at 4:36pm with a [25-40] minute break. If she began at [anytime between 2:00 pm to 3:30 pm], how many limeades did she prepare in total?
    generatedQuestions.push(createGameQuestion(
        {
            en: `Aunt Maria finished preparing ${recipe.name.en} at 4:36 pm with a ${randomNum} minute break. If she began at ${randomNum1}:${randomNum2}, how many ${recipe.name.en} did she prepare in total? Each ${recipe.name.en} takes 5 minutes`,
            es: `Tía Maria termino de preparar ${recipe.name.es} a las 4:36 pm tomandos un descanso de ${randomNum} minutos. Si empezó a preparar las ${randomNum1}:${randomNum2}, ¿ cuántas ${recipe.name.es} preparó en total? Cada limonada toma ${recipe.name.es} 5 minutos`,
        
        },
        done,
        [{
          en: (finishTime)+":"+finishTimeSec + " - " + (randomNum1)+":"+randomNum2 + "= " + time+" hours and "+time2 + " minutes making " + recipe.name.en + " without taking a break",
          es: (finishTime)+":"+finishTimeSec + " - " + (randomNum1)+":"+randomNum2 + "= " + time+" horas y "+time2 + " minutos haciendo " + recipe.name.es + " sin tomar un descanso",
      },{
        en: "Convert time spent to minutes " + time+ " x " + 60 +" + "+time2 + " = "+ time3 + " minutes",
        es: "Convertir tiempo utilizado a minutos " + time+ " x " + 60 +" + "+time2 + " = "+ time3 + " minutos",
    },{
      en: "Subract break time: " + time3+ " - " + randomNum +" = "+ time4 + " minutes",
      es: "Restar tiempo de descanso: " + time3+ " - " + randomNum +" = "+ time4 + " minutos",
  },{
    en: "Divide time left by 5: " + time4+ " ÷ 5 = "+ time5 + " recipes",
    es: "Divide time left by 5: " + time4+ " ÷ 5 = "+ time5 + " recetas",
  },{
    en: "Round down to the nearest whole number = " + done ,
    es: "Redondea al número entero más pequeño = " + done ,
  }],
        "wholeNumber",
    ))
}

      //question 9 limeade 
     // One cup of fresh lime juice can be made from 8 limes. About 12 limes weigh 1 kg. If Aunt Maria buys [2000-7000] grams of limes, how many limeades can Aunt Maria make?
    
     if (recipe.name.en == "Limeade"){
      randomNum = randomInt(2000,70001);
      
      first_ingredient_key = Object.keys(recipe.ingredients)[0];
      //let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      
      let firstCalc = randomNum/1000
      let firstCalc2 = Math.floor(firstCalc*12)
      let firstCalc3 = Math.floor(firstCalc2/8)
      let firstCalc4 = Math.floor(firstCalc3/(9/4))
      

    // create question
    
    generatedQuestions.push(createGameQuestion(
        {
            en: `One cup of lime juice can be made from 8 limes. About 12 limes weigh 1 kg. If Aunt Maria buys ${randomNum} grams of ${first_ingredient_key}, how many ${recipe.name.en} can Aunt Maria make?`,
            es: `Una taza de jugo de limón se puede hacer con 8 limones. 12 limones pesan 1 kg. Si Tía Maria compra ${randomNum} gramos de ${first_ingredient_key}, cuántas ${recipe.name.es} puede hacer Tía Maria?`,
        
        },
        firstCalc4,
        [{
          en: randomNum + " ÷ 1000 = "+ firstCalc+" total kg of limes",
          es: randomNum + " ÷ 1000 =  "+ firstCalc+" total kg de limones",
        },{
          en: firstCalc + " x 12 = "+ firstCalc2+" total limes hint: round down to the nearest whole number", 
          es: firstCalc + " x 12 =  "+ firstCalc2+" limones totales: redondea al número entero pequeño más cercano", 
        },{
          en: firstCalc2 + " ÷ 8 = "+ firstCalc3+ " total cups of lime juice made",
          es: firstCalc2 + " ÷ 8 =  "+ firstCalc3+" tazas totales de jugo de limón",
        },{
          en: firstCalc3 + " ÷ (9/4) = "+ firstCalc4+ " total limeades made",
          es: firstCalc3 + " ÷ (9/4) =  "+ firstCalc4+" tazas de limonadas hechas",
        }],
            "wholeNumber",
      ))

    }

      //question 1 pudding 
     //If Aunt Maria calculates that she used a total of [72, 84, 96, or 120] cups of milk, how many total teaspoons of vanilla extract did she also use?
     if (recipe.name.en == "Pudding"){
      function getRandomNumber() {
        const numbers = [72, 84, 96, 120];
        const randomIndex = Math.floor(Math.random() * numbers.length);
        return numbers[randomIndex];
      }
      const randomNum = getRandomNumber();

      first_ingredient_key = Object.keys(recipe.ingredients)[0];
      //let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      
      let firstCalc = Math.floor(randomNum/12)
      let firstCalc2 = firstCalc*2

      

    // create question
    
    generatedQuestions.push(createGameQuestion(
        {
            en: `If Aunt Maria calculates that she used a total of ${randomNum} cups of milk, how many total teaspons of vanilla extract did she use?`,
            es: `Si Tía Maria calcula haber usado un total de ${randomNum} tazas de leche, cuantas cucharadas de vainilla utilizó?`,
        
        },
        firstCalc2,
        [{
          en: randomNum + " ÷ 12 = "+ firstCalc+" how many rice puddings she made",
          es: randomNum + " ÷ 12 =  "+ firstCalc+" cantidad de arroz en leche que hizo",
        },{
          en: firstCalc+ " x 2 = "+ firstCalc2+" total vanilla extract used",
          es: firstCalc + " x 2 =  "+ firstCalc2+" total de extracto de vainilla usado",
        }],
            "wholeNumber",
      ))

    }

      //question 2 pudding 
     //How many total cups of rice and sugar did Aunt Maria use to make [5-25] rice puddings? 
     if (recipe.name.en == "Pudding"){
      randomNum = randomInt(5,26);
      
      first_ingredient_key = Object.keys(recipe.ingredients)[3];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let second_ingredient_key = Object.keys(recipe.ingredients)[1];
      let second_ingredient_key_amount = recipe.ingredients[second_ingredient_key].amount;
      
      let firstCalc = randomNum*first_ingredient_key_amount
      let secondCalc = randomNum*second_ingredient_key_amount
      let thirdcalc = firstCalc+ secondCalc
      //let firstCalc2 = firstCalc*2

      

    // create question
    
    generatedQuestions.push(createGameQuestion(
        {
            en: `How many cups of ${first_ingredient_key} and ${second_ingredient_key} did Aunt Maria use to make ${randomNum} ${recipe.name.en}?`,
            es:  `¿ Cuántas tazas de  ${first_ingredient_key} y ${second_ingredient_key} utilizó Tía Maria para hacer ${randomNum} ${recipe.name.es}?`,
        
        },
        thirdcalc,
        [{
          en: "Rice: " + first_ingredient_key_amount + " x " + randomNum+" = " + firstCalc ,
          es: "Arroz: " + first_ingredient_key_amount + " x " + randomNum+  " = " + firstCalc ,
        },
        {
          en: "Sugar: " + second_ingredient_key_amount + " x " + randomNum + " = " + secondCalc ,
          es: "Azúcar: " + second_ingredient_key_amount + " x " + randomNum + " = " + secondCalc ,
        },
        {
          en: "Total: " + firstCalc + " + " + secondCalc + " = " + thirdcalc,
          es: "Total: "+ firstCalc + " + " + secondCalc + " = " + thirdcalc,
        }],
            "wholeNumber",
      ))

    }

    //question 3 pudding 
     //A 25 lb bag of rice is equivalent to (random whole number btwn 100-125) cups of rice. How many total rice pudding servings can Aunt Maria make from (2-3) 25 lb bags?
     if (recipe.name.en == "Pudding"){
      randomNum = randomInt(2,4);
      let randomNum2 = randomInt(100,126);
      

      let firstCalc = randomNum*randomNum2
      let secondCalc = firstCalc*8

      //let firstCalc2 = firstCalc*2

      

    // create question
    
    generatedQuestions.push(createGameQuestion(
        {
            en: `A 25 lb bag of rice is equivalent to ${randomNum2} cups of rice. How many total ${recipe.name.en} servings can Aunt Maria make from ${randomNum} 25 lb bags?`,
            es: `Una bolsa de arróz de 25 lb equivale a ${randomNum2} tazas de arróz. ¿Cuántas porciones de  ${recipe.name.es} puede hacer Tía Maria de ${randomNum} bolsas de 25 lb?`,
        
        },
        secondCalc,
        [{
          en: randomNum2 + " x " + randomNum + " = " +randomNum*randomNum2 +" Total cups of rice",
          es: randomNum2 + " x " + randomNum + " = " + randomNum*randomNum2 +" Total de tazas de arróz",
        },
        {
          en: firstCalc + " x 8  = " +secondCalc+ " Total servings",
          es: firstCalc + " x 8  = " +secondCalc+" Total de porciones",
        }],
            "wholeNumber",
      ))

    }

      //question 4 pudding 
     // Aunt Maria decides to create additional recipes according to the desired sweetness. For the “less sweet” option, she will use ⅓ less cups of sugar than the original recipe. If Aunt Maria makes [10-15] rice puddings using the original and less sweet recipe, how much less sugar will she use compared to the original recipe? In other words, calculate the difference!
     if (recipe.name.en == "Pudding"){
      randomNum = randomInt(10,16);
      
      first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;

      let firstCalc = randomNum*first_ingredient_key_amount
      //let secondCalc = first_ingredient_key_amount*(2/3)
      let fractionOrInteger = convertToFraction('2/3')
      let multipliedResult = multiplyOrDivide(fractionOrInteger,firstCalc, "multiply" )
      let thirdCalc = simplifyFraction(multipliedResult.result)

      let fourthcald = convertToFraction(thirdCalc.result) 
      let fifthcald = addOrSubtract(firstCalc, fourthcald, 'subtract')
      let done = simplifyFraction(fifthcald.result)
      //let firstCalc2 = firstCalc*2
      //let done = multipliedResult.result.numerator+"/"+multipliedResult.result.denominator"
      

    // create question
    
    generatedQuestions.push(createGameQuestion(
        {
            en: `Aunt Maria decides to create additional recipes according to the desired sweetness. For the “less sweet” option, she will use ⅓ less cups of sugar than the original recipe. If Aunt Maria makes ${randomNum} ${recipe.name.en} using the original and less sweet recipe, how much less sugar will she use compared to the original recipe? `,
            es: `La tía María decide crear recetas adicionales según el nivel de dulzura deseado. Para la opción "menos dulce", utilizará ⅓ de taza menos de azúcar que la receta original. Si la tía María prepara ${randomNum} ${recipe.name.es} utilizando la receta original y la receta menos dulce, ¿cuánta menos cantidad de azúcar utilizará en comparación con la receta original? `,
        
        },
        done.result,
        [{
          en: randomNum + " x " + "1" + " = " +firstCalc+ " original ",
          es: randomNum + " x " + "1" + " = " +firstCalc+ " original ",
        },
        {
          en: randomNum + " x (2/3) = "  + thirdCalc.result + " less sweet",
          es: randomNum + " x (2/3) = "  + thirdCalc.result + " menos dulce",
        },
        {
          en: firstCalc + " - "+ thirdCalc.result+" = "  + done.result + " less sugar ",
          es: firstCalc + " - "+ thirdCalc.result+" = "  + done.result + " menos azúcar ",
        }
        ],
          done.types,
      ))

    }


      //question 5 pudding 
     // Aunt Maria decides to create additional recipes according to the desired sweetness. For the “less sweet” option, she will use ⅓ less cups of sugar than the original recipe. For the “more sweet” recipe, she will use ⅔ more cups of sugar than the original recipe. If Aunt Maria makes [10-15] rice puddings using each original, less sweet, and more sweet recipe, what is the total amount of sugar she used?
     if (recipe.name.en == "Pudding"){
      randomNum = randomInt(10,16);
      
      first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;

      let firstCalc = randomNum*first_ingredient_key_amount
      //let secondCalc = first_ingredient_key_amount*(2/3)
      let fractionOrInteger = convertToFraction('2/3')
      let multipliedResult = multiplyOrDivide(fractionOrInteger,firstCalc, "multiply" )
      let thirdCalc = simplifyFraction(multipliedResult.result)

      let fractionOrInteger2 = convertToFraction('5/3')
      let multipliedResult2 = multiplyOrDivide(fractionOrInteger2,firstCalc, "multiply" )
      let fifthCalc = simplifyFraction(multipliedResult2.result)

      let fourthcald = convertToFraction(thirdCalc.result) 
      let seventh = convertToFraction(fifthCalc.result)

    
      //let sixthcalc = simplifyFraction(fifthcald.result)



      let multipliedResult1 = addOrSubtract( fourthcald , seventh  , 'add')
      let fifthcald = addOrSubtract(multipliedResult1.result, firstCalc, 'add')

      let done = simplifyFraction(fifthcald.result)
      
  

    // create question
    
    generatedQuestions.push(createGameQuestion(
        {
            en: `Aunt Maria decides to create additional recipes according to the desired sweetness. For the “less sweet” option, she will use ⅓ less cups of sugar than the original recipe. For the “more sweet” recipe, she will use ⅔ more cups of sugar than the original recipe. If Aunt Maria makes ${randomNum} rice puddings using each original, less sweet, and more sweet recipe, what is the total amount of sugar she used?`,
            es: `La tía María decide crear recetas adicionales según el nivel de dulzura deseado. Para la opción "menos dulce", utilizará ⅓ de taza menos de azúcar que la receta original. Para la opción "más dulce" utiliza ⅔ más de azúcar. Si la tía María prepara ${randomNum} ${recipe.name.es} utilizando la receta original la receta menos dulce y la receta más dulce, ¿cuánta es el total de cantidad de azúcar utilizada? `,
        
        },
        done.result,
        [{
          en: randomNum + " x " + "1" + " = " +firstCalc+ " original ",
          es: randomNum + " x " + "1" + " = " +firstCalc+ " original ",
        },
        {
          en: randomNum + " x (2/3) = "  + thirdCalc.result + " less sweet",
          es: randomNum + " x (2/3) = "  + thirdCalc.result + " menos dulce",
        },
        ,
        {
          en: randomNum + " x (5/3) = "  + fifthCalc.result + " sweeter",
          es: randomNum + " x (5/3) = "  + fifthCalc.result + " más dulce",
        },
        {
          en: firstCalc + " + "+ thirdCalc.result+ " + "+ fifthCalc.result+" = "  + done.result + " total sugar ",
          es: firstCalc + " + "+ thirdCalc.result+ " + "+ fifthCalc.result+" = "  + " azúcar total ",
        }
        ],
          done.types,
      ))

    }

      //question 6 pudding 
      // A tablespoon of vanilla extract is roughly equal to 0.015 Liters. How many milliliters of vanilla extract is used if Aunt Maria makes (10-15) rice puddings? 
      if (recipe.name.en == "Pudding"){
        randomNum = randomInt(10,16);
        
        first_ingredient_key = Object.keys(recipe.ingredients)[4];
        let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
        
        let value1 = 15*1000

  
      // create question
      
      generatedQuestions.push(createGameQuestion(
          {
              en: `A tablespoon of vanilla extract is roughly equal to 0.015 Liters. How many milliliters of vanilla extract is used if Aunt Maria makes ${randomNum} ${recipe.name.en}?`,
              es:  `Una cucharada de extracto de vainilla equivale aproximadamente a 0.015 litros. ¿Cuántos mililitros de extracto de vainilla se utilizan si la tía María prepara ${randomNum} ${recipe.name.es}?`,
          
          },
          value1,
          [{
            en: "0.015 liters x 1000 = 15 mL",
            es: "0.015 litros x 1000 = 15 mL",
          },{
            en: "15 mL x " + randomNum + " = " + value1,
            es: "15 mL x " + randomNum + " = " + value1,
          }],
              "wholeNumber",
        ))
  
      }


      //question 7 pudding 
      // Over the course of the month, Aunt Maria bought a total of (30-45) half-gallons of milk. There are 12 cups of milk in each gallon. How many servings of rice pudding was she able to make this month?
      if (recipe.name.en == "Pudding"){
        randomNum = randomInt(30,46);
        
        first_ingredient_key = Object.keys(recipe.ingredients)[0];
        let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
        
        let value1 = (randomNum*6)/12
        let done = value1*8
    
      
  
        
  
      // create question
      
      generatedQuestions.push(createGameQuestion(
          {
              en: `Over the course of the month, Aunt Maria bought a total of ${randomNum} half-gallons of milk. There are 12 cups of milk in each gallon. How many servings of rice pudding was she able to make this month?`,
              es:  `Una cucharada de extracto de vainilla equivale aproximadamente a 0.015 litros. ¿Cuántos mililitros de extracto de vainilla se utilizan si la tía María prepara ${randomNum} ${recipe.name.es}?`,
          
          },
          done,
          [{
            en: randomNum + " x 6 = "+randomNum*6+" total cups of milk",
            es: randomNum + " x 6 = "+randomNum*6+" total cups of milk",
          },{
            en: randomNum*6 + " ÷ "+ first_ingredient_key_amount + " = " +value1+" total recipes made",
            es: randomNum*6 + " ÷ "+ first_ingredient_key_amount + " = " +value1+" total recetas hechas",
          },{
            en: value1 + " x "+recipe.recipeMakesAmount + " = " + done + " total servings",
            es: value1 + " x "+recipe.recipeMakesAmount + " = " + done + " porciones totales",
          }],
              "wholeNumber",
        ))
  
      }

      //question 8 pudding
     // Aunt Maria begins to work at 9:45 a.m. If she has to make (5-9) rice pudding that day, when is the earliest time she will finish, if she takes no breaks in between?
    
     if (recipe.name.en == "Pudding"){
      randomNum = randomInt(5,10);
      let totalrecipes = randomNum * 10
      let startTime = 9
      let startTimeSec = 45
      let finishTime = 18
      let finishTimeSec = 45

            // Convert start time to minutes
      let totalMinutes = startTime * 60 + startTimeSec;

      // Add the desired number of minutes
      totalMinutes += totalrecipes;

      // Calculate the new hours and minutes
      let newHours = Math.floor(totalrecipes / 60);
      let newMinutes = totalrecipes % 60;

      let finalTimeHr = (startTime+newHours)
      let finalTimeSec = (startTimeSec+newMinutes)
      let done = finalTimeHr + ":" + finalTimeSec

    // create question
    
    generatedQuestions.push(createGameQuestion(
        {
            en: `Aunt Maria begins to work at 9:45 a.m. If she has to make ${randomNum} ${recipe.name.en} that day (10 min per recipe), when is the earliest time she will finish, if she takes no breaks in between?`,
            es: `La tía María comienza a trabajar a las 9:45 a. m. Si ella tiene que hacer ${randomNum} ${recipe.name.en} ese día (10 minutos por receta), ¿a qué hora terminará más temprano si no toma descansos en el medio?`,
        
        },
        done,
        [{
          en: randomNum + " x " + 10 + " = " + randomNum*10 +" total time it would take",
          es: randomNum + " x " + 10 + " = " + randomNum*10 +" tiempo que tomaría",
      },{
        en: "Add " +randomNum*10 +" minutes to 9:45 a.m. =  " + finalTimeHr + ":" + finalTimeSec,
        es: "Sumar " +randomNum*10 +" minutos a las 9:45 a.m. =  "+ finalTimeHr + ":" + finalTimeSec,
      }],
        "time",
    ))
}

      //question 9 pudding
     //How many total rice puddings can Aunt Maria make from 10:30 a.m. to 6:45 p.m. if she takes a (10-30) minute break?
     if (recipe.name.en === "Pudding") {
      let randomNum = randomInt(10, 31);
      let totalRecipes = randomNum * 10;
      let startTime = 10;
      let startTimeSec = 30;
      let finishTime = 18;
      let finishTimeSec = 45;
      let totalTimeSec = finishTimeSec- startTimeSec
      let totalTimeHr = finishTime - startTime
      let minutes = totalTimeHr*60 + totalTimeSec
      let worked = minutes- randomNum
      let done = Math.floor(worked/10)



    
      // Create question
      generatedQuestions.push(
        createGameQuestion(
          {
            en: `How many total ${recipe.name.en} can Aunt Maria make from 10:30 a.m (each recipe takes 10 minutes). to 6:45 p.m. if she takes a (${randomNum}-30) minute break?`,
            es: `¿Cuántos ${recipe.name.es} en total puede hacer la tía María desde las 10:30 a.m (cada receta tarda 10 minutos). hasta las 6:45 p.m. si toma un descanso de (${randomNum}-30) minutos?`,
          },
          done,
          [
            {
              en: "10:30 am to 6:45 p.m = "+ totalTimeHr + " hrs and " + totalTimeSec + " minutes = "+ minutes,
              es: "10:30 am a 6:45 p.m = "+ totalTimeHr + " hrs y " + totalTimeSec + " minutos = " + minutes,
            },
            {
              en: minutes + " mins - " + randomNum +" = " +worked+ " total minutes worked",
              es: minutes + " mins - " + randomNum +" = " +worked+ " total minutos trabajados",
            },{
              en: worked + " ÷ 10 = " +done+ " recipes made",
              es: worked + " ÷ 10 = " +done+ " recetas hechas",
            }
          ],
          "wholeNumber"
        )
      );
    }

    //question 2 pretzel
    //How many total cups of toasted coconut does Aunt Maria need to make [a random multiple of 15, up to 105] pretzel servings?
    if (recipe.name.en == "Samoa Pretzel Stick") {
      let randomNum;

    do {
      randomNum = Math.floor(Math.random() * (105 / 15 + 1)) * 15;
    } while (randomNum === 0);
      let result1 = randomNum/15

      first_ingredient_key = Object.keys(recipe.ingredients)[4];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;

      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let multipliedResult = multiplyOrDivide(fractionOrInteger, result1, 'multiply')
      let simplify = simplifyFraction(multipliedResult.result)
     
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `How many total cups of toasted coconut does Aunt Maria need to make ${randomNum} pretzel servings?`,
              es: `¿Cuántas tazas en total de coco tostado necesita la tía María para hacer ${randomNum} porciones de pretzel?`,
          
          },
          simplify.result,
          [{
            en:  randomNum + " ÷  15 = " +result1+ " total number of pretzels" ,
            es:  randomNum + " ÷  15 = " +result1+ " número total de pretzels" ,
          },{
            en:  first_ingredient_key_amount + " x "+result1+ " = " + simplify.result ,
            es:  first_ingredient_key_amount + " x "+result1+ " = " + simplify.result ,
          }],
          simplify.types,
    
        ))
    
        }

    //question 3 pretzel
    //A box of pretzels contains 22 bags per box. Aunt Maria buys a total of [2-4] pretzel boxes. How many total servings can she make?
    if (recipe.name.en == "Samoa Pretzel Stick") {
      let randomNum = randomInt(2,5)

      let result1 = randomNum*22
      let result = result1*15

 
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `A box of pretzels contains 22 bags per box. Aunt Maria buys a total of ${randomNum} pretzel boxes. How many total servings can she make?`,
              es:  `Una caja de pretzels contiene 22 bolsas por caja. La tía María compra un total de ${randomNum} cajas de pretzels. ¿Cuántas porciones totales puede hacer?`,
          
          },
          result,
          [{
            en:  randomNum + " x  22 = " +result1+ " total number of pretzel bags" ,
            es:  randomNum + " x  22 = " +result1+ " número total de bolsas de pretzels" ,
          },{
            en:  result1+ " x 15 = " + result + " total servings" ,
            es:  result1 + " x 15 = " + result + " porciones totales",
          }],
          "wholeNumber",
    
        ))
    
        }

    //question 4 pretzel
    //Aunt Maria’s goal is to make [15-20] samoa pretzel sticks.The original preparation time is 10 minutes and the cook time is 20 minutes. However, it takes Aunt Maria an additional 15 minutes of cook time per recipe. How many total minutes will Aunt Maria need to meet her goal?
    if (recipe.name.en == "Samoa Pretzel Stick") {
      let randomNum = randomInt(15,21)

      let result1 = randomNum*45


 
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Aunt Maria’s goal is to make ${randomNum} samoa pretzel sticks recipes.The original preparation time is 10 minutes and the cook time is 20 minutes. However, it takes Aunt Maria an additional 15 minutes of cook time per recipe. How many total minutes will Aunt Maria need to meet her goal?`,
              es:  `La meta de la tía María es hacer ${randomNum} recetas de palitos de pretzel al estilo samoa. El tiempo de preparación original es de 10 minutos y el tiempo de cocción es de 20 minutos. Sin embargo, la tía María requiere 15 minutos adicionales de tiempo de cocción por cada receta. ¿Cuántos minutos totales necesitará la tía María para alcanzar su meta?`,
          
          },
          result1,
          [{
            en: "10 + 15 + 20 = 45 mins (new total prep and cook time)",
            es: "10 + 15 + 20 = 45 mins (nuevo tiempo de preparación y cocción)"
          },
            {
            en:  randomNum + " x  45 = " +result1+ " minutes" ,
            es:  randomNum + " x  45 = " +result1+ " minutos" ,
          }],
          "wholeNumber",
    
        ))
    
        }


    //question 5 pretzel
    //How many tablespoons of water did Aunt Maria use to make (3-13) samoa pretzel stick recipes?
    if (recipe.name.en == "Samoa Pretzel Stick") {
      let randomNum = randomInt(3,14)

      first_ingredient_key = Object.keys(recipe.ingredients)[1];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;

      
      let result1 = randomNum*first_ingredient_key_amount


 
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `How many tablespoons of water did Aunt Maria use to make ${randomNum} samoa pretzel stick recipes?`,
              es:  `¿Cuántas cucharadas de agua utilizó la tía María para hacer ${randomNum} recetas de palitos de pretzel al estilo samoa?`,
          
          },
          result1,
          [
            {
            en:  randomNum + " x "+first_ingredient_key_amount+" = " +result1+ " tablespoons" ,
            es:  randomNum + " x "+first_ingredient_key_amount+" = " +result1+ " cucharadas" ,
          }],
          "wholeNumber",
    
        ))
    
        }

    //question 6 pretzel
    //One day, Aunt Maria decided to increase the amount of chocolate chips in each recipe by ⅓ cup. Using this updated recipe, calculate how cups of cocoa were used to make (11-27) samoa pretzel sticks.
    if (recipe.name.en == "Samoa Pretzel Stick") {
      let randomNum = randomInt(11,28)

      first_ingredient_key = Object.keys(recipe.ingredients)[2];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;
      let amount2 = "1/3"
      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let fractionOrInteger2 = convertToFraction(amount2)

      let addedResult = addOrSubtract(fractionOrInteger, fractionOrInteger2 , 'add')
      let simplifiedMultipliedResult = simplifyFraction(addedResult.result)

      let fractionOrInteger3 = convertToFraction(simplifiedMultipliedResult.result)
      let multipliedResult = multiplyOrDivide(fractionOrInteger3, randomNum, 'multiply')
      let simplifiedMultipliedResult2 = simplifyFraction(multipliedResult.result)


 
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `One day, Aunt Maria decided to increase the amount of chocolate chips in each recipe by ⅓ cup. Using this updated recipe, calculate how cups of chocolate chips were used to make ${randomNum} samoa pretzel sticks.`,
              es:  `Un día, la tía María decidió aumentar la cantidad de chispas de chocolate en cada receta en ⅓ de taza. Utilizando esta receta actualizada, calcula cuántas tazas de chispas de chocolate se utilizaron para hacer ${randomNum} palitos de pretzel al estilo samoa.`,
          
          },
          simplifiedMultipliedResult2.result,
          [{
            en: first_ingredient_key_amount + " + 1/3 = " + simplifiedMultipliedResult.result,
            es: first_ingredient_key_amount + " + 1/3 = " + simplifiedMultipliedResult.result,
          },{
            en: simplifiedMultipliedResult.result + " x " + randomNum + " = " + simplifiedMultipliedResult2.result,
            es: simplifiedMultipliedResult.result + " x " + randomNum + " = " + simplifiedMultipliedResult2.result,
          }],
          simplifiedMultipliedResult2.types,
    
        ))
    
        }


    //question 7 pretzel
    //Over the course of the month, Aunt Maria bought a total of (25-40) bags of caramel candies. There are [50-55] caramel candy pieces per bag. How many samoa pretzel sticks could she have made this month? 
    if (recipe.name.en == "Samoa Pretzel Stick") {
      let randomNum = randomInt(3,14)
      let randomNum2 = randomInt(3,14)

      first_ingredient_key = Object.keys(recipe.ingredients)[0];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;

      
      let result1 = randomNum*randomNum2

      let result = Math.floor(result1/first_ingredient_key_amount)

 
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `Over the course of the month, Aunt Maria bought a total of ${randomNum} bags of caramel candies. There are ${randomNum2} caramel candy pieces per bag. How many samoa pretzel sticks could she have made this month?`,
              es: `Durante el transcurso del mes, la tía María compró un total de ${randomNum} bolsas de caramelos de caramelo. Hay ${randomNum2} piezas de caramelos de caramelo por bolsa. ¿Cuántos palitos de pretzel al estilo samoa podría haber hecho este mes?`,
          
          },
          result,
          [
            {
            en:  randomNum + " x "+randomNum2+" = " +result1+ " total pieces of caramel candy" ,
            es:  randomNum + " x "+randomNum2+" = " +result1+ " total pedazos de dulce de caramelo" ,
          },
          {
            en:  result1 + " ÷  "+first_ingredient_key_amount+" = " +result+ " total recipes" ,
            es:  result1 + " ÷  "+first_ingredient_key_amount+" = " +result+ " recetas totales" ,
          }],
          "wholeNumber",
    
        ))
    
        }

    //question 8 pretzel
    //One serving of samoa pretzels contains about 35 calories. How many total calories will you intake if you eat [3-22] servings?
    if (recipe.name.en == "Samoa Pretzel Stick") {
      let randomNum = randomInt(3,23)

      let result1 = randomNum*35


         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `One serving of samoa pretzels contains about 35 calories. How many total calories will you intake if you eat ${randomNum} servings?`,
              es:  `Una porción de pretzels samoa contiene aproximadamente 35 calorías. ¿Cuántas calorías totales consumirás si comes ${randomNum} porciones?`,
          
          },
          result1,
          [
            {
            en:  randomNum + " x 35 = " +result1+ " total calories" ,
            es:  randomNum + " x 35 = " +result1+ " calorías totales" ,
          }],
          "wholeNumber",
    
        ))
    
        }

    //question 9 pretzel
    //How many total cups of toasted coconuts and chocolate chips are needed to make [15, 30, 45, 60, 75, 90] servings of chocolate banana cake? 
    if (recipe.name.en == "Samoa Pretzel Stick") {
      let randomNum = [15, 30, 45, 60, 75, 90][Math.floor(Math.random() * 6)];

      let result1 = randomNum/15
      let amount = "5/2"

      first_ingredient_key = Object.keys(recipe.ingredients)[2];
      //second_ingredient_key = Object.keys(recipe.ingredients)[3];
      let first_ingredient_key_amount = recipe.ingredients[first_ingredient_key].amount;

      let fractionOrInteger = convertToFraction(first_ingredient_key_amount)
      let fractionOrInteger2 = convertToFraction(amount)

      let multipliedResult = addOrSubtract(fractionOrInteger,fractionOrInteger2, 'add')
      let simplifiedMultipliedResult = simplifyFraction(multipliedResult.result)
     
      let multipliedResult2 = multiplyOrDivide(multipliedResult.result, result1, 'multiply')
      let simplifiedMultipliedResult2 = simplifyFraction(multipliedResult2.result)
      //convert
      
      //let fractionOrInteger2 = convertToFraction(second_ingredient_key_amount)
         // create question
         generatedQuestions.push(createGameQuestion(
          {
              en: `How many total cups of toasted coconuts and chocolate chips are needed to make ${randomNum} servings of samoan pretzels? `,
              es:  `¿Cuántas tazas en total de coco tostado y chispas de chocolate se necesitan para hacer ${randomNum} porciones de samoan pretzels?`,
          
          },
          simplifiedMultipliedResult2.result,
          [{
            en: "Hint: " +randomNum+ " is a multiple of 15",
            es: "Pista: " +randomNum+ " es un multiplo de 15"
          },
            {
            en:  randomNum + " ÷ 15 = " +result1+ " total plates made" ,
            es:  randomNum + " ÷ 15 = " +result1+ " total platos hechos" ,
          },
          {
          en:  first_ingredient_key_amount + " + (5/2) " + " = " +simplifiedMultipliedResult.result + " total cups per plate",
          es: first_ingredient_key_amount + " + (5/2) " + " = " +simplifiedMultipliedResult.result + " total tazas por plato",
        },{
          en: result1 + " x " + simplifiedMultipliedResult.result + " = " + simplifiedMultipliedResult2.result ,
          es: result1 + " x " + simplifiedMultipliedResult.result + " = " + simplifiedMultipliedResult2.result ,
        }],
        simplifiedMultipliedResult2.types,
    
        ))
    
        }



   

    return generatedQuestions;
}

function generateLevel3AuntQuestions(dishes,order, randomInt){
    let generatedQuestions = [];
    let answer = null;



    return generatedQuestions;
}

export default function generateAuntOperationsAndAlgebraQuestions(recipe,randomGenerator) {
    // array of questions
    let questions = [];
    // array of dishes

    const { randomInt } = randomGenerator;

    // random number to choose a dish



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