import React from 'react';
import {useRouter} from 'next/router'
import {useWrapperContext} from '../context/context'
import translations from '../public/text/translations'
import Image from 'next/image'

//Index with start button to go to intro dialog
export default function Index() {
  //get lang from context
  const lang = useWrapperContext().state.lang
  const router = useRouter()

  return (
    <div>
      <div className="pt-5 text-center">
        <h1>{translations.i_apply_full_title[lang]}</h1>
        <Image
          width = {"300px"}
          height = {"280px"}
          quantity = {100}
          priorityv = {true}
          src={"/img/other/global.png"}/>
      </div>
      <div className="text-center">
        <button className="basic_button" onClick={() => router.push('/intro') }>
          {translations.start[lang]}
          </button>
      </div>    
    </div>  
  )
}