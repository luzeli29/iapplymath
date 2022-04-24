import React from 'react';
import Dialog from '../comps/dialog';
import {useRouter} from 'next/router'

export default function Intro() {
  const router = useRouter()

  return <Dialog scriptId="game_intro" onEnd={() => router.push('/avatar_select')}/>
}