import ClickableIcon from '@comps/clickableIcon'
import LevelDisplay from '@comps/game/levelDisplay'
import IconGroup from '@comps/iconGroup'
import Loading from '@comps/screens/loading'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import CreateParamString from '@utils/createParamString'
import { useRouter } from 'next/router'
import Error from 'pages/error'
import Login from 'pages/user/login'
import React, { useState } from 'react'
import getText from '@utils/text/getText'


// export async function getStaticProps(context){
//     const  {params}  = context
//     return {
//       props: {
//         location
//       },
//     }
// }

const brainBreaksList = {
    "chill-out-brake" : {
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
        "value": "Popping Bubbles Break"
    },
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


    const isLoggedIn = user.loggedIn    
    if(loading) return <Loading/> 
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>
    const lang = settings.lang
    
    function getLevelIcon(key,value) {
        return (
            <div className='m-2'>
            <ClickableIcon selected={selectedLevel == value.value} onClick={() => setSelectedLevel(value.value)}> 
                    <LevelDisplay level={value.value} lang={lang}/>
            </ClickableIcon>
            </div>
        )
    }

    function handleLevelSelect() {
        // alert(selectedLevel)

        let url = router?.query?.url ?? false

        if(selectedLevel && url) {
            const key = findKeyByValue(brainBreaksList, selectedLevel);
            router.push('/game/ayu/brainBreak/' + key + '?url=' + encodeURIComponent(url))
        }
    }

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
            </div>
        </div>
    )
}
