import createGameQuestion from "@utils/game/createGameQuestion";

export default function generateBasicAHQuestions(recipe) {
    var questions = [];
    //TODO: add static questions
    console.log(recipe)
    recipe.defaultIngredientMultiQuestions.map((questionData) => {
        console.log(questionData)
        const ingredientCode = questionData.ingredientCode
        let factor = questionData.factor

        if(!ingredientCode) return;
        if(!factor) factor = 99;

        const ingredient = recipe.ingredients[ingredientCode]
        if(!ingredient) return;

        questions = questions.concat(generateMultiQuestion(recipe, factor, ingredient))
        /*
        if(questionData[0] == -1) {
            //do question on every ingredient with given multiple
            recipe.ingredients.map((ing) => {
                questions = questions.concat(generateMultiQuestion(recipe,ing, questionData[1]))
            })
        } else {
            //do question with given ing and multiple
            questions = questions.concat(generateMultiQuestion(recipe,recipe.ingredients[questionData[0]], questionData[1]))
        }
        //goes through every ingredient for every multiple
    */
    })
    questions[questions.length] = [createGameQuestion()]

    return questions
}