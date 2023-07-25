import DevErr from "@utils/debug/devErr"
import DevLog from "@utils/debug/devLog"
import generateAHSimpleMultiQuestion from "@utils/game/auntHouse/questionCreation/auntHouseQuestionGenerators/generateAHSimpleMultiQuestion"
import createGameQuestion, { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion"
import { GenerateFriendContainerQuestion } from "@utils/game/recipes/questionGeneration/containerQuestionGenerators"

const recipesQuizzedOn = 2
const triples = [6,9,12,15,18]
const evens = [2,4,8,10]
var Fraction = require('fractional').Fraction


const generateLevel1Questions = (recipes,questionType,randomGenerator) => {
    let questions = []
    Object.keys(recipes).forEach((recipeKey, index) => {
        switch(recipeKey) {
            case 'vanillaMilkShake':
                vanillaMilkShakeQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'mangoPineappleJuice':
                mangoPineappleJuiceQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'hamAndCheeseArepas':
                hamAndCheeseArepasQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'caesarSalad':
                caesarSaladQuestions(questions,recipes[recipeKey],randomGenerator)
                break
            case 'churros':
                churrosQuestions(questions,recipes[recipeKey],randomGenerator)
                break
            case 'flan':
                flanQuestions(questions,recipes[recipeKey],randomGenerator)
                break
            default:
                DevErr('generateLevel1Questions recipeKey not found')
                questions.push(ErrorQuestion)
        }
    })
     return questions
}

const mangoPineappleJuiceQuestions = (questions,recipe,randomGenerator) => {
    //questions.push(GenerateFriendContainerQuestion(recipe,2,5,6))
    questions.push(createGameQuestion(
        {
            en:'You need to make mango-pineapple juice for 5 friends. While in the store, you see that limes are sold in bags of 6. Using this recipe, how many bags of limes do you need to purchase to make mango-pineapple juice for you and 5 friends?',
            es: 'Necesitas hacer jugo de mango-piña para 5 amigos. Mientras estás en la tienda, ves que los limones se venden en bolsas de 6. Usando esta receta, ¿cuántas bolsas de limones necesitas comprar para hacer jugo de mango-piña para ti y tus 5 amigos?'
        },
        1,
        [
            {
               en: 'Limes per 1 serving = # limes / # servings \n Servings Needed = # friends + you \n Total limes needed = limes per 1 serving * servings needed \n Bags of limes needed = Total limes / # limes per 1 bag',
               es: 'Limones por 1 porción = # limones / # porciones \nPorciones necesitadas = # amigos + tú \nTotal de limones = limones por 1 porción * porciones necesitadas\nBolsas de limones necesitadas = Total de limones / # limones por 1 bolsa'

            },
            {
                en: 'Limes per 1 serving = 2 / 2 = 1 \n Servings Needed = 5 + 1 = 6 \n Total limes = 1 * 6 = 6 \n Bags of limes needed = 6 / 6 = 1 (Answer)',
                es: 'Limones por 1 porción = 2 / 2 = 1 \nPorciones necesitadas = 5 + 1 = 6\nTotal de limones = 1 * 6 = 6\nBolsas de limones necesitadas = 6 / 6 = 1 (Respuesta)'
            }
        ],
        'wholeNumber',
        null,
        null
    ))

    const q2Arr1 = [6,8,10]
    const q2Arr2 = [6,8,10]
    const q2num1 = q2Arr1[randomGenerator.randomInt(0,q2Arr1.length-1)]
    const q2num2 = q2Arr2[randomGenerator.randomInt(0,q2Arr2.length-1)]
    const q2Answer = Math.round((q2num1/q2num2 + Number.EPSILON) * 100) / 100
    //Unit price question
    questions.push(createGameQuestion(
        {
            en: 'You are trying to calculate the unit price of mangoes. The Sunshine Mango brand sells packages with ' + q2num1 + ' mangoes. Each package costs ' + q2num2 + ' dollars. What is the per unit price of the Sunshine Mango brand? Type your answer in price format (ex: the price format for 2 dollars and 35 cents would be 2.35).',
            es: 'Estás tratando de calcular el precio unitario de los mangos. La marca Sunshine Mango vende paquetes con ' + q2num1 + ' mangos. Cada paquete cuesta ' + q2num2 + ' dólares. ¿Cuál es el precio por unidad de la marca Sunshine Mango? Escribe tu respuesta en formato de precio (por ejemplo, el formato de precio para 2 dólares y 35 centavos sería 2.35).'
        },
        q2Answer,
        [
            {
                en: 'Unit Price = total package cost / total mangoes per 1 package',
                es: 'Precio por unidad = costo total del paquete / total de mangos por 1 paquete'
            },
            {
                en: 'Unit Price = ' + q2num1 + ' / ' + q2num1 + ' = ' + q2Answer,
                es: 'Precio por unidad = ' + q2num1 + ' / ' + q2num1 + ' = ' + q2Answer
            }
        ],
        'money',
        null,
        null
    ))
    //Friend Container Cost question
    const q3Arr1 = [2,5]
    const q3Arr2 = [6,12,16]
    const q3num1 = q3Arr1[randomGenerator.randomInt(0,q3Arr1.length-1)]
    const q3num2 = q3Arr2[randomGenerator.randomInt(0,q3Arr2.length-1)]
    const q3Answer = Math.ceil((16*q3num1)/q3num2)

    questions.push(createGameQuestion(
        {
            en: 'You need to purchase enough pineapple chunks to make the recipe for you and ' + q3num1 + ' friends. You decide to purchase the Happy Pineapple brand, which comes in containers of ' + q3num2 + ' ounces. If one cup of pineapple chunks equals 8 ounces, how many containers do you need to purchase to make mango-pineapple juice for you and your friends?',
            es: 'Necesitas comprar suficientes trozos de piña para hacer la receta para ti y tus ' + q3num1 + ' amigos. Decides comprar la marca Happy Pineapple, que viene en contenedores de ' + q3num2 + ' onzas. Si una taza de trozos de piña equivale a 8 onzas, ¿cuántos contenedores necesitas comprar para hacer jugo de mango-piña para ti y tus amigos?'
        },
        q3Answer,
        [
            {
                en: 'Total oz. per 1 serving = # cups per 1 serving * # oz. per cup \n Total oz. needed = Total oz. per 1 serving * # servings needed \n Total cans = Total oz. / # oz. per container',
                es: 'Total de oz. por 1 porción = # tazas por 1 porción * # oz. por taza \nTotal de oz. necesitados = Total de oz. por 1 porción * # porciones necesitadas \nTotal de latas = Total de oz. / # oz. por contenedor'
            },
            {
                en: 'Total oz. per 1 serving = 2 * 8 = 16 oz \nTotal oz. = 16 * ' + q3num1 + ' = “x”\nTotal cans = “x” / ' + q3num2 + ' = ' + q3Answer,
                es: 'Total de oz. por 1 porción = 2 * 8 = 16 oz \nTotal de oz. = 16 * ' + q3num1 + ' = “x”\nTotal de latas = “x” / ' + q3num2 + ' = ' + q3Answer,
            }
        ],
        'wholeNumber',
        null,
        null
    ))
    const q4Arr1 = [2,4,6]
    const q4Arr2 = [3,5,7]
    const q4Arr3 = [4,8,10]
    const q4Arr4 = [6,12,16]

    const q4num1 = q4Arr1[randomGenerator.randomInt(0,q4Arr1.length-1)]
    const q4num2 = q4Arr2[randomGenerator.randomInt(0,q4Arr2.length-1)]
    const q4num3 = q4Arr3[randomGenerator.randomInt(0,q4Arr3.length-1)]
    const q4num4 = q4Arr4[randomGenerator.randomInt(0,q4Arr4.length-1)]
    const q4Answer = Math.round((Math.min((q4num2/q4num1),(q4num4/q4num3)) + Number.EPSILON) * 100) / 100
    questions.push(createGameQuestion(
        {
            en: 'You want to find the best deal for mangoes. The Happy Farm brand sells packages with ' + q4num1 + ' mangoes. Happy Farm’s package costs ' + q4num2 + ' dollars. The Sunshine Mango brand sells packages with ' + q4num3 + ' mangoes. Sunshine Mango’s package costs ' + q4num4 + ' dollars. What is the per unit price of the cheapest brand? Type your answer in price format (ex: 2 dollars and 35 cents would be 2.35).',
            es: 'Quieres encontrar la mejor oferta para los mangos. La marca Happy Farm vende paquetes con ' + q4num1 + ' mangos. El paquete de Happy Farm cuesta ' + q4num2 + ' dólares. La marca Sunshine Mango vende paquetes con ' + q4num3 + ' mangos. El paquete de Sunshine Mango cuesta ' + q4num4 + ' dólares. ¿Cuál es el precio por unidad de la marca más barata? Escribe tu respuesta en formato de precio (por ejemplo, 2 dólares y 35 centavos sería 2.35).'
        },
        q4Answer,
        [
            {
                en: 'Calculate the unit price for Happy Farm brand and Sunshine Mango brand with this formula: \nUnit Price = total package cost / total mangoes per 1 package\nWhich is the cheapest (lowest) price?',
                es: 'Calcula el precio por unidad para la marca Happy Farm y la marca Sunshine Mango con esta fórmula: \nPrecio por unidad = costo total del paquete / total de mangos por 1 paquete\n¿Cuál es el precio más barato (más bajo)?'
            },
            {
                en: 'Happy Farm Unit Price = ' + q4num2 + ' / ' + q4num1 + ' = Value A\nSunshine Mango Unit Price = ' + q4num4 + ' / ' + q4num3 + ' = Value B\nLowest number between Value A & Value B = ' + q4Answer,
                es: 'Precio por unidad de Happy Farm = ' + q4num2 + ' / ' + q4num1 + ' = Valor A\nPrecio por unidad de Sunshine Mango = ' + q4num4 + ' / ' + q4num3 + ' = Valor B\nEl número más bajo entre Valor A y Valor B = ' + q4Answer,
            }
        ],
        'money',
        null,
        null
    ))
    //Cheapest Brand Question
}

const hamAndCheeseArepasQuestions = (questions,recipe,randomGenerator) => {
    //Unit price question
    const q1Arr1 = [6,8,10]
    const q1num1 = q1Arr1[randomGenerator.randomInt(0,q1Arr1.length-1)]
    const q1Answer =1.5*q1num1
    //Unit price question
    questions.push(createGameQuestion(
        {
            en: 'You are also shopping for ingredients to make ham and cheese arepas. Happy Farm Ham comes in deli packages of 8 slices and each package weighs 12 ounces (oz). How many ounces of ham would you have if you purchased ' + q1num1 + ' slices from the deli?',
            es: 'También estás comprando ingredientes para hacer arepas de jamón y queso. El jamón Happy Farm viene en paquetes de 8 rebanadas y cada paquete pesa 12 onzas (oz). ¿Cuántas onzas de jamón tendrías si compras ' + q1num1 + ' rebanadas de la tienda?'
        },
        q1Answer,
        [
            {
                en: 'Ham oz per 1 slice = # oz / # slices per package\nTotal oz of ham = Ham oz per 1 slice * slices purchased',
                es: 'Oz de jamón por 1 rebanada = # oz / # rebanadas por paquete\nTotal de oz de jamón = Oz de jamón por 1 rebanada * rebanadas compradas'
            },
            {
                en: 'Ham per 1 slice = 12 oz / 8 slices per package = 1.5 oz/slice \nTotal oz of ham = 1.5 oz/slice * ' + q1num1 + ' = ' + q1Answer,
                es: 'Oz de jamón por 1 rebanada = 12 oz / 8 rebanadas por paquete = 1.5 oz/rebanada \nTotal de oz de jamón = 1.5 oz/rebanada * ' + q1num1 + ' = ' + q1Answer
            }
        ],
        'decimal',
        null,
        null
    ))
    //Unit price question
    const q2Arr1 = [6,9,12,15,18]
    const q2num1 = q2Arr1[randomGenerator.randomInt(0,q2Arr1.length-1)]
    const q2Answer = Math.ceil(q2num1/10)
    //Unit price question
    questions.push(createGameQuestion(
        {
            en: 'You are shopping for ingredients to make ham and cheese arepas for your family. You are cooking for ' + q2num1 + ' people, including yourself. One package of cheese has 10 slices. Using the recipe above, how many packages of cheese would you need to buy to make enough ham and cheese arepas for everyone? Round your answer up to the nearest whole number.',
            es: 'Estás comprando ingredientes para hacer arepas de jamón y queso para tu familia. Estás cocinando para ' + q2num1 + ' personas, incluyéndote a ti. Un paquete de queso tiene 10 rebanadas. Usando la receta de arriba, ¿cuántos paquetes de queso necesitarías comprar para hacer suficientes arepas de jamón y queso para todos? Redondea tu respuesta al número entero más cercano.'
        },
        q2Answer,
        [
            {
                en: 'Cheese per 1 serving = cheese slices from recipe / recipe servings\nTotal Cheese needed = servings needed * Cheese per 1 serving\nTotal packages = Total Cheese needed / 10 slices per package',            
                es: 'Queso por 1 porción = rebanadas de queso de la receta / porciones de la receta\nTotal de queso necesitado = porciones necesitadas * queso por 1 porción\nTotal de paquetes = Total de queso necesitado / 10 rebanadas por paquete'
            },
            {
                en: 'Cheese per 1 serving = 3 / 3 = 1 slice per serving\nTotal Cheese needed = ' +q2num1 + ' * 1 = “x”\nTotal packages = “x” / 10 slices per package = ' + q2Answer,
                es: 'Queso por 1 porción = 3 / 3 = 1 rebanada por porción\nTotal de queso necesitado = ' +q2num1 + ' * 1 = “x”\nTotal de paquetes = “x” / 10 rebanadas por paquete = ' + q2Answer
            }
        ],
        'wholeNumber',
        null,
        null
    ))
    //Cheapest Brand Question
    const q3Arr1 = [10,12,15,18,25]
    const q3num1 = q3Arr1[randomGenerator.randomInt(0,q3Arr1.length-1)]
    const q3Answer = Math.round((4.5/q3num1 + Number.EPSILON) * 100) / 100
    questions.push(createGameQuestion(
        {
            en: 'The Fancy Cow cheese brand is sold in packages of ' + q3num1 + ' slices for $4.50. What is the per unit price of the Fancy Cow brand? Type your answer in price format (ex: 2 dollars and 35 cents would be 2.35).',
            es: 'La marca de queso Fancy Cow se vende en paquetes de ' + q3num1 + ' rebanadas por $4.50. ¿Cuál es el precio por unidad de la marca Fancy Cow? Escribe tu respuesta en formato de precio (por ejemplo, 2 dólares y 35 centavos sería 2.35).'        },
            q3Answer,
        [
            {
                en: 'Unit Price = total package cost / total slices per 1 package',
                es: 'Precio por unidad = costo total del paquete / total de rebanadas por 1 paquete'
            },
            {
                en: 'Unit Price = 4.50 / ' + q3num1 + ' = ' + q3Answer,
                es: 'Precio por unidad = 4.50 / ' + q3num1 + ' = ' + q3Answer
            }
        ],
        'money',
        null,
        null
    ))

    const q4Arr1 = [6,10,12,15]
    const q4Arr2 = [10,12,15,18,25]
    const q4num1 = q4Arr1[randomGenerator.randomInt(0,q4Arr1.length-1)]
    const q4num2 = q4Arr2[randomGenerator.randomInt(0,q4Arr2.length-1)]
    const q4Answer = Math.round((Math.min((3/q4num1),(4.5/q4num2)) + Number.EPSILON) * 100) / 100
    questions.push(createGameQuestion(
        {
            en: 'The Happy Farm cheese brand is sold in packages of ' + q4num1 + ' slices for $3.00 per package. The Fancy Cow brand of cheese is sold in packages of ' + q4num2 + ' slices for $4.50 per package. What is the per unit price of the cheapest brand? Type your answer in price format (ex: 2 dollars and 35 cents would be 2.35).',
            es: 'La marca de queso Happy Farm se vende en paquetes de ' + q4num1 + ' rebanadas por $3.00 por paquete. La marca de queso Fancy Cow se vende en paquetes de ' + q4num2 + ' rebanadas por $4.50 por paquete. ¿Cuál es el precio por unidad de la marca más barata? Escribe tu respuesta en formato de precio (por ejemplo, 2 dólares y 35 centavos sería 2.35).'
        },
        q4Answer,
        [
            {
                en: 'Unit Price = total package cost / total slices per 1 package\nWhich is the cheapest (lowest) price?',
                es: 'Precio por unidad = costo total del paquete / total de rebanadas por 1 paquete\n¿Cuál es el precio más barato (más bajo)?'
            },
            {
                en: 'Happy Farm Unit Price = 3.00 / ' + q4num1 + ' = Value A\nFancy Cow Unit Price = 4.50 / ' + q4num2 + ' = Value B\n[Lowest number between Value A & Value B] = ' + q4Answer,              
                es: 'Precio por unidad de Happy Farm = 3.00 / ' + q4num1 + ' = Valor A\nPrecio por unidad de Fancy Cow = 4.50 / ' + q4num2 + ' = Valor B\n[El número más bajo entre Valor A y Valor B] = ' + q4Answer
            }
        ],
        'money',
        null,
        null
    ))
}

const vanillaMilkShakeQuestions = (questions,recipe,randomGenerator) => {
    const q1Answer = 0.25
    questions.push(createGameQuestion(
        {
            en: 'You are planning to make vanilla milkshakes. The Happy Cow brand of milk is sold in cartons that are 1/2 gallon for $2.00. If 1 gallon of milk equals 16 cups, what is the price per cup of Happy Cow brand milk? Type your answer in price format (ex: 2 dollars and 35 cents would be 2.35).',
            es: 'Estás planeando hacer batidos de vainilla. La marca de leche Happy Cow se vende en cajas de 1/2 galón por $2.00. Si 1 galón de leche equivale a 16 tazas, ¿cuál es el precio por taza de leche de la marca Happy Cow? Escriba su respuesta en formato de precio (por ejemplo, 2 dólares y 35 centavos serían 2,35)'
        },
        q1Answer,
        [
            {
                en: 'Cups per milk carton = cups in 1 gallon * carton quantity\nUnit price = milk carton price / Cups per milk carton',                
                es: 'Tazas por caja de leche = tazas en 1 galón * cantidad de caja\nPrecio unitario = precio del cartón de leche / Tazas por cartón de leche'
            },
            {
                en: 'Cups per milk carton = 16 * 1/2 = 8 cups\nUnit price = 2 / 8 = 1/4 = 0.25',
                es: 'Tazas por caja de leche = 16 * 1/2 = 8 tazas\nPrecio unitario = 2 / 8 = 1/4 = 0,25'
            }
        ],
        'money',
        null,
        null
    ))

    const q2Arr1 = [3,5,7]
    const q2num1 = q2Arr1[randomGenerator.randomInt(0,q2Arr1.length-1)]
    const q2Answer = Math.ceil((q2num1+1) /2)
    questions.push(createGameQuestion(
        {
            en: 'You decide to shop for ingredients to make vanilla milkshakes for yourself and '+q2num1+' friends. Happy Cow ice cream is sold in 1 pint containers. If 1 pint equals 2 cups, how many pints do you need to buy to make milkshakes for you and your friends?',
            es: 'Decides comprar ingredientes para hacer batidos de vainilla para ti y '+q2num1+' amigos. El helado Happy Cow se vende en envases de 1 pinta. Si 1 pinta equivale a 2 tazas, ¿cuántas pintas necesitas comprar para hacer batidos para ti y tus amigos?'
        },
        q2Answer,
        [
            {
                en: 'Ice Cream cups per 1 serving = recipe cups / recipe servings\nTotal Servings = # of friends + you\nTotal Cups = Ice Cream cups per 1 serving * total servings\nTotal Pints = total cups / 2',
                es: 'Tazas de helado por 1 porción = tazas de receta / porciones de receta\nPorciones totales = # de amigos + tú\nTazas totales = tazas de helado por 1 porción * porciones totales\nTotal de pintas = total de tazas / 2'
            },
            {
                en: 'Ice Cream cups per 1 serving = 2 cups / 2 servings = 1 cup\nTotal Servings = [3,5,7] + 1 = “x”\nTotal Cups = 1 * “x” = “y”\nTotal Pints = “y” / 2 = ' + q2Answer, 
                es: 'Tazas de helado por 1 porción = 2 tazas / 2 porciones = 1 taza\nPorciones totales = [3,5,7] + 1 = “x”\nTazas totales = 1 * “x” = “y”\nTotal de pintas = “y” / 2 = ' + q2Answer             
            }
        ],
        'wholeNumber',
        null,
        null
    ))
    //Graph questin
}

const caesarSaladQuestions = (questions,recipe,randomGenerator) => {
    const q1Arr1 = [2,5,11]
    const q1num1 = q1Arr1[randomGenerator.randomInt(0,q1Arr1.length-1)]
    const q1Answer = Math.ceil(((q1num1+1)*2)/6)
    //Unit price question
    questions.push(createGameQuestion(
        {
            en: 'You are making Caesar salad for you and ' +q1num1+' friends. If one lettuce head makes 6 cups when chopped, how many heads do you need to buy?',
            es: 'Estás haciendo ensalada César para ti y tus ' +q1num1+' amigos. Si una lechuga hace 6 tazas cuando se pica, ¿cuántas lechugas necesitas comprar?'
        },
        q1Answer,
        [
            {
                en: 'Lettuce cups per 1 serving = cups in 1 recipe / recipe servings\nTotal servings = # of friends + you\nTotal cups =  Lettuce cups per 1 serving * Total servings\nTotal heads = Total Cups / cups per 1 lettuce head',
                es: 'Tazas de lechuga por 1 porción = tazas en 1 receta / porciones de receta\nPorciones totales = # de amigos + tú\nTazas totales = Tazas de lechuga por 1 porción * Porciones totales\nTotal de lechugas = Tazas totales / tazas por 1 lechuga'
            },
            {
                en: 'Lettuce cups per 1 serving = 12 / 6 = 2 cups\nTotal servings = '+q1num1+' + 1 = “x”\nTotal cups =  2 * “x” = “y”\nTotal heads = “y” / 6 = ' + q1Answer, 
                es: 'Tazas de lechuga por 1 porción = 12 / 6 = 2 tazas\nPorciones totales = '+q1num1+' + 1 = “x”\nTazas totales =  2 * “x” = “y”\nTotal de lechugas = “y” / 6 = ' + q1Answer
            }
        ],
        'wholeNumber',
        null,
        null
    ))

    const q2Arr1 = [2,4,6]
    const q2num1 = q2Arr1[randomGenerator.randomInt(0,q2Arr1.length-1)]
    const q2Arr2 = [3,6]
    const q2num2 = q2Arr2[randomGenerator.randomInt(0,q2Arr2.length-1)]
    const q2Answer = Math.round((Math.min((q2num1/10),(q2num2/12)) + Number.EPSILON) * 100) / 100
    //Unit price question
    questions.push(createGameQuestion(
        {
            en: ' You are shopping for ingredients to make Caesar salad and want to compare prices of dressings. Happy Cow sells organic caesar dressing in a 10 ounce bottle and costs '+q2num1+' dollars. Sunshine Farm sells caesar dressing in a 12 ounce bottle and costs '+q2num2+' dollars. What is the per ounce price for the cheapest brand? Type your answer in price format (ex: 2 dollars and 35 cents would be 2.35).',
            es: 'Estás comprando ingredientes para hacer ensalada César y quieres comparar los precios de los aderezos. Happy Cow vende aderezo orgánico César en una botella de 10 onzas y cuesta '+q2num1+' dólares. Sunshine Farm vende aderezo César en una botella de 12 onzas y cuesta '+q2num2+' dólares. ¿Cuál es el precio por onza de la marca más barata? Escribe tu respuesta en formato de precio (por ejemplo, 2 dólares y 35 centavos sería 2.35).'
        },
        q2Answer,
        [
            {
                en: 'Unit Price = total price / total ounces per 1 bottle\nWhich is the cheapest (lowest) price?',
                es: 'Precio por unidad = precio total / onzas totales por 1 botella\n¿Cuál es el precio más barato (más bajo)?'
            },
            {
                en: 'Happy Cow Unit Price = '+q2num1+' / 10 = Value A\nSunshine Farm Unit Price = '+q2num2+' / 12 = Value B\n[Lowest number between Value A & Value B] = ' + q2Answer,
                es: 'Precio por unidad de Happy Cow = '+q2num1+' / 10 = Valor A\nPrecio por unidad de Sunshine Farm = '+q2num2+' / 12 = Valor B\n[El número más bajo entre Valor A y Valor B] = ' + q2Answer
            }
        ],
        'money',
        null,
        null
    ))

    const q3Arr1 = [2,4,6,8,10]
    const q3num1 = q3Arr1[randomGenerator.randomInt(0,q3Arr1.length-1)]
    const q3Answer = q3num1*3
    //Unit price question
    questions.push(createGameQuestion(
        {
            en: 'You bought '+q3num1+' cups of crouton. How many servings of Caesar salad can you make with this amount?',
            es: 'Compraste '+q3num1+' tazas de crouton. ¿Cuántas porciones de ensalada César puedes hacer con esta cantidad?'
        },
        q3Answer,
        [
            {
                en: 'Servings per 1 cup of croutons = recipe servings / recipe cups of croutons\nTotal servings = total cups bought * servings per 1 cup of croutons',
                es: 'Porciones por 1 taza de croutons = porciones de receta / tazas de croutons de receta\nPorciones totales = tazas totales compradas * porciones por 1 taza de croutons'
            },
            {
                en: 'Servings per 1 cup of croutons = 6 / 2 = 3 servings\nTotal servings = '+q3num1+' * 3 = ' + q3Answer,                
                es: 'Porciones por 1 taza de croutons = 6 / 2 = 3 porciones\nPorciones totales = '+q3num1+' * 3 = ' + q3Answer
            }
        ],
        'money',
        null,
        null
    ))

}
const churrosQuestions = (questions,recipe,randomGenerator) => {
    //Friend unit conversion question
    const q1Arr1 = [7,15,23]
    const q1num1 = q1Arr1[randomGenerator.randomInt(0,q1Arr1.length-1)]
    const q1Answer = Math.ceil(((q1num1+1)*2)/16)
    //Unit price question
    questions.push(createGameQuestion(
        {
            en: 'You are shopping for ingredients to make churros for you and '+q1num1+' friends. If oil is sold in 1 gallon containers, how many containers do you need to buy to make enough churros? Hint: 1 gallon = 16 cups.',
            es: 'Estás comprando ingredientes para hacer churros para ti y tus '+q1num1+' amigos. Si el aceite se vende en contenedores de 1 galón, ¿cuántos contenedores necesitas comprar para hacer suficientes churros? Pista: 1 galón = 16 tazas.'
        },
        q1Answer,
        [
            {
                en: 'Oil cups per 1 serving = recipe cups / recipe servings\nTotal servings = # friends + you\nTotal Cups = Oil cups per 1 serving * Total servings\nTotal containers = total cups / cups in 1 container',                
                es: 'Tazas de aceite por 1 porción = tazas de receta / porciones de receta\nPorciones totales = # amigos + tú\nTazas totales = Tazas de aceite por 1 porción * Porciones totales\nTotal de contenedores = tazas totales / tazas en 1 contenedor'
            },
            {
                en: 'Oil cups per 1 serving = 8 / 4 = 2 cups\nTotal servings = '+q1Answer+' + 1 = “x”\nTotal Cups = 2 * “x” = “y”\nTotal containers = “y” / 16 = ' + q1Answer,
                es: 'Tazas de aceite por 1 porción = 8 / 4 = 2 tazas\nPorciones totales = '+q1Answer+' + 1 = “x”\nTazas totales = 2 * “x” = “y”\nTotal de contenedores = “y” / 16 = ' + q1Answer
            }
        ],
        'wholeNumber',
        null,
        null
    ))
    //Cheapest Brand Question
    const q2Arr1 = [8,12]
    const q2num1 = q2Arr1[randomGenerator.randomInt(0,q2Arr1.length-1)]
    const q2Arr2 = [2,4,5,6]
    const q2num2 = q2Arr2[randomGenerator.randomInt(0,q2Arr2.length-1)]
    const q2Answer = Math.round((Math.min((q2num1/16),(q2num2/2)) + Number.EPSILON) * 100) / 100
    //Unit price question
    questions.push(createGameQuestion(
        {
            en: 'When shopping for ingredients to make churros you found two different brands of cinnamon. Sunshine Farm brand costs '+q2num1+' dollars and is sold in 16 ounce containers. Happy Cinnamon brand costs '+q2num2+' dollars and is sold in 2 ounce containers. What is the unit price for the cheapest brand?',
            es: 'Al comprar ingredientes para hacer churros, encontraste dos marcas diferentes de canela. La marca Sunshine Farm cuesta '+q2num1+' dólares y se vende en contenedores de 16 onzas. La marca Happy Cinnamon cuesta '+q2num2+' dólares y se vende en contenedores de 2 onzas. ¿Cuál es el precio por unidad de la marca más barata?'
        },
        q2Answer,
        [
            {
                en: 'Unit Price = total price / total ounces per 1 container\nWhich is the cheapest (lowest) price?',
                es: 'Precio por unidad = precio total / total de onzas por 1 contenedor\n¿Cuál es el precio más barato (más bajo)?'
            },
            {
                en: 'Sunshine Farm Unit Price = '+q2num1+' / 16 = Value A\nHappy Cinnamon Unit Price = '+q2num2+' / 2 = Value B\nValue A = ' + q2Answer,              
                es: 'Precio por unidad de Sunshine Farm = '+q2num1+' / 16 = Valor A\nPrecio por unidad de Happy Cinnamon = '+q2num2+' / 2 = Valor B\nValor A = ' + q2Answer
            }
        ],
        'money',
        null,
        null
    ))
    //image question
}

const flanQuestions = (questions,recipe,randomGenerator) => {
    const q1Arr1 = [4,16,24]
    const q1num1 = q1Arr1[randomGenerator.randomInt(0,q1Arr1.length-1)]
    const q1Answer = q1num1/4
    questions.push(createGameQuestion(
        {
            en: 'You are shopping for ingredients to make flan for ' + q1num1 + ' people. If you need 2 teaspoons (tsp) of vanilla extract to make 8 servings, how many teaspoons (tsp) of vanilla extract do you need to buy to make flan for everyone?',
            es: 'Estás comprando ingredientes para hacer flan para ' + q1num1 + ' personas. Si necesitas 2 cucharaditas (tsp) de extracto de vainilla para hacer 8 porciones, ¿cuántas cucharaditas (tsp) de extracto de vainilla necesitas comprar para hacer flan para todos?'
        },
        q1Answer,
        [
            {
                en: 'Tsp per 1 serving = # tsp per recipe / # servings per recipe \nTotal tsp = Tsp per 1 serving * # servings needed',
                es: 'Tsp por 1 porción = # tsp por receta / # porciones por receta \nTotal de tsp = Tsp por 1 porción * # porciones necesitadas'
            },
            {
                en: 'Tsp per 1 serving = 2 tsp / 8 servings = 1/4\nTotal tsp = 1/4 * ' + q1num1 + ' = ' + q1Answer,
                es: 'Tsp por 1 porción = 2 tsp / 8 porciones = 1/4\nTotal de tsp = 1/4 * ' + q1num1 + ' = ' + q1Answer
            }
        ],
        'wholeNumber',
        null,
        null
    ))
    //friend unit convertion question
    const q2Arr1 = [2,4,8,16]
    const q2num1 = q2Arr1[randomGenerator.randomInt(0,q2Arr1.length-1)]

    const q2Answer = Math.ceil((3/8) * q2num1 * 16)
    questions.push(createGameQuestion(
        {
            en: 'You are making flan for ' +q2num1+ ' people. Using the recipe above, how many tablespoons of milk would you need, given that there are 16 tablespoons in one cup? Round your answer up to the nearest whole number.',
            es: 'Estás haciendo flan para ' +q2num1+ ' personas. Usando la receta de arriba, ¿cuántas cucharadas de leche necesitarías, dado que hay 16 cucharadas en una taza? Redondea tu respuesta al número entero más cercano.'
        },
        q2Answer,
        [
            {
                en: 'Cups milk per 1 serving = # cups milk in recipe / # servings\nTotal cups milk = Cups milk per 1 serving * # people \nTotal tbsp milk = Total cups milk * tbsp per 1 cup',
                es: 'Tazas de leche por 1 porción = # tazas de leche en la receta / # porciones\nTotal de tazas de leche = Tazas de leche por 1 porción * # personas \nTotal de cucharadas de leche = Total de tazas de leche * cucharadas por 1 taza'
            },
            {
                en: 'Cups milk per 1 serving = 3 cups milk / 8 servings = 3/8\nTotal cups milk = 3/8 * '+q2num1+' = “x”\nTotal tbsp milk = “x” * 16 = ' + q2Answer,
                es: 'Tazas de leche por 1 porción = 3 tazas de leche / 8 porciones = 3/8\nTotal de tazas de leche = 3/8 * '+q2num1+' = “x”\nTotal de cucharadas de leche = “x” * 16 = ' + q2Answer
            }
        ],
        'wholeNumber',
        null,
        null
    ))
}
export default generateLevel1Questions


//EASY
    //Friend unit price question
    //budget questions
    //reverse unit price question
    //Unit price question
    //Cheapest Brand Question
    //ammout of servings with x question
    //Unit price sale question
//HARD
    //Friend Container Cost question
    //Price unit convertion question
    //Cheapest Brand different size Question
    //Friend unit conversion question
    //Friend Container unit conversion question
