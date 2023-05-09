import generateIngredientLineText from '@utils/game/auntHouse/textCreation/generateIngredientLineText'
import React from 'react'
import Image from 'next/image'
import IconGroup from '@comps/iconGroup'
export default function IngredientList({ingredients, lang}) {
    let _lang
    if(lang) {
        _lang = lang
    } else {
        _lang = 'en'
    }

    function getContentFromValue(key,value) {
        const ingredient = ingredients[key]
        const ingredientLineText = generateIngredientLineText(ingredient,lang)
        const ingredientSrc = '/img/ing/' + value.ingredient.imgSrc + '.png'
        return (
            <div className='row border-bottom border-dark'>
                <div className='col-2'>
                    <Image 
                        width={50}
                        height={40}
                        quality={100}
                        priority={true}
                        src={ingredientSrc}
                        alt={'ing'}/>
                </div>   
                <div className='ps-3 col-10'>
                    <p>{ingredientLineText}</p>
                </div>               
            </div>
        )

    }
    
    return (
        <ul className='list-group list-group-flush mx-auto ps-1'>
            <IconGroup width={1} height={4} icons={ingredients} getContentFromValue={(key,value) => getContentFromValue(key,value)}/>
        </ul>
    )
}
