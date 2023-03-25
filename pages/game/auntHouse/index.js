import React, {useState} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {GameIndexLayout,useWrapperContext} from '@utils/imports/commonImports'
import style from '@styles/aunt_house.module.css'
import recipes from '@public/text/auntHouseRecipes'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'

export default function RecipeSelect() {
    const {user,settings,loading, error} = useUserContext()
    const router = useRouter()
    const [recipe, setRecipe] = useState();
    const [instructionText, setInstructionText] = useState("aunt_welcome");

    const isLoggedIn = user.loggedIn    
    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>

    const lang = settings.lang


  function handleRecipeClick (recipe_object) {
        if(recipe == recipe_object) {
            setRecipe(null)
        } else {
            setRecipe(recipe_object)
        }
    }

    function handleRecipeSelect() {
        if(recipe == null) {
            setInstructionText("no_recipe_selected")
            return false
        }
        router.push('/game/auntHouse/recipeCard/' + recipe)
    }

    return (
        <GameIndexLayout
                lang={lang}
                game_name={"aunt_house"}
                instruction_text={instructionText}
                submit_text={"cook"}
                handleSubmit={() => handleRecipeSelect()}>
                    
            <div className={style.recipe_select_button_grid}>
                {recipes.map((x, index) => {
                    return(
                        <div key={x.name.en} className={style.recipe_select_button_container}>
                            <button 
                                onClick={() => {
                                    handleRecipeClick(index)
                                }}>
                                    <div className={index == recipe ? style.recipe_select_box_container_selected : style.recipe_select_box_container}>
                                    <p className={style.recipe_select_box_text}>{x.name[lang]}</p>
                                        <Image
                                            priority={true}
                                            width={80}
                                            height={80}
                                            src={"/img/food/"+x.path+ ".png"}
                                            alt={"food"}
                                        />
                                    </div>
                            </button>
                        </div>
                        )})}
            </div>
        </GameIndexLayout>
    )
}
