import React, {useState,useEffect} from 'react';
import style from '../styles/dialog.module.css'
import {useWrapperContext} from '../context/context'
import Image from 'next/image'
import Scripts from '../public/text/dialog_scripts'
import {useRouter} from 'next/router'


/*
Creates a dialog screen to be shown in a game view

scriptId - the id in which to get the script from txt object
onEnd - what the dialog should do on end, default is to return to index.js
onInput - function in what we should do when there is an input required

*/
export default function Dialog ({scriptId, onEnd, onInput}) {
    //Get current context
    const context =  useWrapperContext()

    const router = useRouter()

    //keeps track of which line user is on, allows for rerender due to useState
    const [lineNum,setLineNum]= useState(0);

    //set all needed params with id given, and check if they actually exist
    const dialog = Scripts[scriptId] ? Scripts[scriptId] : Scripts["error"]
    const stage = dialog.stage ? dialog.stage : Scripts["error"].stage
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

    //Handles keypress
    const handleKeyPress = () => {
        if(event.key == "Enter") {
            handleNextLine();
        }
    };

    //useEffect in order to detect keypress, and rerender
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
                line={script[lineNum]}
                handleNextLine={()=>handleNextLine()}
                context={context}/>
        </>
    )
    
} 

//This is the component that makes up what is seen on the page
const DialogScreen = ({stage,line,handleNextLine,context}) => {
    //get avatar from context
    const avatar = context.state.avatar
      
    //Creates the view depending on what stage it si
    if(stage == "ayu") { //Creates Ayu Screen
        return (
            <>
                <button 
                    className="fill_container"
                    onClick={() => handleNextLine()}>
                    <SpeechBubble
                        stage={stage}
                        line={line}
                        context={context}/>
                    <div className={style.ayu_img_container}>
                        <Image
                            priority={true}
                            layout={"fill"}
                            quality={100}
                            src={"/img/ayu/ayu.png"}/> 
                    </div>
                </button>
                <input className="key_listener" autoFocus={true} onBlur={({ target }) => {target.focus()}}/>
            </>
        )
    } else { //Creates 2 speaker stage
        //FIXME: warning created due to css
        return (
            <>
                <button 
                    className="fill_container"
                    onClick={() => handleNextLine()}>
                    <div className="view_background_image_container">
                        <Image
                                priority={true}
                                layout={"fill"}
                                quality={100}
                                src={"/img/" + stage + "/" + stage + "_bg.png"}/>
                    </div>
                    <SpeechBubble
                            stage={stage}
                            line={line}
                            context={context}/>
                    <div className={style.speaker_img_container}>
                        <div className={style.player_img}>
                            <Image
                                priority={true}
                                layout={"fill"}
                                quality={100}
                                src={"/img/avatar/pre_made/A" + avatar + "_back.png"}/> 
                        </div>
                        <div className={style.speaker_img}>
                            {stage.no_speaker ?
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
                    </div>
                </button>
                <input className="key_listener" autoFocus={true} onBlur={({ target }) => {target.focus()}}/>
            </>
        )
    }
}

//Speech bubble component, displays text and is rerendered when line changes
const SpeechBubble = ({line,stage,context}) => {
    //get lang from context
    const lang = context.state.lang

    //returns speech bubble arrow in the correct location
    const Arrow = () => {    
        if(stage == "ayu") {
            return (
                <div className={style.speech_bubble_triangle} id={style.center}></div>  
            )
        } else if (line.player_speaking) {
            return (
                <div className={style.speech_bubble_triangle} id={style.left}></div>  
            )        
        } else {
            return (
                <div className={style.speech_bubble_triangle} id={style.right}></div>  
            )
        }
    }

    return (
        <div className={style.dialog_speech_container}>
            <div className={style.speech_bubble}>
                <p className={style.speech_bubble_text}>{line[lang]}</p>
            </div>
            <Arrow/> 
        </div>
    )
}

