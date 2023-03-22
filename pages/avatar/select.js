import React, { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/router'
import style from '@styles/avatar.module.css'
import { getText } from '@commonImports';
import { useUserContext } from '@hooks/siteContext/useUserContext';
export default function AvatarSelect() {
    //get the site context and lang
    const {user,settings,loading, error} = useUserContext()
    const [selectedAvatarId, setSelectedAvatarId] = useState()
    const router = useRouter()

    if(loading) return <Loading/>
    if(onRoute) return (<Loading/>)
    const context = useWrapperContext()
    const lang = context.state.lang
    const avatarId = context.state.avatarId
    const username = context.state.username
    

    //This is called when the player is done creating
    //Should handle anything to be done in order to use avatar in game
    const handleSaveAvatar = async() => {
        const data = {
            username: context.state.username,
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

        //TODO: error correct results.

        router.push('/pet')
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
            {avatarId && username ? 
                <button 
                        className={style.continue_button}
                        onClick={() => handleSaveAvatar()}>
                    {getText('save',lang)}
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

