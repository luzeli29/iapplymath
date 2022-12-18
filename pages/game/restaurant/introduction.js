import React from 'react'
import Dialog from '../../../comps/dialog/dialog'
import { useRouter } from 'next/router'

export default function Introduction() {
  const router = useRouter();
    return (
        <Dialog
        scriptId={"resturant_intro"}
        onEnd={() => router.push('/game/restaurant/')}/>
    )
}
