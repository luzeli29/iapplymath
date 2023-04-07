import React, {useState} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {GameIndexLayout, getText} from '@utils/imports/commonImports'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import LoadRecipes from '@utils/staticData/staticDataFetching/foodData/loadRecipes'
import IconGroup from '@comps/iconGroup'

export async function getStaticProps(){
    const recipes = await LoadRecipes()
    return {
      props: {
        recipes,
      },
    }
}

export default function RecipeSelect({recipes}) {
    const {user,settings,loading, error} = useUserContext()
    const router = useRouter()
    const [selectedRecipe, setSelectedRecipe] = useState()
    const [instructionText, setInstructionText] = useState("aunt_welcome");

    const isLoggedIn = user.loggedIn    
    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>

    const lang = settings.lang

    function handleRecipeSubmit() {
        if(selectedRecipe == null) {
            setInstructionText("no_recipe_selected")
            return false
        }
        router.push('/game/auntHouse/recipeCard?recipeKey=' + selectedRecipe)
    }

    function getRecipeIcon(value) {
        if(value.imgSrc == undefined) return <></>
        const imgSrc = '/img/food/' + value.imgSrc + '.png'
        return (
            <div className='mx-auto px-2'>
        
                <Image
                        priority={true}
                        width={100}
                        height={75}
                        src={imgSrc}
                        alt={value.imgSrc}/>
                <p>{'Level : ' + value.level}</p>
            </div>
        )
    }

    return (
        <GameIndexLayout
                lang={lang}
                game_name={"aunt_house"}
                instruction_text={instructionText}
                submit_text={"cook"}
                handleSubmit={() => handleRecipeSubmit()}>
                <div className='pt-3'>
                <IconGroup 
                    lang={lang}
                    icons={recipes}
                    selectIcon={(recipe) => setSelectedRecipe(recipe)}
                    selectedIcon={selectedRecipe}
                    getContentFromValue={(value) => getRecipeIcon(value)}
                    width={2}
                    height={2}/>
                </div>
        </GameIndexLayout>
    )
}
