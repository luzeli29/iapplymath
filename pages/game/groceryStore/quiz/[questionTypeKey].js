import IngredientList from '@comps/game/auntHouse/ingredientList';
import IconGroup from '@comps/iconGroup';
import Loading from '@comps/screens/loading';
import RetrieveUserContext from '@hooks/HOF/retrieveUserContext';
import useQuizDataBuilder from '@hooks/quiz/useQuizDataBuilder';
import useSeededRandom from '@hooks/useSeededRandom'
import GameQuestionLayout from '@layouts/gameLayouts/gameQuestionLayout';
import serverSeededRandom from '@utils/crypto/serverSeededRandom';
import DevErr from '@utils/debug/devErr';
import DevLog from '@utils/debug/devLog';
import generateGroceryStoreQuestions from '@utils/game/groceryStore/quiz/generateGroceryStoreQuestions';
import loadRecipes from '@public/data/recipeData/loadRecipes';
import generateRecipeServingText from '@utils/game/recipes/textCreation/generateRecipeServingText';
import generateRecipeTitleText from '@utils/game/recipes/textCreation/generateRecipeTitleText';
import LoadSchoolTopics from '@utils/game/school/quiz/schoolTopics/loadSchoolTopics';
import getText from '@utils/text/getText';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import loadLocations from '@utils/game/loadLocations';

const recipesQuizzedOn = 2

export async function getStaticPaths() {
    const locationsObj = await loadLocations()
    const groceryStoreObj = locationsObj.groceryStore
    const keyPaths = [];

    for (let questionTypeKey of Object.keys(groceryStoreObj.questionTypes)){
        keyPaths.push({ params: { questionTypeKey: questionTypeKey, level : 1}});
        keyPaths.push({ params: { questionTypeKey: questionTypeKey, level : 2}});
        keyPaths.push({ params: { questionTypeKey: questionTypeKey, level : 3}});

    }

    return {
        paths: keyPaths,
        fallback: false,
    };
}

export async function getStaticProps(context){
    const  {params}  = context
    const recipes = await loadRecipes("groceryStore")

    return {
      props: {
        recipes
      },
    }
}


/*
export async function getServerSideProps(context){
    const { questionTypeKey, level, initSeed, initQnNum } = context.query
    const {seed, randomGenerator} = serverSeededRandom(initSeed)
    const allRecipes = await loadRecipes("groceryStore",level)
    const shuffled = Object.keys(allRecipes).sort(() => 0.5 - randomGenerator.getRandom());
    const selected = shuffled.slice(0, recipesQuizzedOn);
    let recipes = {}
    selected.forEach((recipeKey, index) => {
        recipes[recipeKey] = allRecipes[recipeKey]
    })
    const questions = generateGroceryStoreQuestions(recipes,questionTypeKey,level,randomGenerator)
    
    return {
      props: {
        questions,
        seed,
        recipes
        },
    }
  }
*/
const GroceryStoreQuiz = ({user,settings,questions,recipes}) => {
    const {buildQuizData, quizDataBuilderSetters} = useQuizDataBuilder()

    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const { questionTypeKey, initQnNum,initSeed,level } = router.query
    const {seed,setSeed,regenerateSeed, randomGenerator} = useSeededRandom(initSeed)

    let levelRecipes = {}

    Object.keys(recipes).forEach(key => {
        if (recipes[key].level == level) levelRecipes[key] =  recipes[key];
    });

    const handleFinish = () => {
        router.push('/game/groceryStore/finished')
        setLoading(true)
    }

    useEffect(()=> {
        if(seed) {
            const questions = generateQuestions()
            createQuizData(questions)
            setLoading(false)
        }
    },[seed])

    const generateQuestions = () => {
        if(!seed) return null
        DevLog('---Generating questions w/ Seed ' + seed + '---')
        try {           
            const questions = generateGroceryStoreQuestions(levelRecipes,questionTypeKey,level,randomGenerator)
            DevLog(questions)
            return questions
        } catch(e) {
            DevErr('Error generating questions ' + e)
            return null
        }
    }

    const createQuizData = (questions) => {
        try{
            quizDataBuilderSetters.setQuestions(questions)
            quizDataBuilderSetters.setSeed(seed)
            quizDataBuilderSetters.setParams()
            quizDataBuilderSetters.setQuestionTypeKey(questionTypeKey)
            quizDataBuilderSetters.setOnFinish(() => () => handleFinish())
            quizDataBuilderSetters.setLocationKey('groceryStore')
            initQnNum ? quizDataBuilderSetters.setQuestionNum(initQnNum) 
                : quizDataBuilderSetters.setQuestionNum(0)
            quizDataBuilderSetters.setParams({level})
        } catch {
            return false
        }
        return true
    }

    if(!router.isReady) return <Loading/>

    const lang = settings.lang
    if(loading) {
        return <Loading/>
    }

    const renderRecipe = (key,value) => {
        const ingredients = value?.ingredients
        const recipeTitle = generateRecipeTitleText(value,lang)
        const recipeServingText = generateRecipeServingText(value,lang)
        const prepTime = value?.prepTime > 0 ? getText('preptime', lang) + ' : ' +  value?.prepTime + ' ' + getText('minutes', lang) : ''
        const cookTime = value?.cookTime > 0 ? getText('cooktime', lang) + ' : ' +  value?.cookTime + ' ' + getText('minutes', lang) : ''

        return (
                <div>
                    <p className='text-center'>{recipeTitle}</p>
                    <p className='text-center'>{recipeServingText}</p>
                    <div className='row mx-auto'>
                        <div className='col-6 text-center'>
                            <p className=''>{prepTime}</p>
                        </div>
                        <div className='col-6 text-center'>
                            <p className=''>{cookTime}</p>
                        </div>
                    </div>
                    <IngredientList ingredients={ingredients} lang={lang}/>
                </div>        
                )
    }

    return (
        <GameQuestionLayout
            user={user}
            settings={settings}
            quizData={buildQuizData()}
            initQuestionNum={initQnNum}> 
            <IconGroup 
                lang={lang}
                icons={levelRecipes}
                getContentFromValue={(key,value) => renderRecipe(key,value)}
                width={1}
                height={1}
                disableToolTip={true}
                />
        </GameQuestionLayout>
    )
}

export default RetrieveUserContext(GroceryStoreQuiz,['gameReady','hasActiveGame'])