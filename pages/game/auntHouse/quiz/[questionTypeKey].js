import React, {useState,useEffect,useMemo} from 'react'
import {useRouter} from 'next/router'
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import loadRecipes from '@utils/game/auntHouse/recipeData/loadRecipes'
import aHQuestionFactory from '@utils/game/auntHouse/questionCreation/aHQuestionFactory'
import IngredientList from '@comps/game/auntHouse/ingredientList'
import generateRecipeTitleText from '@utils/game/auntHouse/textCreation/generateRecipeTitleText'
import generateRecipeServingText from '@utils/game/auntHouse/textCreation/generateRecipeServingText'
import loadLocations from '@utils/game/loadLocations'
import useQuizDataBuilder from '@hooks/quiz/useQuizDataBuilder'
import DevLog from '@utils/debug/devLog'
import RetrieveUserContext from '@hooks/HOF/retrieveUserContext'
import useSeededRandom from '@hooks/useSeededRandom'
import DevErr from '@utils/debug/devErr'
import GameQuestionLayout from '@layouts/gameLayouts/gameQuestionLayout'


export async function getStaticPaths() {
    const recipes = await loadRecipes()
    const recipeKeys = Object.keys(recipes)
    const locationsObj = await loadLocations()
    const auntHouseObj = locationsObj.auntHouse
    const keyPaths = [];

    for (let questionTypeKey of Object.keys(auntHouseObj.questionTypes)){
        for (let recipeKey of recipeKeys) {
            keyPaths.push({ params: { questionTypeKey: questionTypeKey, recipeKey : recipeKey}});
        }
    }

    return {
        paths: keyPaths,
        fallback: false,
    };
}

export async function getStaticProps(context){
    const  {params}  = context
    const recipeKey = params.recipeKey

    const recipes = await loadRecipes()

    let recipe = recipes.carrotOrangeJuice
    if(recipes[recipeKey]) {
        recipe = recipes[recipeKey]
    }

    return {
      props: {
        recipes,
      },
    }
}

const AuntHouseQuestions = ({user,settings,recipes}) => {
    const router = useRouter()
    const { questionTypeKey, recipeKey, familySize, initSeed,initQnNum} = router.query
    const recipe = recipes[recipeKey]
    const {seed,setSeed,regenerateSeed, randomGenerator} = useSeededRandom(initSeed)

    const {buildQuizData, quizDataBuilderSetters} = useQuizDataBuilder()
    const [loading, setLoading] = useState(true)
    
    //FIXME: FAMILY SIZE is always undefined here
    const lang = settings.lang

    const generateQuestions = () => {
        if(!seed) return null
        DevLog('---Generating questions w/ Seed ' + seed + '---')
        try {
            const generatedQuestions = aHQuestionFactory(questionTypeKey, recipe, randomGenerator,familySize)
            DevLog(generatedQuestions)
            return generatedQuestions
        } catch(e) {
            DevErr('Error generating questions ' + e)
            return null
        }
    }

    const createQuizData = (questions) => {
        try{
            const generatedQuestions = questions
            quizDataBuilderSetters.setQuestions(generatedQuestions)
            quizDataBuilderSetters.setLocationKey('auntHouse')
            quizDataBuilderSetters.setSeed(seed)
            initQnNum ? quizDataBuilderSetters.setQuestionNum(initQnNum) 
                : quizDataBuilderSetters.setQuestionNum(0)
            quizDataBuilderSetters.setParams({
                recipeKey: recipeKey,
                familySize: familySize
            })
            quizDataBuilderSetters.setQuestionTypeKey(questionTypeKey)
            quizDataBuilderSetters.setOnFinish(() => () => handleFinish())
        } catch {
            return false
        }
        return true
    }

    const handleFinish = () => {
        let tempFamilySize
        let route
        if(questionTypeKey == 'familySize') {
            tempFamilySize = window.sessionStorage.getItem('FAMILY_SIZE')
            window.sessionStorage.removeItem('FAMILY_SIZE')
            route = getFinishRoute(questionTypeKey, recipeKey,tempFamilySize, recipe.level)
        } else {
            route = getFinishRoute(questionTypeKey, recipeKey,familySize ,recipe.level)
        }
        router.push(route)
        setLoading(true)
    }

    useEffect(() => {
        if(seed) {
            const questions = generateQuestions()
            createQuizData(questions)
            setLoading(false)
        }
    }, [seed,questionTypeKey])

    const render = () => {
        if(loading) return <Loading/>

        const recipeTitle = generateRecipeTitleText(recipe,lang)
        const recipeServingText = generateRecipeServingText(recipe,lang)
        return (
            <GameQuestionLayout
                user={user}
                settings={settings}
                quizData={buildQuizData()}
                initQuestionNum={initQnNum}> 
                <div>
                    <p className='text-center'>{recipeTitle}</p>
                    <p className='text-center'>{recipeServingText}</p>
                    <IngredientList ingredients={recipe.ingredients} lang={lang}/>
                </div>
            </GameQuestionLayout>
        )
    }

    return render()
}

function getFinishRoute(questionTypeKey, recipeKey,familySize, level) {
    if (!questionTypeKey) {
        return '/'
    }

   
        return '/dialog/auntHouseOutro'
    

}

export default RetrieveUserContext(AuntHouseQuestions,['gameReady','hasActiveGame'])