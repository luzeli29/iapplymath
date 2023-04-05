import Loading from '@comps/screens/loading';
import LoadRecipes from '@utils/staticDataFetch/loadRecipes';
import { useRouter } from 'next/router';
import React from 'react'

export default function Test({recipes}) {

    console.log(recipes)
    return (
        <div>test</div>
    )
}

export async function getStaticProps(){
    const recipes = await LoadRecipes()
    return {
      props: {
        recipes,
      },
    }
}
