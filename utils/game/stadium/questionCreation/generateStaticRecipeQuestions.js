export default function generateStaticRecipeQuestions(questionType, recipe) {
    let questions = []

    if(recipe == 3) {
        questions[questions.length] = createGameQuestion(
            {
                en:"How many different fruits do we need for our fruit salad?",
                es:"¿Cuántas frutas diferentes necesitamos para nuestra ensalada de frutas?",
            }, 
            4,
            [
                {
                    en: "Count all the ingredients.",
                    es: "Cuenta todos los ingredientes",
                }
            ]
        )
    }
    
    return questions
}