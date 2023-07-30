import React from 'react'
import {useRouter} from 'next/router'
import GameFinishLayout from '@layouts/gameLayouts/gameFinishLayout'
export default function Finished() {
    //get context and lang
    const router = useRouter()
    return (
        <GameFinishLayout
            gameName={"court"}
            restart_text={"play_again"}
            handleRestart={() => router.push('/game/court/basic/levelSelect?sportKey=basketball')}/>
    );
}
