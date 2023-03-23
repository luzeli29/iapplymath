import React from 'react'
import { useRouter } from 'next/router'
import {Dialog} from '@utils/imports/commonImports'

export default function Introduction() {
  const router = useRouter();
    return (
        <Dialog
        scriptId={"resturant_intro"}
        onEnd={() => router.push('/game/restaurant/')}/>
    )
}
