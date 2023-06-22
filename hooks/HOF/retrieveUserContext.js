import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { useUserContext } from "@hooks/siteContext/useUserContext"
import DevErr from "@utils/debug/devErr"
import DevLog from "@utils/debug/devLog"
import Loading from "@comps/screens/loading"
import Error from "pages/error"
import useQuizCookies from "@hooks/quiz/useQuizCookies"

/*
    Requirements:
    ----------------------------------------    
    "loggedIn", //Checks if user is logged in
    "roleAdmin", //Checks if user is an admin
    "roleDev", //Checks if user is a developer
    "roleResearcher", //Checks if user is a researcher
    "gameReady" //Checks if user is ready to play a game (loggedIn,hasAvatar,activeGame,hasPet)
    "hasAvatar", //Checks if user has an avatar
    "hasPet", //Checks if user has a pet
    "isOffline", //Checks if user is offline
    "activeGame" //Checks if user has a game session active
    "requireActiveQuiz" //Checks if user has an active quiz, goes to map in not (used in active quiz redirect)
    ----------------------------------------    
*/

const loggedInDepended = ['gameReady', 'hasAvatar', 'hasPet', 'activeGame', 'requireActiveQuiz']

const RetrieveUserContext = (Component,requirements) => {
  const RetrieveUserComponent = (pageProps) => {
    DevLog('Retrieving user context from HOF')
    requirements? DevLog('With requirements: ' + requirements) : null


    const {user, settings, loading, error, login,logout} = useUserContext()
    const {hasActiveCookie,quizCookie,quizCookieInfo} = useQuizCookies()

    const router = useRouter()
    
    if(quizCookieInfo.loading || loading || !router.isReady) return <Loading/>
    if(error) return  router.push('/error')

    const validateRequirements = () => {
      if(!requirements) {
        return true
      }

      if (requirements.includes("loggedIn") || requirements.includes("gameReady")) {
        if (!user.loggedIn) {
          DevErr('User is not logged in.')
          router.push('/user/login')
          return false
        }
      }
  
      if(requirements.includes("hasAvatar") || requirements.includes("gameReady")) {
        if (typeof user.data?.avatarId !== 'number') {
          DevErr('User does not have an avatar.')
          router.push('/user/avatar/select')
          return false
        }
      }
  
      if(requirements.includes("hasPet") || requirements.includes("gameReady")) {
        if (typeof user.data?.petId !== 'number') {
          DevErr('User does not have a pet.')
          router.push('/user/petSelect')
          return false
        }
      }

      if(requirements.includes('hasActiveGame')) {
        const activeGame = validateActiveGame()
        if(!activeGame) {
          return false
        }
      }

      if(requirements.includes('requireActiveQuiz')) {
        if(!hasActiveCookie()) {
          router.push('/game/map')
          return false
        }
      }

      // TODO: Create "roleAdmin" check
      // TODO: Create "roleDev" check
      // TODO: Create "roleResearcher" check
      // TODO: Create "isOffline" check

      return true

    }

    const validateActiveGame = () => {
      if(hasActiveCookie()) {

        if(!quizCookie) {
            return <Error error='Failed to handle Active Quiz Redirect, cookie was null.'/>
        }

        const locationKey = quizCookie.locationKey
        if(!locationKey) {
          DevErr('Failed to handle Active Quiz Redirect, "locationKey" was null.')
          router.push('/game/map')
          return false
        }

        const questionTypeKey = quizCookie.questionTypeKey
        if(!questionTypeKey) {
          DevErr('Failed to handle Active Quiz Redirect, "questionTypeKey" was null.')
          router.push('/game/map')
          return false
        }

        router.push('/game/' + locationKey + '/' + questionTypeKey + '/activeQuizRedirect')
        return false
      }
      return true
    }


    const render = () => {
      const meetsRequirements = validateRequirements()
      if(meetsRequirements) return <Component user={user} settings={settings} {...pageProps} />
      return <Loading/>
    }

    return render()
  }

  return RetrieveUserComponent
}


export default RetrieveUserContext