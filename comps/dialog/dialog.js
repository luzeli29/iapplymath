import React, {useState,useEffect} from 'react';
import { AiFillCaretRight,AiFillCaretLeft } from "react-icons/ai";
import style from '@styles/dialog.module.css'
import TextReader from 'comps/accessibility/textReader';
import getText from '@utils/text/getText'
import AyuDialogContent from './ayuDialogContent';
import SNPDialogContent from './snpDialogContent';

import DevLog from '@utils/debug/devLog';
import { useRouter } from 'next/router';
import Loading from '../screens/loading';



const errorLines = [
    {
        text : {
            en : "Error: No dialog found",
            es : "Error: No dialog found but in spanish",
        }
    }
]

const defaultOnEnd = {
    type: 'route',
    route: '/'
}

const Dialog = ({dialogScript,lang,avatarId}) => {

    // set playing to true




    lang = lang ? lang : 'en'

    const router = useRouter()
    const [lineNum, setLineNum]= useState(0);

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

    useEffect(() => {

        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);

    const script = dialogScript.lines ? dialogScript.lines : errorLines
    const stage = dialogScript.stage
    const line = script[lineNum]
    const speaker = line.speaker ? line.speaker : 'ayu'
    const onEnd = dialogScript.onEnd ? dialogScript.onEnd : defaultOnEnd

    const handleEndOfDialog = () => {
        switch (onEnd.type) {
            case 'route':
                const route = onEnd.route ? onEnd.route : '/'
                router.push(route)
                return <Loading/>
            default:
                DevLog('No "onEnd" type given, defaulting to route')
                router.push('/')
                return <Loading/>
        }
    }

    const handleNextLine = () => {
        if(lineNum == script.length-1) {
            DevLog("End of dialog")
            handleEndOfDialog()
        } else {
            setLineNum(lineNum + 1)
        }
    }

    const handlePrevLine = () => {
        if(lineNum > 0) {
            setLineNum(lineNum - 1)
        } 
    }

  
    const getTriangleLocation = () => {
        switch(speaker) {
            case 'ayu':
                return 'center'
            case 'player':
                return 'start'
            case 'aunt':
            case 'speaker':
            case 'teacher':
            case 'friend':
                return 'end'
            default:
                DevErr('Invalid "speaker" in getTriangleLocation()')
                return 'center'
        }
    }

    const renderInnerGraphic = () => {
        switch(stage.dialogType) {
          case 'ayu': 
            return <AyuDialogContent stage={stage} line={line}/>
          case 'speakerAndPlayer' :
            return <SNPDialogContent avatarId={avatarId} stage={stage} line={line}/>
          default :
            DevErr('"stage": ' + stage + ' is not properly mapped to a dialogType...')
            return (<div>ayu stage</div>)
        }
    }
 
    return (
        <div className="container-fluid h-100 p-3">
            <div className="h-25 container  justify-content-center">
                <div className="card text-center mx-auto pt-0">
                    <div className="card-body px-0 pt-2 pb-1 ">
                        <div className="row">
                            <div className="col-lg-11">
                                <p className="card-text resize-text"> <TextReader text={line.text[lang]} reader={speaker}/> {line.text[lang]}</p>
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
                                    <button className = "resize-text" onClick={() => handleNextLine()}>{getText('continue',lang)}</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={" px-5 mx-auto w-75 d-flex justify-content-" + getTriangleLocation()}>
                    <div className={style.speech_bubble_triangle}></div>     
                </div>
            </div>
            <div className="d-flex justify-content-center container">
                {renderInnerGraphic()}
            </div>
            <input className="d-none" autoFocus={true} onBlur={({ target }) => {target.focus()}}/>
        </div>
    )  
}



export default Dialog;
