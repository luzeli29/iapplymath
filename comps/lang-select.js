import React from 'react';

const LangSelect = ({ onClick}) => {
    return (
        <div className='language-select'>
            <table>
                <td><button onClick={() => onClick('es')}><a><b>Español</b></a></button></td>
                <td><button onClick={() => onClick('en')}><a><b>English</b></a></button></td>
            </table>
        </div>
    );
    
}
 
export default LangSelect;