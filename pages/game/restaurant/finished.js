import React from 'react'
import {useWrapperContext} from '../../../context/context'
import FinishScreen from '../../../comps/game/layouts/finish_layout'
import {useRouter} from 'next/router'

export default function Finished() {
    //get context and lang
    const lang = useWrapperContext().state.lang;
    const router = useRouter()
    return (
        <FinishScreen 
            lang={lang}
            game_name="restaurant"
            restart_text="menu_select"
            handleRestart={() => router.push('/game/restaurant')}>
        </FinishScreen>
    )
}
