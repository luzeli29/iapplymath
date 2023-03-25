import React from 'react'
import {useRouter} from 'next/router'
import {GameFinishLayout} from '@utils/imports/commonImports'


export default function Finished() {
    const router = useRouter()
    return (
        <GameFinishLayout 
            game_name="restaurant"
            restart_text="menu_select"
            handleRestart={() => router.push('/game/restaurant')}>
        </GameFinishLayout>
    )
}
