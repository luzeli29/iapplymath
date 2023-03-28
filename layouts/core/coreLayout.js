import Header from "comps/header/header";
import ReactHowler from "react-howler";
import React, {useEffect, useState} from "react";
import Loading from "@comps/screens/loading";
import { useRouter } from "next/router";
import { useUserContext } from "@hooks/siteContext/useUserContext";

export default function Layout({ children }) {

    //standard layout of every page
    //has a header with title and lang select,
    //then the children displayed in the box of the view container
    const {user,settings,loading, error} = useUserContext()

    const router = useRouter()

    const lang = settings.lang
    const mute = settings.mute
    const [musicSrc, setMusicSrc] = useState("/sound/null.mp3");
    const mapLocation = '' //TODO: get this from the router filepath
    useEffect(() => {
            if (mapLocation === "auntHouse") {
                setMusicSrc("/sound/salsa_bg.mp3");
            } else if (mapLocation === "restaurant") {
                setMusicSrc("/sound/salsa2_bg.mp3");
            }
    }, [mapLocation]);

    useEffect(() => {
        if (mute) {
            setMusicSrc("/sound/null.mp3");
        } else {
            if (mapLocation === "auntHouse") {
                setMusicSrc("/sound/salsa_bg.mp3");
            } else if (mapLocation === "restaurant") {
                setMusicSrc("/sound/salsa2_bg.mp3");
            }
        }
    }, [mute, mapLocation]);

    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>

    return (
        <>
            <ReactHowler
                src = {musicSrc}
                playing ={true}
                loop = {true}
                preload = {true}
            />

            <div className="header_container">
                <Header/>
            </div>
            <div className="body_container">
                <div className="view_container">
                    { children }
                </div>
                <a className="feedback_button" rel="noreferrer" href="https://unc.az1.qualtrics.com/jfe/form/SV_7OJAstMhj3nshvg" target="_blank">Give us feedback!</a>
            </div>
        </>
    );
}