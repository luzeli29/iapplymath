import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/router'
import style from '@styles/avatar.module.css'
import {useWrapperContext,getText} from '@common_imports'

export default function Creator() {
    //get the site context and lang
    const context = useWrapperContext()
    const lang = context.state.lang
    const avatarId = context.state.avatarId
    const userId = context.state.userId
    
    const router = useRouter();

    //This is called when the player is done creating
    //Should handle anything to be done in order to use avatar in game
    const handleSaveAvatar = async() => {
        const data = {
            userId: context.state.userId,
            avatarId: context.state.avatarId
        }

        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/avatarId'

        const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        //const result = await response.json()

        router.push('/game/map')
    }

    const AvatarButton = ({index}) => {
        const path = "/img/avatar/pre_made/A"
        return (
            <button
                onClick={() => context.setAvatarId(index)}
                className={style.avatar_select_button}>
                <Image
                        priority={true}
                        layout={"fill"}
                        src={context.state.avatarId == index ? path + index + "_selected.png" : path + index + ".png"}/> 
            
            </button>
        )
    } 
    

    return (
        <>
            <h1 className={style.as_title_container}>{getText('pick_avatar',lang)}</h1>
            <div className={style.button_bar}>
                {Array.apply(0, Array(8)).map((x,i) => {
                    return <AvatarButton index={i + 1} key={i} />;
                })}
            </div>
            {avatarId && userId ? 
                <button 
                        className={style.continue_button}
                        onClick={() => handleSaveAvatar()}>
            {       getText('save',lang) + userId}
                </button>
            :
                <>
                    <p>
                    </p>
                </>
            }
        </>
    )
}

