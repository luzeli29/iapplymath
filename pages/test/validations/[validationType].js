import { useRouter } from 'next/router'
import Error from 'pages/error'
import React from 'react'

export default function ValidationTest() {

    const router = useRouter()
    const { validationType } = router.query
    const validations = validationsByType[validationType]
    if(!validations) return <Error error={"No validations were found"}/>
    const title = validationType.charAt(0).toUpperCase() + validationType.slice(1)
    return (
        <div>
            <h1>{title} Validation</h1>
        </div>
    )
}


const validationsByType = {
    text: textValidations
}

const textValidations = [
    {test : {}, expect: false},
    {test : {es:"just spanish"}, expect: false},
    {test : {en:'just english'}, expect: true},
    {test : {en:'english', es:'spanish'}, expect: true},
]