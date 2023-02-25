//Generate questions with the order state
import createGameQuestion from '@utils/game/create_game_question.js'
import getMenu from "@utils/game/restaurant/get_menu";
import menu from "@components/game/restuarant/Menu";

function generateOrderQuestions(order) {
    var questions = [];
    if(!order) {
        return [createGameQuestion()];
    }
    const total = order.entree.price + order.drink.price + order.dessert.price

    const sortedOrder = Object.values(order).sort(
       (p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0
    );
    
    console.log(sortedOrder)
    questions[0] = createGameQuestion(
        {
            en:"How much was your order?",
            es:"¿Cuánto es el total?",
        },
        total,
        [],
        "money"
    )


    questions[1] = createGameQuestion(
        {
            en:"How much is the total if you remove the most expensive item?",
            es:"¿Cuánto es el total si no compras el plato más caro?",
        },
        total - sortedOrder[0].price,
        [],
        "money"
    )
    questions[2] = createGameQuestion(
        {
            en:"How much is your total if you remove the least expensive item?",
            es:"¿Cuánto es el total si no compras el plato más barato?",
        },
        total - sortedOrder[2].price,
        [],
        "money"
    )

    questions[3] = createGameQuestion(
        {
            en:"Elena’s friend, Alex, joins you at the table. If all three of you order the same entrée, " + order.entree.en + " what is the total cost of all entrées?",
            es:"Missing ES translation.",
        },
        order.entree.price * 3,
        [],
        "money"
    )

    questions[4] = createGameQuestion(
        {
            en:"Elena’s friend, Alex, joins you at the table. If all three of you order the same drink, " + order.drink.en + " what is the total cost of all drinks?",
            es:"Missing ES translation.",
        },
        order.drink.price * 3,
        [],
        "money"
    )

    questions[5] = createGameQuestion(
        {
            en:"Elena’s friend, Alex, joins you at the table. If all three of you order the same dessert, " + order.dessert.en + " what is the total cost of all desserts?",
            es:"Missing ES translation.",
        },
        order.dessert.price * 3,
        [],
        "money"
    )

    let randomValue = getRandomInt(1, 10);
    questions[6] = createGameQuestion(
        {
            en:"If you buy your entrée " + randomValue + (randomValue === 1 ? " time" : " times") + ", how much money did you spend in total?",
            es:"Missing ES translation.",
        },
        order.entree.price * randomValue,
        [],
        "money"
    )

    randomValue = getRandomInt(1, 10);
    questions[7] = createGameQuestion(
        {
            en:"If you buy your drink " + randomValue + (randomValue === 1 ? " time" : " times") + ", how much money did you spend in total?",
            es:"Missing ES translation.",
        },
        order.drink.price * randomValue,
        [],
        "money"
    )

    randomValue = getRandomInt(1, 10);
    questions[8] = createGameQuestion(
        {
            en:"If you buy your dessert " + randomValue + (randomValue === 1 ? " time" : " times") + ", how much money did you spend in total?",
            es:"Missing ES translation.",
        },
        order.dessert.price * randomValue,
        [],
        "money"
    )

    questions[9] = createGameQuestion(
        {
            en:"How much will you pay for your entrée, " + order.entree.en + ", if you share half of it with Elena and split the cost evenly?",
            es:"Missing ES translation.",
        },
        order.entree.price / 2,
        [],
        "money"
    )
    questions[10] = createGameQuestion(
        {
            en:"How much will you pay for your drink, " + order.drink.en + ", if you share half of it with Elena and split the cost evenly?",
            es:"Missing ES translation.",
        },
        order.drink.price / 2,
        [],
        "money"
    )
    questions[11] = createGameQuestion(
        {
            en:"How much will you pay for your dessert, " + order.dessert.en + ", if you share half of it with Elena and split the cost evenly?",
            es:"Missing ES translation.",
        },
        order.dessert.price / 2,
        [],
        "money"
    )

    randomValue = getRandomInt(1, 10);
    let secondRandomValue = getRandomInt(10, 30);
    questions[12] = createGameQuestion(
        {
            en:"Elena’s budget is " + secondRandomValue + " dollars. If her entrée costs " + randomValue + (randomValue === 1 ? " dollar" : " dollars") +
                ", how many entrees can she buy? ",
            es:"Missing ES translation.",
        },
        Math.floor(secondRandomValue / randomValue),
        [],
    )

    secondRandomValue = getRandomInt(10, 30);
    questions[13] = createGameQuestion(
        {
            en:"Your budget is now " + secondRandomValue + " dollars. If you order the " + order.drink.price + " " + order.drink.en +
                " and " + order.dessert.price + " " + order.dessert.en +  ", how much money do you have left over?",
            es:"Missing ES translation.",
        },
        secondRandomValue - (order.dessert.price + order.drink.price),
        [],
    )

    randomValue = getRandomInt(1, 10);
    secondRandomValue = getRandomInt(10, 30);
    questions[14] = createGameQuestion(
        {
            en:"If your budget is " + secondRandomValue + " dollars, how many" + randomValue + "dollar drinks can you order? ",
            es:"Missing ES translation.",
        },
        Math.floor(secondRandomValue / randomValue),
        [],
    )
    return questions
}

function getRandomInt(min, max) {
    //inclusive to min &  max, will keep generating a number until it fits in the range of min <= num <= max
    let randVar = Math.floor(Math.random() * (max + 1));
    while(randVar < min){
        randVar = Math.floor(Math.random() * (max + 1));
    }
    return randVar;
}


export default generateOrderQuestions