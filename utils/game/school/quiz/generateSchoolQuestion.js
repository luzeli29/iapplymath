import fillQuestionTemplate from "@utils/game/quiz/questionGeneration/fillQuestionTemplate";
import schoolQuestionTemplates from "./schoolQuestionTemplates";
import simplifyFraction from "@utils/game/quiz/simplifyFraction";
import DevErr from "@utils/debug/devErr";

const levelBoundaries = {
    1: {min: 1, max: 12},
    2: {min: 13, max: 99},
    3: {min: 100, max: 999},
}

const generateSchoolQuestion = (schoolTopic, level,randomGenerator) => {

    let answer, template, sign, topic;

    if(schoolTopic.name == 'random') {
        topic = randomGenerator.randomSchoolTopic()
    } else {
        topic = schoolTopic.name
    }

    let firstNumber = randomGenerator.randomInt(levelBoundaries[level].min, levelBoundaries[level].max)
    let secondNumber = 0
    if(topic == 'division') {
        const factor = randomGenerator.randomInt(1,13)
        secondNumber = firstNumber
        firstNumber = secondNumber * factor
    } else {
        secondNumber = randomGenerator.randomInt(levelBoundaries[level].min, firstNumber)
    }

    switch(topic) {
        case 'addition':
            answer = firstNumber + secondNumber
            template = schoolQuestionTemplates.nonFraction
            sign = '+'
            break;
        case 'subtraction':
            answer = firstNumber - secondNumber
            template = schoolQuestionTemplates.nonFraction
            sign = '-'
            break;
        case 'multiplication':
            answer = firstNumber * secondNumber
            template = schoolQuestionTemplates.nonFraction
            sign = 'x'
            break;
        case 'division':
            answer = simplifyFraction(firstNumber,secondNumber)
            template = schoolQuestionTemplates.fraction
            sign = '÷'
            break;
        default:
            answer = -1     
            template = schoolQuestionTemplates.nonFraction
            sign = '?'
            DevErr('Invalid schoolTopic.name: ' + schoolTopic.name)
            break;
    }
    const tags = {
        first_Number: firstNumber,
        second_Number: secondNumber,
        answer: answer,
        sign: sign,
    }

    const question = fillQuestionTemplate(template,tags)

    return question
}

export default generateSchoolQuestion