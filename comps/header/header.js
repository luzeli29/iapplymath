import React, { } from 'react';
import {useRouter} from 'next/router'
import { useUserContext } from '@hooks/siteContext/useUserContext';
import QuickNavButtons from '@comps/header/quickNavButtons';
import DevErr from '@utils/debug/devErr';

export default function Header() {
    const {user,settings, loading, error} = useUserContext()
    const router = useRouter()
    
    if(loading) return <></>
    if(error) {
        //TODO: route to error screen
        DevErr('Error when creating header.')
        DevErr(error)
        return <></>
    }
    if(!router.isReady) return <></>

    const loggedIn = user.loggedIn
    const username = loggedIn ? user.data.username : ""

    return(
        <div className="container text-center">
        <div >
            <p className= "font-h1" onClick={() => router.push('/')}>I Apply Math in my World</p>
        </div>
        <div className="row justify-content-lg-center">
            <div className="col col-lg-1">
                <button onClick={() => settings.setLang('es')}><strong>Español</strong></button>
            </div>
                <QuickNavButtons user={user} settings={settings} router={router}/>
            <div className="col col-lg-1">
                <button onClick={() => settings.setLang('en')}><strong>English</strong></button>
            </div>
        </div>
        <div className="row justify-content-lg-center">
            {loggedIn ?

                <p className=" pt-2">{username}</p>
            :
                <p className=" pt-2" style={{opacity:0}}> -- </p>
            }
        </div>
    </div>
    )
}
 
