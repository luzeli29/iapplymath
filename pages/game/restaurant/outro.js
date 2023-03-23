import React from 'react'
import {useRouter} from 'next/router'
import {Dialog} from '@utils/imports/commonImports'

export default function Outro() {
    const router = useRouter()
    return (
        <Dialog
            scriptId={"resturant_outro"}
            onEnd={() => router.push('/game/restaurant/finished')}/>
    )
}
