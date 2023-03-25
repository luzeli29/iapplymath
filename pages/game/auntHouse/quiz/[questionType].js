import React, {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import {GameQuestionLayout} from '@utils/imports/commonImports'
import menuOptions from "@public/text/menuOptions"
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import createGameQuestion from '@utils/game/createGameQuestion'
import SmallRecipeCard from '@comps/game/auntHouse/smallRecipeCard'
import recipes from '@public/text/auntHouseRecipes'
import {simplifyFraction} from '@utils/imports/commonImports'
import generateAuntQuestions from '@utils/game/auntHouse/generateAuntHouseQuestions'


export default function AuntHouseQuestions() {
    const {user,settings,loading, error} = useUserContext()

    const router = useRouter()
    const isLoggedIn = user.loggedIn    
    if(loading) return <Loading/> 
    if(!router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>

    const { questionType, recipeIndex, familySize } = router.query

    const questions = generateAuntQuestions(questionType, recipeIndex)
    const finishRoute = getFinishRoute(questionType,recipeIndex,familySize)
    if(!questions) {
        router.push('/game/restaurant')
        return(<Loading/>)
    }
    return (
        <GameQuestionLayout
                questions={questions}
                onBack={() => router.push('/game/auntHouse/')}
                onFinish={() => router.push(finishRoute)}> 
            <SmallRecipeCard recipeIndex={recipeIndex} />
        </GameQuestionLayout>
    )
}

function getFinishRoute(questionType, recipeIndex) {
    if (!questionType) {
        return '/'
    }

    switch(questionType) {
        case 'basic':
            return '/game/auntHouse/quiz/familySize?recipeIndex=' + recipeIndex
        case "familySize":
            return '/game/auntHouse/quiz/familyQuestion?recipeIndex=' + recipeIndex
        case "familyQuestion":
            return '/game/auntHouse/finished'
    }
}