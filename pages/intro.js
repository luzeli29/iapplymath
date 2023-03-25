import React from 'react';
import {useRouter} from 'next/router'
import {Dialog} from '@utils/imports/commonImports';

//Ayu introduction
export default function Intro() {
  const router = useRouter()

  return <Dialog scriptId="game_intro" onEnd={() => router.push('/user/avatar/select')}/>
}