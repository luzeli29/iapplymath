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
    async function handleLogout() {
        const endpoint = '/api/session/' + username

        const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()
        
        if (result.code === 200) {
            context.clearData();
            router.push('/')
        } else {
            throwError("Could not end session. " + result.message)
        return false
        }
    }
    const username = context.state.username
    const userId = context.state.userId

    if (context.state.userId == null){
        return(
            <div className="container text-center">
            <div className="row pt-2">
                <h1 onClick={() => router.push('/')}>I Apply Math in my World</h1>
            </div>
            <div className="row justify-content-lg-center pt-1">
                <div className="col col-lg-1">
                    <button onClick={() => context.setLang('es')}><strong>Español</strong></button>
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
        )
    }
    if (context.state.userId != null){
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
                    {context.state.userId?
                        <p>USER ID: {context.state.userId}</p>
                    :
                        <p className="red pt-2">User is not logged in</p>
                    }
                </div>
            </div>
        );
    }
   
}
 
