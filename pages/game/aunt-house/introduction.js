import React from 'react'
import Dialog from '../../../comps/dialog/dialog'
import {useRouter} from 'next/router'

export default function Introduction() {
    const router = useRouter()

    return (
        <Dialog 
            scriptId={"aunt_intro"} 
            onEnd={() => router.push('/game/aunt-house')}/>)
}
