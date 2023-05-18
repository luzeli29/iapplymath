import React from 'react'
import {useRouter} from 'next/router'
import DialogOld from '@comps/dialog/dialogOld';

export default function Outro() {
    const router = useRouter()
    return (
        <DialogOld
            scriptId={"resturant_outro"}
            onEnd={() => router.push('/game/restaurant/finished')}/>
    )
}
