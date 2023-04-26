import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';

export default function useSettings() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [lang, setLang] = useState("en");
    const [mute, setMute] = useState(false);
    const [backgroundHex, setBackgroundHex] = useState("#EDBFC6");
    
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
        const storedBackgroundHex = Cookies.get('background_hex');
        if(storedBackgroundHex) {
            setBackgroundHex(JSON.parse(storedBackgroundHex))
        }
    }

    async function clearSettingsCookie () {
        await Cookies.remove('lang');
        await Cookies.remove('mute');
        await Cookies.remove('background_hex');
        updateSettingsFromCookie()
        setLang("en")
        setMute(false)
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
        const newMute = !mute
        setMute(newMute)
        Cookies.set('mute', JSON.stringify(newMute), { expires: 1 });
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
        backgroundHex: backgroundHex,
        setLang: switchLang,
        toggleMute: toggleMute,
        setBackgroundHex: switchBackgroundHex,
        clearSettingsCookie: clearSettingsCookie,
    }
    
    return (
        {
            settings:settings
        }
    )
}
