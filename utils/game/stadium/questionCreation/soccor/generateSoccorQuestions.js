import DevErr from "@utils/debug/devErr";
import SoccorL1Questions from "./soccorL1Questions"
import { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion";
import SoccorL3Questions from "./soccorL3Questions";
const GenerateSoccorQuestions = (level,questions, randomGenerator) => {
    switch(level){
        case "1":
            SoccorL1Questions(questions,randomGenerator)
            break;
        case "2":
            SoccorL2Questions(questions,randomGenerator)
            break;
        case "3":
            SoccorL3Questions(questions,randomGenerator)
            break;
        default:
            DevErr("Invalid level")
            questions.push(ErrorQuestion)

    }
}

export default GenerateSoccorQuestions;