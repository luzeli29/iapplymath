const aHSimpleMultiQuestions = [
    {
        questionText: {
            en: 'How many %ING_SERVING_TEXT_EN% do we need for %FACTOR% %RECIPE_SERVING_EN%?',
            es: '¿%ING_SERVING_TEXT_ES% necesitamos para %FACTOR% %RECIPE_SERVING_ES%?',
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
        },
        questionFormatKey: 'fraction',
            
    }
]
export default aHSimpleMultiQuestions