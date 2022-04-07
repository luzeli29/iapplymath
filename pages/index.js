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
        //TODO: push to /creator when ready to show off more website
        onEnd={() => router.push('/') }/>
    </>

  )
}