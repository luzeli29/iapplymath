import React, {} from 'react';
import {useWrapperContext} from '../context/context'
import {useRouter} from 'next/router'
import { BsMapFill,BsFillPersonFill } from "react-icons/bs";
import { FaCog } from "react-icons/fa";

export default function Header() {
    const context = useWrapperContext();
    const router = useRouter()

    return (
        <div className="container text-center">
            <div className="row pt-2">
                <h1>I Apply Math in my World</h1>
            </div>
            <div className="row justify-content-lg-center pt-1">
                <div className="col col-lg-1">
                    <button onClick={() => context.setLang('es')}><strong>Español</strong></button>
                </div>
                <div className="col col-lg-2">
                    <button onClick={() => router.push('/avatar/select')}><BsFillPersonFill/></button>
                    <button onClick={() => router.push('/game/map')}><BsMapFill/></button>
                    <button onClick={() => router.push('/settings')} disabled><FaCog/></button>
                </div>
                <div className="col col-lg-1">
                    <button onClick={() => context.setLang('en')}><strong>English</strong></button>
                </div>
            </div>
            <div className="row py-2">
                {context.state.userID?
                    <p>USER ID: {context.state.userID}</p>
                :
                    <button onClick={() => router.push('/login')}>Login</button>
                }
            </div>
        </div>
    );
}
 
