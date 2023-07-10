import getText from '@utils/text/getText'
import createGameQuestion from '@utils/game/quiz/questionGeneration/createGameQuestion'
import translations from '@public/text/translations';

function generateLevel1BQuestions(dishes,order,randomInt){
    let generatedQuestions = [];
    // let random = Math.floor(Math.random() * dishes.length);
    let random = randomInt(0, dishes.length);

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


    let answer = 0;
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    // question 1

    // Elena ordered the same [entree/drink/dessert] as you. What is the total cost of the two [entrees/drinks/desserts]?

    // choose a random dish
    let randomDishName = dishes[random];
    let randomDishNameEnglish = translations[randomDishName].en
    let randomDishNameSpanish = translations[randomDishName].es

    let pluralRandomDishNameEnglish = plurals[randomDishName].en
    let pluralRandomDishNameSpanish = plurals[randomDishName].es

    // get the price of said dish
    let priceOfDish = order[randomDishName].price;

    // answer
    answer = parseInt(priceOfDish) * 2;

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Elena ordered the same ${randomDishNameEnglish} as you. What is the total cost of the two ${pluralRandomDishNameEnglish}?`,
            es:`Elena ordenó el mismo ${randomDishNameSpanish} que tú. ¿Cuál es el costo total de los dos ${pluralRandomDishNameSpanish}?`,
        },
        answer,
        [{
            en:  randomDishNameEnglish+ " + " + randomDishNameEnglish+ " = ???  Or find the answer with: " + randomDishNameEnglish+ " x  2 = ???",
            es:  randomDishNameSpanish+ " + " + randomDishNameSpanish + " = ???  O encuenta la respuesta con " + randomDishNameSpanish+ " x  2 = ???",
        },{
            en: randomDishNameEnglish+ " + " + randomDishNameEnglish+ " = " + answer,
            es:  randomDishNameSpanish+ " + " + randomDishNameSpanish + " = " + answer,
        }],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 2

    // Elena wants to order some food to bring home to her family. She ordered the same main dish and dessert as you for her father, mother, and brother. How much will this food cost Elena? 

    // get the prices of the main dish and dessert
    let priceOfMainDish = order["mainDish"].price;
    let priceOfDessert = order["dessert"].price;

    // answer
    answer = ((parseInt(priceOfMainDish) * 3 ) + ( parseInt(priceOfDessert) * 3));

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Elena wants to order some food to bring home to her family. She ordered the same main dish and dessert as you for her father, mother, and brother. How much will this food cost Elena?`,
            es:`Elena quiere ordenar comida para llevar a su familia. Ella ordenó el mismo plato principal y postre que tú para su padre, madre y hermano. ¿Cuánto costará esta comida a Elena?`,
        },
        answer,
        [{
            en:  "Step 1. Sum of main dish = " + priceOfMainDish + "+" + priceOfMainDish +  "+" + priceOfMainDish+"\n"+"Step 2. Sum of desserts= " + priceOfDessert + "+" + priceOfDessert +  "+" + priceOfDessert+"\n"+"Step 3. Total Cost = " + priceOfMainDish*3 + "+" + priceOfDessert*3+"\n"+priceOfMainDish*3 + "+" + priceOfDessert*3 + " = " + (priceOfMainDish*3 + priceOfDessert*3),
            es: "Paso 1. Suma de los platos fuertes = " + priceOfMainDish + "+" + priceOfMainDish +  "+" + priceOfMainDish+"\n"+"Paso 2. Suma de los postres= " + priceOfDessert + "+" + priceOfDessert +  "+" + priceOfDessert +"\n"+"Paso 3. Costo total= " + priceOfMainDish*3 + "+" + priceOfDessert*3 ,
        },{
            en:  priceOfMainDish*3 + "+" + priceOfDessert*3 + " = " + answer ,
            es:  priceOfMainDish*3 + "+" + priceOfDessert*3 + " = " + answer,
        }],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        
    return generatedQuestions;

}


function generateLevel2BQuestions(dishes,order,randomInt){
    let generatedQuestions = [];

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // question 1

    // The restaurant receives two thousand three hundred and fifty pounds (2,350 lbs.) of rice and beans per month to supply the kitchen. Next month the restaurant will increase its rice and beans supply by 10 times. What is next month’s supply?

    // answer
    let answer = 23500;

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`The restaurant receives two thousand three hundred and fifty pounds (2,350 lbs.) of rice and beans per month to supply the kitchen. Next month the restaurant will increase its rice and beans supply by 10 times. What is next month’s supply?`,
            es:`El restaurante recibe dos mil trescientas cincuenta libras (2,350 lbs.) de arroz y frijoles por mes para abastecer la cocina. El próximo mes, el restaurante aumentará su suministro de arroz y frijoles en 10 veces. ¿Cuál es el suministro del próximo mes?`,
        },
        answer,
        [{
            en:  "Next Month Supply = 2350 " + " x 10  ", 
            es:  "Suministro del siguiente mes = 2350 " + " x 10  "
        },{
            en:  "Next Month Supply = " + answer,
            es:  "Suministro del siguiente mes = " + answer,
        }],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 2

    // If the restaurant orders one thousand two hundred and fifteen kilograms of tomatoes and one thousand fifteen kilograms of flour, which quantity is larger? Please type the correct quantity number in the answer box.

    // answer
    answer = 1215;

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`If the restaurant orders one thousand two hundred and fifteen kilograms of tomatoes and one thousand fifteen kilograms of flour, which quantity is larger? Please type the correct quantity number in the answer box.`,
            es:`Si el restaurante ordena mil doscientos quince kilogramos de tomates y mil quince kilogramos de harina, ¿cuál es la cantidad más grande? Escriba el número de cantidad correcto en el cuadro de respuesta.`,
        },
        answer,
        [{
            en:  "1,215 kg of tomatoes and 1,015 kg of flour" , 
            es:  "1,215 kg de tomates y 1,015 kg de harina",
        },{
            en:  answer + "",
            es:  answer + "",
        }],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 3

    // The restaurant owner placed a new order of [range: x = 1000 – 5000] pounds of oranges and [range: y = 2000 – 6000] pounds of potatoes. How many total pounds of oranges and potatoes are in this order? 

    // generate random number between 1000 and 5000
    // let x = Math.floor(Math.random() * (5000 - 1000 + 1) + 1000);
    let x = randomInt(1000,5001)

    // generate random number between 2000 and 6000
    // let y = Math.floor(Math.random() * (6000 - 2000 + 1) + 2000);
    let y = randomInt(2000,6001)

    // answer
    answer = x + y;

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`The restaurant owner placed a new order of ${x} pounds of oranges and ${y} pounds of potatoes. How many total pounds of oranges and potatoes are in this order?`,
            es:`El propietario del restaurante realizó un nuevo pedido de ${x} libras de naranjas y ${y} libras de papas. ¿Cuántas libras totales de naranjas y papas hay en este pedido?`,
        },
        answer,
        [{
            en:  "Total pounds = " + "ponds of oranges "  + " + " + "pounds of potatoes" , 
            es:  "Libras totales = " + "libras de naranjas"  + " + " + "libras de papas" ,
        },{
            en:  answer+"",
            es:  answer+"",
        }],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 4

    // The chef noticed that he had [range: x = 200 – 500] pounds of chicken left over at the end of the week. If the initial chicken supply was [range: y = 1500 – 5000] pounds, how many pounds of chicken must the chef order to not have any left-over chicken next week? 

    // generate random number between 200 and 500
    // x = Math.floor(Math.random() * (500 - 200 + 1) + 200);
    x = randomInt(200,501)

    // generate random number between 1500 and 5000
    // y = Math.floor(Math.random() * (5000 - 1500 + 1) + 1500);
    y = randomInt(1500,5001)

    // answer
    answer = y - x;

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`The chef had ${x} pounds of chicken left over at the end of the week.  If they bought ${y} pounds, how many pounds of chicken did the chef use?`,
            es:`El chef tenía ${x} libras de pollo al final de la semana. Si compraron ${y} libras, ¿cuántas libras de pollo uso el chef?`,
        },
        answer,
        [{
            en:  "New supply = " + "initial supply "  + " - " + "left over chicken" , 
            es:  "Suministro nuevo = " + "suministro inicial"  + " - " + "sobras de pollo" ,
        },{
            en:  answer+"",
            es:  answer+"",
        }],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 5

    // At the end of the month, the restaurant owner calculates the revenue for that respective month. This month the restaurant food sales were equal to [range: x = 15,000 – 25,000] dollars, the desert sales were [range: y = 7,000 – 13,000] dollars and the drink sales were [range: z = 4,000 – 10,000] dollars. What is the total revenue for the restaurant this month?

    // generate random number between 15000 and 25000
    // x = Math.floor(Math.random() * (25000 - 15000 + 1) + 15000);
    x = randomInt(15000,25001)

    // generate random number between 7000 and 13000
    // y = Math.floor(Math.random() * (13000 - 7000 + 1) + 7000);
    y = randomInt(7000,13001)

    // generate random number between 4000 and 10000
    // let z = Math.floor(Math.random() * (10000 - 4000 + 1) + 4000);
    let z = randomInt(4000,10001)

    // answer
    answer = x + y + z;

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`At the end of the month, the restaurant owner calculates the food sales. This month the restaurant food sales were equal to ${x} dollars, the desert sales were ${y} dollars and the drink sales were ${z} dollars.  What is the total food sales for the restaurant this month?`,
            es:`Al final del mes, el propietario del restaurante calcula las ventas de alimentos. Este mes, las ventas de alimentos del restaurante fueron iguales a ${x} dólares, las ventas de postres fueron ${y} dólares y las ventas de bebidas fueron ${z} dólares. ¿Cuáles son las ventas totales de alimentos para el restaurante este mes?`,
        },
        answer,
        [{
            en:  "Total revenue = " + "(food sales) "  + " + " + " (drink sales)" + " + " + " (dessert sales)" , 
            es:  "Ingresos totales = " + "(venta de comida) "  + " + " + " (venta de bebidas)" + " + " + " (ventas de postre)" , 
        },{
            en:  "Total revenue = " +answer, 
            es:  "Ingresos totales = " +answer , 
        }],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 6

    // Yesterday the restaurant received [range: x = 150 – 300] food orders. If the daily order count remains the same, how many total orders will the restaurant have after [range: y = 3– 9] days?

    // generate random number between 150 and 300
    // x = Math.floor(Math.random() * (300 - 150 + 1) + 150);
    x = randomInt(150,301)

    // generate random number between 3 and 9
    // y = Math.floor(Math.random() * (9 - 3 + 1) + 3);
    y = randomInt(3,10)

    // answer
    answer = x * y;

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Yesterday the restaurant received ${x} food orders. If the daily order count stays the same, how many total orders will the restaurant have after ${y} days?`,
            es:`Ayer el restaurante recibió ${x} pedidos de comida. Si el recuento diario de pedidos permanece igual, ¿cuántos pedidos totales tendrá el restaurante después de ${y} días?`,
        },
        answer,
        [{
            en:  "Total orders "  + "= " + " (initial orders)" + " x " + " (day count)" , 
            es:  "Ordenes totales = " + "(venta de comida) "  + " x " + " (cantidad de días)" , 
        },{
            en:   "Total orders  = " +answer , 
            es:  "Ordenes totales = " +answer, 
        }],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    // question 7

    // The chef typically prepares [range: x = 30 – 99] entrée dishes per day. How many entrée dishes will the chef prepare after [range: y = 10 – 31] days?

    // generate random number between 30 and 99
    // x = Math.floor(Math.random() * (99 - 30 + 1) + 30);
    x = randomInt(30,100)

    // generate random number between 10 and 31
    // y = Math.floor(Math.random() * (31 - 10 + 1) + 10);
    y = randomInt(10,32)

    // answer
    answer = x * y;

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`The chef prepares ${x} main dishes per day. How many main dishes will the chef prepare after ${y} days?`,
            es:`El chef suele preparar ${x} platos principales por día. ¿Cuántos platos principales preparará el chef después de ${y} días?`,
        },
        answer,
        [{
            en:  "Total dishes "  + "= " + " (daily dishes)" + " x " + " (day count)" , 
            es:  "Platos totales = " + "(platos diarios) "  + " x " + " (cantidad de días)" , 
        },{
            en:   "Total dishes  = " +answer, 
            es:  "Platos totales = " +answer, 
        },],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 8
    
    // Elena noticed that the chef is preparing [range: x = 2-9] servings of rice. If the chef has 900 grams of rice in total, how many grams of rice will each serving have? Assume the chef splits the rice equally for each serving.

    // generate random number between 2 and 9

    // x = Math.floor(Math.random() * (9 - 2 + 1) + 2);
    x = randomInt(2,10)

    // answer
    answer = 900 / x;

    // round answer to 2 decimal places
    answer = parseFloat(answer.toFixed(2));


    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`The chef is preparing ${x} servings of rice. If the chef has 900 grams of rice in total, how many grams of rice will each serving have? Assume the chef splits the rice equally for each serving.`,
            es:`El chef está preparando ${x} porciones de arroz. Si el chef tiene un total de 900 gramos de arroz, ¿cuántos gramos de arroz tendrá cada porción? Suponga que el chef divide el arroz por igual para cada porción.`,
        },
        answer,
        [{
            en:  "Grams per serving "  + "= " + " (total grams of rice)" + " ÷ " + " (number of serving)" , 
            es:  "Gramos por porción = " + "(gramos de arroz totales)) "  + " ÷ " + " (cantidad de porciones)" , 
        },{
            en:   "Grams per serving  = " +answer,
            es:  "Gramos por porción = " +answer,
        }],
        "decimal",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    

    return generatedQuestions;

}

function generateLevel3BQuestions(dishes,order,randomInt) {

    let generatedQuestions = [];
    let answer;

    // question 1

    // If 20/100 is the amount you pay and is represented as .20 in decimals, how would you represent [random value between 10-99]/100 of your bill as a decimal?

    // generate random number between 10 and 99
    // let x = Math.floor(Math.random() * (99 - 10 + 1) + 10);
    let x = randomInt(10,100)

    // answer
    answer = x / 100;

    // tp 2 decimal places
    answer = parseFloat(answer.toFixed(2));

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`If 20/100 is the amount you pay and is represented as 0.20 in decimals, how would you represent ${x}/100 as a decimal?`,
            es:`Si 20/100 es la cantidad que paga y se representa como 0.20 en decimales, ¿cómo representaría ${x}/100 como un decimal?`,
        },
        answer,
        [{
            en:answer+"" ,
            es:answer+"" ,
        }],
        "decimal",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 2

    // With tax, your final total comes out to [any number between 15-30 with 2 decimal places]. Elena’s final total is [any number between 15-30 with 2 decimal places]. Which number is greater?

    // generate random number between 0 and 20
    // x = Math.floor(Math.random() * (20 - 0 + 1) + 0);
    x = randomInt(15,31)

    // randomize number between 100 and 999
    // let y = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    let y = randomInt(10,99)

    // answer
    let number1 = x + (y / 100);

    // round answer to 3 decimal places
    number1 = number1.toFixed(2);

    // let x2 = Math.floor(Math.random() * (20 - 0 + 1) + 0);
    let x2 = randomInt(15,31)

    // randomize number between 100 and 999
    // let y2 = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    let y2 = randomInt(10,99)

    // number2
    let number2 = x2 + (y2 / 100);

    // round answer to 3 decimal places
    number2 = number2.toFixed(2);

    let numberStr = number1.toString();
    let numberStr2 = number2.toString();

    number1 = parseFloat(number1);
    number2 = parseFloat(number2);

    answer = number1 > number2 ? "greater_than": number1 < number2 ? "less_than" : "equal_to";
    let symbol = number1 > number2 ? ">" : number1 < number2 ? "<" : "=";

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`With tax, your final total comes out to ${numberStr}. Elena’s final total is ${numberStr2}. Which number is greater? ${number1} __ ${number2} `,
            es:`Con impuestos, su total final es ${numberStr}. El total final de Elena es ${numberStr2}. ¿Qué número es mayor? ${number1} __ ${number2} `,
        },
        answer,
        [{
            en: "the first number is " + symbol + " the second number",
            es: "el primer número es " + symbol + " el segundo número",
        }],
        "inequality",
    ))
    

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 4

    // If your family wants to order your same main dish [any number] times, how much is your total for the main dishes?

    // generate random number between 2 and 10
    // x = Math.floor(Math.random() * (10 - 2 + 1) + 2);
    x = randomInt(2,11)

    // answer
    let priceOfDish = order["mainDish"].price

    // answer
    answer = priceOfDish * x;

    // round answer to 2 decimal places

    answer = Math.floor(answer)


    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`If your family wants to order your same main dish ${x} times, how much is your total for the main dishes?`,
            es:`Si su familia quiere pedir su mismo plato principal ${x} veces, ¿cuál es su total para los platos principales?`,
        },
        answer,
        [
            {
                en: "Total = (times the dish was orded) x (cost of dish)",
                es:"Total = (veces que se ordeno el plato) x (costo del plato)",
            },{
                en: answer+"",
                es: answer+"",
            }
        ],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 5

    // If you ordered [any number] drinks, how much would all of your drinks cost? [any number]X(drink)

    // generate random number between 2 and 10
    // x = Math.floor(Math.random() * (10 - 2 + 1) + 2);
    x = randomInt(2,11)

    // answer
    priceOfDish = order["drink"].price

    // answer
    answer = priceOfDish * x;

    // round answer to 2 decimal places

    answer = Math.floor(answer)


    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`If you ordered ${x} drinks, how much would all of your drinks cost?`,
            es:`Si pidió ${x} bebidas, ¿cuánto costarían todas sus bebidas?`,
        },
        answer,
        [
            {
               
                en: "Total = (times the drink was orded) x (cost of drink)",
                es:"Total = (veces que se ordeno la bebida) x (costo de la bebida)",
            },{
                en: answer+"",
                es: answer+"",
            }
        ],
        "wholeNumber",

    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 6

    // What is your total if you buy x [entree/drink/dessert] and y [entree/drink/dessert]? 

    // let dish1 = dishes[Math.floor(Math.random() * dishes.length)];
    let dish1 = dishes[randomInt(0,dishes.length)];
    let copyDishes = dishes.filter(dish => dish !== dish1)
    let dish2 = copyDishes[randomInt(0,copyDishes.length)];
    // let dish2 = dishes[Math.floor(Math.random() * dishes.length)];

    


    let nameOfDish1En = order[dish1].en
    let nameOfDish1Es = order[dish1].es

    let nameOfDish2En = order[dish2].en
    let nameOfDish2Es = order[dish2].es

    // generate random number between 2 and 10
    // x = Math.floor(Math.random() * (10 - 2 + 1) + 2);
    x = randomInt(2,11)

    // generate random number between 2 and 10
    // y = Math.floor(Math.random() * (10 - 2 + 1) + 2);
    y = randomInt(2,11)

    // answer


    let priceOfDish1 = order[dish1].price
    let priceOfDish2 = order[dish2].price

    // answer
    answer = (priceOfDish1 * x) + (priceOfDish2 * y);


    // generate question
    generatedQuestions.push(createGameQuestion(
        {
            en:`What is your total if you buy ${x} ${nameOfDish1En} and ${y} ${nameOfDish2En}?`,
            es:`¿Cuál es su total si compra ${x} ${nameOfDish1Es} y ${y} ${nameOfDish2Es}?`,
        },
        answer,
        [{
            en: "Total = (Cost of " +nameOfDish1En+" x " + x + " ) + (Cost of " + nameOfDish2En + " x " + y + ") ",
            es: "Total = (Costo de " +nameOfDish1Es+" x " + x + " ) + (Costo de " + nameOfDish2Es + " x " + y + ") ",
        },{
            en: answer+"",
            es: answer+"",
        }],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            
    // question 7

    // What is your total if you buy x [entree], y[drink], and z[dessert]?


    // generate random number between 2 and 10
    // x = Math.floor(Math.random() * (10 - 2 + 1) + 2);
    x = randomInt(2,11)

    // generate random number between 2 and 10
    // y = Math.floor(Math.random() * (10 - 2 + 1) + 2);
    y = randomInt(2,11)

    // generate random number between 2 and 10
    // let z = Math.floor(Math.random() * (10 - 2 + 1) + 2);
    let z = randomInt(2,11)

    // answer
    priceOfDish1 = order["mainDish"].price
    priceOfDish2 = order["drink"].price
    let priceOfDish3 = order["dessert"].price

    // answer
    answer = (priceOfDish1 * x) + (priceOfDish2 * y) + (priceOfDish3 * z);

    // generate question

    generatedQuestions.push(createGameQuestion(
        {
            en:`What is your total if you buy ${x} ${order["mainDish"].en}, ${y} ${order["drink"].en}, and ${z} ${order["dessert"].en}?`,
            es:`¿Cuál es su total si compra ${x} ${order["mainDish"].es}, ${y} ${order["drink"].es}, y ${z} ${order["dessert"].es}?`,
        },
        answer,
        [{
            en: "Total = (Cost of " +order["mainDish"].en+" x " + x + " ) + (Cost of " + order["drink"].en + " x " + y + ") + (Cost of " + order["dessert"].en + " x " + z + ") ",
            es: "Total = (Costo de " +order["mainDish"].es+" x " + x + " ) + (Costo de " + order["drink"].es + " x " + y + ") + (Costo de " + order["dessert"].es + " x " + z + ") ",
        },
        {
            en: answer+"",
            es: answer+"",
        }
        ],
        "wholeNumber",
    ))







    return generatedQuestions;
}




// export default function generateSingleMultiplyDishQuestions(order,randomGenerator, level) {
//     const numbOfQuestionsNeeded = 3
//     let questions = []

//     for(let i = 0; i < numbOfQuestionsNeeded; i++) {
//         let question = generateSingleMultiplyQuestion(order,level,randomGenerator)
//         questions.push(question)
//     }

//     return questions
// }





export default function generateNumberAndOperationsInBaseTenQuestion(order,level,randomGenerator) {

    let questions = [];
    let dishes = ["mainDish","drink","dessert"];

    const { randomInt } = randomGenerator;

    if(level === '1') {

        let generatedQuestions = generateLevel1BQuestions(dishes,order,randomInt);


        questions = questions.concat(generatedQuestions);
    }

    if(level === '2') {

        let generatedQuestions = generateLevel2BQuestions(dishes,order,randomInt);

        questions = questions.concat(generatedQuestions);
    }

    if(level === '3') {

        let generatedQuestions = generateLevel3BQuestions(dishes,order,randomInt);

        questions = questions.concat(generatedQuestions);

    }


    return questions;



    // OLD CODE

    // ******************************************************

    // const factorMax = Math.ceil(((level+2)**2) + 3)
    // const factorMin = Math.ceil(((level+2)**2)/5 + 3)
    // const factor = randomGenerator.randomInt(factorMin,factorMax)
    // const dishType = randomGenerator.randomDishType()
    // const dish = order[dishType]
    // const dishTypeEs =  getText(dishType,'es').toLowerCase()
    // let question

    // if(level === 1) {
    //     if(factor == 2) {
    //         question = createGameQuestion(
    //             {
    //                 en:`Elena ordered the same ${dishType} as you. What is the total cost of the two ${dishType}s?`,
    //                 es:`Elena pidió lo mismo ${dishTypeEs} que tú. ¿Cuál es el costo total de los dos ${dishTypeEs}?`,
    //             },
    //             dish.price * 2,
    //             [{
    //                 en: "Total Cost = (" + dish.en + ") + (" + dish.en + ")  OR Total Cost = (" + dish.en + ") * 2",
    //                 es: "Costo Total = (" + dish.es + ") + (" + dish.es + ")  OR Costo Total = (" + dish.es + ") * 2",
    //             }],
    //             "wholeNumber"
    //         )
    //     } else {
    //         question = createGameQuestion(
    //             {
    //                 en:`Elena wants to order some food to bring home to her family. She ordered the same entrée and dessert as you for her father, mother, and brother. How much will this food cost Elena?`,
    //                 es:`Elena quiere pedir algo de comida para llevar a su familia. Pidió el mismo plato principal y postre que tú para su padre, madre y hermano. ¿Cuánto costará esta comida a Elena?`,
    //             },
    //             dish.price * factor,
    //             [{
    //                 en: `Step 1. Sum of Entrees = Entrée + Entrée + Entrée\nStep 2. Sum of Desserts = Dessert + Dessert + Dessert\nStep 3. Total Cost = Sum of Entrees + Sum of Desserts`,
    //                 es: `Paso 1. Suma de platos principales = Plato principal + Plato principal + Plato principal\nPaso 2. Suma de postres = Postre + Postre + Postre\nPaso 3. Costo total = Suma de platos principales + Suma de postres`,
    //             }],
    //             "wholeNumber"
    //         ) 
    //     }
    // } else if (level === 2 || level === 3) {
    //     // Custom level 2 and level 3 questions need to be implemented here
    //     // Placeholder for custom question
    //     question = createGameQuestion(
    //         {
    //             en: "Custom question in English?",
    //             es: "¿Pregunta personalizada en español?",
    //         },
    //          dish.price * factor,
    //         [{
    //             en: "Custom calculation in English?",
    //             es: "¿Cálculo personalizado en español?",
    //         }],
    //         "wholeNumber"
    //     )
    // }

    // return question
}
