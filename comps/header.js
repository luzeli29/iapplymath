import React, { useContext } from 'react';
import AppContext from './context'

const Header = () => {
    const value = useContext(AppContext);
    return (
        <div className='header-container'>
            <h1 className='header-title'>I AM in my World</h1>

            {/* Langauge Selector */}
            <div className='language-select'>
                <table>
                    <td><button onClick={() => value.setLang("es")}><b>Español</b></button></td>
                    <td><button onClick={() => value.setLang("en")}><b>English</b></button></td>
                </table>
            </div>

        </div>
    );
}
 
export default Header;