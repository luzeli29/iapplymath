import React, {} from 'react';
import {useWrapperContext} from '../context/context'

export default function Header() {
    //get current context
    const context = useWrapperContext();
    
    return (
        <div className="container text-center">
            {/*
            <div className="row pt-2">
                <h1>I Apply Math in my World</h1>
            </div>
            */}
            <div className="row justify-content-lg-center pt-5">
                <div className="col col-lg-2">
                    <button onClick={() => context.setLang("es")}><b>Español</b></button>
                </div>
                <div className="col col-lg-2">
                    <button onClick={() => context.setLang("en")}><b>English</b></button>
                </div>
            </div>
        </div>
    );
}
 
