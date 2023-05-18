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

const DialogOld = ({scriptId, onEnd, onInput}) => {
    const {user,settings,loading, error} = useUserContext()
    const router = useRouter()

    const isLoggedIn = user.loggedIn    

    //keeps track of which line user is on, allows for rerender due to useState
    const [lineNum, setLineNum]= useState(0);

    //Handles keypress
    const handleKeyPress = () => {
        switch(event.keyCode){
            case 39:
                handleNextLine();
                break;
            case 13:
                handleNextLine();
                break;
            case 37:
                handlePrevLine();
                break;
            
        }
    };

     //useEffect in order to detect keypress, and rerender
    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
    
        return () => {
          document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);

    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>

    const lang = settings.lang
    const avatarId = user.data.avatarId

    //set all needed params with id given, and check if they actually exist
    const dialog = Scripts[scriptId] ? Scripts[scriptId] : Scripts["error"]
    const script = dialog.lines ? dialog.lines : Scripts["error"].lines
    //if no onEnd function found, return to index
    const _onEnd = onEnd ? onEnd : () => router.push('/')

    //handle click of screen or enter keypress
    const handleNextLine = () => {
        if(lineNum == script.length-1) {
            //last line shown, end dialog
            _onEnd()
        } else {
            //go to next line
            setLineNum(lineNum + 1)
        }
    }

    const handlePrevLine = () => {
        if(lineNum > 0) {
            setLineNum(lineNum - 1)
        } 
    }

  
    const stage = dialog.stage ? dialog.stage : Scripts["error"].stage
    const ayuImg = script[lineNum].stg ? script[lineNum].stg : dialog.stage;
    const backgroundImgSrc = changeBackgroundImgSrc(ayuImg);
    const hasCharacters = (stage == "aunt_house" || stage == "restaurant")

    var speechTriangle = "end";

    if(stage == "ayu" || stage == "ayuDeepBreathIn" || stage == "ayuDeepBreathHold" || stage == "ayuDeepBreathOut") {
        speechTriangle = "center"
    } else if (script[lineNum].player_speaking) {
        speechTriangle = "start"
    }

    return (
        <div className="container-fluid h-100 p-3">
            <div className="h-25 container  justify-content-center">
                <div className="card text-center mx-auto pt-0">
                    <div className="card-body px-0 pt-2 pb-1 ">
                        <div className="row">
                            <div className="col-lg-11">
                                <p className="card-text resize-text"> <TextReader text={script[lineNum][lang]} reader={stage}/> {script[lineNum][lang]}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-subtitle text-muted">
                        <div className="row align-items-center">
                            <div className="col">
                                {lineNum > 0 ? 
                                    <button  className = "resize-text" onClick={() => handlePrevLine()}><AiFillCaretLeft/></button>
                                :
                                    <></>
                                }
                            </div>
                            <div className="col">
                                <small>{(lineNum + 1)+ "/" + (script.length)}</small>
                            </div>
                            <div className="col">
                                {lineNum != (script.length - 1)? 
                                    <button className = "resize-text" onClick={() => handleNextLine()}><AiFillCaretRight/></button>
                                :
                                    <button className = "resize-text" onClick={() => handleNextLine()}>Continue</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={" px-5 mx-auto w-75 d-flex justify-content-" + speechTriangle}>
                <div className={style.speech_bubble_triangle}></div>     
                </div>
            </div>
            <div className="d-flex justify-content-center container">
                {
                    hasCharacters ?
                    <div className="w-full relative pt-[100%]" style={{width: '100%', height: '50vh', position: 'relative'}}>
                        <Image
                            priority={true}
                            layout = {'fill'}
                            quality={100}
                            src={backgroundImgSrc}
                            alt={"background"}/>
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
                        {dialog.no_speaker ?
                            <>
                            </> 
                        : 
                            
                            <Image 
                                priority={true}
                                layout={"fill"}
                                objectFit = {'contain'}
                                quality={100}
                                src={"/img/" + stage + "/" + stage + "_speaker.png"}
                                alt={"speaker image"}
                                />
                        }
                        </div>
                    </div>
                    :
                    <div  style={{width: '375px', height:'40vh', position: 'relative', marginTop: '10vh'}}>
                    <Image 
                        priority={true}
                        layout={"fill"}
                        objectFit = {'contain'}
                        quality={100}
                        src={backgroundImgSrc}
                        alt={"background"} />
                    </div>
                }
            </div>
            <input className="d-none" autoFocus={true} onBlur={({ target }) => {target.focus()}}/>
        </div>
    )  
}

function changeBackgroundImgSrc(stage){
    switch (stage){
        case "ayu":
            return "/img/ayu/ayu_idle.gif";
        case "ayuDeepBreathIn":
            return "/img/ayu/ayu_breathingIn.gif";
        case "ayuDeepBreathContinuous":
            return "/img/ayu/ayu_deepBreathing.gif";
        case "ayuDeepBreathOut":
            return "/img/ayu/ayu_breathingOut.gif";
        default:
            return "/img/" + stage + "/" + stage + "_bg.png";
    }
}
export default DialogOld;