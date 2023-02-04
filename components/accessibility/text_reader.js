import { useWrapperContext } from '@common_imports';
import React from 'react'
import {MdHearing} from "react-icons/md";
import { useSpeechSynthesis } from "react-speech-kit";

export default function TextReader({text}) {
    const { speak , voices, speaking } = useSpeechSynthesis();
    const context = useWrapperContext();
    const lang = context.state.lang;

    const handleClick = () => {
        console.log("Reading text: " + text)
        const voiceIndex = lang == "en" ? 33 : 52
        const pitch = lang == "en" ? 2 : 2
        const rate = lang == "en" ? .8 : .8
        speak({ text: text,  voice: voices[voiceIndex], pitch: pitch, rate: rate})
    }

    return (
        <div className="justify-content-center">
            <button className="btn border border-2 p-0 px-1 border-primary" onClick={() => handleClick()} 
                disabled={!text}>
                <MdHearing/>
            </button>
        </div>
    )
}
