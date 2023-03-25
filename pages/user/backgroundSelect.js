import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {useWrapperContext,getText} from '@utils/imports/commonImports'
import { useRouter } from 'next/router'
import style from '@styles/avatar.module.css'
import { useUserContext } from '@hooks/siteContext/useUserContext';
import Loading from '@comps/screens/loading';
import Error from 'pages/error';
import ClickableIcon from '@comps/clickableIcon';
import Login from './login';

const colors = ["#EDBFC6","#C1ECFA","#A6EEC7","#DAC4F7","#fadb91", "#EBA688"];

export default function BackgroundSelect() {
    //get the site context and lang
   
    const {user,settings,loading, error} = useUserContext()
    const isLoggedIn = user.loggedIn    
    const settingsBackground = settings.background
    const [selectedBackgroundIndex, setSelectedBackgroundIndex] = useState(-1)

    const router = useRouter()


    useEffect(() => {
        var r = document.querySelector(':root');
        r.style.setProperty('--page-color', colors[selectedBackgroundIndex] ? colors[selectedBackgroundIndex] : "#EDBFC6");
    }, [selectedBackgroundIndex]);
    

    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    
    const lang = settings.lang
    if(!isLoggedIn) return <Login/>


    //This is called when the player is done creating
    //Should handle anything to be done in order to use avatar in game
    const handleBackgroundSave = () => {
        settings.setBackgroundHex(colors[selectedBackgroundIndex])
        router.push('/game/map')
    }

    const BackgroundColorIconContent = ({color}) => {
        return (
            <div style={{ backgroundColor: color, width: "100px", height: "100px",borderRadius:"100%"}}/>
        )
    }

    const BackgroundButton = ({index}) => {
        const path = "/img/background/color"
        return (
            <ClickableIcon
                selected={selectedBackgroundIndex == index}
                onClick={() => setSelectedBackgroundIndex(index)}> 
                <BackgroundColorIconContent color={colors[index]}/>
            </ClickableIcon>
        )
    }

    return (
        <div>
            <h1 className={style.as_title_container}>{getText('background_select',lang)}</h1>
            <div className={style.button_bar} style={{marginLeft: "80px"}}>
                {Array.apply(0, Array(6)).map((x,i) => {
                    return <BackgroundButton index={i} key={i} />;
                })}
            </div>
            <button
                className={style.continue_button}
                onClick={() => handleBackgroundSave()}>
                {getText('save',lang)}
            </button>
        </div>
    )
}
