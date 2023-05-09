import generateAHSimpleMultiQuestion from "../auntHouseQuestionGenerators/generateAHSimpleMultiQuestion";

export default function generateFamilyQuestions(recipe, familySize,randomGenerator) {
    let factor = familySize ? familySize : 5
    if(!recipe) {
        err('No "recipe" given to generateFamilyQuestions')
        return [createGameQuestion()]
    }
    let questions = [];

    recipe.defaultFamilyQuestionIngredients.map((questionData) => {
        const ingredient = recipe.ingredients[questionData]
        if(!ingredient) return
        questions.push(generateAHSimpleMultiQuestion(recipe,ingredient, factor, randomGenerator))       
    })
    return questions

}