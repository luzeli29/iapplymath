import React, {useState} from 'react';
import Image from "next/image";
import {useWrapperContext} from '@utils/imports/commonImports'
import { useRouter } from 'next/router'
import style from '../../styles/check_in.module.css'
import translations from '../../public/text/translations';
import ClickableIcon from '@comps/clickableIcon';
import { useUserContext } from '@hooks/siteContext/useUserContext';
import Loading from '@comps/screens/loading';
import Error from 'pages/error';
import Login from './login';
import Tooltip from '@comps/accessibility/tooltip';

const emotions = [
    {
        src: "happy",
        en: "Happy",
        es: "Feliz",
    },{
        src: "stressed",
        en: "Stressed",
        es: "Estresado",
    },{
        src: "sad",
        en: "Sad",
        es: "Triste",
    },{
        src: "meh",
        en: "Meh",
        es: "Bah",
    },{
        src: "angry",
        en: "Angry",
        es: "Enojado",
    }
]

export default function Creator({onEnd}) {
    const {user,settings,loading, error} = useUserContext()
    const isLoggedIn = user.loggedIn
    const [selectedFeelingIndex, setSelectedFeelingIndex] = useState()
    const _onEnd = onEnd ? onEnd : () => router.back();

    const router = useRouter()

    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>

    const lang = settings.lang
    if(!isLoggedIn) return <Login/>

    //This is called when the player is done creating
    //Should handle anything to be done in order to use avatar in game
    const handleFeelingSubmit = () => {
        _onEnd();
    };

    const FeelingButton = ({index}) => {
        const emotion = emotions.at(index)
        if(!emotion) return <Error/>
        const text = emotion[lang]
        const imgSrc = "/img/feelings/" + emotion.src + ".png"
        return (
            <Tooltip text={text}>
            <ClickableIcon
                selected={selectedFeelingIndex == index}
                onClick={() => setSelectedFeelingIndex(index)}
                className={style.avatar_select_button}>
                <Image
                    priority={true}
                    width={80}
                    height={80}
                    src={imgSrc}
                    alt={text}/>
            </ClickableIcon>
            </Tooltip>
        )
    }

    return (
        <>
            <h1 className={style.as_title_container}>{translations.check_in[lang]}</h1>
            <div className={style.feeling_buttons}>
                {Array.apply(0, Array(5)).map((x,i) => {
                    return (
                        <FeelingButton index={i} key={i}/>
                    )
                })}
            </div>
            <button
                className={style.continue_button}
                onClick={() => handleFeelingSubmit()}
            >{translations.continue[lang]}</button>
        </>
    )
}