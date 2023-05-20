import React from 'react';
import {useRouter} from 'next/router'
import Image from 'next/image'
import getText from '@utils/text/getText'
import Error from './error';
import Loading from '@comps/screens/loading';
import { useUserContext } from '@hooks/siteContext/useUserContext';

//test

//Index with start button to go to intro dialog
const Index = () => {
  const {user,settings,loading, error} = useUserContext()

  const router = useRouter()

  if(loading || !router.isReady) return <Loading/>
  if(error) return <Error error={error}/>
  const loggedIn = user.loggedIn
  const lang = settings.lang

  return (
    <div>
      <div className="">
        <Image 
          quantity = {100}
          priority = {true}
          src={"/img/other/global.png"}
          width = {100}
          height = {100}
          className='globes'
        
          alt={"globe"}/>
      </div>
      <div className="text-center">
        {loggedIn ?
        // User is logged in
        <>
        <button className="basic_button" onClick={() => router.push('/dialog/websiteIntro') }>
          {getText('start',lang)}
        </button>
        </>
        :
        // User is not logged in
        <>
          <button className="basic_button" onClick={() => router.push('/user/login') }>
            {getText('login',lang)}
          </button>
        </>
        }
      </div>    
    </div>  
  )
}

Index.whyDidYouRender = true

export default Index

