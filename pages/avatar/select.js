import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/router'
import style from '@styles/avatar.module.css'
import {useWrapperContext,getCommonText} from '@common_imports'

export default function Creator() {
    //get the site context and lang
    const context = useWrapperContext()
    const avatarID = context.state.avatarID

    const router = useRouter();

    //This is called when the player is done creating
    //Should handle anything to be done in order to use avatar in game
    const handleFinishAvatar = () => {
        if(context.state.avatar === '') {
            return;
        }
        router.push('/game/map')
    }

    const AvatarButton = ({index}) => {
        const path = "/img/avatar/pre_made/A"
        return (
            <button
                onClick={() => context.setAvatarID(index)}
                className={style.avatar_select_button}>
                <Image
                        priority={true}
                        layout={"fill"}
                        src={context.state.avatarID == index ? path + index + "_selected.png" : path + index + ".png"}/> 
            
            </button>
        )
    } 
    

    return (
        <>
            <h1 className={style.as_title_container}>{getCommonText('pick_avatar')}</h1>
            <div className={style.button_bar}>
                {Array.apply(0, Array(8)).map((x,i) => {
                    return <AvatarButton index={i + 1} key={i} />;
                })}
            </div>
            {avatarID == "" ? 
            <button 
                    className={style.continue_button}
                    onClick={() => handleFinishAvatar()}
                    disabled>
                {getCommonText('continue')}
            </button> 
            :
            <button 
                    className={style.continue_button}
                    onClick={() => handleFinishAvatar()}>
                {getCommonText('continue')}
            </button> 
            }
        </>
    )
}

