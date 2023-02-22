import React, {} from 'react';
import {useWrapperContext} from '@common_imports' 
import {useRouter} from 'next/router'
import { BsMapFill,BsFillPersonFill} from "react-icons/bs";
import { FaCog } from "react-icons/fa";
import {RiChatHeartLine} from "react-icons/ri";
import {TbLogout} from "react-icons/tb";

export default function Header() {
    const context = useWrapperContext();
    const router = useRouter()
    const handleLogout = () => {
        context.clearData();
        router.push('/')
    }
    const username = context.state.username
    const userId = context.state.userId

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
                    {/* <button onClick={() => router.push('/settings')}><FaCog/></button> */}
                    <button onClick={() => router.push('/check_in')}><RiChatHeartLine/></button>
                    {/* <button onClick={() => router.push('/pet')}><MdPets/></button> */}
                    <button onClick={() => handleLogout()}><TbLogout/></button>
                </div>
                <div className="col col-lg-1">
                    <button onClick={() => context.setLang('en')}><strong>English</strong></button>
                </div>
            </div>
            <div className="row justify-content-lg-center">
                {context.state.username?
                    <p>Username: {context.state.username}</p>
                :
                    <p className="red pt-2">User is not logged in</p>
                }
                {process.env.NODE_ENV === 'development' ? 
                <p>
                    {username + ' - ' + userId}
                </p>: <></>
                }
            </div>
        </div>
    );
}
 
