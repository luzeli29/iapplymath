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
    let answer, template, sign, topic, firstNumber, secondNumber;

    if(schoolTopic.name == 'random') {
        topic = randomGenerator.randomSchoolTopic()
    } else {
        topic = schoolTopic.name
    }

    switch(topic) {
        case 'addition':
            firstNumber = randomGenerator.randomInt(levelBoundaries[level].min, levelBoundaries[level].max)
            secondNumber = randomGenerator.randomInt(levelBoundaries[level].min, levelBoundaries[level].max)
            answer = firstNumber + secondNumber
            template = schoolQuestionTemplates.nonFraction
            sign = '+'
            break;
        case 'subtraction':
            firstNumber = randomGenerator.randomInt(levelBoundaries[level].min, levelBoundaries[level].max)
            secondNumber = randomGenerator.randomInt(levelBoundaries[level].min, firstNumber)
            answer = firstNumber - secondNumber
            template = schoolQuestionTemplates.nonFraction
            sign = '-'
            break;
        case 'multiplication':
            firstNumber = randomGenerator.randomInt(levelBoundaries[level].min, levelBoundaries[level].max)
            secondNumber = randomGenerator.randomInt(levelBoundaries[level].min, levelBoundaries[level].max)
            answer = firstNumber * secondNumber
            template = schoolQuestionTemplates.nonFraction
            sign = 'x'
            break;
        case 'division':
            secondNumber = randomGenerator.randomInt(levelBoundaries[level].min, levelBoundaries[level].max)
            const factor = randomGenerator.randomInt(1,level*4)
            firstNumber = factor * secondNumber
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