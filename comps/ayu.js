import React, {useState} from 'react';
import {useWrapperContext} from '../context/context'
import { useRouter } from 'next/router'
import style from './ayu.module.css'

export default function Ayu({size,dialogId}) {
    const value = useWrapperContext();
    const dialog = value.state.ayuDialog[dialogId];
    const dialog_tags = value.state.ayuDialogTags[dialogId];

    const [lineNum, setLineNum] = useState(0);

    const router = useRouter()

    const nextLine = () => {
        //Last Line of Dialog
        if(lineNum != dialog.length) {
            setLineNum(lineNum + 1);
        }

        if (dialog_tags[lineNum] != undefined) {
            switch(dialog_tags[lineNum][1]) {
                case "TEST" :
                    console.log("Test Function Worked")
                    break;
                case "TO_AVATAR" :
                    console.log("SHOULD GO TO AVATARS")
                    router.push("/creator")
                    break;
                default:
                    break;
            }
        }
    }

    const getAyuSrc = () => {
        if (dialog_tags[lineNum] != undefined) {
            switch(dialog_tags[lineNum][0]) {
                case "HAPPY" :
                    return '/img/ayu/tempAyu_happy.png'
                default:
                    return '/img/ayu/tempAyu.png'
            }
        }
        return '/img/ayu/tempAyu.png'
    }

    const render = () => {
        
        const line = lineNum < dialog.length ? dialog[lineNum] : null;
        
        return (
            <div
                className={style.container} 
            >
                {line != null ? 
                    <div
                    className={style.speech_bubble}
                    style={{width: size + 'px'}, {height: size/2 + 'px'}}
                    >
                        <p className={style.text}>
                            <b>
                                {line}
                            </b>
                        </p>
                        <button className={style.button} onClick={() => nextLine()}/>
                    </div>
                : 
                    <div
                    className={style.speech_bubble}
                    style={{width: size + 'px'}, {height: size/2 + 'px'}}
                    />
                }
                
                <img 
                    className={style.ayu_image}
                    src={getAyuSrc()}
                    style={{ width: size*1.5 + 'px'}, {height: size*1.5 + 'px'}}
                />
            </div>
        );
    }

    return (
        <>
            {render()}
        </>
    );
}
 
