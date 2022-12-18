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
            game_name={"aunt_house"}
            restart_text={"recipe_select"}
            handleRestart={() => router.push('/game/aunt-house')}/>
    );
}
