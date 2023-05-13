import React from 'react'
import {useRouter} from 'next/router'
import style from '@styles/aunt_house.module.css'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import LoadRecipes from '@utils/staticData/json/foodData/loadRecipes'
import { getText } from '@commonImports'
import generateIngredientStatement from '@utils/game/auntHouse/textCreation/generateIngredientLineText'
import generateRecipeTitleText from '@utils/game/auntHouse/textCreation/generateRecipeTitleText'
import generateRecipeServingText from '@utils/game/auntHouse/textCreation/generateRecipeServingText'
import IngredientList from '@comps/game/auntHouse/ingredientList'

export async function getStaticPaths() {
    const recipes = await LoadRecipes()
    const recipeKeys = Object.keys(recipes)
    const keyPaths = [];
    for (let recipeKey of recipeKeys) {
        keyPaths.push({ params: { recipeKey} });
    }
    return {
        paths: keyPaths,
        fallback: false,
    };
}

export async function getStaticProps(context){
    const  {params}  = context
    const recipeKey = params.recipeKey
    const recipes = await LoadRecipes()
    const recipe = recipes[recipeKey]
    return {
      props: {
        recipeKey,
        recipe,
      },
    }
}


export default function RecipeCard({recipeKey,recipe}) {
    const {user,settings,loading, error} = useUserContext()
    const router = useRouter()

    const isLoggedIn = user.loggedIn  
      
    if(loading) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>

    const lang = settings.lang
    const recipeTitle = generateRecipeTitleText(recipe,lang)
    const recipeServingText = generateRecipeServingText(recipe,lang)
    const instructionText = recipe.instructions ? recipe.instructions[lang] : 'instructions'
    //const ingredientTextArr = generateIngredientStatement
    const ingredients = recipe.ingredients
    return(
        <div className={style.recipe_card_container}>
            <div className='p-2 mb-5'>
                
                <div className='card'>
                    <div className='card-body text-center mt-0 mb-0  p-0'>
                        <h2 className='card-title mb-0 resize-text_title'>{recipeTitle}</h2>
                        <h4 className='resize-text'> {recipeServingText}</h4>
                    </div>
                    <div className='row mx-auto'>
                        <div className='col-4 pt-2'>
                            <p className='resize-text'>{instructionText}</p>
                        </div>
                        <div className='col-8 border-start border-dark'>
                            <IngredientList ingredients={ingredients} lang={lang}/>
                        </div>
                    </div>
                </div>
                </div>
      
            <div className='row'>
                <div className='col-6 text-end'>
                    <button 
                        onClick={() => router.push('/game/auntHouse')}
                        className={'basic_button'}>
                        <text>
                            {getText('back',lang)}
                        </text>
                    </button>
                </div>
                <div className='col-6 text-start'>
                    <button 
                    onClick={() => router.push('/game/auntHouse/quiz/basic/' + recipeKey)}
                    className={'basic_button'}>
                    <text>
                            {getText('cook',lang)}
                        </text>
                    </button>
                </div>
            </div>
        </div>
    )
}


    