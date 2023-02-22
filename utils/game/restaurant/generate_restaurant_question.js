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
    
    return questions
}

export default generateOrderQuestions