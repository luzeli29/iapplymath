const schoolQuestionTemplates = {

    nonFraction: {
        questionText: {
            en: '%FIRST_NUMBER% %SIGN% %SECOND_NUMBER% = ?',
            es: '%FIRST_NUMBER% %SIGN% %SECOND_NUMBER% = ?',
        },
        hints: {
            0 :{  
                en: 'Try using the calculator',
                es: 'Intenta usar la calculadora'
            },
            1 :{  
                en: '%FIRST_NUMBER% %SIGN% %SECOND_NUMBER% = %ANSWER%',
                es: '%FIRST_NUMBER% %SIGN% %SECOND_NUMBER% = %ANSWER%',
            }
        },
        questionFormatKey: 'wholeNumber',
    },
    fraction: {
        questionText: {
            en: '%FIRST_NUMBER% %SIGN% %SECOND_NUMBER% = ?',
            es: '%FIRST_NUMBER% %SIGN% %SECOND_NUMBER% = ?',
        },
        hints: {
            0 :{  
                en: 'Try using the calculator',
                es: 'Intenta usar la calculadora'
            },
            1 :{  
                en: '%FIRST_NUMBER% %SIGN% %SECOND_NUMBER% = %ANSWER%',
                es: '%FIRST_NUMBER% %SIGN% %SECOND_NUMBER% = %ANSWER%',
            }
        },
        questionFormatKey: 'fractionExact',
    }
}
export default schoolQuestionTemplates