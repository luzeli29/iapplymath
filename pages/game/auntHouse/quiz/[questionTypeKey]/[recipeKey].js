import React, {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import {GameQuestionLayout} from '@utils/imports/commonImports'
import menuOptions from "@public/text/menuOptions"
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import SmallRecipeCard from '@comps/game/auntHouse/smallRecipeCard'
import LoadRecipes from '@utils/staticData/json/foodData/loadRecipes'
import aHQuestionFactory from '@utils/game/auntHouse/questionCreation/aHQuestionFactory'
import IngredientList from '@comps/game/auntHouse/ingredientList'
import generateRecipeTitleText from '@utils/game/auntHouse/textCreation/generateRecipeTitleText'
import generateRecipeServingText from '@utils/game/auntHouse/textCreation/generateRecipeServingText'
import LoadLocations from '@utils/staticData/json/game/loadLocations'
import { log } from '@utils/debug/log'


export async function getStaticPaths() {
    const recipes = await LoadRecipes()
    const recipeKeys = Object.keys(recipes)
    const locationsObj = await LoadLocations()
    const auntHouseObj = locationsObj.auntHouse
    const keyPaths = [];
    for (let questionTypeKey of Object.keys(auntHouseObj.questionTypes)){
        for (let recipeKey of recipeKeys) {
            keyPaths.push({ params: { questionTypeKey: questionTypeKey, recipeKey : recipeKey}});
        }
    }
    console.log(keyPaths)
    
    return {
        paths: keyPaths,
        fallback: false,
    };
}

export async function getStaticProps(context){
    const  {params}  = context
    console.log("params")
    console.log(params)
    const recipeKey = params.recipeKey

    const recipes = await LoadRecipes()

    let recipe = recipes.carrotOrangeJuice
    if(recipes[recipeKey]) {
        recipe = recipes[recipeKey]
    }

    console.log("recipe")
    console.log(recipe)

    return {
      props: {
        recipe,
      },
    }
}

export default function AuntHouseQuestions({recipe}) {
    const {user,settings,loading, error} = useUserContext()
    const router = useRouter()
    const isLoggedIn = user.loggedIn  
    
    if(loading) return <Loading/> 
    if(!router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>
    const lang = settings.lang


    // FAMILY SIZE is always undefined here
    const { questionTypeKey, recipeKey, familySize } = router.query


    const [questions, setQuestions] = useState(aHQuestionFactory(questionTypeKey, recipe))

    const recipeTitle = generateRecipeTitleText(recipe,lang)
    const recipeServingText = generateRecipeServingText(recipe,lang)
    const finishRoute = getFinishRoute(questionTypeKey,recipeKey,familySize)
    
    useEffect(() => {
        const generatedQuestions = aHQuestionFactory(questionTypeKey, recipe)
        setQuestions(generatedQuestions)
    },[questionTypeKey])
    
    log("route: " + finishRoute)
    if(!questions){
        console.log("questions not loaded")
        return(<Loading/>)  
    } 

    function handleFinish() {
        console.log("handleFinish")
        console.log(finishRoute)
        router.push(finishRoute)
        setQuestions('')
    }

    return (
        <GameQuestionLayout
                questions={questions}
                onBack={() => router.push('/game/auntHouse/')}
                onFinish={() => handleFinish()}> 
                <div>
                    <p className='text-center'>{recipeTitle}</p>
                    <p className='text-center'>{recipeServingText}</p>
                    <IngredientList ingredients={recipe.ingredients} lang={lang}/>
                </div>
        </GameQuestionLayout>
    )
}

function getFinishRoute(questionTypeKey, recipeKey,familySize) {
    if (!questionTypeKey) {
        return '/'
    }

    switch(questionTypeKey) {
        case 'basic':
            return '/game/auntHouse/quiz/familySize/' + recipeKey
        case "familySize":
            // /game/auntHouse/quiz/familySize/carrotOrangeJuice    
            return '/game/auntHouse/quiz/familyQuestion/' + recipeKey
        case "familyQuestion":
            return '/game/auntHouse/finished'
    }
}