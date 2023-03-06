import React from 'react'
import {Dialog} from '@utils/imports/commonImports'
import {useRouter} from 'next/router'
import ReactHowler from "react-howler";

export default function Introduction() {
    const router = useRouter()

    return (
        <>
        <Dialog 
            scriptId={"aunt_intro"} 
            onEnd={() => router.push('/game/auntHouse')}/>)
        </>
    )
}
