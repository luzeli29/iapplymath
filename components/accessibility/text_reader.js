import { useWrapperContext } from '@common_imports';
import {React} from 'react'
import {MdHearing} from "react-icons/md";

export default function TextReader({text, reader}) {
    const context = useWrapperContext();
    const lang = context.state.lang;

    var synth;
    var utterance;

    if (typeof window !== "undefined") {
        synth = window.speechSynthesis;
        utterance = new SpeechSynthesisUtterance(text);

        setUtteranceByReader(reader, utterance, synth, lang);
    }

    const handleClick = () => {
        if(!synth.speaking) {
            speechSynthesis.speak(utterance);
        }
    }

    return (
        <div className="justify-content-center">
            <button className="btn border border-2 p-0 px-1 border-primary" onClick={() => handleClick()} 
                disabled={synth ? synth.speaking : false}>
                <MdHearing/>
            </button>
        </div>
    )
}

function setUtteranceByReader(reader, utterance, synth, lang) {
    const voices = synth.getVoices();
    switch(reader) {
        case "restaurant":
            utterance.voice = voices[lang == "en" ? 33 : 29]
            utterance.pitch = lang == "en" ? 2 : 2
            utterance.rate = lang == "en" ? .8 : .7
            break;
        case "aunt_house":
            utterance.voice = voices[lang == "en" ? 33 : 29]
            utterance.pitch = lang == "en" ? 1.4 : 1.5
            utterance.rate = lang == "en" ? .8 : .7
            break;
        default:
            utterance.voice = voices[lang == "en" ? 33 : 52]
            utterance.pitch = lang == "en" ? 2 : 2
            utterance.rate = lang == "en" ? .8 : .8
            break;
    }
}
