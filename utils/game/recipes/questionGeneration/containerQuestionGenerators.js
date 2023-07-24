import DevErr from "@utils/debug/devErr";
import createGameQuestion, { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion";
import generateRecipeTitleText from "../textCreation/generateRecipeTitleText";
import generateIngredientLineText from "../textCreation/generateIngredientLineText";
import generateIngredientText from "../textCreation/generateIngredientText";
import { GenerateContainerSoldText, GenerateContainerText } from "../textCreation/generateContainerText";

const CreateBasicContainerText = (recipe,ingredient,containerFactor) => {
    let recipeTitleText = {}
    recipeTitleText.en = generateRecipeTitleText(recipe,'en').toLowerCase();
    recipeTitleText.es = generateRecipeTitleText(recipe,'es').toLowerCase();
    
    const containerSoldText = GenerateContainerSoldText(ingredient, containerFactor)

    const questionText = {
        en: 'You are shopping for ingredients to make ' + recipeTitleText.en + '. You see that ' + containerSoldText.en +'.',
        es: 'Estás comprando ingredientes para hacer ' + recipeTitleText.es + '. Ves que ' + containerSoldText.es + '.',
    }
    return questionText
}

const GenerateFriendContainerQuestion = (recipe, ingredientIndex, friendCnt, containerFactor) => {

    if(!recipe) {
        DevErr("GenerateContainerQuestion had no recipe provided");
        return ErrorQuestion;
    }

    if(ingredientIndex < 0 || ingredientIndex >= recipe.ingredients.length) {
        DevErr("GenerateContainerQuestion had an invalid ingredientIndex provided");
        return ErrorQuestion;
    }

    const ingredient = recipe.ingredients[Object.keys(recipe.ingredients)[ingredientIndex]];
    const questionText = CreateBasicContainerText(recipe,ingredient,containerFactor);
    const basicContainerText = GenerateContainerText(ingredient)
    questionText.en += ' Using this recipe, how many ' + basicContainerText.en.toLowerCase() + ' do you need to serve you and your ' + friendCnt + ' friends?'
    questionText.es += ' Usando esta receta, ¿cuántos ' + basicContainerText.es.toLowerCase() + ' necesitas para servirte a ti y a tus ' + friendCnt + ' amigos?'
    
    const answer = 5
    const ingredientText = generateIngredientText(ingredient)
    const ingredientTextAmount = generateIngredientText(ingredient,ingredient.amount )

    const containerSoldText = GenerateContainerSoldText(ingredient, containerFactor)

    const question = createGameQuestion(
        {
            en:questionText.en,
            es:questionText.es
        },
        answer,
        [
            {
               en: ingredientText.en + ' per 1 serving = ' + ingredientTextAmount + ' / ' + recipe.servingSize + '\n' + 
                    'Total ' + ingredientText.en + ' needed = servings needed * ' + ingredientText.en + ' per 1 serving \n' +
                    'Total ' + basicContainerText.en + ' = Total ' + ingredientText.en + 'needed / ' + containerSoldText.en,
                es: ingredientText.es + ' por 1 porción = ' + ingredientTextAmount + ' / ' + recipe.servingSize + '\n' +
                    'Total ' + ingredientText.es + ' necesitado = porciones necesitadas * ' + ingredientText.es + ' por 1 porción \n' +
                    'Total ' + basicContainerText.es + ' = Total ' + ingredientText.es + ' necesitado / ' + containerSoldText.es,
            },
        ],
        'fraction',
        null,
        null
    )

    return question
}

export {GenerateFriendContainerQuestion};