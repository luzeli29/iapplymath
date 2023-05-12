const aHSimpleMultiQuestions = [
    {
        questionText: {
            en: 'How many %ING_SERVING_TEXT_EN% do we need for %FACTOR% %RECIPE_SERVING_EN%? (Please only answer with fractions of whole numbers )',
            es: '¿Cuánt@s %ING_SERVING_TEXT_ES% necesitamos para %FACTOR% %RECIPE_SERVING_ES%? (Por favor responda solo con fracciones o números enteros)',
        },
        hints: {
        0 :{  
            en: '( %ING_AMOUNT% x %FACTOR%) / %SERVING_SIZE% = ?',
            es: '( %ING_AMOUNT% x %FACTOR%) / %SERVING_SIZE% = ?',
        },
        1 :{  
            en: '( %ING_AMOUNT% x %FACTOR%) / %SERVING_SIZE% = %ANSWER%',
            es: '( %ING_AMOUNT% x %FACTOR%) / %SERVING_SIZE% = %ANSWER%',
        }
    }
            
    }
]
export default aHSimpleMultiQuestions