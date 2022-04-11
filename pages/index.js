import React, {} from 'react';
import Dialog from '../comps/dialog';
import { useRouter } from 'next/router'
import Script from '../public/text/script'


export default function Index() {

  const router = useRouter()
  
  return (
    <>
      <Dialog
        stage={"ayu"}
        script={Script.game_intro}
        onEnd={() => router.push('/avatar_select') }/>
    </>

  )
}