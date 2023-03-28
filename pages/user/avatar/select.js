import React, { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/router'
import style from '@styles/avatar.module.css'
import { getText } from '@commonImports';
import { useUserContext } from '@hooks/siteContext/useUserContext';
import Error from 'pages/error';
import Loading from '@comps/screens/loading';
import { err, log } from '@utils/debug/log';
import Login from 'pages/user/login';
export default function AvatarSelect() {
    //get the site context and lang
    const {user,settings,loading, error} = useUserContext()
    const isLoggedIn = user.loggedIn    
    const userAvatarId = isLoggedIn ? user.data.avatarId : null
    const [selectedAvatarId, setSelectedAvatarId] = useState(userAvatarId? userAvatarId : null)
    const [feedbackText, setFeedbackText] = useState()

    const router = useRouter()

    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    
    const lang = settings.lang
    if(!isLoggedIn) return <Login/>

    function handleSaveAvatar() {
        if(!isLoggedIn) {
            setFeedbackText(getText('not_loggedin_avatar',lang))
            err('User is not logged in.')
            return
        }
        setFeedbackText()

        user.setAvatarId(selectedAvatarId)

        router.push('/user/petSelect')
    }

    const AvatarButton = ({index}) => {
        const path = "/img/avatar/preMade/A"
        return (
            <button
                onClick={() => setSelectedAvatarId(index)}
                className={style.avatar_select_button}>
                <Image
                        priority={true}
                        layout={"fill"}
                        src={selectedAvatarId == index ? path + index + "_selected.png" : path + index + ".png"}
                        alt={"avatar"}/> 

            </button>
        )
    } 
    
    return (
        <>
            <h1 className={style.as_title_container}>{getText('pick_avatar',lang)}</h1>
            <p className='text-center'>{feedbackText}</p>
            <div className={style.button_bar}>
                {Array.apply(0, Array(8)).map((x,i) => {
                    return <AvatarButton index={i} key={i} />;
                })}
            </div>
            {selectedAvatarId == undefined ? 
                <button 
                        className={style.continue_button}
                        onClick={() => handleSaveAvatar()}>
                    {getText('save',lang)}
                </button>
            :
                <>
                </>
            }
        </>
    )
}

