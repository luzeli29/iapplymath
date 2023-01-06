import React from 'react'
import {useRouter} from 'next/router'
import {GameFinishLayout,useWrapperContext} from '@common_imports'

export default function Finished() {
    //get context and lang
    const lang = useWrapperContext().state.lang;
    const router = useRouter()
    return (
        <GameFinishLayout
            lang={lang}
            game_name={"aunt_house"}
            restart_text={"recipe_select"}
            handleRestart={() => router.push('/game/aunt-house')}/>
    );
}
