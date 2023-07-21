import React from 'react'
import style from '@styles/aunt_house.module.css'
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import {useRouter} from 'next/router'
import getText from '@utils/text/getText'

export default function SmallRecipeCard({recipeIndex}) {
    const {user,settings,loading, error} = useUserContext()
    const router = useRouter()
    const isLoggedIn = user.loggedIn    
    if(loading) return <Loading/> 
    if(!router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>
    const lang = settings.lang
    const recipe = recipes[recipeIndex]
    const prepTime = recipe.prep_time > 0 ? getText('preptime', lang) + ' : ' +  recipe.prepTime + ' ' + getText('minutes', lang) : ''
    const cookTime = recipe.prep_time > 0 ? getText('preptime', lang) + ' : ' +  recipe.cookTime + ' ' + getText('minutes', lang) : ''

    return(
        <div className={style.recipe_card_container}>
            <div className={style.small_recipe_card_title_container}>
                <p className={style.small_recipe_card_title}><strong>{recipe.name[lang] + " - " + recipe.serving_amount[lang]}</strong></p>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <p className=''>{prepTime}</p>
                </div>
                <div className='col-6'>
                    <p className=''>{cookTime}</p>
                </div>
            </div>
            <div className={style.small_recipe_card_ing_container}>
                {recipe.ingredients.map((ing) => {
                                    return(
                                        <p className={style.small_recipe_card_ing} key={ing[lang]}>
                                            <img 
                                                src={"/img/ing/" + ing.img} 
                                                className={style.ing_image_small}
                                                alt={"recipe ingredient"}/>
                                            {ing.amount + " " + ing[lang]}
                                        </p>
                                    );
                    })}
            </div>
                
            

        </div>
    )
}
