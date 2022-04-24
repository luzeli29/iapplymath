import React from 'react';
import {useRouter} from 'next/router'
import {useWrapperContext} from '../context/context'
import translations from '../public/text/translations'
import Dialog from '../comps/dialog';

export default function Index() {
  //get lang from context
  const lang = useWrapperContext().state.lang
  const router = useRouter()

  return (
    //TODO: Make pretty
    //<button onClick={() => router.push('/intro') }>{translations.start[lang]}</button>

    <Dialog scriptId="game_intro" onEnd={() => router.push('/avatar_select')}/>
  )
}