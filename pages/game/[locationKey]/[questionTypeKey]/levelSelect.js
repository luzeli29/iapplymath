import { getText } from '@commonImports'
import ClickableIcon from '@comps/clickableIcon'
import LevelDisplay from '@comps/game/levelDisplay'
import IconGroup from '@comps/iconGroup'
import Loading from '@comps/screens/loading'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import CreateParamString from '@utils/game/createParamString'
import LoadLocations from '@utils/staticData/json/game/loadLocations'
import LoadLevels from '@utils/staticData/json/game/quiz/loadLevels'
import { useRouter } from 'next/router'
import Error from 'pages/error'
import Login from 'pages/user/login'
import React, { useState } from 'react'

export async function getStaticPaths() {
    const locationsObj = await LoadLocations()
    const locations = Object.keys(locationsObj)
    const keyPaths = [];
    for (let locationKey of locations) {
        const location = locationsObj[locationKey]
        for(let questionTypeKey of Object.keys(location.questionTypes)){
            keyPaths.push({ params: { locationKey, questionTypeKey}});
        }
    }
    return {
        paths: keyPaths,
        fallback: false,
    };
}

export async function getStaticProps(context){
    const  {params}  = context
    const locationKey = params.locationKey
    const locationsObj = await LoadLocations()
    const location =locationsObj[locationKey] 
    const levels = await LoadLevels()
    return {
      props: {
        levels,
        location
      },
    }
}

export default function LevelSelect({location,levels}) {
    const {user,settings,loading, error} = useUserContext()
    
    const router = useRouter()
    const [selectedLevel, setSelectedLevel] = useState()


    const isLoggedIn = user.loggedIn    
    if(loading) return <Loading/> 
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>
    const lang = settings.lang
    const routerQuery = router.query
    
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
        if(selectedLevel){
            const locationKey = routerQuery.locationKey
            const questionTypeKey = routerQuery.questionTypeKey
            const questionParams = location.questionTypes[questionTypeKey].questionParams

            let params = {}
            for(let paramKey of Object.keys(questionParams)){
                params[paramKey] = routerQuery[paramKey]
            }
            params.level = selectedLevel
            const paramString = CreateParamString(params)
            router.push('/game/' + locationKey + '/quiz/' + questionTypeKey + paramString)
        }
    }

    return (
        <div>
            <div>
                <h1 className='text-center pb-3'>
                    {getText('level_select',lang)}
                </h1>
            </div>
            <IconGroup 
                    lang={lang}
                    icons={levels}
                    selectIcon={(level) => setSelectedLevel(level)}
                    selectedIcon={selectedLevel}
                    getContentFromValue={(key,value) => getLevelIcon(key,value)}
                    width={3}
                    height={1}/>
            <div className='row pt-5'>
                <button className='basic_button mx-auto' onClick={() => handleLevelSelect()} disabled={!selectedLevel}>
                    {getText('start',lang)}
                </button>
            </div>
        </div>
    )
}
