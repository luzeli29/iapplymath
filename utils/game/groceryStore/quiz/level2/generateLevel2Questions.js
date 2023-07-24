import createGameQuestion, { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion"
import { GenerateFriendContainerQuestion } from "@utils/game/recipes/questionGeneration/containerQuestionGenerators"

const recipesQuizzedOn = 2
const triples = [6,9,12,15,18,21,24,27,30]

const generateLevel2Questions = (recipes,questionType,randomGenerator) => {
    let questions = []
    Object.keys(recipes).forEach((recipeKey, index) => {
        switch(recipeKey) {
            case 'ricePudding':
                // ricePuddingQuestions(questions,recipes[recipeKey],randomGenerator)
                fruitSaladQuestions(questions,recipes['fruitSalad'],randomGenerator)

                break;
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
                // carrotJuiceQuestions(questions,recipes[recipeKey],randomGenerator)
                fruitSaladQuestions(questions,recipes['fruitSalad'],randomGenerator)
                break
            case 'fruitSalad':
                fruitSaladQuestions(questions,recipes[recipeKey],randomGenerator)
                break
            case 'chocolateBananaCake':
                // chocolateBananaCakeQuestions(questions,recipes[recipeKey],randomGenerator)
                fruitSaladQuestions(questions,recipes['fruitSalad'],randomGenerator)
                
                break
            default:
                questions.push(ErrorQuestion)
        }
    })
     return questions
}

const ricePuddingQuestions = (questions,recipe,randomGenerator) => {
    // 3 brand compare question -WONT DO
    //Unit price question
    //Cheapest Brand different size Question
    //Unit price sale question
}

const peruvianFriedRiceQuestions = (questions,recipe,randomGenerator) => {
    // 3 brand compare question -WONT DO
    //Unit price question
    //Cheapest Brand different size Question
    //Unit price sale question
    //Unit price question



    questions.push(createGameQuestion(
        {
            en: `You are shopping for a special dinner. Your family has decided to make Peruvian fried rice (PFR) and rice pudding (RP) for 24 people. How many total ounces of rice will you need to purchase at the grocery store to make both recipes for everyone? 1 cup of rice is equal to 8 oz.`,
            es: ``
        },
        152,
        [
            {
                en: 'Cups rice for PFR = cups per recipe * # recipes for 24 people \n Cups rice for RP = cups per recipe * # recipes for 24 people \n Total cups of rice = Cups rice for PFR + Cups rice for RP \n Total ounces = Total cups of rice * ounces per 1 cup of rice \n',
                es: ''
            },
            {
                en: 'Solution: Cups rice for PFR = 2 * 8 = 16 \n Cups rice for RP = 1 * 3 = 3 \n Total cups of rice = 16 + 3 = 19 \n Total ounces = 19 * 8 = 152 ounces \n ',
                es: ''
 
             },
        ],
        'wholeNumber',
        null,
        null
    ))

    const q2NumList1 = [40,60,80]
    const q2num1 = q2NumList1[randomGenerator.randomInt(0, 2)]

    const q2NumList2 = [58,60,66]
    const q2num2 = q2NumList2[randomGenerator.randomInt(0, 2)]

    const q2NumList3 = [64,68,72]
    const q2num3 = q2NumList3[randomGenerator.randomInt(0, 2)]
    

    const q2ValA = q2num1 * (1/4)
    const q2ValB = q2num2 * (1/2)
    const q2ValC = q2num3 * (3/4)

    const q2Answer = q2ValC

    questions.push(createGameQuestion(
        {
            en: `You found 3 rice brands at the store. Each brand has a different package size. How many total cups of rice does the largest package size have? \n Happy Farm Rice: ${q2num1} servings of ¼ cups \n Fancy Farm Rice: ${q2num2} servings of ½ cups \n Special Farm Rice: ${q2num3} servings of ¾ cups \n`,
            es: ``
        },
        q2Answer,
        [
            {
                en: 'Total Cups Rice = # servings * cups per 1 serving \n Calculate for all brands and compare each amount to find the largest size',
                es: ''
            },
            {
                en: 'Total Cups Happy Farm = [40,60,80] * 1/4 = Value A \n Total Cups Fancy Farm = [58,60,66] * 1/2 = Value B \n Total Cups Special Farm = [64,68,72] * 3/4 = Value C \n Value C will always be the largest and correct answer.',
                es: ''
 
             },
        ],
        'wholeNumber',
        null,
        null
    ))


    const q3NumList1 = [3.29, 4.39, 4.59, 4.95]
    const q3num1 = q3NumList1[randomGenerator.randomInt(0, q3NumList1.length - 1)]

    const q3num2 = randomGenerator.randomInt(10, 20)
    const q3Answer = q3num1 * q3num2

    questions.push(createGameQuestion(
        {
            en: `Happy Farm sells rice bags for ${q3num1} dollars each. How much money will you spend if you need to buy ${q3num2} bags?`,
            es: ``
        },
        q3Answer,
        [
            {
                en: 'Total Cups Rice = # servings * cups per 1 serving \n Calculate for all brands and compare each amount to find the largest size',
                es: 'Total cost = price per bag * bags needed '
            },
            {
                en: `Total cost = ${q3num1} * ${q3num2} = Answer`,
                es: ''
 
             },
        ],
        'wholeNumber',
        null,
        null
    ))



    questions.push(createGameQuestion(
        {
            en: `The 3 rice brands at the grocery store sell their rice in bags of different sizes. The prices and weights of each brand are listed below. What is the price per unit of the cheapest rice brand? Round your answer to the nearest hundredth (cent).`,
            es: ``
        },
        0.25, 
        [
            {
                en: 'Unit price = price for 1 bag / measurement unit',
                es: ''
            },
            {
                en: 'Happy Farm Unit Price = 3.49 / 12 = $0.29 / oz.\nSpecial Farm Unit Price = 4.29 / 16 = $0.27 / oz.\nFancy Farm Unit Price = 4.99 / 20 = $0.25 / oz.',
                es: ''
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
            es: ``
        },
        q5Answer,
        [
            {
                en: 'Buy-one-get-one-free sales mean that you can buy 2 items for the price of 1.\nMoney saved = price for 2 items - price for 1 item',
                es: ''
            },
            {
                en: `Happy Farm money saved = (${q5num} * 2) - ${q5num} = ${q5Answer}`,
                es: ''
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
            es: ``
        },
        q6Answer,
        [
            {
                en: 'Unit price = total price / measurement unit',
                es: ''
            },
            {
                en: `Chicken Farm Unit Price = ${q6Price} / ${q6num} = $${q6Answer} per 1 chicken breast`,
                es: ''
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
            es: ``
        },
        q7Answer,
        [
            {
                en: 'Unit price = total price / measurement unit',
                es: ''
            },
            {
                en: `Chicken Farm Unit Price = [${q7PriceRange[0]}-${q7PriceRange[1]}] / [${q7NumRange[0]}-${q7NumRange[1]}] = $${q7Answer}`,
                es: ''
            },
        ],
        'decimal',
        null,
        null
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
            es: ``
        },
        q9TotalMilkGallons,
        [
            {
                en: 'Milk cups for 1 serving = recipe milk cups / recipe servings \n Total milk cups = Milk cups for 1 serving * total servings \n Total milk gallons = total milk cups / cups of milk in 1 gallon',
                es: ''
            },
            {
                en: `Solution: Milk cups for 1 serving = 1 / 2 = ½ \n Total milk cups = 1/2 * ${q9TotalServings} = ${q9TotalMilkCups} \n Total milk gallons = ${q9TotalMilkCups} / 16 = ${q9TotalMilkGallons} (rounded)`,
                es: ''
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
            es: ``
        },
        [q10Answer1, q10Answer2],
        [
            {
                en: 'Unit price = total price / measurement unit',
                es: ''
            },
            {
                en: `Happy Farm Unit Price = [${q10PriceList1.join('-')}] / [${q10NumList1.join('-')}] = ${q10Answer1}\nSweet Farm Unit Price = [${q10PriceRange2.join('-')}] / [${q10NumRange2.join('-')}] = ${q10Answer2}`,
                es: ''
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
            es: ``
        },
        q11Answer,
        [
            {
                en: 'Total cups = # cakes * cups per 1 cake \n Total sticks = total cups / cups per 1 stick \n Total packs = total sticks / sticks per 1 pack',
                es: ''
            },
            {
                en: `Total cups = ${q11num} * 1/4 = ${q11TotalCups} \n Total sticks = ${q11TotalCups} / 1/2 = ${q11TotalSticks} \n Total packs = ${q11TotalSticks} / 4 = ${q11Answer} (rounded)`,
                es: ''
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
            es: ``
        },
        q12Answer,
        [
            {
                en: 'Total boxes = servings needed / recipe servings',
                es: ''
            },
            {
                en: `Total Boxes = ${q12num} / 12 = ${q12num / 12} \n Happy Cake Mix = $1.5 per box * ${q12num / 12} = ${q12HappyCakePrice * q12num} \n Special Cake Mix = $6 per box * ${q12num / 12} = ${q12SpecialCakePrice * q12num}`,
                es: ''
            },
        ],
        'decimal',
        null,
        null
    ));
}


const carrotJuiceQuestions = (questions,recipe,randomGenerator) => {
    const q1Arr = [3,4,6,12]
    questions.push(GenerateFriendContainerQuestion(
        recipe,
        0,
        triples[randomGenerator.randomInt(0,triples.length-1)],
        q1Arr[randomGenerator.randomInt(0,q1Arr.length-1)]))
    //graph question
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
            en: `A container of mixed berries has 2 ½ cups of berries. If one container costs $${q15Price}, how much money will it cost to buy berries to make ${q15ServingsNeeded} fruit salads?`,
            es: ``
        },
        q15Answer,
        [
            {
                en: 'Total cups = cups per 1 serving * servings needed \n Total containers = total cups / cups per 1 container (round up to nearest whole number) \n Total price = total containers * price per 1 container',
                es: ''
            },
            {
                en: `Total cups = ${q15Cups} * ${q15ServingsNeeded} = ${q15TotalCups} \n Total containers = ${q15TotalCups} / 2.5 = ${q15TotalContainers} (rounded up) \n Total price = ${q15TotalContainers} * $${q15Price} = ${q15Answer}`,
                es: ''
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
            es: ``
        },
        q16TotalFruitSalads,
        [
            {
                en: 'Total containers = budget / price per 1 container \n Total kiwis = total containers * kiwis per 1 container \n Total fruit salads = Total kiwis / kiwis per 1 fruit salad',
                es: ''
            },
            {
                en: `Total containers = $${q16Budget} / $${q16Price} = ${q16TotalContainers} \n Total kiwis = ${q16TotalContainers} * 5 = ${q16TotalKiwis} \n Total fruit salads = ${q16TotalKiwis} / 0.5 = ${q16TotalFruitSalads}`,
                es: ''
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
            es: ``
        },
        q17Answer,
        [
            {
                en: 'Price per pound = total price / total pounds',
                es: ''
            },
            {
                en: `Price per pound = $${q17Price} / ${q17Pounds} = ${q17Answer.toFixed(2)}`, // To round the answer to 2 decimal places
                es: ''
            },
        ],
        'decimal',
        null,
        null
    ));
}


const chocolateBananaCakeQuestions = (questions,recipe,randomGenerator) => {
    //Unit price sale question
    //Friend unit conversion question
}

export default generateLevel2Questions
