import React, {useState} from 'react';
import Image from "next/image";
import {useWrapperContext} from '@utils/imports/commonImports'
import { useRouter } from 'next/router'
import style from '../../styles/check_in.module.css'
import translations from '../../public/text/translations';
import ClickableIcon from '@comps/clickableIcon';


export default function Creator() {
    //get the site context and lang
    const context = useWrapperContext()
    const lang = context.state.lang

    const router = useRouter();

    const [feeling, setFeeling] = useState("")

    //This is called when the player is done creating
    //Should handle anything to be done in order to use avatar in game
    const handleFeelingSelected = () => {
        // context.setAvatar(avatar)
        router.push('/game/map')
    }

    const FeelingButton = ({index}) => {
        const path = "/img/feelings/feeling"
        return (
            <button
                onClick={() => setFeeling(index)}
                className={style.avatar_select_button}>
                <Image
                    priority={true}
                    layout={"fill"}
                    src={feeling == index ? path + index + "_selected.png" : path + index + ".png"}/>
            </button>
        )
    }

    return (
        <>
            <h1 className={style.as_title_container}>{translations.check_in[lang]}</h1>
            <div className={style.feeling_buttons}>
                {Array.apply(0, Array(5)).map((x,i) => {
                    return <div whileTap={{backgroundColor: "#000000", borderRadius:100}} index={i + 1} key={i} > <FeelingButton index={i + 1} key={i}/> </div>
                    ;
                })}
            </div>
            <button
                className={style.continue_button}
                onClick={() => handleFeelingSelected()}
            >{translations.continue[lang]}</button>
        </>
    )
}