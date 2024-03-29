import DevErr from "@utils/debug/devErr";
import BasketballL2Questions from "./BasketballL2Questions"
import BasketballL3Questions from "./BasketballL3Questions";

import { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion";
import BasketballL1Questions from "./basketballL1Questions";

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