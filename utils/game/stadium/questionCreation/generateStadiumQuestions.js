import DevErr from "@utils/debug/devErr";
import GenerateSoccorQuestions from "./soccor/generateSoccorQuestions"
import { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion";
import GenerateBasketballQuestions from "./basketball/createBasketballQuestions";

const GenerateStadiumQuestions = (sport,level,randomGenerator) => {
    let questions = []
    console.log(sport)
    switch(sport){
        case 'soccor':
            GenerateSoccorQuestions(level,questions,randomGenerator)
            break
        case 'basketball':
            GenerateBasketballQuestions(level,questions,randomGenerator)
            break
        default:
            DevErr("Invalid sport")
            questions.push(ErrorQuestion)
    }

    return questions
}

export default GenerateStadiumQuestions;