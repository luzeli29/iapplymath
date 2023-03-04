//Generate questions with the order state
import createGameQuestion from '@utils/game/create_game_question.js'

function generateOrderQuestions(order) {
    var questions = [];
    if(!order) {
        return [createGameQuestion()];
    }

    const total = order.entree.price + order.drink.price + order.dessert.price

    const sortedOrder = Object.values(order).sort(
       (p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0);

    questions[0] = createGameQuestion(
        {
            en:"How much was your order?",
            es:"¿Cuánto es el total?",
        },
        total,
        [],
        "decimal"
    )


    questions[1] = createGameQuestion(
        {
            en:"How much is the total if you remove the most expensive item?",
            es:"¿Cuánto es el total si no compras el plato más caro?",
        },
        total - sortedOrder[0].price,
        [],
        "decimal"
    )
    questions[2] = createGameQuestion(
        {
            en:"How much is your total if you remove the least expensive item?",
            es:"¿Cuánto es el total si no compras el plato más barato?",
        },
        total - sortedOrder[2].price,
        [],
        "decimal"
    )

    questions[3] = createGameQuestion(
        {
            en:"Elena’s friend, Alex, joins you at the table. If all three of you order the same entrée, " + order.entree.en + ", what is the total cost of all entrées?",
            es:"El amigo de Elena, Alex, se une a ti en la mesa. Si los tres piden la misma entrada, " + order.entree.es + ", ¿cuál es el costo total de todas las entradas?",
        },
        order.entree.price * 3,
        [{
            en: "(" + order.entree.en + ") + (" + order.entree.en + ") + (" + order.entree.en + ") = ???",
            es: "(" + order.entree.es + ") + (" + order.entree.es + ") + (" + order.entree.es + ") = ???",
        },{
            en: "(" + order.entree.en + ") + (" + order.entree.en + ") + (" + order.entree.en + ") = " + order.entree.price * 3,
            es: "(" + order.entree.es + ") + (" + order.entree.es + ") + (" + order.entree.es + ") = " + order.entree.price * 3,
        }],
        "decimal"
    )

    questions[4] = createGameQuestion(
        {
            en:"Elena’s friend, Alex, joins you at the table. If all three of you order the same drink, " + order.drink.en + " , what is the total cost of all drinks?",
            es:"El amigo de Elena, Alex, se une a ti en la mesa. Si los tres piden la misma bebida, " + order.drink.es + ", ¿cuál es el costo total de todas las bebidas?",
        },
        order.drink.price * 3,
        [{
            en: "(" + order.drink.en + ") x 3 = ???",
            es: "(" + order.drink.es + ") x 3 = ???",
        },{
            en: "(" + order.drink.en + ") x 3 = " + order.drink.price * 3,
            es: "(" + order.drink.es + ") x 3 = " + order.drink.price * 3,
        }],
        "decimal"
    )

    questions[5] = createGameQuestion(
        {
            en:"Elena’s friend, Alex, joins you at the table. If all three of you order the same dessert, " + order.dessert.en + ", what is the total cost of all desserts?",
            es:"El amigo de Elena, Alex, se une a ti en la mesa. Si los tres piden el mismo postre, " + order.dessert.es + ", ¿cuál es el costo total de todos los postres?",
        },
        order.dessert.price * 3,
        [{
            en: "(" + order.dessert.en + ") x 3 = ???",
            es: "(" + order.dessert.es + ") x 3 = ???",
        },{
            en: "(" + order.dessert.en + ") x 3 = " + order.dessert.price * 3,
            es: "(" + order.dessert.es + ") x 3 = " + order.dessert.price * 3,
        }],
        "decimal"
    )

    let randomValue = getRandomInt(1, 10);
    questions[6] = createGameQuestion(
        {
            en:"If you buy your entrée, " + order.entree.en + ", " + randomValue + (randomValue === 1 ? " time" : " times") + ", how much money did you spend in total?",
            es:"Si compra su entrada, " + order.entree.es + ", " + randomValue + (randomValue === 1 ? "vez" : " veces") + ", ¿cuánto dinero gastó en total?",
        },
        order.entree.price * randomValue,
        [{
            en: "(" + order.entree.en + ") x " + randomValue + " = ???",
            es: "(" + order.entree.es + ") x " + randomValue + " = ???",
        },{
            en: "(" + order.entree.en + ") x " + randomValue + " = " + order.entree.price * randomValue,
            es: "(" + order.entree.es + ") x " + randomValue + " = " + order.entree.price * randomValue,
        }],
        "decimal"
    )

    randomValue = getRandomInt(1, 10);
    questions[7] = createGameQuestion(
        {
            en:"If you buy your drink, " + order.drink.en + ", " + randomValue + (randomValue === 1 ? " time" : " times") + ", how much money did you spend in total?",
            es:"Si compra su bebida, " + order.drink.es + ", " + randomValue + (randomValue === 1 ? "vez" : " veces") + ", ¿cuánto dinero gastó en total?",
        },
        order.drink.price * randomValue,
        [{
            en: "(" + order.drink.en + ") x " + randomValue + " = ???",
            es: "(" + order.drink.es + ") x " + randomValue + " = ???",
        },{
            en: "(" + order.drink.en + ") x " + randomValue + " = " + order.drink.price * randomValue,
            es: "(" + order.drink.es + ") x " + randomValue + " = " + order.drink.price * randomValue,
        }],
        "decimal"
    )

    randomValue = getRandomInt(1, 10);
    questions[8] = createGameQuestion(
        {
            en:"If you buy your dessert, " + order.dessert.en + ", " + randomValue + (randomValue === 1 ? " time" : " times") + ", how much money did you spend in total?",
            es:"Si compra su postre, " + order.dessert.es + ", " + randomValue + (randomValue === 1 ? "vez" : " veces") + ", ¿cuánto dinero gastó en total?",
        },
        order.dessert.price * randomValue,
        [{
            en: "(" + order.dessert.en + ") x " + randomValue + " = ???",
            es: "(" + order.dessert.es + ") x " + randomValue + " = ???",
        },{
            en: "(" + order.dessert.en + ") x " + randomValue + " = " + order.dessert.price * randomValue,
            es: "(" + order.dessert.es + ") x " + randomValue + " = " + order.dessert.price * randomValue,
        }],
        "decimal"
    )

    questions[9] = createGameQuestion(
        {
            en:"How much will you pay for your entrée, " + order.entree.en + ", if you share half of it with Elena and split the cost evenly?",
            es:"¿Cuánto pagará por su entrada, " + order.entree.es + ", si comparte la mitad con Elena y divide el costo en partes iguales?",
        },
        order.entree.price / 2,
        [{
            en: "(" + order.entree.en + ") ÷ 2 = ???",
            es: "(" + order.entree.es + ") ÷ 2 = ???",
        },{
            en: "(" + order.entree.en + ") ÷ 2 = " + order.entree.price / 2,
            es: "(" + order.entree.es + ") ÷ 2 = " + order.entree.price / 2,
        }],
        "decimal"
    )
    questions[10] = createGameQuestion(
        {
            en:"How much will you pay for your drink, " + order.drink.en + ", if you share half of it with Elena and split the cost evenly?",
            es:"¿Cuánto pagará por su bebida, " + order.drink.es + ", si comparte la mitad con Elena y divide el costo en partes iguales?",
        },
        order.drink.price / 2,
        [{
            en: "(" + order.drink.en + ") ÷ 2 = ???",
            es: "(" + order.drink.es + ") ÷ 2 = ???",
        },{
            en: "(" + order.drink.en + ") ÷ 2 = " + order.drink.price / 2,
            es: "(" + order.drink.es + ") ÷ 2 = " + order.drink.price / 2,
        }],
        "decimal"
    )
    questions[11] = createGameQuestion(
        {
            en:"How much will you pay for your dessert, " + order.dessert.en + ", if you share half of it with Elena and split the cost evenly?",
            es:"¿Cuánto pagará por su postre, " + order.dessert.es + ", si comparte la mitad con Elena y divide el costo en partes iguales?",
        },
        order.dessert.price / 2,
        [{
            en: "(" + order.dessert.en + ") ÷ 2 = ???",
            es: "(" + order.dessert.es + ") ÷ 2 = ???",
        },{
            en: "(" + order.dessert.en + ") ÷ 2 = " + order.dessert.price / 2,
            es: "(" + order.dessert.es + ") ÷ 2 = " + order.dessert.price / 2,
        }],
        "decimal"
    )

    randomValue = getRandomInt(1, 10);
    let secondRandomValue = getRandomInt(10, 30);
    questions[12] = createGameQuestion(
        {
            en:"Elena’s budget is " + secondRandomValue + " dollars. If her entrée costs " + randomValue + (randomValue === 1 ? " dollar" : " dollars") +
                ", how many entrees can she buy? ",
            es:"El presupuesto de Elena es " + secondRandomValue + " dólares. Si su entrada cuesta  " + randomValue + (randomValue === 1 ? " dólar" : " dólares") +
                ", ¿cuántas entradas puede comprar?",
        },
        Math.floor(secondRandomValue / randomValue),
        [{
            en: secondRandomValue + " ÷ " + randomValue + " = ???",
            es: secondRandomValue + " ÷ " + randomValue + " = ???",
        },{
            en: secondRandomValue + " ÷ " + randomValue + " = " + Math.floor(secondRandomValue / randomValue),
            es: secondRandomValue + " ÷ " + randomValue + " = " + Math.floor(secondRandomValue / randomValue),
        }],
        "decimal"
    )

    secondRandomValue = getRandomInt(10, 30);
    questions[13] = createGameQuestion(
        {
            en:"Your budget is now " + secondRandomValue + " dollars. If you order the $" + order.drink.price + " " + order.drink.en +
                " and $" + order.dessert.price + " " + order.dessert.en +  ", how much money do you have left over?",
            es:"Su presupesto es ahora "  + secondRandomValue + " dólares. Si ordena la bebida de " + order.drink.price + " dólares y el postre de " + order.dessert.price + "dólares, " +
                "¿cuánto dinero le sobra?"
            ,
        },
        secondRandomValue - (order.dessert.price + order.drink.price),
        [{
            en: secondRandomValue + " - ((" + order.drink.en + " + (" + order.dessert.en + ")) = ???",
            es: secondRandomValue + " - ((" + order.drink.es + " + (" + order.dessert.es + ")) = ???",
        },{
            en: secondRandomValue + " - (" + order.drink.en + " + " + order.dessert.en + ") = " + (secondRandomValue - (order.dessert.price + order.drink.price)),
            es: secondRandomValue + " - (" + order.drink.es + " + " + order.dessert.es + ") = " + (secondRandomValue - (order.dessert.price + order.drink.price)),
        }],
        "decimal"
    )

    randomValue = getRandomInt(1, 10);
    secondRandomValue = getRandomInt(10, 30);
    questions[14] = createGameQuestion(
        {
            en:"If your budget is " + secondRandomValue + " dollars, how many " + randomValue + " dollar drinks can you order? ",
            es:"Si su presupuesto es " + secondRandomValue + " dólares, ¿cuántas bebidas en dólares " + randomValue + " puede pedir?",
        },
        Math.floor(secondRandomValue / randomValue),
        [{
            en: secondRandomValue + " ÷ " + randomValue + " = ???",
            es: secondRandomValue + " ÷ " + randomValue + " = ???",
        },{
            en: secondRandomValue + " ÷ " + randomValue + " = " + Math.floor(secondRandomValue / randomValue),
            es: secondRandomValue + " ÷ " + randomValue + " = " + Math.floor(secondRandomValue / randomValue),
        }],
        "decimal"
    )

    randomValue = getRandomInt(2, 10);
    questions[15] = createGameQuestion(
        {
            en:"How much will you pay for the entrée," + order.entree.en + ", if you share it with " + randomValue + " friends and you all equally split the cost?",
            es:"¿Cuánto pagará por el plato principal, " + order.entree.es + ", si lo comparte con " + randomValue + " amigos y todos dividen el costo por igual?",
        },
        order.entree.price / (randomValue + 1),
        [{
            en: "(" + order.entree.en + ") ÷ (Total number of people) = ???",
            es: "(" + order.entree.es + ") ÷ (Número total de personas) = ???",
        },{
            en: "(" + order.entree.en + ") ÷ (" + randomValue + " + 1) = " + (order.entree.price / (randomValue + 1)),
            es: "(" + order.entree.es + ") ÷ (" + randomValue + " + 1) = " + (order.entree.price / (randomValue + 1)),
        }],
        "decimal"
    )

    randomValue = getRandomInt(10, 30);
    secondRandomValue = getRandomInt(1, 10);
    questions[16] = createGameQuestion(
        {
            en:"Elena’s budget is " + randomValue + " dollars. She orders the $" + order.drink.price + " " +
                order.drink.en + " and the $" + order.dessert.price + " " +
                order.dessert.en + ". How many entrees can she buy if the entrée costs " + secondRandomValue + (secondRandomValue === 1 ? " dollar?" : " dollars?"),
            es:"El presupuesto de Elena es " + randomValue + " dólares. Ella ordena la bebida de " + order.drink.price + " dólares y el postre de " + order.dessert.price +" dólares. " +
                "¿Cuántas entradas puede comprar si la entrada cuesta " + secondRandomValue + (secondRandomValue === 1 ? " dólar?" : " dólares?"),
        },
        Math.floor((randomValue - (order.drink.price + order.dessert.price)) / secondRandomValue),
        [{
            en: "Elena's new budget = " + randomValue + " -  ((" + order.drink.en + ") + (" + order.dessert.price + "))",
            es: "Nuevo presupuesto de Elena = " + randomValue + " -  ((" + order.drink.es + ") + (" + order.dessert.price + "))" ,
        },{
            en: "Elena’s New Budget ÷ Entrée Cost (round down to the nearest entrée) = " + Math.floor((randomValue - (order.drink.price + order.dessert.price)) / secondRandomValue),
            es: "Nuevo presupuesto de Elena ÷ Costo de la entrada (redondear hacia abajo al plato principal más cercano) = " + Math.floor((randomValue - (order.drink.price + order.dessert.price)) / secondRandomValue),
        }],
        "decimal"
    )
    return questions

}

function getRandomInt(min, max) {
    //inclusive to min &  max, will keep generating a number until it fits in the range of min <= num <= max
    let randVar = Math.floor(Math.random() * (max + 1));
    while (randVar < min) {
        randVar = Math.floor(Math.random() * (max + 1));
    }
    return randVar;
}

export default generateOrderQuestions