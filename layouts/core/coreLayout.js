import Header from "comps/header/header";
import ReactHowler from "react-howler";
import React, {useEffect, useState} from "react";
import {useWrapperContext} from "utils/imports/commonImports";
import { useSiteContext } from "@hooks/siteContext/useSiteContext";
import Loading from "@comps/screens/loading";

export default function Layout({ children }) {
    const {user, loading, error} = useSiteContext()

    //standard layout of every page
    //has a header with title and lang select,
    //then the children displayed in the box of the view container
    const context = useWrapperContext();
    const mapLocation = context.state.mapLocation;
    const [musicSrc, setMusicSrc] = useState("/sound/null.mp3");

    useEffect(() => {
            if (mapLocation === "AuntsHouse") {
                setMusicSrc("/sound/salsa_bg.mp3");
            } else if (mapLocation === "Restaurant") {
                setMusicSrc("/sound/salsa2_bg.mp3");
            }
    }, [mapLocation]);

    useEffect(() => {
        if (context.state.mute === "Yes") {
            setMusicSrc("/sound/null.mp3");
        } else if (context.state.mute === "No") {
            if (mapLocation === "AuntsHouse") {
                setMusicSrc("/sound/salsa_bg.mp3");
            } else if (mapLocation === "Restaurant") {
                setMusicSrc("/sound/salsa2_bg.mp3");
            }
        }
    }, [context.state.mute, mapLocation]);

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
            </div>
        </>
    );
}