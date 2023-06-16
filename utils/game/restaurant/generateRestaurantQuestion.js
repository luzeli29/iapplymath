//Generate questions with the order state
import createGameQuestion from '@utils/game/quiz/questionGeneration/createGameQuestion'
import validateOrder from '@utils/validation/game/restaurant/validateOrder';
import generateOperationsAndAlgebraQuestions from './restaurantQuestionGenerators/generateBasicOrderQuestions';
import generateMeasurementAndDataQuestions from './restaurantQuestionGenerators/generateGraphQuestions';
import generateNumberAndOperationsFractionsQuestions from './restaurantQuestionGenerators/generateMultiMultiplyDishQuestions';
import generateNumberAndOperationsInBaseTenQuestion from './restaurantQuestionGenerators/generateSingleMultiplyDishQuestions';
import getQuestions from './restaurantQuestionGenerators/restaurantQuestions'

export default function generateRestaurantQuestions(order,randomGenerator, questionType, level) {
    //console.log("que esta pasando g", {order,randomGenerator, questionType, level})
    /******
     * Make sure time answers are always in this format
     *  ex. HH:MMAM or HH:MMPM
     * and make sure to omit the 0 in HH when not needed since simplifyAnswer() will always remove it first if the user adds it,
     *  ex. 03:15PM -> 3:15PM
     * thus the final answer must be 3:15PM, this is not true if 0 is in MM,
     *  ex. 10:03PM -> 10:03PM
     *
     * 
     * Make sure inequality answers always use the less than symbol, < , or, <=
     *  ex. 1/2<3/4, 1/2<=3/4
     * any answer with the greater than symbol, > , or, >=, will be swapped to the less than symbol, < , or, <=,
     *  ex. 3/4>1/2 -> 1/2<3/4, 3/4>=1/2 -> 1/2<=3/4
    *******/

    var questions = [];
    if(!validateOrder(order)) {
        return [createGameQuestion()];
    }




    // first we get the operation and algebra questions
    let operationsAndAlgebra = generateOperationsAndAlgebraQuestions(order, level,randomGenerator)
    // then we get the number and operations in base ten questions
    let numberAndOperationsInBaseTen = generateNumberAndOperationsInBaseTenQuestion(order, level, randomGenerator)
    // then we get the number and operations fractions questions
    let numberAndOperationsFractions = generateNumberAndOperationsFractionsQuestions(order, level, randomGenerator)
    // then we get the measurement and data questions
    let measurementAndData = generateMeasurementAndDataQuestions(order, level, randomGenerator)


    // the we add all the questions to the questions array
    questions = questions.concat(operationsAndAlgebra)
    questions = questions.concat(numberAndOperationsInBaseTen)
    questions = questions.concat(numberAndOperationsFractions)
    questions = questions.concat(measurementAndData)

    // show the length of each question array
    // console.log("Operations and Algebra Questions: " + operationsAndAlgebra.length)

    // console.log("Number and Operations in Base Ten Questions: " + numberAndOperationsInBaseTen.length)

    // console.log("Number and Operations Fractions Questions: " + numberAndOperationsFractions.length)

    // console.log("Measurement and Data Questions: " + measurementAndData.length)


    // show the amount of questions generated


    // if (questionType == 'basic') {
    //     questions = questions.concat(generateBasicOrderQuestions(order, level))
    // }

    // if (questionType == 'multiply') {
    //     questions = questions.concat( generateMultiplyDishQuestions(order, randomGenerator, level))
    // }

    // if (questionType == ' multiMultiply') {
    //     questions = questions.concat( generateMultiMultiplyDishQuestions(order, randomGenerator, level))
    // }

    // if (questionType == 'graph') {
    //     questions = questions.concat(generateGraphQuestions(randomGenerator, level))
    // }

    return questions 

}