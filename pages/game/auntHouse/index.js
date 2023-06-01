import React, {useState} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import GameIndexLayout from '@layouts/gameLayouts/gameIndexLayout'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import loadRecipes from '@utils/game/auntHouse/recipeData/loadRecipes'
import IconGroup from '@comps/iconGroup'
import ClickableIcon from '@comps/clickableIcon'
import LevelDisplay from '@comps/game/levelDisplay'
import RetrieveUserContext from '@hooks/HOF/retrieveUserContext'

export async function getStaticProps(){
    const recipes = await loadRecipes()
    return {
      props: {
        recipes,
      },
    }
}

const RecipeSelect = ({user,settings,recipes}) => {
    const router = useRouter()
    const [selectedRecipe, setSelectedRecipe] = useState()
    const [instructionText, setInstructionText] = useState("aunt_welcome");

    const lang = settings.lang

    function handleRecipeSubmit() {
        if(selectedRecipe == null) {
            setInstructionText("no_recipe_selected")
            return false
        }
        router.push('/game/auntHouse/recipeCard/' + selectedRecipe)
    }

    const getRecipeIcon = (key,value) => {
        if(value.imgSrc == undefined) return <></>
        const imgSrc = '/img/food/' + value.imgSrc + '.png'
        return (
            <ClickableIcon selected={selectedRecipe == key} onClick={() => setSelectedRecipe(key)}> 
                <div className='mx-auto px-2' style={{position:'relative'}}>
            
                    <Image className='h-1 w-1'
                            priority={true}
                            width={60}
                            height={35}
                            objectFit = {'contain'}
                            src={imgSrc}
                            alt={value.imgSrc}/>
                    <LevelDisplay level={value.level} lang={lang}/>
                </div>
            </ClickableIcon>
        )
    }

    return (
        <GameIndexLayout
                lang={lang}
                gameName={"aunt_house"}
                instruction_text={instructionText}
                submit_text={"cook"}
                handleSubmit={() => handleRecipeSubmit()}>
                <div className=''>
                <IconGroup 
                    lang={lang}
                    icons={recipes}
                    selectIcon={(recipe) => setSelectedRecipe(recipe)}
                    selectedIcon={selectedRecipe}
                    getContentFromValue={(key,value) => getRecipeIcon(key,value)}
                    width={2}
                    height={2}/>
                </div>
        </GameIndexLayout>
    )
}

export default RetrieveUserContext(RecipeSelect, ['gameReady','hasActiveGame'])