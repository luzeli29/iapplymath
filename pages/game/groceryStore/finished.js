import React from 'react'
import {useRouter} from 'next/router'
import GameFinishLayout from '@layouts/gameLayouts/gameFinishLayout'


export default function Finished() {
    const router = useRouter()
    return (
        <GameFinishLayout 
            gameName="groceryStore"
            restart_text="replay"
            handleRestart={() => router.push('/game/groceryStore/basic/levelSelect')}>
        </GameFinishLayout>
    )
}
