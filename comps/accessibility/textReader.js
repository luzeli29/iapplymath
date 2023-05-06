import { React, useEffect, useState } from 'react'
import { MdHearing } from "react-icons/md";
import { useUserContext } from '@hooks/siteContext/useUserContext';
import { useRouter } from 'next/router';


export default function TextReader({ text, reader }) {
    
    const { user, settings, loading, error } = useUserContext()
    const [supportsSpeechSynthesis, setSupportsSpeechSynthesis] = useState(true)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const router = useRouter()


    if (loading || !router.isReady) return <Loading />
    if (error) return <Error error={error} />

    const lang = settings.lang

    var synth;
    var utterance;

    if (typeof window !== "undefined") {
        synth = window.speechSynthesis;

        if (!synth) {
            setSupportsSpeechSynthesis(false)
            alert("Your browser does not support speech synthesis. Please use a different browser.")
            return <></>
        }
        console.log("reader:", reader)
        reader = reader ? reader : "default";

        utterance =setUtteranceByReader(reader, synth, lang,text,reader);

        utterance.onend = function () {
            setIsSpeaking(false);
        }

        utterance.onstart = function () {
            setIsSpeaking(true);
        }
    }

    const handleClick = () => {
        if (!synth.speaking) {
            speechSynthesis.speak(utterance);
            console.log("uterance:", utterance)
        }
    }

    return (
        <>
            <button className="btn border border-2 p-0 px-1 border-primary" onClick={() => handleClick()}
                disabled={isSpeaking}>
                <MdHearing />
            </button>
       </>
    )
}

function setUtteranceByReader(reader, synth, lang,text) {
    const voices = synth.getVoices();
    const acceptedLangs = ["es-ES","es-US","en-US"]
    let dictionaryOfVoices = {
        "es":[],
        "en":[],
    }

    voices.forEach((voice) => {
        if(acceptedLangs.includes(voice.lang)) {
            dictionaryOfVoices[voice.lang.slice(0,2)].push(voice)
        }
    })

    let voice = dictionaryOfVoices[lang][0]

    if(!voice) {
        voice = voices[0]
    }

    let utterance = new SpeechSynthesisUtterance();
    utterance.text = text
    utterance.voice = voice
    utterance.pitch = 1.5
    utterance.rate = .8
    
    // switch (reader) {
    //     case "restaurant":
    //         utterance.pitch = lang == "en" ? 2 : 2
    //         utterance.rate = lang == "en" ? .8 : .7
    //         break;
    //     case "aunt_house":
    //         console.log("aunt house")
    //         utterance.pitch = lang == "en" ? 1.4 : 1.5
    //         utterance.rate = lang == "en" ? .8 : .7
    //         break;
    //     default:
    //         utterance.pitch = lang == "en" ? 1.5 : 2.5
    //         utterance.rate = .8
    //         break;
    // }

    return utterance

}
