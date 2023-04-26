import createGameQuestion from "@utils/game/createGameQuestion";
import validateOrder from "@utils/validation/game/restaurant/validateOrder";

export default function generateBasicOrderQuestions(order) {
    let questions = []
    const total = order.mainDish.price + order.drink.price + order.dessert.price

    const sortedOrder = Object.values(order).sort(
       (p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0);

    questions.push(createGameQuestion(
        {
            en:"How much was your order?",
            es:"¿Cuánto es el total?",
        },
        total,
        [],
    ))

    const totalWithoutTop = total - sortedOrder[0].price
    questions.push(createGameQuestion(
        {
            en:"How much is the total if you remove the most expensive item?",
            es:"¿Cuánto es el total si no compras el plato más caro?",
        },
        totalWithoutTop,
        [],
    ))

    const totalWithoutBottom = total - sortedOrder[2].price
    questions.push(createGameQuestion(
        {
            en:"How much is your total if you remove the least expensive item?",
            es:"¿Cuánto es el total si no compras el plato más barato?",
        },
        totalWithoutBottom,
        [],
    ))

    return questions
}