import createGameQuestion, { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion"
import { GenerateFriendContainerQuestion } from "@utils/game/recipes/questionGeneration/containerQuestionGenerators"

const recipesQuizzedOn = 2
const triples = [6,9,12,15,18,21,24,27,30]

const generateLevel2Questions = (recipes,questionType,randomGenerator) => {
    let questions = []
    Object.keys(recipes).forEach((recipeKey, index) => {
        switch(recipeKey) {
            case 'peruvianFriedRice':
                peruvianFriedRiceQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'strawberryMilkShake':
                strawberryMilkShakeQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'pineappleCake':
                pineappleCakeQuestions(questions,recipes[recipeKey],randomGenerator)
                break
            case 'carrotJuice':
                carrotJuiceQuestions(questions,recipes[recipeKey],randomGenerator)
                break
            case 'fruitSalads':
                fruitSaladQuestions(questions,recipes[recipeKey],randomGenerator)
                break
            case 'chocolateBananaCake':
                chocolateBananaCakeQuestions(questions,recipes[recipeKey],randomGenerator)
                break
            default:
                questions.push(ErrorQuestion)
        }
    })
     return questions
}


const peruvianFriedRiceQuestions = (questions, recipe, randomGenerator) => {
    // 3 brand compare question -WONT DO
    //Unit price question
    //Cheapest Brand different size Question
    //Unit price sale question
    //Unit price question

    questions.push(createGameQuestion(
        {
            en: `You are shopping for a special dinner. Your family has decided to make Peruvian fried rice (PFR) and rice pudding (RP) for 24 people. How many total ounces of rice will you need to purchase at the grocery store to make both recipes for everyone? 1 cup of rice is equal to 8 oz.`,
            es: `Estás comprando para una cena especial. Tu familia ha decidido hacer arroz frito peruano (PFR) y arroz con leche (RP) para 24 personas. ¿Cuántas onzas de arroz en total necesitarás comprar en el supermercado para preparar ambas recetas para todos? 1 taza de arroz equivale a 8 oz.`
        },
        152,
        [
            {
                en: 'Cups rice for PFR = cups per recipe * # recipes for 24 people \n Cups rice for RP = cups per recipe * # recipes for 24 people \n Total cups of rice = Cups rice for PFR + Cups rice for RP \n Total ounces = Total cups of rice * ounces per 1 cup of rice \n',
                es: 'Tazas de arroz para PFR = tazas por receta * # recetas para 24 personas \n Tazas de arroz para RP = tazas por receta * # recetas para 24 personas \n Total de tazas de arroz = Tazas de arroz para PFR + Tazas de arroz para RP \n Total de onzas = Total de tazas de arroz * onzas por 1 taza de arroz \n'
            },
            {
                en: 'Solution: Cups rice for PFR = 2 * 8 = 16 \n Cups rice for RP = 1 * 3 = 3 \n Total cups of rice = 16 + 3 = 19 \n Total ounces = 19 * 8 = 152 ounces \n ',
                es: 'Solución: Tazas de arroz para PFR = 2 * 8 = 16 \n Tazas de arroz por RP = 1 * 3 = 3 \n Total de tazas de arroz = 16 + 3 = 19 \n Total de onzas = 19 * 8 = 152 onzas \n'
            },
        ],
        'wholeNumber',
        null,
        null
    ));

    const q2NumList1 = [40, 60, 80];
    const q2num1 = q2NumList1[randomGenerator.randomInt(0, 2)];

    const q2NumList2 = [58, 60, 66];
    const q2num2 = q2NumList2[randomGenerator.randomInt(0, 2)];

    const q2NumList3 = [64, 68, 72];
    const q2num3 = q2NumList3[randomGenerator.randomInt(0, 2)];

    const q2ValA = q2num1 * (1 / 4);
    const q2ValB = q2num2 * (1 / 2);
    const q2ValC = q2num3 * (3 / 4);

    const q2Answer = q2ValC;

    questions.push(createGameQuestion(
        {
            en: `You found 3 rice brands at the store. Each brand has a different package size. How many total cups of rice does the largest package size have? \n Happy Farm Rice: ${q2num1} servings of ¼ cups \n Fancy Farm Rice: ${q2num2} servings of ½ cups \n Special Farm Rice: ${q2num3} servings of ¾ cups \n`,
            es: `Encontraste 3 marcas de arroz en la tienda. Cada marca tiene un tamaño de paquete diferente. ¿Cuántas tazas de arroz en total tiene el paquete más grande?\n Happy Farm Rice: ${q2num1} porciones de ¼ de taza \n Fancy Farm Rice: ${q2num2} porciones de ½ tazas \n Special Farm Rice: ${q2num3} porciones de ¾ tazas \n`
        },
        q2Answer,
        [
            {
                en: 'Total Cups Rice = # servings * cups per 1 serving \n Calculate for all brands and compare each amount to find the largest size',
                es: 'Total de tazas de arroz = # porciones * tazas por 1 porción \n Calcula para todas las marcas y compara cada cantidad para encontrar la cantidad más grande.'
            },
            {
                en: `Total Cups Happy Farm = ${q2num1} * 1/4 = Value A \n Total Cups Fancy Farm = ${q2num2} * 1/2 = Value B \n Total Cups Special Farm = ${q2num3} * 3/4 = Value C \n `,
                es: `Copas totales de Happy Farm = ${q2num1} * 1/4 = Valor A \n Copas totales de Fancy Farm = ${q2num2} * 1/2 = Valor B \n Copas totales de Special Farm Rice = ${q2num3} * 3/4 = Valor C \n `
            },
        ],
        'wholeNumber',
        null,
        null
    ));

    const q3NumList1 = [3.29, 4.39, 4.59, 4.95];
    const q3num1 = q3NumList1[randomGenerator.randomInt(0, q3NumList1.length - 1)];

    const q3num2 = randomGenerator.randomInt(10, 20);
    const q3Answer = q3num1 * q3num2;

    questions.push(createGameQuestion(
        {
            en: `Happy Farm sells rice bags for ${q3num1} dollars each. How much money will you spend if you need to buy ${q3num2} bags?`,
            es: `Happy Farm vende bolsas de arroz a ${q3num1} dólares cada una. ¿Cuánto dinero gastarás si necesitas comprar ${q3num2} bolsas?`
        },
        q3Answer,
        [
            {
                en: `Total Cups Rice = ${q3num2} * cups per 1 serving \n Calculate for all brands and compare each amount to find the largest size`,
                es: `Costo total = precio por bolsa * bolsas necesarias`
            },
            {
                en: `Total cost = ${q3num1} * ${q3num2} = Answer`,
                es: `Costo total = ${q3num1} * ${q3num2} = Respuesta`
            },
        ],
        'wholeNumber',
        null,
        null
    ));

    questions.push(createGameQuestion(
        {
            en: `The 3 rice brands at the grocery store sell their rice in bags of different sizes. The prices and weights of each brand are listed below. What is the price per unit of the cheapest rice brand? Round your answer to the nearest hundredth (cent).`,
            es: `Las 3 marcas de arroz en el supermercado venden su arroz en bolsas de diferentes tamaños. Los precios y pesos de cada marca se enumeran a continuación. ¿Cuál es el precio por unidad de la marca de arroz más barata? Redondea tu respuesta a la centésima (centavo) más cercana.`
        },
        0.25,
        [
            {
                en: 'Unit price = price for 1 bag / measurement unit',
                es: 'Precio unitario = precio por 1 bolsa / unidad de medida'
            },
            {
                en: 'Happy Farm Unit Price = 3.49 / 12 = $0.29 / oz.\nSpecial Farm Unit Price = 4.29 / 16 = $0.27 / oz.\nFancy Farm Unit Price = 4.99 / 20 = $0.25 / oz.',
                es: 'Precio unitario de Happy Farm = 3.49 / 12 = $0.29 / oz. \nPrecio unitario de Special Farm  = 4.29 / 16 = $0.27 / oz. \nPrecio unitario de Fancy Farm = 4.99 / 20 = $0.25 / oz.'
            },
        ],
        'decimal',
        null,
        null
    ));

    const q5NumList = [3.69, 4.29, 5.49];
    const q5num = q5NumList[randomGenerator.randomInt(0, q5NumList.length - 1)];
    const q5Answer = (q5num * 2) - q5num;

    questions.push(createGameQuestion(
        {
            en: `Today the grocery store has a buy-one-get-one-free sale for [Happy Farm Rice, Special Farm Rice Rice, Fancy Farm Rice]. How much money do you save with this sale?\nHappy Farm Rice: $${q5num} per bag\nSpecial Farm Rice: $4.29 per bag\nFancy Farm Rice: $5.49 per bag`,
            es: `Hoy el supermercado tiene una venta de compra uno y llévate uno gratis para [Happy Farm Rice, Special Farm Rice Rice, Fancy Farm Rice]. ¿Cuánto dinero te ahorras con esta venta?\nHappy Farm Rice: $${q5num} por una bolsa\nSpecial Farm Rice: $4.29 por una bolsa\nFancy Farm Rice: $5.49 por una bolsa`
        },
        q5Answer,
        [
            {
                en: 'Buy-one-get-one-free sales mean that you can buy 2 items for the price of 1.\nMoney saved = price for 2 items - price for 1 item',
                es: 'Las ventas de compra-uno-llévate-uno-gratis significan que puedes comprar 2 artículos por el precio de 1. \nDinero ahorrado = precio de 2 artículos - precio de 1 artículo'
            },
            {
                en: `Happy Farm money saved = (${q5num} * 2) - ${q5num} = ${q5Answer}`,
                es: `Dinero ahorrado en Happy Farm = (${q5num} * 2) - ${q5num} = ${q5Answer}`
            },
        ],
        'decimal',
        null,
        null
    ));

    const q6NumList = [8, 3, 5];
    const q6PriceList = [12, 9, 11];
    const q6Index = randomGenerator.randomInt(0, 2);
    const q6num = q6NumList[q6Index];
    const q6Price = q6PriceList[q6Index];
    const q6Answer = q6Price / q6num;

    questions.push(createGameQuestion(
        {
            en: `What is the unit price per chicken breast for [Chicken Farm Brand, Happy Farm Brand, Lucky Farm Brand]?\nChicken Farm Brand: ${q6num} chicken breasts for $${q6Price}\nHappy Farm Brand: 3 chicken breasts for $9\nLucky Farm Brand: 5 chicken breast for $11`,
            es: `¿Cuál es el precio unitario por pechuga de pollo para [Marca Chicken Farm, Marca Happy Farm, Marca Lucky Farm]?\nMarca Chicken Farm: ${q6num} pechugas de pollo por $${q6Price}\nMarca Happy Farm: 3 pechugas de pollo por $9\nMarca Lucky Farm: 5 pechugas de pollo por $11`
        },
        q6Answer,
        [
            {
                en: 'Unit price = total price / measurement unit',
                es: 'Precio unitario = precio total / unidad de medida'
            },
            {
                en: `Chicken Farm Unit Price = ${q6Price} / ${q6num} = $${q6Answer} per 1 chicken breast`,
                es: `Precio unitario de Chicken Farm = ${q6Price} / ${q6num} = $${q6Answer} por 1 pechuga de pollo`
            },
        ],
        'decimal',
        null,
        null
    ));

    const q7NumList = [[6, 8], [2, 5], [4, 7]];
    const q7PriceList = [[12, 16], [7, 9], [11, 14]];
    const q7Index = randomGenerator?.randomInt(0, 2) || 1;
    const q7NumRange = q7NumList[q7Index];
    const q7PriceRange = q7PriceList[q7Index];
    const q7Num = randomGenerator?.randomInt(q7NumRange[0], q7NumRange[1]) ?? 6 ;
    const q7Price = randomGenerator?.randomFloat(q7PriceRange[0], q7PriceRange[1]);
    const q7Answer = q7Price / q7Num;

    questions.push(createGameQuestion(
        {
            en: `What is the price per unit for the cheapest chicken brand?\nChicken Farm Brand: [${q7NumRange[0]}-${q7NumRange[1]}] chicken breasts for $[${q7PriceRange[0]}-${q7PriceRange[1]}]\nHappy Farm Brand: [2-5] chicken breasts for $[7-9]\nLucky Farm Brand: [4-7] chicken breast for $[11-14]`,
            es: `¿Cuál es el precio por unidad de la marca de pollo más barata?\nMarca Chicken Farm: [${q7NumRange[0]}-${q7NumRange[1]}] pechugas de pollo por $[${q7PriceRange[0]}-${q7PriceRange[1]}]\nMarca Happy Farm: [2-5] pechugas de pollo por $[7-9]\nMarca Lucky Farm: [4-7] pechuga de pollo por $[11-14]`
        },
        q7Answer,
        [
            {
                en: 'Unit price = total price / measurement unit',
                es: 'Precio unitario = precio total / unidad de medida'
            },
            {
                en: `Chicken Farm Unit Price = [${q7PriceRange[0]}-${q7PriceRange[1]}] / [${q7NumRange[0]}-${q7NumRange[1]}] = $${q7Answer}`,
                es: `Precio unitario de la granja de pollos = [${q7PriceRange[0]}-${q7PriceRange[1]}] / [${q7NumRange[0]}-${q7NumRange[1]}] = $${q7Answer}`
            },
        ],
        'decimal',
        null,
        null
    ));

    // You finished shopping for your special dinner. The cashier scanned all of your items and gave you the receipt below. How much money did you spend in total?
    const q8Answer = 30;
    questions.push(createGameQuestion(
        {
            en:"You finished shopping for your special dinner. The cashier scanned all of your items and gave you the receipt below. How much money did you spend in total?",
            es:"Terminaste de comprar para tu cena especial. El cajero escaneó todos tus artículos y te dio el recibo a continuación. ¿Cuánto dinero gastaste en total?"
        },
        q8Answer,
        [
            {
                en:"Try again! Hint: Add the price of all the purchased items to find the total cost.",
                es:"¡Inténtalo de nuevo! Pista: Suma el precio de todos los artículos comprados para encontrar el costo total."
            },
            {
                en:"Total Cost = Sum of prices for all items on receipt",
                es:"Costo total = Suma de precios de todos los artículos en el recibo"
            },
            {
                en:"Total Cost = 2.80 + 3.50 + 2.00 + 4.50 + 6.00 + 9.20 + 2.00 = 30.00 dollars",
                es:"Costo total = 2.80 + 3.50 + 2.00 + 4.50 + 6.00 + 9.20 + 2.00 = 30.00 dólares"
            }
        ],
        "money",
        null,
        "level2GroceryStoreq8",
    ));


}


const strawberryMilkShakeQuestions = (questions, recipe, randomGenerator) => {

    const q9NumList = [16, 24, 32, 40, 48, 56];
    const q9TotalServings = q9NumList[randomGenerator.randomInt(0, q9NumList.length - 1)];
    const q9MilkCupsPerServing = 1 / 2;
    const q9TotalMilkCups = q9MilkCupsPerServing * q9TotalServings;
    const q9TotalMilkGallons = Math.ceil(q9TotalMilkCups / 16);

    questions.push(createGameQuestion(
        {
            en: `If you are shopping to make ${q9TotalServings} servings of strawberry milkshake for a special family dinner, how many gallons of milk will you buy? Round your answer up to the nearest whole number. Hint: 1 gallon of milk contains 16 cups.`,
            es: `Si estás comprando para hacer ${q9TotalServings} porciones de batido de fresa para una cena familiar especial, ¿cuántos galones de leche comprarás? Redondea tu respuesta al número entero más cercano. Pista: 1 galón de leche contiene 16 tazas.`
        },
        q9TotalMilkGallons,
        [
            {
                en: 'Milk cups for 1 serving = recipe milk cups / recipe servings \n Total milk cups = Milk cups for 1 serving * total servings \n Total milk gallons = total milk cups / cups of milk in 1 gallon',
                es: 'Tazas de leche para 1 porción = tazas de leche de la receta / porciones de la receta \n Total de tazas de leche = Tazas de leche por 1 porción * porciones totales \n Total de galones de leche = total de tazas de leche / tazas de leche en 1 galón'
            },
            {
                en: `Solution: Milk cups for 1 serving = 1 / 2 = ½ \n Total milk cups = 1/2 * ${q9TotalServings} = ${q9TotalMilkCups} \n Total milk gallons = ${q9TotalMilkCups} / 16 = ${q9TotalMilkGallons} (rounded)`,
                es: `Solución: Tazas de leche para 1 porción = 1 / 2 = ½ \n Total de tazas de leche = 1/2 * ${q9TotalServings} = ${q9TotalMilkCups} \n Total de galones de leche = ${q9TotalMilkCups} / 16 = ${q9TotalMilkGallons} (redondeado)`
            },
        ],
        'wholeNumber',
        null,
        null
    ));

    const q10NumList1 = [3, 4, 5, 6];
    const q10PriceList1 = [2, 3, 4];
    const q10NumRange2 = [10, 14];
    const q10PriceRange2 = [6, 8];

    const q10Index1 = randomGenerator.randomInt(0, q10NumList1.length - 1);
    const q10Index2 = randomGenerator.randomInt(0, q10NumRange2[1] - q10NumRange2[0]);

    const q10Num1 = q10NumList1[q10Index1];
    const q10Price1 = q10PriceList1[q10Index1];
    const q10Num2 = q10NumRange2[0] + q10Index2;
    const q10Price2 = q10PriceRange2[q10Index2];

    const q10Answer1 = q10Price1 / q10Num1;
    const q10Answer2 = q10Price2 / q10Num2;

    questions.push(createGameQuestion(
        {
            en: `There are two brands of frozen strawberries. Each brand sells packages of different prices and sizes as shown below. What is the price per unit for the [Happy Farm, Sweet Farm] brand? \n Happy Farm organic frozen strawberries = [${q10NumList1.join('-')}] cups of strawberries for $[${q10PriceList1.join('-')}] \n Sweet Farm frozen strawberries  = [${q10NumRange2.join('-')}] cups of strawberries for $[${q10PriceRange2.join('-')}]`,
            es: `Hay dos marcas de fresas congeladas. Cada marca vende paquetes de diferentes precios y tamaños como se muestra a continuación. ¿Cuál es el precio por unidad de la marca [Happy Farm, Sweet Farm]? \n Fresas orgánicas congeladas Happy Farm = [${q10NumList1.join('-')}] tazas de fresas por $[${q10PriceList1.join('-')}] \n Fresas congeladas de Sweet Farm = [${q10NumRange2.join('-')}] tazas de fresas por $[${q10PriceRange2.join('-')}]`
        },
        [q10Answer1, q10Answer2],
        [
            {
                en: 'Unit price = total price / measurement unit',
                es: 'Precio unitario = precio total / unidad de medida'
            },
            {
                en: `Happy Farm Unit Price = [${q10PriceList1.join('-')}] / [${q10NumList1.join('-')}] = ${q10Answer1}\nSweet Farm Unit Price = [${q10PriceRange2.join('-')}] / [${q10NumRange2.join('-')}] = ${q10Answer2}`,
                es: `Precio unitario de Happy Farm = [${q10PriceList1.join('-')}] / [${q10NumList1.join('-')}] = ${q10Answer1} \n O \n Precio unitario de Sweet Farm = [${q10PriceRange2.join('-')}] / [${q10NumRange2.join('-')}] = ${q10Answer2}`
            },
        ],
        'decimal',
        null,
        null
    ));
}


const pineappleCakeQuestions = (questions, recipe, randomGenerator) => {
    const q11NumList = [8, 12, 16, 20, 24, 28, 32];
    const q11num = q11NumList[randomGenerator.randomInt(0, q11NumList.length - 1)];
    const q11TotalCups = q11num * (1 / 4);
    const q11TotalSticks = q11TotalCups / (1 / 2);
    const q11TotalPacks = Math.ceil(q11TotalSticks / 4);
    const q11Answer = q11TotalPacks;

    questions.push(createGameQuestion(
        {
            en: `A package of butter contains 4 sticks of butter. One stick of butter is equal to ½ cup of butter. If you follow this recipe, how many packs of butter do you need to buy to make ${q11num} pineapple cakes?`,
            es: `Un paquete de mantequilla contiene 4 barras de mantequilla. Una barra de mantequilla equivale a ½ taza de mantequilla. Si sigues esta receta, ¿cuántos paquetes de mantequilla necesitas comprar para hacer ${q11num} pasteles de piña? Redondea tu respuesta al número entero más cercano.`
        },
        q11Answer,
        [
            {
                en: 'Total cups = # cakes * cups per 1 cake \n Total sticks = total cups / cups per 1 stick \n Total packs = total sticks / sticks per 1 pack',
                es: 'Tazas totales = # pasteles * tazas por 1 pastel \n Barras totales = tazas totales / tazas por 1 barra \n Paquetes totales = barras totales / barras por 1 paquete'
            },
            {
                en: `Total cups = ${q11num} * 1/4 = ${q11TotalCups} \n Total sticks = ${q11TotalCups} / 1/2 = ${q11TotalSticks} \n Total packs = ${q11TotalSticks} / 4 = ${q11Answer} (rounded)`,
                es: `Tazas totales = ${q11num} * 1/4 = ${q11TotalCups} \n Barras totales = ${q11TotalCups} / 1/2 = ${q11TotalSticks} \n Paquetes totales = ${q11TotalSticks} / 4 = ${q11Answer} (redondeado)`
            },
        ],
        'wholeNumber',
        null,
        null
    ));

    const q12NumList = [24, 48, 72, 96];
    const q12Index = randomGenerator.randomInt(0, q12NumList.length - 1);
    const q12num = q12NumList[q12Index];
    const q12HappyCakePrice = 3; 
    const q12SpecialCakePrice = 4 + (4 / 2); 
    const q12Answer = (q12SpecialCakePrice * q12num) < (q12HappyCakePrice * q12num) ? q12SpecialCakePrice * q12num : q12HappyCakePrice * q12num;

    questions.push(createGameQuestion(
        {
            en: `Today the store has a sale on boxes of cake mix. You want to make ${q12num} servings of the pineapple cake. How much will you need to pay if you buy the cheaper cake mix? \n Happy Cake Mix = $3 per box OR buy one get one free \n Special Cake Mix = $4 per box OR buy one get the second one for half the price`,
            es: `Hoy la tienda tiene una venta de cajas de mezcla para pastel. Quieres hacer ${q12num} porciones de pastel de piña. ¿Cuánto tendrás que pagar si compras la mezcla para pastel más barata?\n Happy Cake Mix = $3 por caja O compre uno y llévese otro gratis \n Special Cake Mix = $4 por caja O compre uno y llévese el segundo por la mitad del precio`
        },
        q12Answer,
        [
            {
                en: 'Total boxes = servings needed / recipe servings',
                es: 'Cajas totales = porciones necesarias / porciones de la receta'
            },
            {
                en: `Total Boxes = ${q12num} / 12 = ${q12num / 12} \n Happy Cake Mix = $1.5 por caja * ${q12num / 12} = ${q12HappyCakePrice * q12num} \n Special Cake Mix = $6 por caja * ${q12num / 12} = ${q12SpecialCakePrice * q12num}`,
                es: `Cajas Totales = ${q12num} / 12 = ${q12num / 12} \n Happy Cake Mix = $1.5 por caja * ${q12num / 12} = ${q12HappyCakePrice * q12num} \n Special Cake Mix = $6 por caja * ${q12num / 12} = ${q12SpecialCakePrice * q12num}`
            },
        ],
        'decimal',
        null,
        null
    ));
}


const carrotJuiceQuestions = (questions, recipe, randomGenerator) => {
    const q1Arr = [3, 4, 6, 12];
    const q1Index = randomGenerator.randomInt(0, q1Arr.length - 1)

    const q1ServingsList = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30];
    const q1ServingsNeeded = q1ServingsList[randomGenerator.randomInt(0, q1ServingsList.length - 1)];

    const q1CarrotsPerServing = recipe / recipe.servings;
    const q1TotalCarrots = q1CarrotsPerServing * q1ServingsNeeded;
    const q1NumBags = Math.ceil(q1TotalCarrots / q1Arr[q1Index]);

    questions.push(createGameQuestion(
        {
            en: `At the grocery store, a bag of carrots has ${q1Arr[q1Index]} carrots. How many bags of carrots do you need to buy to make ${q1ServingsNeeded} servings of carrot juice?`,
            es: `En el supermercado, una bolsa de zanahorias tiene ${q1Arr[q1Index]} zanahorias. ¿Cuántas bolsas de zanahorias necesitas comprar para hacer ${q1ServingsNeeded} porciones de jugo de zanahoria?`
        },
        q1NumBags,
        [
            {
                en: 'Carrots per 1 serving = recipe carrots / recipe servings \n Total carrots = Carrots per 1 serving * servings needed \n Total bags = total carrots / carrots per 1 bag',
                es: 'Zanahorias por 1 porción = zanahorias en la receta / porciones de la receta \n Zanahorias totales = zanahorias por 1 porción * porciones necesarias \n Bolsas totales = zanahorias totales / zanahorias por 1 bolsa'
            },
            {
                en: `Solution: Carrots per 1 serving = ${recipe} / ${recipe.servings} = ${q1CarrotsPerServing} carrots \n Total carrots = ${q1CarrotsPerServing} * ${q1ServingsNeeded} = ${q1TotalCarrots} \n Total bags = ${q1TotalCarrots} / ${q1Arr[randomGenerator.randomInt(0, q1Arr.length - 1)]} = ${q1NumBags} bags`,
                es: `Solución: Zanahorias por 1 porción = ${recipe} / ${recipe.servings} = ${q1CarrotsPerServing} zanahorias \n Zanahorias totales = ${q1CarrotsPerServing} * ${q1ServingsNeeded} = ${q1TotalCarrots} \n Total bolsas = ${q1TotalCarrots} / ${q1Arr[randomGenerator.randomInt(0, q1Arr.length - 1)]} = ${q1NumBags} bolsas`
            },
        ],
        'wholeNumber',
        null,
        null
    ));

    const q14Seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
    const q14Prices = {
        Winter: 4.50,
        Spring: 3.25,
        Summer: 4.50,
        Fall: 3.75
    };

    const q14Season = q14Seasons[randomGenerator.randomInt(0, q14Seasons.length - 1)];
    const q14PricePerPound = q14Prices[q14Season];
    const q14BagPrice = 2 * q14PricePerPound;

    questions.push(createGameQuestion(
        {
            en: `You need a 2 pound (lb.) bag of carrots to make this recipe. The price of carrots is different every season. How much does a 2 lb bag of carrots cost in the ${q14Season.toLowerCase()}?`,
            es: `Necesitas una bolsa de zanahorias de 2 libras (lb) para hacer esta receta. El precio de las zanahorias es diferente cada temporada. ¿Cuánto cuesta una bolsa de zanahorias de 2 libras en ${q14Season.toLowerCase()}?`
        },
        q14BagPrice,
        [
            {
                en: 'Price per pound = total price / number of pounds given \n Bag Price = bag size * price per pound',
                es: 'Precio por libra = precio total / número de libras \n Precio de la bolsa = tamaño de la bolsa * precio por libra'
            },
            {
                en: `Solution: Price per pound = ${q14PricePerPound} / 2 = ${q14PricePerPound / 2} \n Bag Price = 2 * ${q14PricePerPound / 2} = ${q14BagPrice}`,
                es: `Solución: Precio por libra = ${q14PricePerPound} / 2 = ${q14PricePerPound / 2} \n Precio de la bolsa = 2 * ${q14PricePerPound / 2} = ${q14BagPrice}`
            },
        ],
        'decimal',
        null,
        "level2GroceryStoreq14"
    ));
}


const fruitSaladQuestions = (questions, recipe, randomGenerator) => {
    const q15CupsList = [0.5, 0.75, 1];
    const q15PriceList = [3, 4, 5];
    const q15Cups = q15CupsList[randomGenerator.randomInt(0, 2)];
    const q15Price = q15PriceList[randomGenerator.randomInt(0, 2)];
    const q15ServingsNeeded = randomGenerator.randomInt(6, 20);
    const q15TotalCups = q15Cups * q15ServingsNeeded;
    const q15TotalContainers = Math.ceil(q15TotalCups / 2.5);
    const q15Answer = q15TotalContainers * q15Price;

    questions.push(createGameQuestion(
        {
            en: `A container of mixed berries has 2 1/2 cups of berries. If one container costs $${q15Price}, how much money will it cost to buy berries to make ${q15ServingsNeeded} fruit salads?`,
            es: `Un recipiente de bayas mixtas tiene 2 1/2 tazas de bayas. Si un recipiente cuesta $${q15Price}, ¿cuánto dinero costará comprar bayas para hacer ${q15ServingsNeeded} ensaladas de frutas?`
        },
        q15Answer,
        [
            {
                en: 'Total cups = cups per 1 serving * servings needed \n Total containers = total cups / cups per 1 container (round up to nearest whole number) \n Total price = total containers * price per 1 container',
                es: 'Tazas totales = tazas por 1 porción * porciones necesarias \n Recipientes totales = tazas totales / tazas por 1 contenedor (redondee al número entero más cercano) \n Precio total = contenedores totales * precio por 1 contenedor'
            },
            {
                en: `Total cups = ${q15Cups} * ${q15ServingsNeeded} = ${q15TotalCups} \n Total containers = ${q15TotalCups} / 2.5 = ${q15TotalContainers} (rounded up) \n Total price = ${q15TotalContainers} * $${q15Price} = ${q15Answer}`,
                es: `Tazas totales = ${q15Cups} * ${q15ServingsNeeded} = ${q15TotalCups} \n Recipientes totales = ${q15TotalCups} / 2.5 = ${q15TotalContainers} (redondeado) \n Precio total = ${q15TotalContainers} * $${q15Price} = ${q15Answer}`
            },
        ],
        'wholeNumber',
        null,
        null
    ));

    const q16KiwiPerContainer = 5;
    const q16Price = 4;
    const q16BudgetList = [8, 16, 24, 32, 40, 48];
    const q16Budget = q16BudgetList[randomGenerator.randomInt(0, 5)];
    const q16TotalContainers = q16Budget / q16Price;
    const q16TotalKiwis = q16TotalContainers * q16KiwiPerContainer;
    const q16TotalFruitSalads = q16TotalKiwis / 0.5;

    questions.push(createGameQuestion(
        {
            en: `One container of kiwi has 5 kiwis. If one container costs $${q16Price}, how many fruit salads can you make if your budget for kiwis is $${q16Budget}?`,
            es: `Un recipiente de kiwi tiene 5 kiwis. Si un recipiente cuesta $4, ¿cuántas ensaladas de frutas puedes hacer si tu presupuesto para kiwis es $${q16Budget}?`
        },
        q16TotalFruitSalads,
        [
            {
                en: 'Total containers = budget / price per 1 container \n Total kiwis = total containers * kiwis per 1 container \n Total fruit salads = Total kiwis / kiwis per 1 fruit salad',
                es: 'Contenedores totales = presupuesto / precio por 1 recipiente \n Kiwis totales = contenedores totales * 5 \n Total de ensaladas de frutas = Kiwis totales / 0.5'
            },
            {
                en: `Total containers = $${q16Budget} / $${q16Price} = ${q16TotalContainers} \n Total kiwis = ${q16TotalContainers} * 5 = ${q16TotalKiwis} \n Total fruit salads = ${q16TotalKiwis} / 0.5 = ${q16TotalFruitSalads}`,
                es: `Contenedores totales = $${q16Budget} / $${q16Price} = ${q16TotalContainers} \n Kiwis totales = ${q16TotalContainers} * 5 = ${q16TotalKiwis} \n Total de ensaladas de frutas = ${q16TotalKiwis} / 0.5 = ${q16TotalFruitSalads}`
            },
        ],
        'wholeNumber',
        null,
        null
    ));

    const q17PriceList = [22, 25, 30, 32, 35];
    const q17PoundsList = [5, 6, 7, 8, 9];
    const q17Price = q17PriceList[randomGenerator.randomInt(0, 4)];
    const q17Pounds = q17PoundsList[randomGenerator.randomInt(0, 4)];
    const q17Answer = q17Price / q17Pounds;

    questions.push(createGameQuestion(
        {
            en: `If you spend $${q17Price} on ${q17Pounds} pounds (lbs) of fruit today, how much did you spend per pound (lb) on fruit?`,
            es: `Si gastas $${q17Price} en ${q17Pounds} libras (lb) de fruta hoy, ¿cuánto gastaste por libra (lb) de fruta?`
        },
        q17Answer,
        [
            {
                en: 'Price per pound = total price / total pounds',
                es: 'Precio por libra = precio total / libras totales'
            },
            {
                en: `Price per pound = $${q17Price} / ${q17Pounds} = ${q17Answer.toFixed(2)}`,
                es: `Precio por libra = $${q17Price} / ${q17Pounds} = ${q17Answer.toFixed(2)} (máximo 2 decimales)`
            },
        ],
        'decimal',
        null,
        null
    ));
}



const chocolateBananaCakeQuestions = (questions, recipe, randomGenerator) => {

    const q18QWords = ["Happy Farm Flour", "Special Farm Flour", "Fancy Farm Organic Flour"]
    const q18Index = randomGenerator.randomInt(0, 2)
    const q18Word = q18QWords[q18Index]

    const q18NumList = [2, 4, 6, 8, 10, 12];
    const q18Num1 = q18NumList[randomGenerator.randomInt(0, q18NumList.length - 1)]


    const q18Answer = [q18Num1 * 3.69, q18Num1 * 4.29, q18Num1 * 5.49]


    questions.push(createGameQuestion(
        {
            en: `Today the grocery store has a buy-one-get-one-free sale for ${q18Word}. How much money do you save with this sale if you buy ${q18Num1} bags of flour?`,
            es: `Hoy el supermercado tiene una promoción de compra uno y lleva uno gratis para ${q18Word}. ¿Cuánto dinero ahorras con esta promoción si compras ${q18Num1} bolsas de harina?\n
            Happy Farm Flour: $3.69 por bolsa\n
            Special Farm Flour: $4.29 por bolsa\n
            Fancy Farm Organic Flour: $5.49 por bolsa
            `
        },
        q18Answer[q18Index],
        [
            {
                en: 'Try again! Hint: Buy-one-get-one-free sales mean that you can buy 2 items for the price of 1.',
                es: '¡inténtalo  otra vez! Sugerencia: las ventas de compre uno y obtenga uno gratis significan que puede comprar 2 artículos por el precio de 1.',
            },
            {
                en: `Money saved per 2 items = price for 2 items - price for 1 item \n
                Savings factor = total bags / minimum bags to get sale \n
                Total savings = Savings factor * Money saved per 2 items
                `,
                es: `Dinero ahorrado por 2 artículos = precio por 2 artículos - precio por 1 artículo\n
                Factor de ahorro = bolsas totales / bolsas mínimas para obtener la venta\n
                Ahorro total = Factor de ahorro * Dinero ahorrado por 2 artículos
                `
            },
        ],
        'decimal',
        null,
        null
    ));

    const q19ContainerPriceList = [6, 7, 8, 9]
    const q19PricePerContainer = q19ContainerPriceList[randomGenerator.randomInt(0, 3)];

    const q19CupsPerRecipe = 12;
    const q19NumOfRecipes = randomGenerator.randomInt(2, 16);
    const q19Y = q19CupsPerRecipe * q19NumOfRecipes;
    const q19Containers = Math.ceil(q19Y / 16);
    const q19TotalCups = q19Y;
    const q19Answer = (q19Containers * q19PricePerContainer).toFixed(2);

    questions.push(createGameQuestion(
        {
            en: `The grocery store only sells ice cream in one gallon containers for $${q19PricePerContainer}. Using this recipe, how much money will you spend on ice cream if you need to make the recipe ${q19NumOfRecipes} times? 1 gallon equals 16 cups.`,
            es: `El supermercado solo vende helado en envases de un galón por $${q19PricePerContainer}. Usando esta receta, ¿cuánto dinero gastarás en helado si necesitas hacer la receta ${q19NumOfRecipes} veces? 1 galón equivale a 16 tazas.`
        },
        q19Answer,
        [
            {
                en: 'Total cups = cups per 1 recipe * recipes needed\nTotal containers = total cups / cups per 1 gallon\nTotal money = Total containers (rounded up) * price per container',
                es: 'Tazas totales = tazas por 1 receta * recetas necesarias\nEnvases totales = tazas totales / tazas por 1 galón\nDinero total = Envases totales (redondeado hacia arriba) * precio por envase'
            },
            {
                en: `Total cups = ${q19CupsPerRecipe} * ${q19NumOfRecipes} = ${q19TotalCups}\nTotal containers = ${q19TotalCups} / 16 = ${q19Containers} (rounded up)\nTotal money = ${q19Containers} (rounded up) * $${q19PricePerContainer} = $${q19Answer}`,
                es: `Tazas totales = ${q19CupsPerRecipe} * ${q19NumOfRecipes} = ${q19TotalCups}\nEnvases totales = ${q19TotalCups} / 16 = ${q19Containers} (redondeado hacia arriba)\nDinero total = ${q19Containers} (redondeado hacia arriba) * $${q19PricePerContainer} = $${q19Answer}`
            },
        ],
        'decimal',
        null,
        null
    ));

    //  You finished shopping for ingredients to make chocolate banana cakes. The cashier scanned all of your items and gave you the receipt below. How much money did you spend in total?
    const q20Answer = 34.70;
    questions.push(createGameQuestion(
        {
            en:"You finished shopping for ingredients to make chocolate banana cakes. The cashier scanned all of your items and gave you the receipt below. How much money did you spend in total?",
            es:"Terminaste de comprar los ingredientes para hacer pasteles de plátano con chocolate. El cajero escaneó todos tus artículos y te dio el recibo a continuación. ¿Cuánto dinero gastaste en total?"
        },
        q20Answer,
        [
            {
                en:"Try again! Hint: Add the price of all the purchased items to find the total cost.",
                es:"¡Inténtalo de nuevo! Pista: Suma el precio de todos los artículos comprados para encontrar el costo total."
            },
            {
                en:"Total Cost = Sum of prices for all items on receipt",
                es:"Costo total = Suma de precios de todos los artículos en el recibo"
            },
            {
                en:"Total Cost = 2.50 + 1.60 + 3.90 + 1.50 + 5.50 + 6.00 + 4.70 + 3.00 + 4.50 + 1.50 = 34.70 dollars",
                es:"Costo total = 2.50 + 1.60 + 3.90 + 1.50 + 5.50 + 6.00 + 4.70 + 3.00 + 4.50 + 1.50 = 34.70 dólares"
            }
        ],
        "money",
        null,
        "level2GroceryStoreq20"
    ));

}


export default generateLevel2Questions
