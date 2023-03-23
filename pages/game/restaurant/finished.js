import React from 'react'
import {useRouter} from 'next/router'
import {GameFinishLayout,useWrapperContext} from '@utils/imports/commonImports'


export default function Finished() {
    //get context and lang
    const lang = useWrapperContext().state.lang;
    const router = useRouter()
    return (
        <GameFinishLayout 
            lang={lang}
            game_name="restaurant"
            restart_text="menu_select"
            handleRestart={() => router.push('/game/restaurant')}>
        </GameFinishLayout>
    )
}
