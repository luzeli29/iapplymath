import React, {useState} from 'react';
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {useWrapperContext} from '../context/context'
import { useRouter } from 'next/router'

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
        const path = "/img/avatar/pre_made/icons/A"
        return (
            <button
                onClick={() => setAvatar(index)}
                className="avatar_select_button">
                <Image
                        priority={true}
                        layout={"fill"}
                        src={avatar == index ? path + index + "_selected.png" : path + index + ".png"}/> 
            
            </button>
        )
    } 
    

    return (
        <>
            <h1 className="as_title_container">{lang == "en" ? "Pick an Avatar" : "Elige un Avatar" }</h1>
            <div className="button_bar">
                {Array.apply(0, Array(8)).map((x,i) => {
                    return <AvatarButton index={i + 1} key={i} />;
                })}
            </div>
            <button 
                className="as_title_container"
                onClick={() => handleFinishAvatar()}>{lang == "en" ? "Continue" : "Continuar" }</button>
        </>
    )
}

