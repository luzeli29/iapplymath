import DevErr from "@utils/debug/devErr";
import SoccorL1Questions from "./soccorL1Questions"
import SoccorL2Questions from "./soccorL2Questions"
import SoccorL3Questions from "./soccorL3Questions";

import { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion";
const GenerateBasketballQuestions = (level,questions, randomGenerator) => {
    switch(level){
        case "1":
            BasketballL1Questions(questions,randomGenerator)
            break;
        case "2":
            BasketballL2Questions(questions,randomGenerator)
            break;
        case "3":
            BasketballL3Questions(questions,randomGenerator)
            break;
        default:
            DevErr("Invalid level")
            questions.push(ErrorQuestion)

    }
}

export default GenerateBasketballQuestions;