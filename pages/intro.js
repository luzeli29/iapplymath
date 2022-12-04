import React from 'react';
import Dialog from '../comps/dialog/dialog';
import {useRouter} from 'next/router'

//Ayu introduction
export default function Intro() {
  const router = useRouter()

  return <Dialog scriptId="game_intro" onEnd={() => router.push('/avatar/select')}/>
}