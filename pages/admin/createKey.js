import CreateKeyFromPassword from '@utils/crypto/createKeyFromPassword'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export default function CreateKey() {
    const [key, setKey] = useState()
    const router = useRouter()

    function handleSubmit(event) {
        event.preventDefault()
        const password = event.target.password.value
        setKey(CreateKeyFromPassword(password))
    }

    return (
        <div>
            <div className='row'>
                <div className='col-1'>
                    <button onClick={()=>router.push('/admin')}>Back</button>
                </div>
                <div className='col-10 text-center'>
                    <h1>Create Key</h1>
                </div>
                <div className='col-1'>
                </div>
            </div>
            <form className="" autoComplete="off" onSubmit={handleSubmit}>
            <div className='row'>
                <label className="col-4 text-end" htmlFor="password">Password:</label>
                <input className="col-6" id="password" type="text" name="password" pattern="[a-zA-Z0-9]*"/>
            </div>
            <div className='row pt-3'>
                <div className='col text-center'>
                    <button className="basic_button" type="submit" name="action" value="generateKey">Generate Key</button>
                </div>
            </div>
            </form>
            <div className='row pt-3'>
                <div className='col text-center'>
                    <p>{key? key : null}</p>
                </div>
            </div>
        </div>
    )
}
