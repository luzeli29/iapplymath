import createGameQuestion, { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion"
import { GenerateFriendContainerQuestion } from "@utils/game/recipes/questionGeneration/containerQuestionGenerators"


const generateLevel3Questions = (recipes,questionType,randomGenerator) => {
    let questions = []
    Object.keys(recipes).forEach((recipeKey, index) => {
        switch(recipeKey) {
            case 'strawberryLimeade':
                strawberryLimeadeQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'strawberryCake':
                strawberryCakeQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'lemonVanillaCake':
                lemonVanillaCakeQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'tomatilloSauceAndTortillaChips':
                tomatilloSauceAndTortillaChipsQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'mangoJuice':
                mangoJuiceQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'OJCitrusCooler':
                OJCitrusCoolerQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            case 'lentilSoup':
                lentilSoupQuestions(questions,recipes[recipeKey],randomGenerator)
                break;
            
            default:
                questions.push(ErrorQuestion)
        }
    })
     return questions
}

const strawberryLimeadeQuestions = (questions,recipe,randomGenerator) => {
    const q1num1 = randomGenerator.randomInt(10,31)
    const q1num2 = randomGenerator.randomInt(5,9)
    const q1Answer = 
    //Unit price question
    questions.push(createGameQuestion(
        {
            en: 'You are following this recipe and want to make ' + q1num1 + ' servings of strawberry limeade. The grocery store sells bags of ' + q1num2 + ' green apples. If each bag costs $5.49, how much money will you spend on apple bags?',
            es: 'Estás siguiendo esta receta y quieres hacer ' + q1num1 + ' porciones de limonada de fresa. La tienda de comestibles vende bolsas de ' + q1num2 + ' manzanas verdes. Si cada bolsa cuesta $5.49, ¿cuánto dinero gastarás en bolsas de manzana?'
        },
        q1Answer,
        [
            {
                en: 'Total green apples = servings needed * green apple per 1 serving\nBags = total green apples / green apples per 1 bag\nTotal money = bags * price per 1 bag',                
                es: 'Manzanas verdes totales = porciones necesitadas * manzana verde por 1 porción\nBolsas = manzanas verdes totales / manzanas verdes por 1 bolsa\nDinero total = bolsas * precio por 1 bolsa'
            },
            {
                en: 'Total green apples = ' + q1num1 + ' * 1 ½ = “x”\nBags = “x” / ' + q1num2 + ' = “y” → “y” has a decimal? Round up to nearest whole number!\nTotal money = “y” * 5.49 =' + q1Answer,
                es: 'Manzanas verdes totales = ' + q1num1 + ' * 1 ½ = “x”\nBolsas = “x” / ' + q1num2 + ' = “y” → ¿“y” tiene decimal? ¡Redondea al número entero más cercano!\nDinero total = “y” * 5.49 = ' + q1Answer
            }
        ],
        'money',
        null,
        null
    ))

    //Unit price question
    const q2num1 = randomGenerator.randomInt(3,7)
    const q2num2 = randomGenerator.randomInt(10,31)
    const q2Answer = Math.round((((q2num2/2) /q2num2)*4.89 + Number.EPSILON) * 100) / 100
    questions.push(createGameQuestion(
        {
            en: 'The grocery store sells strawberries in boxes of ' + q2num1 + ' cups. You are following the strawberry limeade recipe and want to make ' + q2num2 + ' servings. If each strawberry box costs $4.89, how much money will you spend on strawberries?',
            es: 'La tienda de comestibles vende fresas en cajas de ' + q2num1 + ' tazas. Estás siguiendo la receta de limonada de fresa y quieres hacer ' + q2num2 + ' porciones. Si cada caja de fresas cuesta $4.89, ¿cuánto dinero gastarás en fresas?'
        },
        q2Answer,
        [
            {
                en: 'Total strawberry cups = servings needed * strawberry cups per 1 serving\nBoxes = Total strawberry cups / cups per 1 box\nTotal money = boxes * price per 1 box',                
                es: 'Tazas totales de fresa = porciones necesitadas * tazas de fresa por 1 porción\nCajas = Tazas totales de fresa / tazas por 1 caja\nDinero total = cajas * precio por 1 caja'
            },
            {
                en: 'Total strawberry cups = ' + q2num2 + ' * ½ = “x”\nBoxes = “x” / ' + q2num1 + ' = “y” → “y” has a decimal? Round up to nearest whole number!\nTotal money = “y” * 4.89 = ' + q2Answer,
                es: 'Tazas totales de fresa = ' + q2num2 + ' * ½ = “x”\nCajas = “x” / ' + q2num1 + ' = “y” → ¿“y” tiene decimal? ¡Redondea al número entero más cercano!\nDinero total = “y” * 4.89 = ' + q2Answer
            }
        ],
        'money',
        null,
        null
    ))

    const q3Answer = .3
    questions.push(createGameQuestion(
        {
            en: 'At the store, you can buy a bottle of water for $1.25. The water bottle contains 16.9 fluid ounces. If you make only half a serving of strawberry limeade, how much money would you spend for the amount of water you need? Round to the nearest hundredth. Hint: 1 cup of water = 8 fluid ounces.',
            es: 'En la tienda, puedes comprar una botella de agua por $1.25. La botella de agua contiene 16.9 onzas líquidas. Si haces solo media porción de limonada de fresa, ¿cuánto dinero gastarías por la cantidad de agua que necesitas? Redondea al centésimo más cercano. Sugerencia: 1 taza de agua = 8 onzas líquidas.'
        },
        q3Answer,
        [
            {
                en: 'Water used = recipe amount / 2\nRatio of water used = water used / total water amount\nPrice = ratio of water used * total price of water bottle',
                es: 'Agua utilizada = cantidad de receta / 2\nProporción de agua utilizada = agua utilizada / cantidad total de agua\nPrecio = proporción de agua utilizada * precio total de la botella de agua'
            },
            {
                en: 'Water used = 1 cup / 2 = ½ cup = 4 fl. oz.\nRatio of water used = 4 / 16.9\nPrice = (4/16.9) * 1.25 = $0.30',
                es: 'Agua utilizada = 1 taza / 2 = ½ taza = 4 onzas líquidas\nProporción de agua utilizada = 4 / 16.9\nPrecio = (4/16.9) * 1.25 = $0.30'
            }
        ],
        'money',
        null,
        null
    ))
    //Table Question
}

const strawberryCakeQuestions = (questions,recipe,randomGenerator) => {
    //Friend Container Cost question
    const q1num1 = randomGenerator.randomInt(6,11)
    const q1Answer = Math.round(((.45*q1num1*.45)+ Number.EPSILON) * 100) / 100
    questions.push(createGameQuestion(
        {
            en: 'You want to make this strawberry cake recipe '+q1num1+' times. The grocery store sells 2 cups of flour for $0.90. How much do you need to spend on flour?',
            es: 'Quieres hacer esta receta de pastel de fresa '+q1num1+' veces. La tienda de comestibles vende 2 tazas de harina por $0.90. ¿Cuánto necesitas gastar en harina?'
        },
        q1Answer,
        [
            {
                en: 'Price per cup = total price / number of cups\nTotal cups needed = recipe cups * recipe amount needed (round up)\nTotal price = price per cup * total cups needed',                
                es: 'Precio por taza = precio total / número de tazas\nTazas totales necesarias = tazas de receta * cantidad de receta necesaria (redondear hacia arriba)\nPrecio total = precio por taza * tazas totales necesarias'
            },
            {
                en: 'Price per cup = 0.90 / 2 = 0.45\nTotal cups needed = 1 ½  * '+q1num1+' = “x” (round up)\nTotal price = 0.45 * “x” = Answer',                
                es: 'Precio por taza = 0.90 / 2 = 0.45\nTazas totales necesarias = 1 ½  * '+q1num1+' = “x” (redondear hacia arriba)\nPrecio total = 0.45 * “x” = Respuesta'
            }
        ],
        'money',
        null,
        null
    ))
    //budget questions
    const q2num1 = randomGenerator.randomInt(16,31)
    const q2Answer = Math.round(((q2num1*4*8)+ Number.EPSILON) * 100) / 100
    questions.push(createGameQuestion(
        {
            en: 'You have $'+q2num1+' to spend on milk for this recipe. If a quart of milk costs $2.00, how many servings can you make with the total amount of money you have? Hint: 1 quart = 4 cups.',
            es: 'Tienes $'+q2num1+' para gastar en leche para esta receta. Si un cuarto de galón de leche cuesta $2.00, ¿cuántas porciones puedes hacer con la cantidad total de dinero que tienes? Sugerencia: 1 cuarto de galón = 4 tazas.'
        },
        q2Answer,
        [
            {
                en: 'Total quarts = budget / price per 1 quart  (round down)\nTotal cups = total quarts * cups per 1 quart\nTotal Servings = (total cups / cups per 1 recipe) * servings per 1 recipe',
                es: 'Cuartos totales = presupuesto / precio por 1 cuarto (redondear hacia abajo)\nTazas totales = cuartos totales * tazas por 1 cuarto\nPorciones totales = (tazas totales / tazas por 1 receta) * porciones por 1 receta'
            },
            {
                en: 'Total quarts = '+q2num1+' / 2 = “x”  (round down)\nTotal cups = “x” * 4 = “y”\nTotal Servings = (“y” / 1) * 8 = ' + q2Answer,
                es: 'Cuartos totales = '+q2num1+' / 2 = “x”  (redondear hacia abajo)\nTazas totales = “x” * 4 = “y”\nPorciones totales = (“y” / 1) * 8 = ' + q2Answer
            }
        ],
        'money',
        null,
        null
    ))
    //Image Question
}

const lemonVanillaCakeQuestions = (questions,recipe,randomGenerator) => {
    const q1num1 = 10*randomGenerator.randomInt(2,13)
    const q1Answer = Math.round(((q1num1/10) *1.86+ Number.EPSILON) * 100) / 100
    questions.push(createGameQuestion(
        {
            en: 'The grocery store sells one box of vanilla cake mix for $1.86. If you want to prepare lemon vanilla cake for '+ q1num1 +' people, how much will you pay to get enough boxes of vanilla cake mix?',
            es: 'La tienda de comestibles vende una caja de mezcla para pastel de vainilla por $1.86. Si quieres preparar pastel de vainilla de limón para '+ q1num1 +' personas, ¿cuánto pagarás para obtener suficientes cajas de mezcla para pastel de vainilla?'
        },
        q1Answer,
        [
            {
                en: 'Total strawberry cups = servings needed * strawberry cups per 1 serving\nBoxes = Total strawberry cups / cups per 1 box\nTotal money = boxes * price per 1 box',                
                es: 'Tazas totales de fresa = porciones necesitadas * tazas de fresa por 1 porción\nCajas = Tazas totales de fresa / tazas por 1 caja\nDinero total = cajas * precio por 1 caja'
            },
            {
                en: 'Total boxes = ' + q1num1 + ' / 10 = “x”\nTotal cost = “x” * 1.86 = ' + q1Answer,
                es: 'Cajas totales = ' + q1num1 + ' / 10 = “x”\nCosto total = “x” * 1.86 = ' + q1Answer
            }
        ],
        'money',
        null,
        null
    ))

    const q2num1 = 10*randomGenerator.randomInt(6,13)
    const q2num2 = 10*randomGenerator.randomInt(3,6)
    const q2Answer = Math.round((((q2num1 + q2num2) /10) * 2.15+ Number.EPSILON) * 100) / 100
    questions.push(createGameQuestion(
        {
            en: 'The grocery store in your friend’s neighborhood sells one box of vanilla cake mix for $2.15. At first, you wanted to prepare lemon vanilla cake for ' +q2num1+' people. If your friend wants to invite ' +q2num2+' more people, how much will it cost to get enough boxes of vanilla cake mix for everyone?',
            es: 'La tienda de comestibles en el vecindario de tu amigo vende una caja de mezcla para pastel de vainilla por $2.15. Al principio, querías preparar pastel de vainilla de limón para ' +q2num1+' personas. Si tu amigo quiere invitar a ' +q2num2+' personas más, ¿cuánto costará obtener suficientes cajas de mezcla para pastel de vainilla para todos?'
        },
        q2Answer,
        [
            {
                en: 'Total people = initial people + additional people\nTotal boxes = total people / people served per 1 recipe\nTotal cost = total boxes * price per box',
                es: 'Personas totales = personas iniciales + personas adicionales\nCajas totales = personas totales / personas servidas por 1 receta\nCosto total = cajas totales * precio por caja'
            },
            {
                en: 'Total people = '+q2num1+' + '+q2num2+'  = “x”\nTotal boxes = “x” / 10 = “y”\nTotal cost = “y” * 2.15 = ' + q2Answer,
                es: 'Personas totales = '+q2num1+' + '+q2num2+'  = “x”\nCajas totales = “x” / 10 = “y”\nCosto total = “y” * 2.15 = ' + q2Answer
            }
        ],
        'money',
        null,
        null
    ))

    const q3arr1 = [20,40,50,70,100]
    const q3num1 = q3arr1[randomGenerator.randomInt(0,q3arr1.length-1)]
    const q3Answer = Math.round(((q3num1 /10) * .16+ Number.EPSILON) * 100) / 100
    questions.push(createGameQuestion(
        {
            en: 'You can buy one tablespoon of powdered sugar for $0.16. If you want to make ' + q3num1 + ' servings of lemon vanilla cake, how much money do you need to buy enough powdered sugar?',
            es: 'Puedes comprar una cucharada de azúcar en polvo por $0.16. Si quieres hacer ' + q3num1 + ' porciones de pastel de vainilla de limón, ¿cuánto dinero necesitas para comprar suficiente azúcar en polvo?'
        },
        q3Answer,
        [
            {
                en: 'Cups sugar per 1 serving = recipe cups / recipe servings\nTotal cups sugar = Cups sugar per 1 serving * number of servings\nTotal tbsp sugar = total cups sugar * tbsp per 1 cup\nTotal cost = total tbsp sugar * price per 1 tbsp',
                es: 'Tazas de azúcar por 1 porción = tazas de receta / porciones de receta\nTazas totales de azúcar = Tazas de azúcar por 1 porción * número de porciones\nCucharadas totales de azúcar = tazas totales de azúcar * cucharadas por 1 taza\nCosto total = cucharadas totales de azúcar * precio por 1 cucharada'
            },
            {
                en: 'Cups sugar per 1 serving = 1 / 10 = 0.10\nTotal cups sugar = 0.10 * '+q3num1+' = “x”\nTotal tbsp sugar = “x” * 16 = “y”\nTotal cost = “y” * 0.16 = Answer',
                es: 'Tazas de azúcar por 1 porción = 1 / 10 = 0.10\nTazas totales de azúcar = 0.10 * '+q3num1+' = “x”\nCucharadas totales de azúcar = “x” * 16 = “y”\nCosto total = “y” * 0.16 = Respuesta'
            }
        ],
        'money',
        null,
        null
    ))
}

const tomatilloSauceAndTortillaChipsQuestions = (questions,recipe,randomGenerator) => {
    const q1num1 = randomGenerator.randomInt(4,8)
    const q1Answer = Math.ceil((q1num1/.89) *12)
    questions.push(createGameQuestion(
        {
            en: 'You only have $'+q1num1+' to spend on garlic. One garlic bulb has 12 garlic cloves and costs $0.89 each. How many garlic cloves can you buy? Round down to the nearest whole number.',
            es: 'Solo tienes $'+q1num1+' para gastar en ajo. Un bulbo de ajo tiene 12 dientes de ajo y cuesta $0.89 cada uno. ¿Cuántos dientes de ajo puedes comprar? Redondea al número entero más cercano.'
        },
        q1Answer,
        [
            {
                en: 'Total bulbs = budget / price per 1 bulb\nTotal cloves = Total bulbs * cloves per 1 bulb',                
                es: 'Bulbos totales = presupuesto / precio por 1 bulbo\nDientes totales = Bulbos totales * dientes por 1 bulbo'
            },
            {
                en: 'Total bulbs = '+q1num1+' / 0.89 = “x”\nTotal cloves = “x” * 12 = ' + q1Answer,
                es: 'Bulbos totales = '+q1num1+' / 0.89 = “x”\nDientes totales = “x” * 12 = ' + q1Answer
            }
        ],
        'wholeNumber',
        null,
        null
    ))

    const q2num1 = randomGenerator.randomInt(10,21)
    const q2Answer = Math.round((q2num1 * 1.56 + Number.EPSILON) * 100) / 100
    questions.push(createGameQuestion(
        {
            en: 'You need to buy tomatillos for this recipe and you have $'+q2num1+' to spend. If tomatillos cost $1.56 per pound, how many pounds of tomatillos can you buy? Round down to the nearest tenth.',
            es: 'Necesitas comprar tomatillos para esta receta y tienes $'+q2num1+' para gastar. Si los tomatillos cuestan $1.56 por libra, ¿cuántas libras de tomatillos puedes comprar? Redondea al décimo más cercano.'

        },
        q2Answer,
        [
            {
                en: 'Total pounds = budget / price per pound',
                es: 'Libras totales = presupuesto / precio por libra'
            },
            {
                en: 'Total pounds = '+q2num1+' / 1.56 = ' + q2Answer,
                es: 'Libras totales = '+q2num1+' / 1.56 = ' + q2Answer
            }
        ],
        'money',
        null,
        null
    ))
}

const mangoJuiceQuestions = (questions,recipe,randomGenerator) => {
}

const OJCitrusCoolerQuestions = (questions,recipe,randomGenerator) => {
}

const lentilSoupQuestions = (questions,recipe,randomGenerator) => {
}

export default generateLevel3Questions
