import ClickableIcon from '@comps/clickableIcon'
import LevelDisplay from '@comps/game/levelDisplay'
import IconGroup from '@comps/iconGroup'
import { useDispatch } from 'react-redux'
import Loading from '@comps/screens/loading'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import CreateParamString from '@utils/createParamString'
import { useRouter } from 'next/router'
import Error from 'pages/error'
import Login from 'pages/user/login'
import React, { useState } from 'react'
import getText from '@utils/text/getText'
import { setLocation } from 'store/Slices/musicSlice'
import Creator from 'pages/user/checkIn'
import translations from '@public/text/translations'


const brainBreaksList = {
    "chill-out-break" : {
        "value": "Chill Out"
    },
    "deep-breathing-break" : {
        "value": "Deep Breathing"
    },
    "free-style-art-break" : {
        "value": "Free Style Art"
    },
    "mandala-art-break" : {
        "value": "Mandala Art"
    },
    "move-body-break" : {
        "value": "Move Body"
    },
    "poppin-bubbles-break" : {
        "value": "Popping Bubbles"
    }
}

const findKeyByValue = (object, value) => {
    for (const key in object) {
      if (object.hasOwnProperty(key) && object[key].value === value) {
        return key;
      }
    }
    return null; 
}

export default function LevelSelect({location =""}) {
    const {user,settings,loading, error} = useUserContext()
    
    const router = useRouter()
    const [selectedLevel, setSelectedLevel] = useState()
    const [showFeelingsView, setShowFeelingsView] = useState(true)
    const dispatch = useDispatch()


    const isLoggedIn = user.loggedIn    
    if(loading) return <Loading/> 
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>
    const lang = settings.lang
    
    function getLevelIcon(key,value) {
        return (
            <div className='m-2'>
            <ClickableIcon selected={selectedLevel == value.value} onClick={() => setSelectedLevel(value.value)}> 
                    <LevelDisplay alt level={value.value} lang={lang}/>
            </ClickableIcon>
            </div>
        )
    }

    function handleLevelSelect() {
        let url = router?.query?.url ?? false
        if(selectedLevel && url) {
            const key = findKeyByValue(brainBreaksList, selectedLevel);
            if(key === 'chill-out-break') dispatch(setLocation('chilloutbreak'))
            router.push('/game/ayu/brainBreak/' + key + '?url=' + encodeURIComponent(url))
        }
    }

    const handleGoBack = () => {
        let url = router?.query?.url ?? false
        router.push(url)
    }

    if(showFeelingsView) return <Creator onEnd={setShowFeelingsView} />

    return (
        <div>
            <div>
                <h1 className='text-center pb-3'>
                    {getText('brain_break',lang)}
                </h1>
            </div>
            <IconGroup 
                    lang={lang}
                    icons={brainBreaksList}
                    selectIcon={(level) => setSelectedLevel(level)}
                    selectedIcon={selectedLevel}
                    getContentFromValue={(key,value) => getLevelIcon(key,value)}
                    width={3}
                    height={2}
            />
            <div className='row pt-5'>
                <button className='basic_button mx-auto' onClick={() => handleLevelSelect()} disabled={!selectedLevel}>
                    {getText('start',lang)}
                </button>
                <button className='basic_button mx-auto' onClick={handleGoBack}>{translations?.back?.[lang]}</button>
            </div>
        </div>
    )
}
