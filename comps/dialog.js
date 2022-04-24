import React, {useState,useRef,useCallback,useEffect} from 'react';
import style from '../styles/dialog.module.css'
import {useWrapperContext} from '../context/context'
import Image from 'next/image'
import scripts from '../public/text/dialog_scripts'

export default function Dialog ({scriptId, onEnd}) {
    if(!scripts[scriptId]) {
        return <Error message={"ScriptId not found in dialog_script.js"}/>
    } else if (!scripts[scriptId].stage) {

    } else if (!scripts[scriptId].line) {

    } else if (!onEnd) {

    }

    //get lang from context
    const lang = useWrapperContext().state.lang
    const avatar = useWrapperContext().state.avatar

    const stage = scripts[scriptId].stage
    const script = scripts[scriptId].lines

    const [lineNum,setLineNum]= useState(0);

    //handle click of screen or keypress
    const handleNextLine = () => {
        if(lineNum == script.length-1) {
            onEnd()
        } else {
            setLineNum(lineNum + 1)
        }
    }

    //This function and the following effect is for key detection
    const handleKeyPress = () => {
        if(event.key == "Enter") {
            handleNextLine();
        }
    };
  
    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
    
        return () => {
          document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);
  
    return (
        <>
            <DialogScreen 
                stage={stage} 
                line={script[lineNum][lang]}
                playerSpeaking={script[lineNum].player_speaking}
                avatar={avatar}
                handleNextLine={()=>handleNextLine()}/>
        </>
    )
    
} 

function DialogScreen({stage,line,handleNextLine,avatar,playerSpeaking}) {

    //Renders the speaker screen if Ayu is the one speaking
    const AyuSpeaker = () => {
        return (
            <div className={style.ayu_img_container}>
                <Image
                    priority={true}
                    layout={"fill"}
                    src={"/img/ayu/ayu.png"}/> 
            </div>
        )
    }

    const PersonSpeaker = () => {
        return (
            <div className={style.speaker_img_container}>
                <div className={style.player_img}>
                    <Image
                        priority={true}
                        layout={"fill"}
                        src={"/img/avatar/pre_made/A" + avatar + "_back.png"}/> 
                </div>
                <div className={style.speaker_img}>
                    <Image
                        priority={true}
                        layout={"fill"}
                        src={"/img/aunt_house/aunt.png"}/> 
                </div>
            </div>
        )
        }
    return (    
        <>
            <button className={style.dialog_button}
                    onClick={() => handleNextLine()}>
                {stage == "ayu" ? 
                    <>
                    </>
                    : 
                    <Image
                        priority={true}
                        layout={"fill"}
                        src={"/img/aunt_house/aunt_house_bg.png"}/>
                }
                <div className={style.dialog_speech_container}>
                    <div className={style.speech_bubble}>
                        {line ? 
                            <p className={style.speech_bubble_text}>{line}</p>
                            : 
                            <p className={style.speech_bubble_text}>LINE NOT FOUND</p>
                        }
                        
                    </div>


                    {stage == "ayu" ? 
                        <div className={style.speech_bubble_triangle_ayu}></div> : 
                        playerSpeaking ? 
                            <div className={style.speech_bubble_triangle_player}></div>:
                            <div className={style.speech_bubble_triangle_speaker}></div>
                    }
                    
                </div>
                <div className={style.dialog_speaker_container}>
                    {stage == "ayu" ? <AyuSpeaker/> : <PersonSpeaker/>}
                </div>
            </button>
            <input className="key_listener" autoFocus={true} onBlur={({ target }) => {target.focus()}}/>
        </>
    );
}