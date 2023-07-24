import React, {useState,useEffect} from 'react';
import Image from 'next/image'
import {useRouter} from 'next/router'
import { AiFillCaretRight,AiFillCaretLeft } from "react-icons/ai";
import style from '@styles/dialog.module.css'
import Scripts from '@public/text/dialogScripts'
import TextReader from 'comps/accessibility/textReader';
import { useUserContext } from '@hooks/siteContext/useUserContext';
import Loading from '@comps/screens/loading';
import Error from 'pages/error';
import Login from 'pages/user/login';

/*
Creates a dialog screen to be shown in a game view

scriptId - the id in which to get the script from txt object
onEnd - what the dialog should do on end, default is to return to index.js
onInput - function in what we should do when there is an input required

*/

const SNPDialogContent = ({avatarId,stage,line}) => {
    if(!(avatarId >= 0 )) return <Error error={'No avatarId given to SNPDialogContent comp'}/>
    if(!stage) return <Error error={'No stage given to SNPDialogContent comp'}/>
    if(!line) return <Error error={'No line given to SNPDialogContent comp'}/>

    const speakerSrc = line.speakerSrc ? line.speakerSrc : stage.speakerSrc
    const backgroundSrc = line.backgroundSrc ? line.backgroundSrc : stage.backgroundSrc

    return (
        <div className="w-full relative pt-[100%]" style={{width: '100%', height: '50vh', position: 'relative'}}>
                        {backgroundSrc ? 
                            <Image
                            priority={true}
                            layout = {'fill'}
                            quality={100}
                            src={backgroundSrc}
                            alt={"background image"}/>
                        : <></>}
                        <div className={style.player_img}>
                            <Image
                                    priority={true}
                                    layout={"fill"}
                                    quality={100}
                                    objectFit = {'contain'}
                                    src={"/img/avatar/preMade/A" + avatarId + "_back.png"}
                                    alt={"avatar"}/> 
                        </div>
                        <div className={style.speaker_img}>
                        {speakerSrc ?
                            <Image 
                            priority={true}
                            layout={"fill"}
                            objectFit = {'contain'}
                            quality={100}
                            src={speakerSrc}
                            alt={"speaker image"}
                            />
                        : 
                            <></>
                        }
                        </div>
                    </div>
    )  
}

export default SNPDialogContent;