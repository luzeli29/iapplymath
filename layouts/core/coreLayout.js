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

    const mute = settings.mute
    const [mapLocation, setMapLocation] = useState("/sound/null.mp3");

    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>

    const MusicBox = () => {
        if(mute) return <></>

        const path = router.asPath
        const splitPath = path.split('/')
        if(splitPath.length >= 3) {
            const location = splitPath[2];
            if(mapLocation != location) {
                setMapLocation(location)
            }
        }

        let musicSrc = '/sound/null.mp3'

        switch (mapLocation) {
            case 'auntHouse':
                musicSrc= '/sound/salsa_bg.mp3'
                break;
            case 'restaurant':
                musicSrc= '/sound/salsa2_bg.mp3'
                break;
        }

        return (
        <ReactHowler
                src = {musicSrc}
                playing ={true}
                loop = {true}
                preload = {true}
            />
        )
    }

    return (
        <>
            <MusicBox/>
            <div className="header_container">
                <Header/>
            </div>
                <div className="body_container">
                    <div className="view_container">
                        { children }
                    </div>
                </div>
            <div className="">
                <a className="feedback_button" rel="noreferrer" href="https://unc.az1.qualtrics.com/jfe/form/SV_7OJAstMhj3nshvg" target="_blank">Give us feedback!</a>
            </div>
        </>
    );
}