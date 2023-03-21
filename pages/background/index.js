import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {useWrapperContext,getText} from '@utils/imports/commonImports'
import { useRouter } from 'next/router'
import style from '@styles/avatar.module.css'

export default function Creator() {
    //get the site context and lang
    const context = useWrapperContext()
    const lang = context.state.lang

    const router = useRouter();

    const [background, setBackgroundColor] = useState("")

    //This is called when the player is done creating
    //Should handle anything to be done in order to use avatar in game
    const handleBackground = () => {
        context.setBackgroundColor(background)
        router.push('/game/map')
    }

    const colors = ["#C1ECFA","#C1ECFA","#A6EEC7","#EDBFC6","#DAC4F7","#fadb91", "#EBA688"];


    const AvatarButton = ({index}) => {
        const path = "/img/background/color"
        return (
            <button
                onClick={() => setBackgroundColor(colors[index])}
                className={style.avatar_select_button}>
                <Image
                    priority={true}
                    layout={"fill"}
                    src={background === index ? path + index + "_selected.png" : path + index + ".png"}
                    alt={"background color"}/>

            </button>
        )
    }


  useEffect(() => {
    var r = document.querySelector(':root');
    // Create a function for setting a variable value
    function myFunction_set() {
        // Set the value of variable --blue to another value (in this case "lightblue")
        r.style.setProperty('--page-color', background ? background : "#EDBFC6");
    }
    myFunction_set();
  });



    return (
        <div>
            <h1 className={style.as_title_container}>{getText('background_select',lang)}</h1>
            <div className={style.button_bar} style={{marginLeft: "80px"}}>
                {Array.apply(0, Array(6)).map((x,i) => {
                    return <AvatarButton index={i + 1} key={i} />;
                })}
            </div>
            <button
                className={style.continue_button}
                onClick={() => handleBackground()}>
                {getText('save',lang)}
            </button>
        </div>
    )
}
