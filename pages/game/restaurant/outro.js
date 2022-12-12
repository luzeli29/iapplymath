import React from 'react'
import Dialog from '../../../comps/dialog/dialog'
import {useRouter} from 'next/router'

export default function Outro() {
    const router = useRouter()
    return (
        <Dialog
            scriptId={"resturant_outro"}
            onEnd={() => router.push('/game/restaurant/finished')}/>
    )
}
