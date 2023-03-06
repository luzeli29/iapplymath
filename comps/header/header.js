import React, {} from 'react';
import {useWrapperContext} from '@utils/imports/commonImports' 
import {useRouter} from 'next/router'
import { BsMapFill,BsFillPersonFill} from "react-icons/bs";
import { FaCog } from "react-icons/fa";
import {RiChatHeartLine} from "react-icons/ri";
import {TbLogout, TbMusicOff} from "react-icons/tb";
import {TbMusic} from "react-icons/tb";
import Tooltip from "comps/accessibility/tooltip"
import getText from '@utils/text/getText'
export default function Header() {
    const context = useWrapperContext();
    const lang = context.state.lang

    const AvatarTooltipText = getText("avatar_tooltip",lang)
    const MapTooltipText = getText("map_tooltip",lang)
    const CheckinTooltipText = getText("checkin_tooltip",lang)
    const MuteTooltipText = getText("mute_tooltip",lang)
    const LogoutTooltipText = getText("logout_tooltip",lang)


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

    return(
        <div className="container text-center">
        <div className="row pt-2">
            <h1 onClick={() => router.push('/')}>I Apply Math in my World</h1>
        </div>
        <div className="row justify-content-lg-center pt-1">
            <div className="col col-lg-1">
                <button onClick={() => context.setLang('es')}><strong>Español</strong></button>
            </div>
            {username ? 
                <div className="col col-lg-2">
                    <Tooltip text={AvatarTooltipText}>
                        <button onClick={() => router.push('/avatar/select')}><BsFillPersonFill/></button>
                    </Tooltip>
                    <Tooltip text={MapTooltipText}>
                    <button onClick={() => router.push('/game/map')}><BsMapFill/></button>
                    </Tooltip>
                    <Tooltip text={CheckinTooltipText}>
                    <button onClick={() => router.push('/check_in')}><RiChatHeartLine/></button>
                    </Tooltip>
                    <Tooltip text={MuteTooltipText}>
                    <button onClick={() => context.state.mute === "Yes" ? context.setMute("No") : context.setMute("Yes")}>
                        {context.state.mute === "Yes" ? <TbMusicOff /> : <TbMusic />}
                        {console.log("mute retrieved in header: " + context.state.mute)}
                    </button>
                    </Tooltip>
                    <Tooltip text={LogoutTooltipText}>
                    {/* <button onClick={() => router.push('/pet')}><MdPets/></button> */}
                    <button onClick={() => handleLogout()}><TbLogout/></button>
                    </Tooltip>

                </div>
                :
                null
            }
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
        </div>
    </div>
    )
}
 
