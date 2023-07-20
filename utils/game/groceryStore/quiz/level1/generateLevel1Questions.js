import createGameQuestion from "@utils/game/quiz/questionGeneration/createGameQuestion"

const generateLevel1Questions = (questionType,randomGenerator) => {
    let questions = []
    // create question
    questions.push(
        createGameQuestion(
        {
            en: 'test',
            es: 'test',
        },
        4,
        [
        ],
        "wholeNumber"
    ))
    console.log(questions)
    return questions
}

export default generateLevel1Questions
