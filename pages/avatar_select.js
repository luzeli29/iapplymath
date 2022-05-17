import React, {useState} from 'react';
import Image from "next/image";
import {useWrapperContext} from '../context/context'
import { useRouter } from 'next/router'
import style from '../styles/avatar.module.css'
import translations from '../public/text/translations';

export default function Creator() {
    //get the site context and lang
    const context = useWrapperContext()
    const lang = context.state.lang

    const router = useRouter();

    const [avatar, setAvatar] = useState("")

    //This is called when the player is done creating
    //Should handle anything to be done in order to use avatar in game
    const handleFinishAvatar = () => {
        context.setAvatar(avatar)
        router.push('/game')
    }

    const AvatarButton = ({index}) => {
        const path = "/img/avatar/pre_made/A"
        return (
            <button
                onClick={() => setAvatar(index)}
                className={style.avatar_select_button}>
                <Image
                        priority={true}
                        layout={"fill"}
                        src={avatar == index ? path + index + "_selected.png" : path + index + ".png"}/> 
            
            </button>
        )
    } 
    

    return (
        <>
            <h1 className={style.as_title_container}>{translations.pick_avatar[lang]}</h1>
            <div className={style.button_bar}>
                {Array.apply(0, Array(8)).map((x,i) => {
                    return <AvatarButton index={i + 1} key={i} />;
                })}
            </div>
            <button 
                className={style.continue_button}
                onClick={() => handleFinishAvatar()}>{translations.continue[lang]}</button>
        </>
    )
}

