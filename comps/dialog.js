import React, {useState,useCallback,useEffect} from 'react';
import style from './dialog.module.css'
import {useWrapperContext} from '../context/context'
import Image from 'next/image'

export default function Dialog ({stage, script, onEnd}) {
    //TODO: HANDLE EDGE CASES

    //get context, lang and line number from context
    const context = useWrapperContext()
    const lang = context.state.lang
    const lineNum = context.state.lineNum

    //handle click of screen or keypress
    const handleNextLine = () => {
        //Check if script is found
        if(!script) {
            context.endDialog()
            onEnd()
        } else if(lineNum == script.length-1) {
            context.endDialog()
            onEnd()
        } else {
            context.nextLine()
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
  

    //Renders the speaker screen if Ayu is the one speaking
    const AyuSpeaker = () => {
        //TODO: Make Ayu image look better
        return (
            <div className={style.ayu_img_container}>
                <Image
                    priority={"true"}
                    layout={"fill"}
                    src={"/img/ayu/ayu.png"}/> 
            </div>
        )
    }

    //TODO: FINISH SPEAKER GRAPHIC
    const PersonSpeaker = () => {
        return (
            <div className={style.speaker_img_container}>
                <div className={style.player_img}>
                    <Image
                        priority={"true"}
                        layout={"fill"}
                        src={"/img/aunt_house/aunt.png"}/> 
                </div>
                <div className={style.speaker_img}>
                    <Image
                        priority={"true"}
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
                        layout={"fill"}
                        src={"/img/aunt_house/aunt_house_bg.png"}/>
                }
                <div className={style.dialog_speech_container}>
                    <div className={style.speech_bubble}>
                        {script ? 
                            <p className={style.speech_bubble_text}>{script[lineNum][lang]}</p>
                            : 
                            <p className={style.speech_bubble_text}>LINE NOT FOUND</p>
                        }
                        
                    </div>


                    {stage == "ayu" ? 
                        <div className={style.speech_bubble_triangle_ayu}></div> : 
                        script[lineNum].player_speaking ? 
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