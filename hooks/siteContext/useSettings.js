import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { BiToggleLeft } from 'react-icons/bi';
import { toggleMuteRedux } from 'store/Slices/musicSlice';
import { useDispatch, useSelector } from 'react-redux';



export default function useSettings() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [lang, setLang] = useState("en");
    const [font, setFont] = useState(false);
    const [backgroundHex, setBackgroundHex] = useState("#EDBFC6");
    
    const musicMuteState = useSelector((state) => state.music.value)
    const [mute, setMute] = useState(false);
    const dispatch = useDispatch()
    
    useEffect(() => {
        updateSettingsFromCookie()
        setLoading(false)
    }, []);

    useEffect(() => {
        var r = document.querySelector(':root');
        r.style.setProperty('--page-color', backgroundHex ? backgroundHex : "#EDBFC6");
    }, [backgroundHex]);
    
    function updateSettingsFromCookie() {

        const storedLang = Cookies.get('lang');
        if(storedLang) {
            setLang(JSON.parse(storedLang))
        }
        const storedMute = Cookies.get('mute');
        if(storedMute) {
            setMute(JSON.parse(storedMute))
        }
        const storedFont = Cookies.get('font');
        if(storedFont) {
            setFont(JSON.parse(storedFont))
        }
        const storedBackgroundHex = Cookies.get('background_hex');
        if(storedBackgroundHex) {
            setBackgroundHex(JSON.parse(storedBackgroundHex))
        }
    }

    async function clearSettingsCookie () {
        await Cookies.remove('lang');
        await Cookies.remove('mute');
        await Cookies.remove('background_hex');
        await Cookies.remove('font');
        updateSettingsFromCookie()
        setLang("en")
        setMute(false)
        setFont(false)
        setBackgroundHex("#EDBFC6")
        return true
    }

    function switchLang(lang, username) {
        let newLang
        switch(lang) {
            case 'en':
                newLang = 'en'
                break;
            case 'es':
                newLang = 'es'
                break;
            default:
                setError('"lang" given was neither "en" nor "es"')
                return false
        }

        if(username) {
            //TODO: Api stuff with lang goes here!
        }

        setLang(newLang)
        Cookies.set('lang', JSON.stringify(newLang), { expires: 1 });

        return true
    }

    function toggleMute() {
        dispatch(toggleMuteRedux())
        
        // keeping this here for now in case we want to use it later
        const newMute = !mute
        setMute(newMute)
        Cookies.set('mute', JSON.stringify(musicMuteState), { expires: 1 });
        return true

    }

    function toggleFont() {
        const newFont = !font
        setFont(newFont)
        Cookies.set('font', JSON.stringify(newFont), { expires: 1 });
        return true
    }

    function switchBackgroundHex(hex) {
        if(!hex) {
            setError('"hex" was not given to switchBackgroundHex')
            return false
        } 

        //TODO: Check if valid hex

        setBackgroundHex(hex)
        Cookies.set('background_hex', JSON.stringify(hex), { expires: 1 });

        return true
    }

    const settings = {
        loading: loading,
        error: error,
        lang: lang,
        mute: mute,
        font: font,
        backgroundHex: backgroundHex,
        setLang: switchLang,
        toggleMute: toggleMute,
        toggleFont: toggleFont,
        setBackgroundHex: switchBackgroundHex,
        clearSettingsCookie: clearSettingsCookie,
    }
    
    return (
        {
            settings:settings
        }
    )
}
