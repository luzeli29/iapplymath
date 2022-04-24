import React, {useState} from 'react'
import Dialog from '../../comps/dialog'
import {useWrapperContext} from '../../context/context'
import GameLayout from '../../comps/game_layout'
import style from '../../styles/aunt_house.module.css'
import Image from 'next/image'
import recipes from '../../public/text/aunt_house_recipes'
import SimplifyFraction from '../../comps/simplify_fraction'
import {useRouter} from 'next/router'

//Main Aunt game
export default function Resturant () {
    //get context and lang
    const context = useWrapperContext()
    const lang = context.state.lang

    const [state, setState] = useState("intro_dialog")

    const MenuSelect = () => {
        return (
            <>
                <p>Not Finished Yet</p>
            </>
        )
    }

    switch(state) {
        case "intro_dialog" :
            return (<Dialog
                        scriptId={"resturant_intro"}
                        onEnd={() => setState("menu_select")}/>)
        case "menu_select" :
            return (<MenuSelect/>)
    }

}