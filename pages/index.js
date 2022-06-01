import React from 'react';
import {useRouter} from 'next/router'
import {useWrapperContext} from '../context/context'
import translations from '../public/text/translations'
import Image from 'next/image'
import style from '../styles/other.module.css'

//Index with start button to go to intro dialog
export default function Index() {
  //get lang from context
  const lang = useWrapperContext().state.lang
  const router = useRouter()

  return (
    <div>
      <div id={style.global} >
        <Image
        width = {"300px"}
        height = {"280px"}
        quantity = {100}
        priorityv = {true}
        src={"/img/other/global.png"}/>
      </div>
      <div>
        <button className="start_button" onClick={() => router.push('/intro') }>{translations.start[lang]}</button>
      </div>    
    </div>  
  )
}