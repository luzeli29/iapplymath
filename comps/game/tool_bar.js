import Link from 'next/link';
import React, {} from 'react';

const ToolBar = ({isLink,backClick}) => {

    const configBack = () => {
        if(isLink) {
            return (
                <Link href={'/creator'}><a><b>Back</b></a></Link>
            );
        } else {
            return (
                <button onClick={() => backClick("map")}><a><b>Back</b></a></button>
            );
        }
    }

    return (
        <div className='tool_bar'>
            <table>
                <tr>
                    <tb>
                        {configBack()}
                    </tb>
                </tr>
            </table>
        </div>
    );
}
 
export default ToolBar;