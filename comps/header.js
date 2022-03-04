import React, {} from 'react';
import {useWrapperContext} from '../context/context'

export default function Header() {
    const context = useWrapperContext();
    return (
        <div className='header-container'>
            <h1 className='header-title'>I AM in my World</h1>

            {/* Langauge Selector */}
            <div className='language-select'>
                <table>
                    <td><button onClick={() => context.setLang("es")}><b>Español</b></button></td>
                    <td><button onClick={() => context.setLang("en")}><b>English</b></button></td>
                </table>
            </div>
        </div>
    );
}
 
