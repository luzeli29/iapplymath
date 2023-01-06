//Generate questions with the order state
function generateOrderQuestions(order) {
    var questions = [];
    if(order == null) {
        questions[0] = {
            en:"BAD ORDER INPUT ANSWER IS 42",
            es:"BAD ORDER INPUT ANSWER IS 42",
            answer: 42,
        }
        return questions;
    }
    questions[0] = {
        en:"How much was your order?",
        es:"¿Cuánto es el total?",
        answer: order.total,
        answer_format: "money",
    }

    questions[1] = {
        en:"How much is the total if you remove the most expensive item?",
        es:"¿Cuánto es el total si no compras el plato más caro?",
        answer: order.total - Math.max.apply(Math, Object.values(order.dishes).map(function(dish) {return dish.price;})),
        answer_format: "money",
    }

    questions[2] = {
        en:"How much is your total if you remove the least expensive item?",
        es:"¿Cuánto es el total si no compras el plato más barato?",
        answer: order.total - Math.min.apply(Math, Object.values(order.dishes).map(function(dish) {return dish.price;})),
        answer_format: "money",
    }
    //TODO add more questions?

    return questions
}

export default generateOrderQuestions