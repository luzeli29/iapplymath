import Loading from '@comps/screens/loading'
import { useSiteContext } from '@hooks/siteContext/useSiteContext'
import useUser from '@hooks/siteContext/useUser'
import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'


export default function Settings() {
    const {user,logout, settings, loading, error} = useSiteContext()
    const router = useRouter()
    
    if(loading || !router.isReady) return <Loading/>
    
    if(!user.data) {
        router.push('/test/login')
        return <Loading/>
    }

    if(error) {
        return (
            <p>{error}</p>
        )
    }
    console.log(settings)
    return (
        <div> 
            <p>{settings.lang}</p>
            <p>{settings.mute ? "true" : "false"}</p>
            <p>{settings.backgroundHex}</p>
            <Link className="basic_button" href={"/test/"}>back to tests</Link>

            <button className="basic_button" onClick={() => settings.setLang("en")}>set lang en</button>
            <button className="basic_button" onClick={() => settings.setLang("es")}>set lang es</button>
            <button className="basic_button" onClick={() => settings.setLang("gr")}>set lang gr</button>
            <button className="basic_button" onClick={() => settings.toggleMute()}>mute</button>
            <button className="basic_button" onClick={() => settings.setBackgroundHex("#EDBFC6")}>set hex 1</button>
            <button className="basic_button" onClick={() => settings.setBackgroundHex("#EDBF00")}>set hex 2</button>


        </div>
    )
}
