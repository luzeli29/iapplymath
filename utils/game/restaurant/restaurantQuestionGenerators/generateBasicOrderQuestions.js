import createGameQuestion from '@utils/game/quiz/questionGeneration/createGameQuestion'
import translations from '@public/text/translations';

// export default function generateBasicOrderQuestions(order, level) {

//     let questions = []
//     let dishes = ["mainDish", "drink", "dessert"]; 
//     let random = Math.floor(Math.random() * dishes.length)
//     let random_2 = Math.floor(Math.random() * 10)
//     let total = 0


//     if (level === '1') {
//         total = parseInt(order[dishes[random]].price) * 3
//         questions.push(createGameQuestion(
//             {
//                 en:`Elena’s friend, Alex, joins you at the table. If all three of you order the same ${dishes[random]}, what is the total cost of all ${dishes[random]}? `,
//                 es:`El amigo de Elena, Alex, se une a ti en la mesa. Si los tres piden lo mismo  ${dishes[random]}, ¿cuál es el costo total de todas las ${dishes[random]}?`,
//             },
//             total,
//             [],
//             "wholeNumber",
//         ))

//         total = parseInt(order[dishes[random]].price) * random_2
//         questions.push(createGameQuestion(
//             {
//                 en:`If you buy your ${dishes[random]} ${random_2} times, how much money did you spend in total?`,
//                 es: `Si compra su  ${dishes[random]} ${random_2} por, ¿cuánto dinero gastó en total?`,
//             },
//             total,
//             [],
//             "wholeNumber",
//         ))

//         total = (order.mainDish.price) / 2



//         questions.push(createGameQuestion(
//             {
//                 en: `How much will you pay for your main dish if you share half of it with Elena and split the cost evenly? `,
//                 es: `¿Cuánto pagará por su entrada si comparte la mitad con Elena y divide el costo en partes iguales?`,
//             },
//             total,
//             [],
//             "decimal",
//         ))

//         random = Math.floor(Math.random() * 20)
//         random_2 = Math.floor(Math.random() * 20)
//         total = (parseInt(order.mainDish.price) * random) + parseInt(order.dessert.price) * random_2
//         questions.push(createGameQuestion(
//             {
//                 en: `Take a look at your order, how much will your new total be if you ordered ${random} entrees and ${random_2} deserts? `,
//                 es: `Eche un vistazo a su pedido, ¿cuánto será su nuevo total si ordenó ${random} entradas y ${random_2} postres?`,
//             },
//             total,
//             [],
//             "wholeNumber",
//         ))

//         random = Math.floor(Math.random() * 30)+1 // exclude 0
//         random_2 = Math.floor(Math.random() * 10)+1 // exclude 0
//         // total = parseInt( random / parseInt(order.mainDish.price))
//         // if random is the budget, and random_2 is the price of the main dish, how many main dishes can you buy?
//         total = Math.floor(random / random_2)
//         questions.push(createGameQuestion(
//             {
//                 en: `Elena’s budget is ${random} dollars. If her main dish costs ${random_2} dollars, how many main dishes can she buy?`,
//                 es: `El presupuesto de Elena es ${random} dólares. Si su entrada cuesta ${random_2} dólares, ¿cuántas entradas puede comprar?`,
//             },
//             total,
//             [],
//             "wholeNumber",
//         ))

//     } else if (level === '2') {
//         let prices = {
//             mainDish: [7, 8.5, 10],
//             dessert: [4, 5.5, 7],
//             drink: [2, 3.5, 5]
//         }

//         let budget_2021 = Math.floor(Math.random() * (28 - 20 + 1)) + 20;
//         let food_items_2021 = Math.floor(budget_2021 / prices[dishes[random]][0]);
//         questions.push(createGameQuestion(
//             {
//                 en:`If your budget in 2021 was ${budget_2021} dollars, how many ${dishes[random]} could you afford to buy?`,
//                 es:`Si tu presupuesto en 2021 era de ${budget_2021} dólares, ¿cuántos ${dishes[random]} podrías comprar?`,
//             },
//             food_items_2021,
//             [],
//             "wholeNumber",
//         ))

//         let food_items_2022 = Math.floor(budget_2021 / prices[dishes[random]][1]);
//         questions.push(createGameQuestion(
//             {
//                 en:`In 2022 your budget was unchanged, ${budget_2021} dollars. How many ${dishes[random]} could you buy then?`,
//                 es:`En 2022 tu presupuesto no cambió, ${budget_2021} dólares. ¿Cuántos ${dishes[random]} podrías comprar entonces?`,
//             },
//             food_items_2022,
//             [],
//             "wholeNumber",
//         ))

//         questions.push(createGameQuestion(
//             {
//                 en:`If your parents give you the same budget as in 2021, ${budget_2021} dollars, in which year were you able to buy the most food?`,
//                 es:`Si tus padres te dan el mismo presupuesto que en 2021, ${budget_2021} dólares, ¿en qué año pudiste comprar más comida?`,
//             },
//             2021,
//             [],
//             "wholeNumber",
//         ))

//         let elena_budget_2021 = 28;
//         let food_items_elena_2021 = Math.floor(elena_budget_2021 / prices[dishes[random]][0]);
//         let elena_budget_2022 = food_items_elena_2021 * prices[dishes[random]][1];
//         let elena_budget_2023 = food_items_elena_2021 * prices[dishes[random]][2];
//         questions.push(createGameQuestion(
//             {
//                 en:`Elena's budget in 2021 was 28 dollars. What would Elena’s new budget need to be in 2022 for her to buy as many ${dishes[random]} as she could in 2021?`,
//                 es:`El presupuesto de Elena en 2021 era de 28 dólares. ¿Cuánto tendría que ser el nuevo presupuesto de Elena en 2022 para que pudiera comprar tantos ${dishes[random]} como pudo en 2021?`,
//             },
//             elena_budget_2022,
//             [],
//             "wholeNumber",
//         ))

//         questions.push(createGameQuestion(
//             {
//                 en:`Elena's budget in 2021 was 28 dollars. What would Elena’s new budget need to be in 2023 for her to buy as many ${dishes[random]} as she could in 2021?`,
//                 es:`El presupuesto de Elena en 2021 era de 28 dólares. ¿Cuánto tendría que ser el nuevo presupuesto de Elena en 2023 para que pudiera comprar tantos ${dishes[random]} como pudo en 2021?`,
//             },
//             elena_budget_2023,
//             [],
//             "wholeNumber",
//         ))
//     } else if (level === '3') {
//     questions.push(createGameQuestion(
//         {
//             en:`How might you represent twice your ${dishes[0]} using parenthesis?`,
//             es:`¿Cómo podrías representar el doble de tu ${dishes[0]} usando paréntesis?`,
//         },
//         `2(${dishes[0]})`,
//         [],
//         "text",
//     ))

//     questions.push(createGameQuestion(
//         {
//             en:`How might you represent twice your ${dishes[0]} plus your ${dishes[1]}?`,
//             es:`¿Cómo podrías representar el doble de tu ${dishes[0]} más tu ${dishes[1]}?`,
//         },
//         `2(${dishes[0]})+(${dishes[1]})`,
//         [],
//         "text",
//     ))

//     questions.push(createGameQuestion(
//         {
//             en:`How might you represent twice your ${dishes[0]} minus your ${dishes[2]}?`,
//             es:`¿Cómo podrías representar el doble de tu ${dishes[0]} menos tu ${dishes[2]}?`,
//         },
//         `2(${dishes[0]})-(${dishes[2]})`,
//         [],
//         "text",
//     ))

//     questions.push(createGameQuestion(
//         {
//             en:`How might you write the equation to solve for the total amount you spent at the restaurant?`,
//             es:`¿Cómo podrías escribir la ecuación para resolver la cantidad total que gastaste en el restaurante?`,
//         },
//         `${dishes[0]} + ${dishes[1]} + ${dishes[2]} = `,
//         [],
//         "text",
//     ))

//     questions.push(createGameQuestion(
//         {
//             en:`How might you write the equation to solve for the total amount you will spend if you order everything twice?`,
//             es:`¿Cómo podrías escribir la ecuación para resolver la cantidad total que gastarás si ordenas todo dos veces?`,
//         },
//         `2(${dishes[0]} + ${dishes[1]} + ${dishes[2]} = )`,
//         [],
//         "text",
//     ))

//     let random_num = Math.floor(Math.random() * 10 + 1)
//     questions.push(createGameQuestion(
//         {
//             en:`What would an equation read if you order ${dishes[random]} ${random_num} times?`,
//             es:`¿Cómo se leería una ecuación si ordenas ${dishes[random]} ${random_num} veces?`,
//         },
//         `${random_num}${dishes[random]}`,
//         [],
//         "text",
//     ))
// }




//     return questions
// }


function generateLevel1AQuestions(dishes, order, randomInt) {
    let generatedQuestions = [];
    // let random = Math.floor(Math.random() * 3);
    let random = randomInt(0,3);

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // question 1

    // Elena’s friend, Alex, joins you at the table. If all three of you order the same 
    // [random generated by game – ‘entrée’ or ‘drink’ or ‘dessert’], what is the total cost of all [entrees/drinks/desserts]? 
    
    // choose a random dish
    let randomDishName = dishes[random];
    
    // get the price of said dish
    let priceOfRandomDish = order[randomDishName].price;
    // answer
    let answer = parseInt(priceOfRandomDish) * 3;

    const plurals ={
        "mainDish":{
            en:"main dishes",
            es:"platos principales",
        },
        "drink":{
            en:"drinks",
            es:"bebidas",
        },
        "dessert":{
            en:"desserts",
            es:"postres",
        },
    }

    let randomDishNameEnglish = plurals[randomDishName].en
    let randomDishNameSpanish = plurals[randomDishName].es

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Elena’s friend, Alex, joins you at the table. If all three of you order the same ${randomDishNameEnglish}, what is the total cost of all ${randomDishNameEnglish}? `,
            es:`El amigo de Elena, Alex, se une a ti en la mesa. Si los tres piden lo mismo  ${randomDishNameSpanish}, ¿cuál es el costo total de todas las ${randomDishNameSpanish}?`,
        },
        answer,
        [{
            en: "(" + randomDishNameEnglish + ") x " + 3 + " = ???",
            es: "(" + randomDishNameSpanish + ") x " + 3 + " = ???",
        },{
            en: "(" + randomDishNameEnglish + ") x " + 3 + " = " + priceOfRandomDish * 3,
            es: "(" + randomDishNameSpanish + ") x " + 3 + " = " + priceOfRandomDish * 3,
        }],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    // question 2

    // If you buy your [entree/drink/dessert] ‘x’ [where x is a random # 1-10] times, how much money did you spend in total?
    
    // choose random dish
    // random = Math.floor(Math.random() * dishes.length);
    random = randomInt(0,dishes.length);
    randomDishName = dishes[random];
    randomDishNameSpanish = translations[randomDishName].es
    randomDishNameEnglish = translations[randomDishName].en

    // get the price of said dish
    priceOfRandomDish = order[randomDishName].price;

    // choose random number between 1 and 10
    // let randomNum = Math.floor(Math.random() * 10 + 1); 
    let randomNum = randomInt(1,11);

    // answer
    // in case is water still valid -> 0*randomNum = 0
    answer = parseInt(priceOfRandomDish) * randomNum;


    const amountWording = {
        plural:{
            en: "times",
            es: "veces",
        },
        singular:{
            en: "time",
            es: "vez",
        }
    }

    let amountWordingAnswer = (randomNum > 1) ? amountWording.plural : amountWording.singular;


    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`If you buy your ${randomDishNameEnglish} ${randomNum} ${amountWordingAnswer.en}, how much money did you spend in total?`,
            es:`Si compras tu ${randomDishNameSpanish} ${randomNum} ${amountWordingAnswer.es}, ¿cuánto dinero gastaste en total?`,
        },
        answer,
        [{
            en: "(" + randomDishNameEnglish + ") x " + randomNum + " = ???",
            es: "(" + randomDishNameSpanish + ") x " + randomNum + " = ???",
        },{
            en: "(" + randomDishNameEnglish + ") x " + randomNum + " = " + priceOfRandomDish * randomNum,
            es: "(" + randomDishNameSpanish + ") x " + randomNum + " = " + priceOfRandomDish * randomNum,
        }],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 3
    
    // How much will you pay for your main dish if you share half of it with Elena and split the cost evenly?

    randomDishName = "mainDish";
    randomDishNameSpanish = translations[randomDishName].es
    randomDishNameEnglish = translations[randomDishName].en

    // get the price of said dish
    priceOfRandomDish = order[randomDishName].price;

    // answer
    answer = parseInt(priceOfRandomDish) / 2;
    
    answer = parseFloat(answer.toFixed(2));


    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`How much will you pay for your ${randomDishNameEnglish} if you share half of it with Elena and split the cost evenly?`,
            es:`¿Cuánto pagarás por tu ${randomDishNameSpanish} si compartes la mitad con Elena y dividen el costo por igual?`,
        },
        answer,
        [{
            en: "(" + randomDishNameEnglish + ") ÷ " + 2 + " = ???",
            es: "(" + randomDishNameSpanish + ") ÷ " + 2 + " = ???",
        },{
            en: "(" + randomDishNameEnglish + ") ÷ " + 2 + " = " + priceOfRandomDish / 2,
            es: "(" + randomDishNameSpanish + ") ÷ " + 2 + " = " + priceOfRandomDish / 2,
        }],
        "decimal",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 4

    // Take a look at your order, how much will your new total be if you ordered [x, a random # 2-10] mainDish and [y, a random # 2-10] deserts?

    // choose random number between 2 and 10
    // let randomNum1 = Math.floor(Math.random() * 9 + 2);
    let randomNum1 = randomInt(2,11);


    // let randomNum2 = Math.floor(Math.random() * 9 + 2);
    let randomNum2 = randomInt(2,11);

    // get the price of said dishes
    let priceOfMainDish = order["mainDish"].price;
    let priceOfDessert = order["dessert"].price;

    // answer
    answer = (parseInt(priceOfMainDish) * randomNum1) + (parseInt(priceOfDessert) * randomNum2);

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Take a look at your order, how much will your new total be if you ordered ${randomNum1} main dishes and ${randomNum2} desserts?`,
            es:`Echa un vistazo a tu orden, ¿cuánto será tu nuevo total si ordenas ${randomNum1} platos principales y ${randomNum2} postres?`,
        },
        answer,
        [{
            en: "(" + priceOfMainDish + " x " + randomNum1 + ") + (" + priceOfDessert + " x " + randomNum2 + ")  = ???",
            es: "(" + priceOfMainDish + " x " + randomNum1 + ") + (" + priceOfDessert + " x " + randomNum2 + ")  = ???",
        },{
            en: "(" + priceOfMainDish + " x " + randomNum1 + ") + (" + priceOfDessert + " x " + randomNum2 + ")  = " + (priceOfMainDish*randomNum1)+(priceOfDessert*randomNum2),
            es: "(" + priceOfMainDish + " x " + randomNum1 + ") + (" + priceOfDessert + " x " + randomNum2 + ")  = " + (priceOfMainDish*randomNum1)+(priceOfDessert*randomNum2),
        }],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 5

    // Elena’s budget is [random # 10-30] dollars. If her main dish costs {costOfMainDush} dollars, how many mainDishes can she buy?

    // choose random number between 10 and 30
    // random number is the budget
    // randomNum = Math.floor(Math.random() * 21 + 10);
    randomNum = randomInt(10,31);

    // get the price of said dish
    priceOfMainDish = order["mainDish"].price;
    
    // answer
    answer = Math.floor(randomNum / parseInt(priceOfMainDish));

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Elena’s budget is ${randomNum} dollars. If her main dish costs ${priceOfMainDish} dollars, how many main dishes can she buy?`,
            es:`El presupuesto de Elena es de ${randomNum} dólares. Si su ${randomDishNameSpanish} cuesta ${priceOfMainDish} dólares, ¿cuántos platos principales puede comprar?`,
        },
        answer,
        [{
            en:  randomNum+ " ÷ " + priceOfMainDish + " = ???",
            es:  randomNum+ " ÷ " + priceOfMainDish + " = ???",
        },{
            en: randomNum+ " ÷ " + priceOfMainDish + " = " + randomNum/priceOfMainDish,
            es: randomNum+ " ÷ " + priceOfMainDish + " = " + randomNum/priceOfMainDish,
        },{
            en: "Main dish count must be rounded down to the nearest whole number",
            es: "El número de platos fuertes debe redondearse hacia abajo al número entero más cercano",
        }],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 6

    // Your budget is now [random # 10-30] dollars. If you order the [chosen drink & price] and [chosen dessert & price], how much money do you have left over?

    // choose random number between 10 and 30
    // random number is the budget
    // randomNum = Math.floor(Math.random() * 21 + 10);
    randomNum = randomInt(10,31);

    // get the price of said dishes
    let priceOfDrink = order["drink"].price;
    priceOfDessert = order["dessert"].price;

    // name of the drink and dessert
    let nameOfDrinkEnglish = order["drink"].en;
    let nameOfDrinkSpanish = order["drink"].es;

    let nameOfDessertEnglish = order["dessert"].en;
    let nameOfDessertSpanish = order["dessert"].es;

    // answer
    answer = randomNum - (parseInt(priceOfDrink) + parseInt(priceOfDessert));

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Your budget is now ${randomNum} dollars. If you order the ${nameOfDrinkEnglish} and ${nameOfDessertEnglish}, how much money do you have left over?`,
            es:`Tu presupuesto es ahora de ${randomNum} dólares. Si pides  ${nameOfDrinkSpanish} y  ${nameOfDessertSpanish}, ¿cuánto dinero te queda?`,
        },
        answer,
        [{
            en:  randomNum+ " - " + " ( " + nameOfDrinkEnglish + " + " + nameOfDessertEnglish + " ) = ???",
            es:  randomNum+ " - " + " ( " + nameOfDrinkSpanish + " + " + nameOfDessertSpanish + " ) = ???",
        },{
            en: randomNum+ " - " + " ( " + nameOfDrinkEnglish + " + " + nameOfDessertEnglish + " ) = " + (randomNum - (priceOfDessert+ priceOfDrink)),
            es: randomNum+ " - " + " ( " + nameOfDrinkSpanish + " + " + nameOfDessertSpanish + " ) = " + (randomNum - (priceOfDessert+ priceOfDrink)),
        }],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 7

    // If your budget is [random # 10-30] dollars, how many drinks can you order?

    // choose random number between 10 and 30
    // random number is the budget
    // randomNum = Math.floor(Math.random() * 21 + 10);
    randomNum = randomInt(10,31);

    // choose random number between 1 and 10
    // randomNum2 = Math.floor(Math.random() * 10 + 1);
    randomNum2 = randomInt(1,11);

    // get the price of said dish
    priceOfDrink = order["drink"].price;

    // validate that the price of the drink is not 0
    if (priceOfDrink === 0) {
        // in case the price of the drink is 0, we change the question to do it for the dessert
        priceOfDessert = order["dessert"].price;

        // answer
        answer = Math.floor(randomNum / parseInt(priceOfDessert));

        // create question
        generatedQuestions.push(createGameQuestion(
            {
                en:`If your budget is ${randomNum} dollars, how many desserts can you order?`,
                es:`Si tu presupuesto es de ${randomNum} dólares, ¿cuántos postres puedes pedir?`,
            },
            answer,
            [{
                en:  randomNum+ " ÷ " + priceOfDessert + " = ???",
                es:  randomNum+ " ÷ " + priceOfDessert + " = ???",
            },{
                en: randomNum+ " ÷ " + priceOfDessert + " = "+ randomNum/priceOfDessert,
                es: randomNum+ " ÷ " + priceOfDessert + " = "+ randomNum/priceOfDessert,
            },{
                en: "Dessert count must be rounded down to the nearest whole number",
                es: "El número de postres debe redondearse hacia abajo al número entero más cercano",
            }],
            "wholeNumber",
        ))

    }else {
        // answer
        answer = Math.floor(randomNum / parseInt(priceOfDrink));

        // create question
        generatedQuestions.push(createGameQuestion(
            {
                en:`If your budget is ${randomNum} dollars, how many drinks can you order?`,
                es:`Si tu presupuesto es de ${randomNum} dólares, ¿cuántas bebidas puedes pedir?`,
            },
            answer,
            [{
                en:  randomNum+ " ÷ " + priceOfDrink + " = ???",
                es:  randomNum+ " ÷ " + priceOfDrink + " = ???",
            },{
                en: randomNum+ " ÷ " + priceOfDrink + " = "+ randomNum/priceOfDrink,
                es: randomNum+ " ÷ " + priceOfDrink + " = "+ randomNum/priceOfDrink,
            },{
                en: "Drink count must be rounded down to the nearest whole number",
                es: "El número de bebidas debe redondearse hacia abajo al número entero más cercano",
            }],
            "wholeNumber",
        ))
    }

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 8

    // How much will you pay for the main dish if you share it with [‘x’, a random # 2-10] friends and you all equally split the cost?

    // choose random number between 2 and 10
    // randomNum = Math.floor(Math.random() * 9 + 2);
    randomNum = randomInt(2,11);

    // get the price of said dish
    priceOfMainDish = order["mainDish"].price;

    // answer
    let totalPeople = randomNum + 1;
    answer = parseFloat((parseInt(priceOfMainDish) / totalPeople).toFixed(2));


    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`How much will you pay for the main dish if you share it with ${randomNum} friends and you all equally split the cost?`,
            es:`¿Cuánto pagarás por el plato principal si lo compartes con ${randomNum} amigos y todos comparten el costo por igual?`,
        },
        answer,
        [{
            en:  priceOfMainDish+ " ÷ " + totalPeople + " = ???",
            es:  priceOfMainDish+ " ÷ " + totalPeople + " = ???",
        },{
            en: priceOfMainDish+ " ÷ " + totalPeople+ " = " + priceOfMainDish/totalPeople,
            es: priceOfMainDish+ " ÷ " + totalPeople + " = " + priceOfMainDish/totalPeople,
        },{
            en: "Round your answer to the nearest hundredth",
            es: "Redondea tu respuesta a la centésima más cercana ",
        }],
        "decimal",
    ))



    return generatedQuestions;
    
}

function generateLevel2AQuestions(dishes, order, randomInt){
    let generatedQuestions = [];

    // ***********************************************************************************************************************
    // question 1

    // “Restaurant name” is hosting a monthly food drive event. Elena and you are helping collect and organize various food items. On the first day, you collected [range: x = 10-50] food items and on the second day you collected [range y=2-9] times as many items. How many items did you and Elena collect on the second day?

    // choose random number between 10 and 50
    // let randomNum = Math.floor(Math.random() * 41 + 10);
    let randomNum = randomInt(10,51);

    // choose random number between 2 and 9
    // let randomNum2 = Math.floor(Math.random() * 8 + 2);
    let randomNum2 = randomInt(2,10);

    // answer
    let answer = randomNum * randomNum2;

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`The restaurant is hosting a monthly food drive event. Elena and you are helping collect and organize various food items. On the first day, you collected ${randomNum} food items and on the second day you collected ${randomNum2} times as many items. How many items did you and Elena collect on the second day?`,
            es:`El restaurante está organizando un evento mensual de recolección de alimentos. Elena y tú están ayudando a recolectar y organizar varios alimentos. El primer día, recolectaste ${randomNum} alimentos y el segundo día recolectaste ${randomNum2} veces más. ¿Cuántos alimentos recolectaron Elena y tú el segundo día?`,
        },
        answer,
        [],
        "wholeNumber",
    ))

    // ***********************************************************************************************************************
    // question 2

    // Today your parents gave you [range: x = 10-30] dollars to order food at the restaurant. If next time they gave you [range = 2-5] times [less/more] money, what is your new budget?

    // choose random number between 10 and 30
    // randomNum = Math.floor(Math.random() * 21 + 10);
    randomNum = randomInt(10,31);

    // choose random number between 2 and 5
    // randomNum2 = Math.floor(Math.random() * 4 + 2);
    randomNum2 = randomInt(2,6);

    let traduccion = {
        "less":"menos",
        "more":"más"
    }

    let options = ["less", "more"];
    // choose random option
    let randomOption = options[Math.floor(Math.random() * options.length)];

    if(randomOption === "less"){
        // answer
        // validate that when dividing the random number by the random number 2, the result is a whole number
        // if it is not a whole number, we subtract 1 from the random number 2
        if(randomNum % randomNum2 !== 0){
            
            while(randomNum % randomNum2 !== 0){
                randomNum2 -= 1;
            }

        }
        answer =  randomNum / randomNum2;

        
    }else{
        // answer
        answer = randomNum * randomNum2;
    }

    answer = parseFloat(answer.toFixed(2));

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Today your parents gave you ${randomNum} dollars to order food at the restaurant. If next time they gave you ${randomNum2} times ${randomOption} money, what is your new budget?`,
            es:`Hoy tus padres te dieron ${randomNum} dólares para ordenar comida en el restaurante. Si la próxima vez te dieran ${randomNum2} veces ${traduccion[randomOption]} dinero, ¿cuál es tu nuevo presupuesto?`,
        },
        answer,
        [],
        "decimal",
    ))

    // ***********************************************************************************************************************

        let tableValues ={
            "mainDish": {
                "2021":7,
                "2022":8.5,
                "2023":10,
            },
            "dessert": {
                "2021":4,
                "2022":5.5,
                "2023":7,
            },
            "drink": {
                "2021":2,
                "2022":3.5,
                "2023":3,
            },
        
        }




    // question 3

    // If your budget in 2021 was [range: x = 20-28] dollars, how many [“entrées”/ ”desserts”/”drinks”] could you afford to buy?

    // choose random number between 20 and 28
    // randomNum = Math.floor(Math.random() * 9 + 20);
    randomNum = randomInt(20,29);

    // choose random dish
    // let randomDish = dishes[Math.floor(Math.random() * dishes.length)];
    let randomDish = dishes[randomInt(0, dishes.length)];
    let randomDishNameSpanish = translations[randomDish].es
    let randomDishNameEnglish = translations[randomDish].en
    // get the price of said dish
    let priceOfDish = tableValues[randomDish]["2021"];

    // answer
    answer = Math.floor(randomNum / priceOfDish);

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`If your budget in 2021 was ${randomNum} dollars, how many ${randomDishNameEnglish} could you afford to buy?`,
            es:`Si tu presupuesto en 2021 fue de ${randomNum} dólares, ¿cuántos ${randomDishNameSpanish} podrías comprar?`,
        },
        answer,
        [],
        "wholeNumber",
        null,
        "tableRestaurant"
    ))

    // ***********************************************************************************************************************

    // question 4
    // In 2022 your budget was unchanged, [x = # from part a.] dollars. How many [“entrées”/ ”desserts”/”drinks”] could you buy then?

    // choose random dish
    // randomDish = dishes[Math.floor(Math.random() * dishes.length)];
    randomDish = dishes[randomInt(0, dishes.length)];
    randomDishNameSpanish = translations[randomDish].es
    randomDishNameEnglish = translations[randomDish].en

    // get the price of said dish
    priceOfDish = tableValues[randomDish]["2022"];

    // answer
    answer = Math.floor(randomNum / priceOfDish);

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`In 2022 your budget was unchanged, ${randomNum} dollars. How many ${randomDishNameEnglish} could you buy then?`,
            es:`En 2022 tu presupuesto no cambió, ${randomNum} dólares. ¿Cuántos ${randomDishNameSpanish} podrías comprar entonces?`,
        },
        answer,
        [],
        "wholeNumber",
        null,
        "tableRestaurant"
    ))

    // ***********************************************************************************************************************
    // question 5

    // If your parents give you the same budget as in 2021, [x = # from part a.] dollars, in which year were you able to buy the most food? Enter the correct year in the answer box. 

    // answer
    answer = 2021;

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`If your parents give you the same budget as in 2021, ${randomNum} dollars, in which year were you able to buy the most food? Enter the correct year in the answer box.`,
            es:`Si tus padres te dan el mismo presupuesto que en 2021, ${randomNum} dólares, ¿en qué año pudiste comprar más comida? Ingresa el año correcto en el cuadro de respuesta.`,
        },
        answer,
        [],
        "wholeNumber",
        null,
        "tableRestaurant"
    ))

    // ***********************************************************************************************************************

    // question 6

    // Elena’s budget in 2021 was 28 dollars. What would Elena’s new budget need to be in [2022 or 2023] for her to buy as many [“entrées”/ ”desserts”/”drinks”] as she could in 2021?

    // choose random year between 2022 and 2023
    // let randomYear = Math.floor(Math.random() * 2 + 2022);
    let randomYear = randomInt(2022, 2024);

    // choose random dish
    // randomDish = dishes[Math.floor(Math.random() * dishes.length)];
    randomDish = dishes[randomInt(0, dishes.length)];
    randomDishNameSpanish = translations[randomDish].es
    randomDishNameEnglish = translations[randomDish].en

    // Step 1: Calculate food items in 2021 (x). 
    let firstStep =Math.floor( 28 / tableValues[randomDish]["2021"] );

    // Step 2: Calculate the price of the food item in the new year (y).
    let secondStep = tableValues[randomDish][randomYear];

    answer = secondStep * firstStep;
    
    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Elena’s budget in 2021 was 28 dollars. What would Elena’s new budget need to be in ${randomYear} for her to buy as many ${randomDishNameEnglish} as she could in 2021?`,
            es:`El presupuesto de Elena en 2021 fue de 28 dólares. ¿Cuánto tendría que ser el presupuesto de Elena en ${randomYear} para que ella pueda comprar tantos ${randomDishNameSpanish} como pudo en 2021?`,
        },
        answer,
        [],
        "decimal",
        null,
        "tableRestaurant"
    ))





    return generatedQuestions;
}

function generateLevel3AQuestions(dishes,order, randomInt){
    let generatedQuestions = [];
    let answer = null;

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 1

    // How might you represent twice your mainDish using parenthesis?

    // Pending


    return generatedQuestions;
}

export default function generateOperationsAndAlgebraQuestions(order, level,randomGenerator) {
    // array of questions
    let questions = [];
    // array of dishes
    let dishes = ["mainDish", "drink", "dessert"];

    const { randomInt } = randomGenerator;

    // random number to choose a dish

    if (level === '1') {
        // add the A section
        let generatedQuestions = generateLevel1AQuestions(dishes, order,randomInt);
        questions = questions.concat(generatedQuestions);
        
    }

    if (level === '2') {
        // add the A section
        let generatedQuestions = generateLevel2AQuestions(dishes, order,randomInt);
        questions = questions.concat(generatedQuestions);
    }

    if (level === '3') {

        // add the A section
        let generatedQuestions = generateLevel3AQuestions(dishes, order, randomInt);
        questions = questions.concat(generatedQuestions);

    }




    return questions;
}