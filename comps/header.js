import React, {} from 'react';
import {useWrapperContext} from '../context/context'
import translations from '../public/text/translations';

export default function Header() {
    //get current context
    const context = useWrapperContext();
    const lang = context.state.lang;

    return (
        <div className="container text-center">
            <div className="row pt-4">
                <div className="col col-sm-2">
                </div>
                <div className="col col-lg-8 text-nowrap">
                    <h1>{translations.i_apply_full_title[lang]}</h1>
                </div>
                <div className="col col-sm-2">
                </div>
            </div>
            <div className="row justify-content-lg-center">
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
 
