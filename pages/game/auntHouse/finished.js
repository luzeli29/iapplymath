import React from 'react'
import {useRouter} from 'next/router'
import {GameFinishLayout} from '@utils/imports/commonImports'

export default function Finished() {
    //get context and lang
    const router = useRouter()
    return (
        <GameFinishLayout
            game_name={"aunt_house"}
            restart_text={"recipe_select"}
            handleRestart={() => router.push('/game/auntHouse')}/>
    );
}
