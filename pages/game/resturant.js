import React, {useState} from 'react'
import Dialog from '../../comps/dialog'
import {useWrapperContext} from '../../context/context'
import Link from 'next/link'


//Main Aunt game
export default function Resturant () {
    //get context and lang
    const context = useWrapperContext()
    const lang = context.state.lang

    const [state, setState] = useState("intro_dialog")

    const MenuSelect = () => {
        return (
            <>
                <Link href="/game">Back To Map</Link>
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