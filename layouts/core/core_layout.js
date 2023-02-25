import Header from "@components/header/header";
import ReactHowler from "react-howler";
import React, {useEffect, useState} from "react";
import {useWrapperContext} from "@common_imports";
import {TbMusic} from "react-icons/tb";
export default function Layout({ children }) {
    //standard layout of every page
    //has a header with title and lang select,
    //then the children displayed in the box of the view container
    const context = useWrapperContext();
    const mapLocation = context.state.mapLocation
    const [musicSrc, setMusicSrc] = useState("null.mp3");

    useEffect(() => {
        if (mapLocation === "AuntsHouse") {
            setMusicSrc("/sound/salsa_bg.mp3");
        } else if (mapLocation === "Restaurant") {
            setMusicSrc("/sound/salsa2_bg.mp3");
        }
    }, [mapLocation]);

    return (
        <>
            <ReactHowler
                src = {musicSrc}
                playing ={true}
                loop = {true}
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