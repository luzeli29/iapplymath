import React from 'react'
import {Dialog} from '@common_imports'
import {useRouter} from 'next/router'

export default function Introduction() {
    const router = useRouter()

    return (
        <Dialog 
            scriptId={"aunt_intro"} 
            onEnd={() => router.push('/game/aunt-house')}/>)
}
