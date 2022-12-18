import React from 'react'
import {useWrapperContext} from '../context/context'

export default function Login() {
  const context = useWrapperContext();

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      userID: event.target.user_id.value,
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = '/api/users'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    const result = await response.json()

    context.setUserID(event.target.user_id.value);
    
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="UserID">UserID</label>
        <input
          id="user_id"
          type="text"
          name="user_id"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}
