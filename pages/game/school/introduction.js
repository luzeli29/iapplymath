import React from 'react'
import DialogOld from '@comps/dialog/dialogOld';
import {useRouter} from 'next/router'

export default function Introduction() {
    const router = useRouter()

    return (
        <>
        <DialogOld
            scriptId={"school_intro"} 
            onEnd={() => router.push('/game/school')}/>
        </>
    )
}
