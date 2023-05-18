import React from 'react'
import DialogOld from '@comps/dialog/dialogOld';
import {useRouter} from 'next/router'
import ReactHowler from "react-howler";

export default function Introduction() {
    const router = useRouter()

    return (
        <>
        <DialogOld 
            scriptId={"aunt_intro"} 
            onEnd={() => router.push('/game/auntHouse')}/>)
        </>
    )
}
