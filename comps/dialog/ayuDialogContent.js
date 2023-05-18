import React, {useState,useEffect} from 'react';
import Image from 'next/image'
import {useRouter} from 'next/router'
import { AiFillCaretRight,AiFillCaretLeft } from "react-icons/ai";
import style from '@styles/dialog.module.css'
import Scripts from '@public/text/dialogScripts'
import TextReader from 'comps/accessibility/textReader';
import { useUserContext } from '@hooks/siteContext/useUserContext';
import Loading from '@comps/screens/loading';
import Error from 'pages/error';
import Login from 'pages/user/login';

/*
Creates a dialog screen to be shown in a game view

scriptId - the id in which to get the script from txt object
onEnd - what the dialog should do on end, default is to return to index.js
onInput - function in what we should do when there is an input required

*/

const AyuDialogContent = ({stage,line}) => {
    if(!stage) return <Error error={'No stage given to AyuDialog comp'}/>
    if(!line) return <Error error={'No line given to AyuDialog comp'}/>

    const ayuSrc = line.ayuSrc ? line.ayuSrc : stage.ayuSrc
    
    return (
        <div  style={{width: '375px', height:'40vh', position: 'relative', marginTop: '10vh'}}>
            <Image 
                priority={true}
                layout={"fill"}
                objectFit = {'contain'}
                quality={100}
                src={ayuSrc}
                alt={"ayu"} />
        </div>
    )  
}

export default AyuDialogContent;