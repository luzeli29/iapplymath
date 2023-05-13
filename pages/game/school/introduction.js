import React from 'react'
import {Dialog} from '@utils/imports/commonImports'
import {useRouter} from 'next/router'

export default function Introduction() {
    const router = useRouter()

    return (
        <>
        <Dialog 
            scriptId={"school_intro"} 
            onEnd={() => router.push('/game/school')}/>
        </>
    )
}
