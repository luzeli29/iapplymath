import React from 'react';
import {useRouter} from 'next/router'
import Image from 'next/image'
import {getCommonText} from '@common_imports' 

//test

//Index with start button to go to intro dialog
const Index = () => {
  //get lang from context
  const router = useRouter()

  return (
    <div>
      <div className="pt-5 text-center">
        <Image
          width = {"300px"}
          height = {"280px"}
          quantity = {100}
          priority = {true}
          src={"/img/other/global.png"}/>
      </div>
      <div className="text-center">
        <button className="basic_button" onClick={() => router.push('/intro') }>
          {getCommonText('start')}
          </button>
      </div>    
    </div>  
  )
}

Index.whyDidYouRender = true

export default Index

