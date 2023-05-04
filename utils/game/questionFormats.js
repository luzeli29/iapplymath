const QuestionFormats = {
    'fraction': {
        validationRegex : /^-?(?:0|[1-9]\d*)(?:\/[1-9]\d*)?$/,
        validationFailMessage: 'invalid_fraction',
        simplifyAnswer: (fraction) => {
            if(isNaN(fraction)) { 
                var numer = userAnswer.split("/")[0]
                var dinomi = userAnswer.split("/")[1]
                const simplifiedAnswer = simplifyFraction(numer, dinomi)
                return simplifiedAnswer
            } else {
                return fraction
            }
        },
        answerBoxType: 'textInput',
        answerBoxMessage: 'franctions_only',
        calculatorType: 'basic'
    },
    'wholeNumber': {
        validationRegex : /^-?(?:0|[1-9]\d*)$/,
        validationFailMessage: 'invalid_whole_number',
        answerBoxType: 'textInput',
        answerBoxMessage: 'whole_numbers_only',
        calculatorType: 'basic'        
    },
    'continue': {
        answerBoxType: 'continue',
    },
    'correctAnswer': {
        answerBoxType: 'continue',
        confetti: true,
    },
    'trueFalse': {
        answerBoxType: 'buttons',
        buttons: [
            {value: 'true', textId: 'true'},
            {value: 'false', textId: 'false'},
        ],
        groupHeight: 1,
        groupWidth: 2,
    },
    'time' : {
        validationRegex : /^([01]?[0-9]|2[0-3]):[0-5][0-9](am|pm)$/i,
        validationFailMessage: 'invalid_time',
        answerBoxType: 'textInput',
        answerBoxMessage: 'time_only',
    },
    'decimal': {
        validationRegex : /^-?(?:0|[1-9]\d*)(?:\.\d+)?$/,
        validationFailMessage: 'invalid_decimal',
        answerBoxType: 'textInput',
        answerBoxMessage: 'decimals_only',
        calculatorType: 'basic'
    }, 
    'money': {
        validationRegex : /^-?(?:0|[1-9]\d*)(?:\.\d+)?$/,
        validationFailMessage : 'invalid_money',
        answerBoxType: 'textInput',
        answerBoxMessage: 'money_only',
        calculatorType: 'basic'
    },
    'unitMeters' : {
        validationRegex : /^-?(?:0|[1-9]\d*)(?:\.\d+)?(m)$/,
        validationFailMessage : 'invalid_unit_meters',
        answerBoxType: 'textInput',
        answerBoxMessage: 'meters_only',
        calculatorType: 'basic'
    },
    'unitCentimeters' : {
        validationRegex : /^-?(?:0|[1-9]\d*)(?:\.\d+)?(cm)$/,
        validationFailMessage : 'invalid_unit_centimeters',
        answerBoxType: 'textInput',
        answerBoxMessage: 'centimeters_only',
        calculatorType: 'basic'
    },
    'unitLiters' : {
        validationRegex : /^-?(?:0|[1-9]\d*)(?:\.\d+)?(l)$/,
        validationFailMessage : 'invalid_unit_liters',
        answerBoxType: 'textInput',
        answerBoxMessage: 'liters_only',
        calculatorType: 'basic'
    },
    'unitMilliLiters' : {
        validationRegex : /^-?(?:0|[1-9]\d*)(?:\.\d+)?(ml)$/,
        validationFailMessage : 'invalid_unit_milliliters',
        answerBoxType: 'textInput',
        answerBoxMessage: 'milliliters_only',
        calculatorType: 'basic'
    },
    'unitGrams' : {
        validationRegex : /^-?(?:0|[1-9]\d*)(?:\.\d+)?(g)$/,
        validationFailMessage : 'invalid_unit_grams',
        answerBoxType: 'textInput',
        answerBoxMessage: 'grams_only',
        calculatorType: 'basic'
    },
    'unitKiloGrams' : {
        validationRegex : /^-?(?:0|[1-9]\d*)(?:\.\d+)?(kg)$/,
        validationFailMessage : 'invalid_unit_kilograms',
        answerBoxType: 'textInput',
        answerBoxMessage: 'kilograms_only',
        calculatorType: 'basic'
    },
}

export default QuestionFormats