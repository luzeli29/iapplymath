import generateIngredientLineText from '@utils/game/auntHouse/textCreation/generateIngredientLineText'
import React from 'react'
import Image from 'next/image'
export default function IngredientList({ingredients, lang}) {
    console.log(ingredients)
    let _lang
    if(lang) {
        _lang = lang
    } else {
        _lang = 'en'
    }

    const IngredientLine = ({ingredient}) => {
        const ingredientLineText = generateIngredientLineText(ingredient,lang)
        const ingredientSrc = '/img/ing/' + ingredient.ingredient.imgSrc + '.png'
        return (
            <li className='list-group-item'>
                <div className='row'>
                    <div className='col-2'>
                        <Image 
                            width={50}
                            height={40}
                            quality={100}
                            priority={true}
                            src={ingredientSrc}
                            alt={ingredient.imgSrc}/>
                    </div>   
                    <div className='col-10'>
                        <p>{ingredientLineText}</p>
                    </div>               
                </div>
            </li>
        )
    }

    return (
        <ul className='list-group list-group-flush mx-auto ps-1'>
            {ingredients.map((ingredient) => <IngredientLine ingredient={ingredient}/>)}
        </ul>
    )
}
