import React from 'react'
import {useRouter} from 'next/router'
import style from '@styles/aunt_house.module.css'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import LoadRecipes from '@utils/staticData/staticDataFetching/foodData/loadRecipes'
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
        recipe,
      },
    }
}


export default function RecipeCard({recipe}) {
    const {user,settings,loading, error} = useUserContext()
    const router = useRouter()

    const isLoggedIn = user.loggedIn  
      
    if(loading) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>

    const lang = settings.lang
    console.log(recipe)
    const recipeTitle = generateRecipeTitleText(recipe,lang)
    const recipeServingText = generateRecipeServingText(recipe,lang)
    const instructionText = recipe.instructions ? recipe.instructions[lang] : 'instructions'
    //const ingredientTextArr = generateIngredientStatement
    const ingredients = recipe.ingredients
    return(
        <div className={style.recipe_card_container}>
            <div className='p-3 container-fluid'>
                <div className='card mx-auto'>
                    <div className='card-body text-center mx-auto'>
                        <h2 className='card-title'>{recipeTitle}</h2>
                        <h4>{recipeServingText}</h4>
                    </div>
                    <div className='row mx-auto pb-2 px-2'>
                        <div className='col-6 pt-2'>
                            <p>{instructionText}</p>
                        </div>
                        <div className='col-6 border-start border-dark'>
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
                        <strong>
                            {getText('back',lang)}
                        </strong>
                    </button>
                </div>
                <div className='col-6 text-start'>
                    <button 
                    onClick={() => router.push('/game/auntHouse/quiz/basic?recipeKey=' + recipeKey)}
                    className={'basic_button'}>
                    <strong>
                            {getText('cook',lang)}
                        </strong>
                    </button>
                </div>
            </div>
        </div>
    )
}


    