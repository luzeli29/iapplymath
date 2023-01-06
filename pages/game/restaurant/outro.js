import React from 'react'
import {useRouter} from 'next/router'
import {Dialog} from '@common_imports'

export default function Outro() {
    const router = useRouter()
    return (
        <Dialog
            scriptId={"resturant_outro"}
            onEnd={() => router.push('/game/restaurant/finished')}/>
    )
}
