import React, {useState} from 'react';
import {useWrapperContext} from '../context/context'

export default function Ayu({size,dialogId}) {
    const value = useWrapperContext();
    const dialog = value.state.ayuDialog[dialogId];
    const dialog_tags = value.state.ayuDialogTags[dialogId];

    const [lineNum, setLineNum] = useState(0);

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
                id="ayu_container" 
            >
                <div
                    id="ayu_speech_bubble" 
                    style={{width: size + 'px'}, {height: size/2 + 'px'}}
                >
                    <p>
                       {line}
                    </p>
                    <button id="ayu_button" onClick={() => nextLine()}>
                    </button>
                </div>
                <img 
                    id="ayu"
                    src={getAyuSrc()}
                    style={{ width: size + 'px'}, {height: size + 'px'}}
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
 
