import React, {useState} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import GameIndexLayout from '@layouts/gameLayouts/gameIndexLayout'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import loadRecipes from '@public/data/recipeData/loadRecipes'
import IconGroup from '@comps/iconGroup'
import ClickableIcon from '@comps/clickableIcon'
import LevelDisplay from '@comps/game/levelDisplay'
import RetrieveUserContext from '@hooks/HOF/retrieveUserContext'
import loadSports from '@utils/game/stadium/sportData/loadSports'

export async function getStaticProps(){
    const sports = await loadSports("stadium")
    return {
      props: {
        sports,
      },
    }
}

const SportSelect = ({user,settings,sports}) => {
    const router = useRouter()
    const [selectedSport, setSelectedSport] = useState()
    const [instructionText, setInstructionText] = useState("stadium_welcome");

    const lang = settings.lang

    function handleSportSubmit() {
        if(selectedSport == null) {
            setInstructionText("no_sport_selected")
            return false
        }
        router.push('/game/stadium/levelSelect?sport=' + selectedSport)
    }

    const getSportIcon = (key,value) => {
        if(value.imgSrc == undefined) return <p></p>
        const imgSrc = '/img/stadium/' + value.imgSrc + '.png'
        return (
            <ClickableIcon selected={selectedSport == key} onClick={() => setSelectedSport(key)}> 
                <div className='mx-auto px-2' style={{position:'relative'}}>
            
                    <Image className='h-1 w-1'
                            priority={true}
                            width={60}
                            height={45}
                            objectFit = {'contain'}
                            src={imgSrc}
                            alt={value.imgSrc}/>
                    <LevelDisplay pic={true} level={value.level} lang={lang}/>
                </div>
            </ClickableIcon>
        )
    }

    return (
        <GameIndexLayout
                lang={lang}
                gameName={"stadium"}
                instruction_text={instructionText}
                submit_text={"play"}
                handleSubmit={() => handleSportSubmit()}>
                <div className=''>
                <IconGroup 
                    lang={lang}
                    icons={sports}
                    selectIcon={(sport) => setSelectedSport(sport)}
                    selectedIcon={selectedSport}
                    getContentFromValue={(key,value) => getSportIcon(key,value)}
                    width={2}
                    height={2}/>
                </div>
        </GameIndexLayout>
    )
}

export default RetrieveUserContext(SportSelect, ['gameReady','hasActiveGame'])