import Header from "@components/header/header";
import ReactHowler from "react-howler";
import React from "react";
export default function Layout({ children }) {
    //standard layout of every page
    //has a header with title and lang select,
    //then the children displayed in the box of the view container
    return ( 
        <>
            <ReactHowler
                src='/sound/salsa_bg.mp3'
                playing={false}
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