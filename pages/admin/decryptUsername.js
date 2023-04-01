import CreateKeyFromPassword from '@utils/crypto/createKeyFromPassword'
import DecryptUsername from '@utils/crypto/decryptUsername'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export default function Decrypt() {

  const [username, setUsername] = useState()
  const router = useRouter()

  function handleSubmit(event) {
    event.preventDefault()
    const password = event.target.password.value
    const secureUsername = event.target.secureUsername.value

    const key = CreateKeyFromPassword(password)
    const decryptedUsername = DecryptUsername(secureUsername,key)
    setUsername(decryptedUsername)
  }

  return (
    <div>
        <div className='row'>
            <div className='col-1'>
                <button onClick={()=>router.push('/admin')}>Back</button>
            </div>
            <div className='col-10 text-center'>
                <h1>Decrypt Username</h1>
            </div>
            <div className='col-1'>
            </div>
        </div>
        <form className="" autoComplete="off" onSubmit={handleSubmit}>
        <div className='row'>
            <label className="col-4 text-end" htmlFor="password">Password:</label>
            <input className="col-6" id="password" type="password" name="password"/>
        </div>
        <div className='row'>
            <label className="col-4 text-end" htmlFor="secureUsername">Encrypted Username:</label>
            <input className="col-6" id="secureUsername" type="text" name="secureUsername"/>
        </div>
        <div className='row pt-3'>
            <div className='col text-center'>
                <button className="basic_button" type="submit" name="action" value="decrypt">Decrypt</button>
            </div>
        </div>
        </form>
        <div className='row pt-3'>
            <div className='col text-center'>
                <p>{username? 'Username is - ' + username : null}</p>
            </div>
        </div>
    </div>
  )
}
