import {throwError} from '@utils/imports/commonImports'
import translations from '@public/text/translations'

export default function createGameQuestion(questionText,answer,hints,answerFormat, onAnswer) {
    //Check empty question text
    if(!questionText) {
        throwError('No question text was found in func CreateGameQuestion(). Returning error question.')
        return errorQuestion;
    }

    if(!questionText.en) {
        throwError('No english translation for question text was found in func CreateGameQuestion(). Returning error question.')
        return errorQuestion;
    }

    if(!questionText.es) {
        throwError('No spanish translation for question text was found in func CreateGameQuestion(). Setting spanish as english text.')
        questionText.es = questionText.en
    }

    if(answer == 'fill_in' && !onAnswer) {
        throwError('Answer was a fill_in answer with no onAnswer. Returning error question.')
        return errorQuestion;
    }

    var hintArray = [];
    hintArray[0] = translations.try_again;

    hints.forEach((hint, index) => {
        if(!hint.en) {
            throwError('No english translation for question hint at index ' + index + ' was found in func CreateGameQuestion(). Setting as basic hint.')
            hint.en = translations.try_again
        }
        if(!hint.es) {
            throwError('No spanish translation for question hint at index ' + index + ' was found in func CreateGameQuestion(). Setting spanish as given english text.')
            hint.es = hint.en
        }
        hintArray.push(hint);
    });

    if(!answerFormat) {
        answerFormat = 'numb'
    }

    const question = {
        en: questionText.en,
        es: questionText.es,
        answer: answer,
        answer_format: answerFormat,
        hints: hintArray,
        onAnswer: onAnswer,
    }

    return question

}


const errorQuestion = {
    en:"There was an error in creating questions. Answer is 1.",
    es:"There was an error in creating questions. Answer is 1.",
    answer: 1,
}