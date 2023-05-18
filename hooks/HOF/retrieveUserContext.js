import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { useUserContext } from "@hooks/siteContext/useUserContext"
import DevErr from "@utils/debug/devErr"
import DevLog from "@utils/debug/devLog"
/*
    Requirements:
    ----------------------------------------    
    "loggedIn", //Checks if user is logged in
    "roleAdmin", //Checks if user is an admin
    "roleUser", //Checks if user has user role
    "roleDev", //Checks if user is a developer
    "roleResearcher", //Checks if user is a researcher
    "hasAvatar", //Checks if user has an avatar
    "hasPet", //Checks if user has a pet
    "isOffline", //Checks if user is offline
    ----------------------------------------    
*/

const RetrieveUserContext = (Component,requirements) => {
  const RetrieveUserComponent = (pageProps) => {
    DevLog('Retrieving user context from HOF')
    const {user,settings,loading, error} = useUserContext()
    const router = useRouter()
    
    if(loading || !router.isReady) return null
    if(error) return  router.push('/error')

    if(requirements) validateRequirements()

    function validateRequirements(){
      const isLoggedIn = user.isLoggedIn
      if (requirements.includes("loggedIn") && !isLoggedIn) {
        DevErr('User is not logged in.')
        router.push('/user/login')
        return null
      }
  
      if(requirements.includes("hasAvatar") && !user.data.avatarId) {
        DevErr('User does not have an avatar.')
          router.push('/user/avatar/select')
          return null
      }
  
      if(requirements.includes("hasPet") && !user.data.petId) {
          DevErr('User does not have a pet.')
          router.push('/user/pet')
          return null
      }
    }

    return <Component user={user} settings={settings} {...pageProps} />
  }

  return RetrieveUserComponent
}
export default RetrieveUserContext
