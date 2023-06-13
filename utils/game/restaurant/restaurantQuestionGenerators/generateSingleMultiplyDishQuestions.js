import getText from '@utils/text/getText'
import createGameQuestion from '@utils/game/quiz/questionGeneration/createGameQuestion'

function generateLevel1BQuestions(dishes,order){
    let generatedQuestions = [];
    let random = Math.floor(Math.random() * dishes.length);
    let answer = 0;
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    // question 1

    // Elena ordered the same [entree/drink/dessert] as you. What is the total cost of the two [entrees/drinks/desserts]?

    // choose a random dish
    let randomDishName = dishes[random];
    let randomDishNameEnglish = translations[randomDishName].en
    let randomDishNameSpanish = translations[randomDishName].es

    // get the price of said dish
    let priceOfDish = order[randomDishName].price;

    // answer
    answer = parseInt(priceOfDish) * 2;

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Elena ordered the same ${randomDishNameEnglish} as you. What is the total cost of the two ${randomDishNameEnglish}?`,
            es:`Elena ordenó el mismo ${randomDishNameSpanish} que tú. ¿Cuál es el costo total de los dos ${randomDishNameSpanish}?`,
        },
        answer,
        [],
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
        [],
        "wholeNumber",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        // bonus question 

        // Elena’s mother and father did not want a dessert. What is the total cost for Elena’s order after removing her parents’ desserts? 

        // get the price of the dessert
        priceOfDessert = order["dessert"].price;

        // answer
        answer = answer - (parseInt(priceOfDessert) * 2);

        // create question
        generatedQuestions.push(createGameQuestion(
            {
                en:`Elena’s mother and father did not want a dessert. What is the total cost for Elena’s order after removing her parents’ desserts?`,
                es:`La madre y el padre de Elena no querían un postre. ¿Cuál es el costo total del pedido de Elena después de quitar los postres de sus padres?`,
            },
            answer,
            [],
            "wholeNumber",
        ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        
    return generatedQuestions;

}





export default function generateSingleMultiplyDishQuestions(order,randomGenerator, level) {
    const numbOfQuestionsNeeded = 3
    let questions = []

    for(let i = 0; i < numbOfQuestionsNeeded; i++) {
        let question = generateSingleMultiplyQuestion(order,level,randomGenerator)
        questions.push(question)
    }

    return questions
}





function generateSingleMultiplyQuestion(order,level,randomGenerator) {

    let questions = [];
    let dishes = ["mainDish","drink","dessert"];

    if(level === 1) {

        let generatedQuestions = generateLevel1BQuestions(dishes,order);
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
