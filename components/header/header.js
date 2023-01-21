import React, {} from 'react';
import {useWrapperContext} from '@common_imports' 
import {useRouter} from 'next/router'
import { BsMapFill,BsFillPersonFill} from "react-icons/bs";
import { FaCog } from "react-icons/fa";
import {RiChatHeartLine} from "react-icons/ri";

export default function Header() {
    const context = useWrapperContext();
    const router = useRouter()

    return (
        <div className="container text-center">
            <div className="row pt-2">
                <h1 onClick={() => router.push('/')}>I Apply Math in my World</h1>
            </div>
            <div className="row justify-content-lg-center pt-1">
                <div className="col col-lg-1">
                    <button onClick={() => context.setLang('es')}><strong>Español</strong></button>
                </div>
                <div className="col col-lg-2">
                    <button onClick={() => router.push('/avatar/select')}><BsFillPersonFill/></button>
                    <button onClick={() => router.push('/game/map')}><BsMapFill/></button>
                    <button onClick={() => router.push('/settings')}><FaCog/></button>
                    <button onClick={() => router.push('/checkin')}><RiChatHeartLine/></button>
                </div>
                <div className="col col-lg-1">
                    <button onClick={() => context.setLang('en')}><strong>English</strong></button>
                </div>
            </div>
            <div className="row justify-content-lg-center">
                {context.state.userId?
                    <p>USER ID: {context.state.userId}</p>
                :
                    <p className="red pt-2">User is not logged in</p>
                }
            </div>
        </div>
    );
}
 
