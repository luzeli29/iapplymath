import React from 'react';
import {useRouter} from 'next/router'
import Image from 'next/image'
import {getText, useWrapperContext} from '@utils/imports/commonImports' 

//test

//Index with start button to go to intro dialog
const Index = () => {
  const context = useWrapperContext()
  const lang = context.state.lang
  const userId = context.state.userId
  const router = useRouter()

  return (
    <div>
      <div className="pt-5 text-center">
        <Image
          width = {300}
          height = {280}
          quantity = {100}
          priority = {true}
          src={"/img/other/global.png"}
          alt={"globe"}/>
      </div>
      <div className="text-center">
        {userId ?
        // User is logged in
        <>
        <button className="basic_button" onClick={() => router.push('/intro') }>
          {getText('start',lang)}
        </button>
        </>
        :
        // User is not logged in
        <>
          <button className="basic_button" onClick={() => router.push('/login/') }>
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

