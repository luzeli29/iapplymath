const aHSimpleMultiQuestions = [
    {
        questionText: {
            en: 'How many %INGREDIENT_SERVINGS% do we need for %FACTOR% %RECIPE_SERVINGS%? (Please answer with fractions only)',
            es: '¿%INGREDIENT_SERVINGS% necesitamos para %FACTOR% %RECIPE_SERVINGS%? (Por favor responda solo con fracciones)',
        },
        answerText: [
        {  
            en: '( %ING_AMOUNT% ) x ( %SERVING_SIZE% ) = ?',
            es: '( %ING_AMOUNT% ) x ( %SERVING_SIZE% ) = ?',
        },{  
            en: '( %ING_AMOUNT% ) x ( %SERVING_SIZE% ) = %ANSWER%',
            es: '( %ING_AMOUNT% ) x ( %SERVING_SIZE% ) = %ANSWER%',
        }]
            
    }
]
export default aHSimpleMultiQuestions