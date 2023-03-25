import { useRouter } from 'next/router'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Error({error}) {
    const router = useRouter()

    function handleHome() {
        if(router.isReady) {
            router.push('/')
        }
    }
    return (
        <div className=''>
            <h1>Uh Oh! You ran into an error.</h1>
            <p>{error ? error : null}</p>
            <p>Refresh the page or press the button below...</p>
            <button onClick={() => handleHome()}>Back to Home.</button>
        </div>
    )
}
