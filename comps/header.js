import React, {} from 'react';
import {useWrapperContext} from '../context/context'
import style from './header.module.css'
export default function Header() {
    const context = useWrapperContext();
    return (
        <div className={style.container}>
            <div className={style.title_container}>
                <h1 className={style.title}>I AM in my World</h1>
            </div>

            {/* Langauge Selector */}
            <div className={style.lang_select}>
                <table>
                    <td><button onClick={() => context.setLang("es")}><b>Español</b></button></td>
                    <td><button onClick={() => context.setLang("en")}><b>English</b></button></td>
                </table>
            </div>
        </div>
    );
}
 
