import createGameQuestion from '@utils/game/quiz/questionGeneration/createGameQuestion'


export default function generateBasicOrderQuestions(order, level) {

    let questions = []
    let dishes = ["mainDish", "drink", "dessert"]; 
    let random = Math.floor(Math.random() * dishes.length)
    let random_2 = Math.floor(Math.random() * 10)
    let total = 0


    if (level === '1') {
        total = parseInt(order[dishes[random]].price) * 3
        questions.push(createGameQuestion(
            {
                en:`Elena’s friend, Alex, joins you at the table. If all three of you order the same ${dishes[random]}, what is the total cost of all ${dishes[random]}? `,
                es:`El amigo de Elena, Alex, se une a ti en la mesa. Si los tres piden lo mismo  ${dishes[random]}, ¿cuál es el costo total de todas las ${dishes[random]}?`,
            },
            total,
            [],
            "wholeNumber",
        ))

        total = parseInt(order[dishes[random]].price) * random_2
        questions.push(createGameQuestion(
            {
                en:`If you buy your ${dishes[random]} ${random_2} times, how much money did you spend in total?`,
                es: `Si compra su  ${dishes[random]} ${random_2} por, ¿cuánto dinero gastó en total?`,
            },
            total,
            [],
            "wholeNumber",
        ))

        total = (order.mainDish.price) / 2



        questions.push(createGameQuestion(
            {
                en: `How much will you pay for your main dish if you share half of it with Elena and split the cost evenly? `,
                es: `¿Cuánto pagará por su entrada si comparte la mitad con Elena y divide el costo en partes iguales?`,
            },
            total,
            [],
            "decimal",
        ))

        random = Math.floor(Math.random() * 20)
        random_2 = Math.floor(Math.random() * 20)
        total = (parseInt(order.mainDish.price) * random) + parseInt(order.dessert.price) * random_2
        questions.push(createGameQuestion(
            {
                en: `Take a look at your order, how much will your new total be if you ordered ${random} entrees and ${random_2} deserts? `,
                es: `Eche un vistazo a su pedido, ¿cuánto será su nuevo total si ordenó ${random} entradas y ${random_2} postres?`,
            },
            total,
            [],
            "wholeNumber",
        ))

        random = Math.floor(Math.random() * 30)+1 // exclude 0
        random_2 = Math.floor(Math.random() * 10)+1 // exclude 0
        // total = parseInt( random / parseInt(order.mainDish.price))
        // if random is the budget, and random_2 is the price of the main dish, how many main dishes can you buy?
        total = Math.floor(random / random_2)
        questions.push(createGameQuestion(
            {
                en: `Elena’s budget is ${random} dollars. If her main dish costs ${random_2} dollars, how many main dishes can she buy?`,
                es: `El presupuesto de Elena es ${random} dólares. Si su entrada cuesta ${random_2} dólares, ¿cuántas entradas puede comprar?`,
            },
            total,
            [],
            "wholeNumber",
        ))

    } else if (level === '2') {
        let prices = {
            mainDish: [7, 8.5, 10],
            dessert: [4, 5.5, 7],
            drink: [2, 3.5, 5]
        }

        let budget_2021 = Math.floor(Math.random() * (28 - 20 + 1)) + 20;
        let food_items_2021 = Math.floor(budget_2021 / prices[dishes[random]][0]);
        questions.push(createGameQuestion(
            {
                en:`If your budget in 2021 was ${budget_2021} dollars, how many ${dishes[random]} could you afford to buy?`,
                es:`Si tu presupuesto en 2021 era de ${budget_2021} dólares, ¿cuántos ${dishes[random]} podrías comprar?`,
            },
            food_items_2021,
            [],
            "wholeNumber",
        ))

        let food_items_2022 = Math.floor(budget_2021 / prices[dishes[random]][1]);
        questions.push(createGameQuestion(
            {
                en:`In 2022 your budget was unchanged, ${budget_2021} dollars. How many ${dishes[random]} could you buy then?`,
                es:`En 2022 tu presupuesto no cambió, ${budget_2021} dólares. ¿Cuántos ${dishes[random]} podrías comprar entonces?`,
            },
            food_items_2022,
            [],
            "wholeNumber",
        ))

        questions.push(createGameQuestion(
            {
                en:`If your parents give you the same budget as in 2021, ${budget_2021} dollars, in which year were you able to buy the most food?`,
                es:`Si tus padres te dan el mismo presupuesto que en 2021, ${budget_2021} dólares, ¿en qué año pudiste comprar más comida?`,
            },
            2021,
            [],
            "wholeNumber",
        ))

        let elena_budget_2021 = 28;
        let food_items_elena_2021 = Math.floor(elena_budget_2021 / prices[dishes[random]][0]);
        let elena_budget_2022 = food_items_elena_2021 * prices[dishes[random]][1];
        let elena_budget_2023 = food_items_elena_2021 * prices[dishes[random]][2];
        questions.push(createGameQuestion(
            {
                en:`Elena's budget in 2021 was 28 dollars. What would Elena’s new budget need to be in 2022 for her to buy as many ${dishes[random]} as she could in 2021?`,
                es:`El presupuesto de Elena en 2021 era de 28 dólares. ¿Cuánto tendría que ser el nuevo presupuesto de Elena en 2022 para que pudiera comprar tantos ${dishes[random]} como pudo en 2021?`,
            },
            elena_budget_2022,
            [],
            "wholeNumber",
        ))

        questions.push(createGameQuestion(
            {
                en:`Elena's budget in 2021 was 28 dollars. What would Elena’s new budget need to be in 2023 for her to buy as many ${dishes[random]} as she could in 2021?`,
                es:`El presupuesto de Elena en 2021 era de 28 dólares. ¿Cuánto tendría que ser el nuevo presupuesto de Elena en 2023 para que pudiera comprar tantos ${dishes[random]} como pudo en 2021?`,
            },
            elena_budget_2023,
            [],
            "wholeNumber",
        ))
    } else if (level === '3') {
    questions.push(createGameQuestion(
        {
            en:`How might you represent twice your ${dishes[0]} using parenthesis?`,
            es:`¿Cómo podrías representar el doble de tu ${dishes[0]} usando paréntesis?`,
        },
        `2(${dishes[0]})`,
        [],
        "text",
    ))

    questions.push(createGameQuestion(
        {
            en:`How might you represent twice your ${dishes[0]} plus your ${dishes[1]}?`,
            es:`¿Cómo podrías representar el doble de tu ${dishes[0]} más tu ${dishes[1]}?`,
        },
        `2(${dishes[0]})+(${dishes[1]})`,
        [],
        "text",
    ))

    questions.push(createGameQuestion(
        {
            en:`How might you represent twice your ${dishes[0]} minus your ${dishes[2]}?`,
            es:`¿Cómo podrías representar el doble de tu ${dishes[0]} menos tu ${dishes[2]}?`,
        },
        `2(${dishes[0]})-(${dishes[2]})`,
        [],
        "text",
    ))

    questions.push(createGameQuestion(
        {
            en:`How might you write the equation to solve for the total amount you spent at the restaurant?`,
            es:`¿Cómo podrías escribir la ecuación para resolver la cantidad total que gastaste en el restaurante?`,
        },
        `${dishes[0]} + ${dishes[1]} + ${dishes[2]} = `,
        [],
        "text",
    ))

    questions.push(createGameQuestion(
        {
            en:`How might you write the equation to solve for the total amount you will spend if you order everything twice?`,
            es:`¿Cómo podrías escribir la ecuación para resolver la cantidad total que gastarás si ordenas todo dos veces?`,
        },
        `2(${dishes[0]} + ${dishes[1]} + ${dishes[2]} = )`,
        [],
        "text",
    ))

    let random_num = Math.floor(Math.random() * 10 + 1)
    questions.push(createGameQuestion(
        {
            en:`What would an equation read if you order ${dishes[random]} ${random_num} times?`,
            es:`¿Cómo se leería una ecuación si ordenas ${dishes[random]} ${random_num} veces?`,
        },
        `${random_num}${dishes[random]}`,
        [],
        "text",
    ))
}




    return questions
}