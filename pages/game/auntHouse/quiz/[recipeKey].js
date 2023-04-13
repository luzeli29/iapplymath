import React, {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import {GameQuestionLayout} from '@utils/imports/commonImports'
import menuOptions from "@public/text/menuOptions"
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import SmallRecipeCard from '@comps/game/auntHouse/smallRecipeCard'
import LoadRecipes from '@utils/staticData/staticDataFetching/foodData/loadRecipes'
import aHQuestionFactory from '@utils/game/auntHouse/questionCreation/aHQuestionFactory'


export async function getStaticPaths() {
    const recipes = await LoadRecipes()
    const recipeKeys = Object.keys(recipes)
    const keyPaths = [];
    for (let recipeKey of recipeKeys) {
        keyPaths.push({ params: { recipeKey}});
    }
    return {
        paths: keyPaths,
        fallback: false,
    };
}

export async function getStaticProps(context){
    const  {params}  = context
    const recipeKey = params.recipeKey
    console.log(params)

    const recipes = await LoadRecipes()
    
    let recipe = recipes.carrotOrangeJuice
    if(recipes[recipeKey]) {
        recipe = recipes[recipeKey]
    }

    return {
      props: {
        recipe,
      },
    }
}

export default function AuntHouseQuestions({recipe}) {
    const [questions, setQuestions] = useState()
    const {user,settings,loading, error} = useUserContext()

    const router = useRouter()
    const isLoggedIn = user.loggedIn    
    if(loading) return <Loading/> 
    if(!router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>

    const { questionType, recipeKey, familySize } = router.query

    useEffect(() => {
        const generatedQuestions = aHQuestionFactory(questionType, recipe)
        setQuestions(generatedQuestions)
    },[])

    const finishRoute = getFinishRoute(questionType,recipeKey,familySize)
    
    if(!questions) return(<Loading/>)

    return (
        <GameQuestionLayout
                questions={questions}
                onBack={() => router.push('/game/auntHouse/')}
                onFinish={() => router.push(finishRoute)}> 
        </GameQuestionLayout>
    )
}

function getFinishRoute(questionType, recipeKey) {
    if (!questionType) {
        return '/'
    }

    switch(questionType) {
        case 'basic':
            return '/game/auntHouse/quiz/familySize?recipeKey=' + recipeKey
        case "familySize":
            return '/game/auntHouse/quiz/familyQuestion?recipeKey=' + recipeKey
        case "familyQuestion":
            return '/game/auntHouse/finished'
    }
}