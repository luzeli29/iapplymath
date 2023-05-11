import generateSchoolQuestion from "./generateSchoolQuestion"

const { default: DevErr } = require("@utils/debug/devErr")

const levelModifiers = {
    1: {1: 10, 2: 0, 3: 0},
    2: {1: 5, 2: 5, 3: 0},
    3: {1: 4, 2: 3, 3: 3},
}

const generateSchoolQuestions = (questionType,schoolTopic,level,randomGenerator) => {
    if(!questionType) {
        DevErr('No "questionType" provided to generateSchoolQuestions. Setting as basic...')
        questionType = 'basic'
    }
    if(!schoolTopic) {
        DevErr('No "schoolTopic" provided to generateSchoolQuestions. Setting as add...')
        schoolTopic = 'add'
    }
    if(!level) {
        DevErr('No "level" provided to generateSchoolQuestions. Setting as 1...')
        level = 1
    }

    let questions = []

    const numLevelOneQuestion = levelModifiers[level][1]
    const numLevelTwoQuestion = levelModifiers[level][2]
    const numLevelThreeQuestion = levelModifiers[level][3]

    for(let i = 0; i < numLevelOneQuestion; i++) questions.push(generateSchoolQuestion(schoolTopic,1,randomGenerator))
    for(let i = 0; i < numLevelTwoQuestion; i++) questions.push(generateSchoolQuestion(schoolTopic,2,randomGenerator))
    for(let i = 0; i < numLevelThreeQuestion; i++) questions.push(generateSchoolQuestion(schoolTopic,3,randomGenerator))

    return questions

}

export default generateSchoolQuestions