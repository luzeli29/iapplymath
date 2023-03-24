import React from 'react'
import {useRouter} from 'next/router'
import style from '@styles/aunt_house.module.css'
import recipes from '@public/text/auntHouseRecipes'
import {useWrapperContext} from '@utils/imports/commonImports'
import translations from '@translations'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'

export default function RecipeCard() {
    const {user,settings,loading, error} = useUserContext()
    const router = useRouter()

    const isLoggedIn = user.loggedIn    
    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>

    const lang = settings.lang

    const { recipeIndex } = router.query
    
    //No clue why, but if you delete this if statement then the page can not be refreshed without error
    if(!recipeIndex) {
        return(
            <p></p>
        )
    }
    
    const recipe = recipes[recipeIndex]
    return(
        <div className={style.recipe_card_container}>
            <div className={style.recipe_card_title_container}>
                <p className={style.recipe_card_title}><strong>{recipe.name[lang] + " - " + recipe.serving_amount[lang]}</strong></p>
            </div>
            <div className={style.recipe_card_ing_container}>
                {recipe.ingredients.map((ing) => {
                    return(
                        <>

                        <p key={ing[lang]} className={style.recipe_card_ing}>
                            <img 
                                src={"/img/ing/" + ing.img} 
                                className={style.ing_image}/>
                            {ing.amount == "" ? ing[lang] : ing.amount + " " + ing[lang]}
                            
                        </p>
                        
                    </>
                    );})}
                    
            </div>
            
            <button 
                onClick={() => router.push('/game/auntHouse/questions/basic/' + recipeIndex)}
                className={style.recipe_card_button}> <strong>
               {/*TODO: potencially change if other langs were added*/}
               {translations.cook[lang]}</strong></button>
        </div>
    )
}


    