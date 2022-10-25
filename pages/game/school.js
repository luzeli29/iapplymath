import React from 'react';
import {useWrapperContext} from '../../context/context'
import {useRouter} from 'next/router'

export default function School() {
  const lang = useWrapperContext().state.lang;
    //init router
    const router = useRouter()
    router.push('/game/coming_soon')
  return (
    <>
    </>
  )
}
  