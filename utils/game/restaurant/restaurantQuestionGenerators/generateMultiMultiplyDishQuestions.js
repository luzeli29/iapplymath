import createGameQuestion from '@utils/game/quiz/questionGeneration/createGameQuestion'
import translations from '@public/text/translations';
import simplifyFraction from '@utils/game/quiz/simplifyFraction';
// export default function generateMultiMultiplyDishQuestions(order, randomGenerator, level) {
//     const numbOfTwoQuestionsNeeded = 2
//     const numbOfThreeQuestionsNeeded = 1

//     let questions = []

//     for(let i = 0; i < numbOfTwoQuestionsNeeded; i++) {
//         let question = generateTwoMultiplyQuestion(order,level,randomGenerator)
//         questions.push(question)
//     }

//     for(let i = 0; i < numbOfThreeQuestionsNeeded; i++) {
//         let question = generateThreeMultiplyQuestion(order,level,randomGenerator)
//         questions.push(question)
//     }

//     return questions
// }

// function generateTwoMultiplyQuestion(order,level,randomGenerator) {
//     const factorMax = Math.ceil(((level+2)**2) + 3)
//     const factorMin = Math.ceil(((level+2)**2)/5 + 3)
//     const factor1 = randomGenerator.randomInt(factorMin,factorMax)
//     const dishType1 = randomGenerator.randomDishType()
//     let dishType2
//     const dishType2Choice = randomGenerator.randomInt(0,2)
//     const factor2 = randomGenerator.randomInt(factorMin,factorMax)

//     switch (dishType1) {
//         case 'mainDish': 
//             dishType2 = dishType2Choice ? 'drink' : 'dessert'
//             break
//         case 'drink': 
//             dishType2 = dishType2Choice ? 'dessert' : 'mainDish'
//             break
//         case 'dessert': 
//             dishType2 = dishType2Choice ? 'mainDish' : 'drink'
//             break
//     }

//     const dish1 = order[dishType1]
//     const dish2 = order[dishType2]
//     const answer = dish1.price * factor1 + dish2.price * factor2
//     const question = createGameQuestion(
//         {
//             en:'If you buy ' + factor1 + ', ' +  dish1.en +' and ' + factor2 + ', ' + dish2.en + ', what is your total?',
//             es:'Si compras ' + factor1 + ', ' +  dish1.es +' et ' + factor2 + ', ' + dish2.es + ' ¿Cuál es tu total?',
//         },
//         answer,
//         [{
//             en: "(" + dish1.en + ") x " + factor1 + " + (" + dish2.en + ") x " + factor2 +" = ?",
//             es: "(" + dish1.es + ") x " + factor1 + " + (" + dish2.es + ") x " + factor2 +" = ?",
//         },{
//             en: "(" + dish1.en + ") x " + factor1 + " + (" + dish2.en + ") x " + factor2 +" = " + answer,
//             es: "(" + dish1.es + ") x " + factor1 + " + (" + dish2.es + ") x " + factor2 +" = " + answer,
//         }],
//         "wholeNumber"
//     ) 

//     return question
// }


// function generateThreeMultiplyQuestion(order,level,randomGenerator) {
//     const factorMax = Math.ceil(((level+2)**2) + 3)
//     const factorMin = Math.ceil(((level+2)**2)/5 + 3)
//     const factorMainDish = randomGenerator.randomInt(factorMin,factorMax)
//     const factorDrink = randomGenerator.randomInt(factorMin,factorMax)
//     const factorDessert = randomGenerator.randomInt(factorMin,factorMax)

//     const mainDish = order.mainDish
//     const drink = order.drink
//     const dessert = order.dessert

//     const answer = (factorMainDish * mainDish.price) + (factorDessert * dessert.price) + (factorDrink * drink.price)
//     const question = createGameQuestion(
//         {
//             en:'If you buy ' + factorMainDish + ' ' + mainDish.en + ', ' + factorDrink + ' ' + drink.en + ', and ' + factorDessert + ' ' + dessert.en + ', what is your total?',
//             es:'Si compras ' + factorMainDish + ' ' + mainDish.es + ', ' + factorDrink + ' ' + drink.es + ', y ' + factorDessert + ' ' + dessert.es + ' ¿Cuál es tu total?',
//         },
//         answer,
//         [{
//             en: "(" + mainDish.en + ") x " + factorMainDish + " + (" + drink.en + ") x " + factorDrink + " + (" + dessert.en + ") x " + factorDessert +" = ?",
//             es: "(" + mainDish.es + ") x " + factorMainDish + " + (" + drink.es + ") x " + factorDrink + " + (" + dessert.es + ") x " + factorDessert +" = ?",
//         },{
//             en: "(" + mainDish.en + ") x " + factorMainDish + " + (" + drink.en + ") x " + factorDrink + " + (" + dessert.en + ") x " + factorDessert +" = " + answer,
//             es: "(" + mainDish.es + ") x " + factorMainDish + " + (" + drink.es + ") x " + factorDrink + " + (" + dessert.es + ") x " + factorDessert +" = " + answer,
//         }],
//         "wholeNumber"
//     ) 

//     return question
// }

function generateLevel1CQuestions(dishes,order,randomInt){
    let generatedQuestions = [];
    // let random = Math.floor(Math.random() * dishes.length);
    let random = randomInt(0,dishes.length);
    let answer = 0;

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // question 1

    // Elena would like to taste half of your entrée. How much of your food will you be sharing with her?

    // Hint
    let hint = {
        en: "half = 1/2",
        es: "mitad = 1/2",
    }

    // answer
    answer = "1/2";

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Elena would like to taste half of your main dish. How much of your food will you be sharing with her? Hint: write your answer as a fraction`,
            es:`Elena quiere probar la mitad de tu plato principal. ¿Cuánta comida compartirás con ella? Pista: escribe tu respuesta como una fracción`,
        },
        answer,
        [hint],
        "fraction",
    ))


    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 2

    // Elena would like to taste a [this part to be randomly generated by game’; list of values – “third, quarter, sixth”] of your entrée. How much of your food will you be sharing with her?

    let randomFraction = {
        "third":{
            en:"third",
            es:"tercio",
            answer:"1/3",
        },
        "quarter":{
            en:"quarter",
            es:"cuarto",
            answer:"1/4",
        },
        "sixth":{
            en:"sixth",
            es:"sexto",
            answer:"1/6",
        },
    }
    
    // choose a random fraction
    // let randomFractionName = Object.keys(randomFraction)[Math.floor(Math.random() * Object.keys(randomFraction).length)];
    let randomFractionName = Object.keys(randomFraction)[randomInt(0,Object.keys(randomFraction).length)];
    let randomFractionNameEnglish = randomFraction[randomFractionName].en;
    let randomFractionNameSpanish = randomFraction[randomFractionName].es;

    // answer
    answer = randomFraction[randomFractionName].answer;


    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Elena would like to taste a ${randomFractionNameEnglish} of your main dish. How much of your food will you be sharing with her? Hint: write your answer as a fraction`,
            es:`Elena quiere probar un ${randomFractionNameSpanish} de tu plato principal. ¿Cuánta comida compartirás con ella? Pista: escribe tu respuesta como una fracción`,
        },
        answer,
        [{
            en: randomFractionNameEnglish + " = " + answer,
            es: randomFractionNameSpanish + " = " + answer,
        },{
            en:answer+"",
            es:answer+"",
        }],
        "fraction",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 3

    // Elena would like to taste an eighth of your main dish. How much of your food will you be sharing with her?

    // answer
    answer = "1/8";

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Elena would like to taste an eighth of your main dish. How much of your food will you be sharing with her? Hint: write your answer as a fraction`,
            es:`Elena quiere probar un octavo de tu plato principal. ¿Cuánta comida compartirás con ella? Pista: escribe tu respuesta como una fracción`,
        },
        answer,
        [{
            en: "eighth = 1/8",
            es: "octavo = 1/8",
        },{
            en:answer+"",
            es:answer+"",
        }],
        "fraction",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 4
    // Inequality question

    // If you ate [y, random fraction 1/2, 1/3, ¼, 1/6, 1/8] and Elena ate [x, random fraction 1/2, 1/3, ¼, 1/6, 1/8]. Who ate more, you or Elena? Express your answers as fractions and compare them using <,>,= (i.e. 1/3 < 1/2)
    
    // declare possible fractions
    let fractions = ["1/2", "1/3", "1/4", "1/6", "1/8"];

    // choose a random fraction
    // let randomFraction1 = fractions[Math.floor(Math.random() * fractions.length)];
    let randomFraction1 = fractions[randomInt(0,fractions.length)];

    // choose a random fraction
    // let randomFraction2 = fractions[Math.floor(Math.random() * fractions.length)];
    let randomFraction2 = fractions[randomInt(0,fractions.length)];

    // convert the fractions to numbers
    let randomFraction1Number = eval(randomFraction1);
    let randomFraction2Number = eval(randomFraction2);

    // is the first fraction bigger than the second?
    answer = randomFraction1Number > randomFraction2Number ? "greater_than" : (randomFraction1Number < randomFraction2Number ? "less_than" : "equal_to");

    // hint
    hint = {
        en: "Choose the correct symbol to compare the fractions.",
        es: "Elige el símbolo correcto para comparar las fracciones.",
    }

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`If you ate ${randomFraction1} and Elena ate ${randomFraction2}. Who ate more, you or Elena? Compare them using <,>,= (i.e. 1/3 < 1/2). ${randomFraction1} __ ${randomFraction2}`,
            es:`Si tú comiste ${randomFraction1} y Elena comió ${randomFraction2}. ¿Quién comió más, tú o Elena? Comparalas usando <,>,= (ejemplo. 1/3 < 1/2). ${randomFraction1} __ ${randomFraction2}`,
        },
        answer,
        [hint],
        "inequality",
    ))


    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 5
    // bonus question

    // The server divided your entrée dish into [‘x, random value’ – list: two, three, four, six, eight] equal portions. If you eat [y, random # 1-8 – y must be <= x] portions, what is the total amount of food you ate? Hint: use unit fractions to find your answer. 

    // declare possible values
    // let values = {
    //     "two":2,
    //     "three":3,
    //     "four":4,
    //     "six":6,
    //     "eight":8,
    // };

    let values = {
        2:{
            en:"two",
            es:"dos",
        },
        3:{
            en:"three",
            es:"tres",
        },
        4:{
            en:"four",
            es:"cuatro",
        },
        6:{
            en:"six",
            es:"seis",
        },
        8:{
            en:"eight",
            es:"ocho",
        },
    }
    // choose a random value from values
    // let randomValueStr = Object.keys(values)[Math.floor(Math.random() * Object.keys(values).length)];
    // let randomValueStr = Object.keys(values)[randomInt(0,Object.keys(values).length)];
    // let randomValue = values[randomValueStr];
    let randomValue = Object.keys(values)[randomInt(0,Object.keys(values).length)];
    let randomValueStrEn = values[randomValue].en;
    let randomValueStrEs = values[randomValue].es;
    // choose a random number from 1 to randomValue
    // random number represents the number of portions eaten
    // let randomNumber = Math.floor(Math.random() * randomValue) + 1;
    let randomNumber = randomInt(1,randomValue);

    // answer
    answer = `${randomNumber}/${randomValue}`;
    answer = simplifyFraction(randomNumber,randomValue);

    // hint
    hint = {
        en: "Write your answer as a fraction.",
        es: "Escribe tu respuesta como una fracción.",
    }

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`The server divided your main dish into ${randomValueStrEn} equal portions. If you eat ${randomNumber} portions, what is the total amount of food you ate?  Hint: write your answer as a simplified fraction`,
            es:`El mesero dividió tu plato principal en ${randomValueStrEs} porciones iguales. Si tú comes ${randomNumber} porciones, ¿cuánta comida comiste en total? Pista: escribe tu respuesta como una fracción simplificada.`,
        },
        answer,
        [{
            en:"Step 1. If there are (x) equal portions, each portion represents 1/(x) of the whole dish."+"\n"+" Step 2. Total food if you eat (y) out of (x) portions = y/x",
            es:"Paso 1. Si hay (x) porciones iguales, cada porción representa 1/(x) del plato completo."+"\n"+" Paso 2. Cantidad total de comida si comes (y) de (x) porciones = y/x",
        },
        {
            en:answer+"",
            es:answer+"",
        }],
        "fraction",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    return generatedQuestions;

}

function generateLevel2CQuestions(dishes,order,randomInt){
    let generatedQuestions = [];
    let answer;
    let x;
    let y;
    // question 1

    // Elena’s entrée was bigger than she expected, and she only ate [5/8, 2/5, 1/3, ¾, 7/12] of her food. If you ate [4/6, 6/10, 10/12, 3/8, ¼] of your food, which quantity is smaller?

    let possibleValuesX = ["5/8", "2/5", "1/3", "3/4", "7/12"];
    let possibleValuesY = ["4/6","6/10", "10/12", "3/8", "1/4"];

    // x = possibleValuesX[Math.floor(Math.random() * possibleValuesX.length)];
    x = possibleValuesX[randomInt(0,possibleValuesX.length)];
    // y = possibleValuesY[Math.floor(Math.random() * possibleValuesY.length)];
    y = possibleValuesY[randomInt(0,possibleValuesY.length)];

    let xNumber = eval(x);
    let yNumber = eval(y);

    // answer
    answer = xNumber < yNumber ? "less_than" : xNumber > yNumber ? "greater_than" : "equal_to";
    let symbol = answer == "less_than" ? "<" : answer == "greater_than" ? ">" : "=";
    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Elena ate ${x} of her food and you ate ${y} of your food,  Someone ate less, which amount is less? Please select your answer using <,> or = signs. ${x} __ ${y}`,
            es:`Elena comió ${x} de su comida y tú comiste ${y} de tu comida, alguien comió menos, ¿cuál cantidad es menor? Por favor selecciona tu respuesta usando los signos <,> o =. ${x} __ ${y}`,
        },
        answer,
        [{
            en: `(${x}) ? (${y})`,
            es: `(${x}) ? (${y})`,
        },{
            en: `${x} ${symbol} ${y}`,
            es: `${x} ${symbol} ${y}`,
        }
        ],
        "inequality",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 2

    // Elena likes having [x = 5/8, ¾, 4/5, 7/10, 6/12, 80/100, 40/100, 2/3] of her meal be vegetables. She decided that she will have that amount of vegetables every day for the next [range: y = 2-9] days. How much vegetables did she eat in total? 

    // declare possible values
    possibleValuesX = ["5/8", "3/4", "4/5", "7/10", "6/12", "80/100", "40/100", "2/3"];
    
    // choose a random value from possibleValuesX
    // x = possibleValuesX[Math.floor(Math.random() * possibleValuesX.length)];
    x = possibleValuesX[randomInt(0,possibleValuesX.length)];


    // choose a random number from 2 to 9
    // random number represents the number of days
    // y = Math.floor(Math.random() * 8) + 2;
    y = randomInt(2,10);

    // answer
    let numerator = x.split("/")[0];
    let denominator = x.split("/")[1];

    let answerNumerator = numerator * y;
    answer = `${answerNumerator}/${denominator}`;
    answer = simplifyFraction(answerNumerator,denominator);

    // generate question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Elena likes having ${x} of her meal be vegetables. She decided that she will have that amount of vegetables every day for the next ${y} days. How much vegetables did she eat in total?`,
            es:`A Elena le gusta que ${x} de su comida sean vegetales. Ella decidió que tendrá esa cantidad de vegetales todos los días durante los próximos ${y} días. ¿Cuántos vegetales comió en total?`,
        },
        answer,
        [{
            en:"Total amount of vegetables = (daily cups) x (days)",
            es:"Cantidad total de vegetales = (tazas diarias) x (días)",

        },{
            en: "Total amount of vegetables = "+answer,
            es: "Cantidad total de vegetales = "+answer,
        }],
        "fraction",
    ))


    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    

    return generatedQuestions;
}

function generateLevel3CQuestions(dishes,order,randomInt){
    let generatedQuestions = [];
    let answer;
    // question 1

    // If your total at the restaurant is $100 and you have x[any whole number between 1-5] friends with you, express your answer as a fraction to calculate how much each person would pay if you split the bill?

    // let x = Math.floor(Math.random() * 5) + 1;
    let x = randomInt(1,6);
    // answer
    let denominator = x;
    let numerator = 100;
    answer = numerator/denominator;

    answer = simplifyFraction(numerator,denominator);


    // generate question
    generatedQuestions.push(createGameQuestion(
        {
            en:`If your total at the restaurant is $100 and you have ${x} friends with you. How much does each person pay if you all split the bill? express your answer as a fraction.`,
            es:`Si tu total en el restaurante es de $100 y tienes ${x} amigos contigo. ¿Cuánto paga cada persona si dividen la cuenta? expresa tu respuesta como una fracción.`,
        },
        answer,
        [{
            en: "Express your answer as a fraction",
            es: "Expresa tu respuesta como una fracción",
        },{
            en:answer+"",
            es:answer+"",
        }],
        "fraction",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 2

    // If you eat half of your main dish, how much did that part of your main dish cost?

    // answer
    let cost = order.mainDish.price;
    answer = cost*0.5;

    // round answer to 2 decimal places
    answer = parseFloat(answer.toFixed(2));

    // generate question
    generatedQuestions.push(createGameQuestion(
        {
            en:`If you eat half of your main dish, how much did that part of your main dish cost?`,
            es:`Si te comes la mitad de tu plato principal, ¿cuánto costó esa parte de tu plato principal?`,
        },
        answer,
        [{
            en: "0.5 X (main dish) or (main dish)/2" ,
            es: "0.5 X (plato principal) o (plato principal)/2" ,
        },{
            en:answer+"",
            es:answer+"",
        }],
        "decimal",
    ))


    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 3

    // If you eat a quarter of your main dish, how much did that part of your entree cost?

    // answer
    cost = order.mainDish.price;
    answer = cost*0.25;

    // round answer to 2 decimal places
    answer = parseFloat(answer.toFixed(2));

    // generate question
    generatedQuestions.push(createGameQuestion(
        {
            en:`If you eat a quarter of your main dish, how much did that part of your main dish cost?`,
            es:`Si te comes un cuarto de tu plato principal, ¿cuánto costó esa parte de tu plato principal?`,
        },
        answer,
        [{
            en: "0.25 X (main dish) or (main dish)/4" ,
            es: "0.25 X (plato principal) o (plato principal)/4" ,
        },{
            en:answer+"",
            es:answer+"",
        }],
        "decimal",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    // question 4

    // What is your total if you buy [5-15] [main dish/drink/dessert]?

    let randomNumber = randomInt(5,16);
    let randomDish = dishes[randomInt(0,3)];

    let dishNameP = {
        mainDish:{
            en:"main dishes",
            es:"platos principales",
        },
        drink:{
            en:"drinks",
            es:"bebidas",
        },
        dessert:{
            en:"desserts",
            es:"postres",
        },

    }

    // answer
    cost = order[randomDish].price;
    answer = cost*randomNumber;

    // generate question
    generatedQuestions.push(createGameQuestion(
        {
            en:`What is your total if you buy ${randomNumber} ${dishNameP[randomDish].en}?`,
            es:`¿Cuál es tu total si compras ${randomNumber} ${dishNameP[randomDish].es}?`,
        },
        answer,
        [{
            en: "Total = (number of items) X (price of item)" ,
            es: "Total = (número de artículos) X (precio del artículo)" ,
        },{
            en:answer+"",
            es:answer+"",
        }],
        "decimal",
    ))



    return generatedQuestions;
}

export default function generateNumberAndOperationsFractionsQuestions(order,level,randomGenerator){

    let questions = [];
    let dishes = ["mainDish","drink","dessert"];

    const { randomInt } = randomGenerator;

    if(level === '1') {

        let generatedQuestions = generateLevel1CQuestions(dishes,order,randomInt);
        questions = questions.concat(generatedQuestions);
    }
    if (level === '2') {

        let generatedQuestions = generateLevel2CQuestions(dishes,order,randomInt);
        questions = questions.concat(generatedQuestions);
    }
    if (level === '3') {

        let generatedQuestions = generateLevel3CQuestions(dishes,order,randomInt);
        questions = questions.concat(generatedQuestions);
    }

    return questions;



}