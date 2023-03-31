import React, {} from 'react';
import { BsMapFill,BsFillPersonFill} from "react-icons/bs";
import {RiChatHeartLine} from "react-icons/ri";
import {TbLogout,TbLogin, TbMusicOff} from "react-icons/tb";
import {TbMusic} from "react-icons/tb";
import Tooltip from "comps/accessibility/tooltip"
import getText from '@utils/text/getText'
import QuickNavButton from '@comps/header/quickNavButton';

export default function QuickNavButtons({user,settings,router}) {
    const loggedIn = user.loggedIn
    const lang = settings.lang
    const mute = settings.mute
    const AvatarTooltipText = getText("avatar_tooltip",lang)
    const MapTooltipText = getText("map_tooltip",lang)
    const CheckinTooltipText = getText("checkin_tooltip",lang)
    const MuteTooltipText = getText("mute_tooltip",lang)
    const UnMuteTooltipText = getText("unmute_tooltip",lang)

    const LogoutTooltipText = getText("logout_tooltip",lang)
    const LoginTooltipText = getText("login_tooltip",lang)

    function handleLogout() {
        user.logout()
        router.push('/')
    }

    const MuteButton = () => {
        if(mute) {
            return (
            <QuickNavButton text={UnMuteTooltipText} onClick={() => settings.toggleMute()}>
                <TbMusicOff /> 
            </QuickNavButton> )
        } else {
            return (
            <QuickNavButton text={MuteTooltipText} onClick={() => settings.toggleMute()}>
                 <TbMusic />
            </QuickNavButton> )  
        }
    }

    if(loggedIn){
        return (
            <div className="col col-lg-2">
            {/* Avatar Button */}
            <QuickNavButton text={AvatarTooltipText} onClick={() => router.push('/user/avatar/select')}>
                <BsFillPersonFill/>
            </QuickNavButton>
            {/* Checkin Button */}
            <QuickNavButton text={MapTooltipText} onClick={() => router.push('/game/map')}>
                <BsMapFill/>
            </QuickNavButton>
            {/* Checkin Button */}
            <QuickNavButton text={CheckinTooltipText} onClick={() => router.push('/user/checkIn')}>
                <RiChatHeartLine/>
            </QuickNavButton>
            {/* Mute Button */}
            <MuteButton/>
            {/* Logout Button */}
            <QuickNavButton text={LogoutTooltipText} onClick={() => handleLogout()}>
                <TbLogout/>
            </QuickNavButton>    
        </div>
        )
    } else {
        return (
            <div className="col col-lg-2">
                {/* Mute Button */}
                <MuteButton/>
                {/* Login Button */}
                <QuickNavButton text={LoginTooltipText} onClick={() => router.push('/user/login')}>
                    <TbLogin/>
                </QuickNavButton>  
            </div>
        )
    }
}