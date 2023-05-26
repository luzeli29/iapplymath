import React from 'react'
import {useRouter} from 'next/router'
import GameFinishLayout from '@layouts/gameLayouts/gameFinishLayout'


export default function Finished() {
    const router = useRouter()
    return (
        <GameFinishLayout 
            gameName="school"
            restart_text="type_select"
            handleRestart={() => router.push('/game/school')}>
        </GameFinishLayout>
    )
}
