//Generate questions with the order state
import createGameQuestion from '@utils/game/quiz/questionGeneration/createGameQuestion'
import validateOrder from '@utils/validation/game/restaurant/validateOrder';
import generateBasicOrderQuestions from './restaurantQuestionGenerators/generateBasicOrderQuestions';
import generateGraphQuestions from './restaurantQuestionGenerators/generateGraphQuestions';
import generateMultiMultiplyDishQuestions from './restaurantQuestionGenerators/generateMultiMultiplyDishQuestions';
import generateMultiplyDishQuestions from './restaurantQuestionGenerators/generateSingleMultiplyDishQuestions';
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


    // if (!['multiply', 'multiMultiply', 'graph'].includes(questionType)) {
    //     console.log('Question Type: ' + questionType + ' not valid');
    //     return []
    // }

    // if (!['le', 'multiMultiply', 'graph'].includes(questionType)) {
    //     console.log('Question Type: ' + questionType + ' not valid');
    //     return []
    // }

    // for (let i = 0; i < questions_list[questionType][`lvl${level}`]; ++i) {
    //     const item = questions_list[questionType][`lvl${level}`][i]
    //     questions.push(createGameQuestion(
    //         item[en],
    //         item[es],
    //         item[answer],
    //         item[hints],
    //         item[type],
    //         item[onAnswer],
    //         item[imgSrc]
    //     ))
    // }

    // const questions_list = generateBasicOrderQuestions(order)
    // questions = questions.concat(questions_list)

    // var questions = [];
    // var level_ = 3;


    if (questionType == 'basic') {
        questions = questions.concat(generateBasicOrderQuestions(order, level))
    }

    if (questionType == 'multiply') {
        questions = questions.concat( generateMultiplyDishQuestions(order, randomGenerator, level))
    }

    if (questionType == ' multiMultiply') {
        questions = questions.concat( generateMultiMultiplyDishQuestions(order, randomGenerator, level))
    }

    if (questionType == 'graph') {
        questions = questions.concat(generateGraphQuestions(randomGenerator, level))
    }
    
    return questions 

}