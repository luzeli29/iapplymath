import React from 'react'
import {useRouter} from 'next/router'
import GameFinishLayout from '@layouts/gameLayouts/gameFinishLayout'


export default function Finished() {
    const router = useRouter()
    return (
        <GameFinishLayout 
            gameName="restaurant"
            restart_text="menu_select"
            handleRestart={() => router.push('/game/restaurant')}>
        </GameFinishLayout>
    )
}
