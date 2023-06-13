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


function generateLevel1AQuestions(dishes, order) {
    let generatedQuestions = [];
    let random = Math.floor(Math.random() * 3);

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // question 1

    // Elena’s friend, Alex, joins you at the table. If all three of you order the same 
    // [random generated by game – ‘entrée’ or ‘drink’ or ‘dessert’], what is the total cost of all [entrees/drinks/desserts]? 
    
    // choose a random dish
    let randomDishName = dishes[random];
    let randomDishNameEnglish = translations[randomDishName].en
    let randomDishNameSpanish = translations[randomDishName].es
    
    // get the price of said dish
    let priceOfRandomDish = order[randomDishName].price;
    // answer
    let answer = parseInt(priceOfRandomDish) * 3;

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Elena’s friend, Alex, joins you at the table. If all three of you order the same ${randomDishNameEnglish}, what is the total cost of all ${randomDishNameEnglish}? `,
            es:`El amigo de Elena, Alex, se une a ti en la mesa. Si los tres piden lo mismo  ${randomDishNameSpanish}, ¿cuál es el costo total de todas las ${randomDishNameSpanish}?`,
        },
        answer,
        [],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    // question 2

    // If you buy your [entree/drink/dessert] ‘x’ [where x is a random # 1-10] times, how much money did you spend in total?
    
    // choose random dish
    random = Math.floor(Math.random() * dishes.length);
    randomDishName = dishes[random];
    randomDishNameSpanish = translations[randomDishName].es
    randomDishNameEnglish = translations[randomDishName].en

    // get the price of said dish
    priceOfRandomDish = order[randomDishName].price;

    // choose random number between 1 and 10
    let randomNum = Math.floor(Math.random() * 10 + 1); 

    // answer
    // in case is water still valid -> 0*randomNum = 0
    answer = parseInt(priceOfRandomDish) * randomNum;

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`If you buy your ${randomDishNameEnglish} ${randomNum} times, how much money did you spend in total?`,
            es:`Si compras tu ${randomDishNameSpanish} ${randomNum} veces, ¿cuánto dinero gastaste en total?`,
        },
        answer,
        [],
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

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`How much will you pay for your ${randomDishNameEnglish} if you share half of it with Elena and split the cost evenly?`,
            es:`¿Cuánto pagarás por tu ${randomDishNameSpanish} si compartes la mitad con Elena y dividen el costo por igual?`,
        },
        answer,
        [],
        "decimal",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 4

    // Take a look at your order, how much will your new total be if you ordered [x, a random # 2-10] mainDish and [y, a random # 2-10] deserts?

    // choose random number between 2 and 10
    let randomNum1 = Math.floor(Math.random() * 9 + 2);
    let randomNum2 = Math.floor(Math.random() * 9 + 2);

    // get the price of said dishes
    let priceOfMainDish = order["mainDish"].price;
    let priceOfDessert = order["dessert"].price;

    // answer
    answer = (parseInt(priceOfMainDish) * randomNum1) + (parseInt(priceOfDessert) * randomNum2);

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Take a look at your order, how much will your new total be if you ordered ${randomNum1} main dishes and ${randomNum2} desserts?`,
            es:`Echa un vistazo a tu orden, ¿cuánto será tu nuevo total si ordenas ${randomNum1} ${randomDishNameSpanish} y ${randomNum2} ${randomDishNameSpanish}?`,
        },
        answer,
        [],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 5

    // Elena’s budget is [random # 10-30] dollars. If her main dish costs {costOfMainDush} dollars, how many mainDishes can she buy?

    // choose random number between 10 and 30
    // random number is the budget
    randomNum = Math.floor(Math.random() * 21 + 10);

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
        [],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 6

    // Your budget is now [random # 10-30] dollars. If you order the [chosen drink & price] and [chosen dessert & price], how much money do you have left over?

    // choose random number between 10 and 30
    // random number is the budget
    randomNum = Math.floor(Math.random() * 21 + 10);

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
        [],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 7

    // If your budget is [random # 10-30] dollars, how many drinks can you order?

    // choose random number between 10 and 30
    // random number is the budget
    randomNum = Math.floor(Math.random() * 21 + 10);

    // choose random number between 1 and 10
    randomNum2 = Math.floor(Math.random() * 10 + 1);

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
            [],
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
            [],
            "wholeNumber",
        ))
    }

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 8

    // How much will you pay for the main dish if you share it with [‘x’, a random # 2-10] friends and you all equally split the cost?

    // choose random number between 2 and 10
    randomNum = Math.floor(Math.random() * 9 + 2);

    // get the price of said dish
    priceOfMainDish = order["mainDish"].price;

    // answer
    let totalPeople = randomNum + 1;
    answer = Math.floor(parseInt(priceOfMainDish) / totalPeople);

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`How much will you pay for the main dish if you share it with ${randomNum} friends and you all equally split the cost?`,
            es:`¿Cuánto pagarás por el plato principal si lo compartes con ${randomNum} amigos y todos comparten el costo por igual?`,
        },
        answer,
        [],
        "wholeNumber",
    ))



    return generatedQuestions;
    
}


function generateLevel1CQuestions(dishes,order){
    let generatedQuestions = [];
    let random = Math.floor(Math.random() * dishes.length);
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
    let randomFractionName = Object.keys(randomFraction)[Math.floor(Math.random() * Object.keys(randomFraction).length)];
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
    let randomFraction1 = fractions[Math.floor(Math.random() * fractions.length)];

    // choose a random fraction
    let randomFraction2 = fractions[Math.floor(Math.random() * fractions.length)];

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
    let values = {
        "two":2,
        "three":3,
        "four":4,
        "six":6,
        "eight":8,
    };

    // choose a random value from values
    let randomValueStr = Object.keys(values)[Math.floor(Math.random() * Object.keys(values).length)];
    let randomValue = values[randomValueStr];

    // choose a random number from 1 to randomValue
    // random number represents the number of portions eaten
    let randomNumber = Math.floor(Math.random() * randomValue) + 1;

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
            en:`The server divided your entrée dish into ${randomValueStr} equal portions. If you eat ${randomNumber} portions, what is the total amount of food you ate?`,
            es:`El mesero dividió tu plato principal en ${randomValueStr} porciones iguales. Si tú comes ${randomNumber} porciones, ¿cuánta comida comiste en total?`,
        },
        answer,
        [hint],
        "fraction",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    return generatedQuestions;

}

function generateLevel1DQuestions(dishes,order){
    // Time questions
    let generatedQuestions = [];
    let answer=0;

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 1

    // You and Elena arrive at the restaurant at [“random time from 12-6 PM”]. If it takes you both [“5-15 random number”] minutes to order, at what time will you place the order? 

    // choose a random time from 12-18 PM
    let randomTimeHour = Math.floor(Math.random() * 7) + 12;

    // choose a random number from 5-15
    let randomNumberMinutes = Math.floor(Math.random() * 11) + 5;

    // answer
    answer = `${randomTimeHour}:${randomNumberMinutes}pm`;

    // hint
    let hint = {
        en: "Write your answer in the format HH:MMpm. For example, 13:30pm.",
        es: "Escribe tu respuesta en el formato HH:MMpm. Por ejemplo, 13:30pm.",
    }

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`You and Elena arrive at the restaurant at ${randomTimeHour}pm. If it takes you both ${randomNumberMinutes} minutes to order, at what time will you place the order?`,
            es:`Tú y Elena llegan al restaurante a las ${randomTimeHour}pm. Si les toma ${randomNumberMinutes} minutos ordenar, ¿a qué hora harán el pedido?`,
        },
        answer,
        [hint],
        "time",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 2

    // If you and Elena arrived at the restaurant at [“random time from 12-6 PM”] and spent [“30-59”] minutes to eat and pay, at what time will you leave the restaurant?

    // choose a random time from 12-18 PM
    randomTimeHour = Math.floor(Math.random() * 7) + 12;

    // choose a random number from 30-59
    randomNumberMinutes = Math.floor(Math.random() * 30) + 30;

    // answer
    answer = `${randomTimeHour}:${randomNumberMinutes}pm`;

    // hint
    hint = {
        en: "Write your answer in the format HH:MMpm. For example, 13:30pm.",
        es: "Escribe tu respuesta en el formato HH:MMpm. Por ejemplo, 13:30pm.",
    }

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`If you and Elena arrived at the restaurant at ${randomTimeHour}pm and spent ${randomNumberMinutes} minutes to eat and pay, at what time will you leave the restaurant?`,
            es:`Si tú y Elena llegaron al restaurante a las ${randomTimeHour}pm y se tardaron ${randomNumberMinutes} minutos en comer y pagar, ¿a qué hora saldrán del restaurante?`,
        },
        answer,
        [hint],
        "time",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 3

    // The server tells you and Elena that your food will be ready in [“5-20” random number] minutes. 
    // If your food order took [“5-15 random number”] minutes and you arrived at the restaurant at [“random time from 12-6 PM”], 
    // how many total minutes did you wait to receive your food? What time was it when you received your food?

    // choose a random number from 5-20
    let foodReadyTime = Math.floor(Math.random() * 16) + 5;

    // choose a random number from 5-15
    let foodOrderTime = Math.floor(Math.random() * 11) + 5;

    // choose a random time from 12-18 PM
    randomTimeHour = Math.floor(Math.random() * 7) + 12;

    // answer
    answer = `${randomTimeHour}:${foodReadyTime + foodOrderTime}pm`;

    // hint
    hint = {
        en: "Write your answer in the format HH:MMpm. For example, 13:30pm.",
        es: "Escribe tu respuesta en el formato HH:MMpm. Por ejemplo, 13:30pm.",
    }

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`The server tells you and Elena that your food will be ready in ${foodReadyTime} minutes. If your food order took ${foodOrderTime} minutes and you arrived at the restaurant at ${randomTimeHour}pm, at what time was it when you received your food?`,
            es:`El mesero les dice a ti y a Elena que su comida estará lista en ${foodReadyTime} minutos. Si su orden tardó ${foodOrderTime} minutos y llegaron al restaurante a las ${randomTimeHour}pm, ¿a qué hora recibieron su comida?`,
        },
        answer,
        [hint],
        "time",
    ))



    return generatedQuestions;

}

export default function generateBasicOrderQuestions(order, level) {
    // array of questions
    let questions = [];
    // array of dishes
    let dishes = ["mainDish", "drink", "dessert"];
    // random number to choose a dish
    let random = Math.floor(Math.random() * dishes.length);

    if (level === '1') {
        // add the A section
        let generatedQuestions = generateLevel1AQuestions(dishes, order);
        questions = questions.concat(generatedQuestions);
        
    }




    return questions;
}