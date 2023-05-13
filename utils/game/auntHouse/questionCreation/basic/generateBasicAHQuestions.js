import createGameQuestion from "@utils/game/createGameQuestion";
import generateAHSimpleMultiQuestions from "@utils/game/auntHouse/questionCreation/auntHouseQuestionGenerators/generateAHSimpleMultiQuestion";
import DevErr from "@utils/debug/devErr";

export default function generateBasicAHQuestions(recipe,randomGenerator) {
    if(!recipe) {
        DevErr('No "recipe" given to generateBasicAHQuestions')
        return [createGameQuestion()]
    }

    var questions = [];
    //TODO: add static questions
    recipe.defaultIngredientMultiQuestions.map((questionData) => {
        const ingredientCode = questionData.ingredientCode
        let factor = questionData.factor
        if(!ingredientCode) return ;
        if(!factor) factor = 99;
        const ingredient = recipe.ingredients[ingredientCode]
        if(!ingredient) return
        questions.push(generateAHSimpleMultiQuestions(recipe,ingredient, factor, randomGenerator))       
    })
    

    return questions
}