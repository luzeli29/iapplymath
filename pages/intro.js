import React from 'react';
import {useRouter} from 'next/router'
import DialogOld from '@comps/dialog/dialogOld';

//Ayu introduction
export default function Intro() {
  const router = useRouter()

  return <DialogOld scriptId="game_intro" onEnd={() => router.push('/user/avatar/select')}/>
}