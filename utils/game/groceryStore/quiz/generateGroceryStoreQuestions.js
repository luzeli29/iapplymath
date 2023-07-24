import generateLevel1Questions from "./level1/generateLevel1Questions"
import generateLevel2Questions from "./level2/generateLevel2Questions"
import generateLevel3Questions from "./level3/generateLevel3Questions"

const generateGroceryStoreQuestions = (recipes,questionTypeKey,level,randomGenerator) => {

    switch(level) {
        case '1': return generateLevel1Questions(recipes,questionTypeKey,randomGenerator)
        case '2': return generateLevel2Questions(recipes,questionTypeKey,randomGenerator)
        case '3': return generateLevel3Questions(recipes,questionTypeKey,randomGenerator)
    } 
}

export default generateGroceryStoreQuestions