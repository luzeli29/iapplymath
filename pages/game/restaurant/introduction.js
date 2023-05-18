import React from 'react'
import { useRouter } from 'next/router'
import DialogOld from '@comps/dialog/dialogOld';

export default function Introduction() {
  const router = useRouter();
    return (
        <DialogOld
        scriptId={"resturant_intro"}
        onEnd={() => router.push('/game/restaurant/')}/>
    )
}
