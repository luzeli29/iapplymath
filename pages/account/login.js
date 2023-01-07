import React, {useState} from 'react'
import {useWrapperContext} from '@common_imports'
import {useRouter} from 'next/router'
import {throwError} from '@common_imports'

export default function Login() {
  const context = useWrapperContext();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      userId: event.target.user_id.value,
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = '/api/user/' + event.target.user_id.value

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
  //    body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    const result = await response.json()

    if (result.code === 200) {
      if(result.data.avatarId) {
        context.setUserId(result.data.userId);
        context.setAvatarId(result.data.avatarId);
        router.push("/game/")
      } else {
        context.setUserId(event.target.user_id.value);
        router.push("/avatar/select")
      }
    } else {
      throwError("Account login did not return 200. " + result.message)
      setErrorMessage(result.message);
    }
  }

  return (
    <div className="container">
      <p className="red">{errorMessage}</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="UserId">UserId</label>
          <input
            id="user_id"
            type="text"
            name="user_id"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
