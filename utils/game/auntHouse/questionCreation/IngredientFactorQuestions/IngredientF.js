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
  if (typeof fractionOrInteger === 'object') {
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
      result = fractionOrInteger * randomNum
        
     
    } else if (operation === 'divide') {
      result = {
        numerator: fractionOrInteger,
        denominator: randomNum,
      };
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

    return generatedQuestions;
}

function generateLevel3AuntQuestions(dishes,order, randomInt){
    let generatedQuestions = [];
    let answer = null;

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 1

    // How might you represent twice your mainDish using parenthesis?

    // Pending


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