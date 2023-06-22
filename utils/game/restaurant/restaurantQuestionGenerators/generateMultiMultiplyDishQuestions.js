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
        en: "Write your answer as a fraction.",
        es: "Escribe tu respuesta como una fracción.",
    }

    // answer
    answer = "1/2";

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Elena would like to taste half of your entrée. How much of your food will you be sharing with her?`,
            es:`Elena quiere probar la mitad de tu plato principal. ¿Cuánta comida compartirás con ella?`,
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
            en:`Elena would like to taste a ${randomFractionNameEnglish} of your entrée. How much of your food will you be sharing with her?`,
            es:`Elena quiere probar un ${randomFractionNameSpanish} de tu plato principal. ¿Cuánta comida compartirás con ella?`,
        },
        answer,
        [hint],
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
            en:`Elena would like to taste an eighth of your main dish. How much of your food will you be sharing with her?`,
            es:`Elena quiere probar un octavo de tu plato principal. ¿Cuánta comida compartirás con ella?`,
        },
        answer,
        [hint],
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
            en:`If you ate ${randomFraction1} and Elena ate ${randomFraction2}. Who ate more, you or Elena? ${randomFraction1} __ ${randomFraction2}`,
            es:`Si tú comiste ${randomFraction1} y Elena comió ${randomFraction2}. ¿Quién comió más, tú o Elena? ${randomFraction1} __ ${randomFraction2}`,
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

    // hint
    hint = {
        en: "Write your answer as a fraction.",
        es: "Escribe tu respuesta como una fracción.",
    }

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`The server divided your entrée dish into ${randomValueStrEn} equal portions. If you eat ${randomNumber} portions, what is the total amount of food you ate?`,
            es:`El mesero dividió tu plato principal en ${randomValueStrEs} porciones iguales. Si tú comes ${randomNumber} porciones, ¿cuánta comida comiste en total?`,
        },
        answer,
        [hint],
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

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Elena’s entrée was bigger than she expected, and she only ate ${x} of her food. If you ate ${y} of your food, which quantity is smaller?  x __ y  `,
            es:`El plato principal de Elena era más grande de lo que esperaba, y solo comió ${x} de su comida. Si usted comió ${y} de su comida, ¿qué cantidad es menor? x __ y`,
        },
        answer,
        [],
        "inequality",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 2

    // Elena likes to eat [x = 5/8, ¾, 4/5, 7/10, 6/12, 80/100, 40/100, 2/3] cups of soup per day. She decided that she will have soup every day for the next [range: y = 2-9]. How many cups of soup did she eat in total? 

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
            en:`Elena likes to eat ${x} cups of soup per day. She decided that she will have soup every day for the next ${y} days. How many cups of soup did she eat in total? simplify your answer.`,
            es:`A Elena le gusta comer ${x} tazas de sopa por día. Ella decidió que comerá sopa todos los días durante los próximos ${y} días. ¿Cuántas tazas de sopa comió en total? simplifica tu respuesta.`,
        },
        answer,
        [],
        "fraction",
    ))


    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 3

    // Your pet drinks [x = 7/8, ¾, 3/5, 4/10, 7/12, 90/100, 50/100, 1/3] cups of water every day. How much water does your pet drink after [range: y = 2-9] days?

    // declare possible values
    possibleValuesX = ["7/8", "3/4", "3/5", "4/10", "7/12", "90/100", "50/100", "1/3"];

    // choose a random value from possibleValuesX
    // x = possibleValuesX[Math.floor(Math.random() * possibleValuesX.length)];
    x = possibleValuesX[randomInt(0,possibleValuesX.length)];

    // choose a random number from 2 to 9
    // random number represents the number of days
    // y = Math.floor(Math.random() * 8) + 2;
    y = randomInt(2,10);

    // answer
    numerator = x.split("/")[0];
    denominator = x.split("/")[1];

    answerNumerator = numerator * y;

    answer = `${answerNumerator}/${denominator}`;
    answer = simplifyFraction(answerNumerator,denominator);

    // generate question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Your pet drinks ${x} cups of water every day. How much water does your pet drink after ${y} days? simplify your answer.`,
            es:`Tu mascota bebe ${x} tazas de agua todos los días. ¿Cuánta agua bebe tu mascota después de ${y} días? simplifica tu respuesta.`,
        },
        answer,
        [],
        "fraction",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 4

    // Choose the correct symbol: 7 tenths + 17 hundredths  __  3 tenths + 29 hundredths

    // answer
    answer = "greater_than";

    // generate question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Choose the correct symbol: 7 tenths + 17 hundredths  __  3 tenths + 29 hundredths`,
            es:`Elige el símbolo correcto: 7 décimos + 17 centésimos  __  3 décimos + 29 centésimos`,
        },
        answer,
        [],
        "inequality",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 5

    // Choose the correct symbol: 9 hundredths + 7 tenths  __  79 hundredths + 0 tenths

    // answer
    answer = "equal_to";

    // generate question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Choose the correct symbol: 9 hundredths + 7 tenths  __  79 hundredths + 0 tenths`,
            es:`Elige el símbolo correcto: 9 centésimos + 7 décimos  __  79 centésimos + 0 décimos`,
        },
        answer,
        [],
        "inequality",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 6

    // Choose the correct symbol: 0.78  __  0.87

    // answer
    answer = "less_than";

    // generate question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Choose the correct symbol: 0.78  __  0.87`,
            es:`Elige el símbolo correcto: 0.78  __  0.87`,
        },
        answer,
        [],
        "inequality",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 7

    // Choose the correct symbol: 0.93  __  0.6

    // answer
    answer = "greater_than";

    // generate question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Choose the correct symbol: 0.93  __  0.6`,
            es:`Elige el símbolo correcto: 0.93  __  0.6`,
        },
        answer,
        [],
        "inequality",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 8

    // 67 hundredths + 0 tenths __ 7 hundredths + 6 tenths

    // answer
    answer = "equal_to";

    // generate question
    generatedQuestions.push(createGameQuestion(
        {
            en:`67 hundredths + 0 tenths __ 7 hundredths + 6 tenths`,
            es:`67 centésimos + 0 décimos __ 7 centésimos + 6 décimos`,
        },
        answer,
        [],
        "inequality",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 9

    // 1 tenths + 33 hundredths __ 8 tenths + 6 hundredths

    // answer
    answer = "less_than";

    // generate question
    generatedQuestions.push(createGameQuestion(
        {
            en:`1 tenths + 33 hundredths __ 8 tenths + 6 hundredths`,
            es:`1 décimo + 33 centésimos __ 8 décimos + 6 centésimos`,
        },
        answer,
        [],
        "inequality",
    ))


    return generatedQuestions;
}

function generateLevel3CQuestions(dishes,order,randomInt){
    let generatedQuestions = [];
    let answer;
    // question 1

    // If your total costs $100 and you have x[any whole number between 1-5] friends with you, express your answer as a fraction to calculate how much each person would pay if you split the bill?

    // let x = Math.floor(Math.random() * 5) + 1;
    let x = randomInt(1,6);
    // answer
    let numerator = 100;
    let denominator = x;
    answer = numerator/denominator;

    // round answer to 2 decimal places
    answer = parseFloat(answer.toFixed(2));

    // generate question
    generatedQuestions.push(createGameQuestion(
        {
            en:`If your total costs $100 and you have ${x} friends with you, calculate how much each person would pay if you split the bill?`,
            es:`Si tu total cuesta $100 y tienes ${x} amigos contigo, calcula cuánto pagaría cada persona si dividieras la cuenta.`,
        },
        answer,
        [],
        "decimal",
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
        [],
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
        [],
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