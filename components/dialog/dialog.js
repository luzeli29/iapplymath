import React, {useState,useEffect} from 'react';
import Image from 'next/image'
import {useRouter} from 'next/router'
import { AiFillCaretRight,AiFillCaretLeft } from "react-icons/ai";
import style from '@styles/dialog.module.css'
import {useWrapperContext} from '@common_imports'
import Scripts from '@public/text/dialog_scripts'


/*
Creates a dialog screen to be shown in a game view

scriptId - the id in which to get the script from txt object
onEnd - what the dialog should do on end, default is to return to index.js
onInput - function in what we should do when there is an input required

*/
export default function Dialog ({scriptId, onEnd, onInput}) {
    //Get current context
    const context =  useWrapperContext()
    const lang = context.state.lang;
    const router = useRouter()

    //keeps track of which line user is on, allows for rerender due to useState
    const [lineNum,setLineNum]= useState(0);

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
  
    //get avatar from context
    const avatarID = context.state.avatarID

    const stage = dialog.stage ? dialog.stage : Scripts["error"].stage
    const backgroundImgSrc = stage == "ayu" ? "/img/ayu/ayu.png" : "/img/" + stage + "/" + stage + "_bg.png";
    const hasCharacters = (stage == "aunt_house" || stage == "restaurant")

    var speechTriangle = "end";

    if(stage == "ayu") {
        speechTriangle = "center"
    } else if (script[lineNum].playerSpeaking) {
        speechTriangle = "start"
    }

    return (
        <div className="fluid-container h-100 p-3">
            <div className="h-25 container  justify-content-center">
                <div className="card w-75 text-center mx-auto">
                    <div className="card-body"
                        onClick={() => handleNextLine()}>
                        <p className="card-text pt-2 px-4">{script[lineNum][lang]}</p>
                    </div>
                    <div className="card-subtitle mb-2 text-muted">
                        <div className="row align-items-center">
                            <div className="col">
                                {lineNum > 0 ? 
                                    <button onClick={() => handlePrevLine()}><AiFillCaretLeft/></button>
                                :
                                    <></>
                                }
                            </div>
                            <div className="col">
                                <small>{(lineNum + 1)+ "/" + (script.length)}</small>
                            </div>
                            <div className="col">
                                {lineNum != (script.length - 1)? 
                                    <button onClick={() => handleNextLine()}><AiFillCaretRight/></button>
                                :
                                    <button onClick={() => handleNextLine()}>Continue</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={" px-5 mx-auto w-75 d-flex justify-content-" + speechTriangle}>
                <div className={style.speech_bubble_triangle}></div>     
                </div>
            </div>
            <div className="d-flex justify-content-center container h-75 w-75">
                {
                    hasCharacters ?
                    <>
                        <Image
                            priority={true}
                            width={650}
                            height={375}
                            quality={100}
                            src={backgroundImgSrc}/>
                        <div className={style.player_img}>
                            <Image
                                    priority={true}
                                    layout={"fill"}
                                    quality={100}
                                    src={"/img/avatar/pre_made/A" + avatarID + "_back.png"}/> 
                        </div>
                        <div className={style.speaker_img}>
                        {dialog.no_speaker ?
                            <>
                            </> 
                        : 
                            
                            <Image
                                priority={true}
                                layout={"fill"}
                                quality={100}
                                src={"/img/" + stage + "/" + stage + "_speaker.png"}/>
                        }
                        </div>
                    </>
                    :
                    <Image
                        priority={true}
                        width={375}
                        height={375}
                        quality={100}
                        src={backgroundImgSrc}/>
                }
            </div>
            <input className="d-none" autoFocus={true} onBlur={({ target }) => {target.focus()}}/>
        </div>
    )  
} 