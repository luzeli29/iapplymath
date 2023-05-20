import getText from '@utils/text/getText'
import Link from 'next/link'
import React, { useState } from 'react'

export default function ErrorScreen({error}) {
    //TODO: ON RETURN TO HOME LOGOUT AND CLEAR SETTINGS
    return (
        <div className=''>
            <h1>Uh Oh! You ran into an error.</h1>
            <p>{error? error : null}</p>
            <p>Refresh the page or press the button below...</p>
            <Link href={"/"}>Back to Home.</Link>
        </div>
    )
}
