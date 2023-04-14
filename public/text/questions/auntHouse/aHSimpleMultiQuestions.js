const aHSimpleMultiQuestions = [
    {
        questionText: {
            en: 'How many %ING_SERVING_TEXT_EN% do we need for %FACTOR% %RECIPE_SERVING_EN%? (Please answer with fractions only)',
            es: '¿%ING_SERVING_TEXT_ES% necesitamos para %FACTOR% %RECIPE_SERVING_ES%? (Por favor responda solo con fracciones)',
        },
        hints: [
        {  
            en: '( %ING_AMOUNT% x %FACTOR%) / %SERVING_SIZE% = ?',
            es: '( %ING_AMOUNT% x %FACTOR%) / %SERVING_SIZE% = ?',
        },{  
            en: '( %ING_AMOUNT% x %FACTOR%) / %SERVING_SIZE% = %ANSWER%',
            es: '( %ING_AMOUNT% x %FACTOR%) / %SERVING_SIZE% = %ANSWER%',
        }]
            
    }
]
export default aHSimpleMultiQuestions