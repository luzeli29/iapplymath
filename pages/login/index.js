import React, {useState} from 'react'
import {useWrapperContext} from '@common_imports'
import {useRouter} from 'next/router'
import {throwError} from '@common_imports'

export default function Login() {
  const context = useWrapperContext();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleSessionStart = async (username) => {
    const endpoint = '/api/session/' + username

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()
    
    if (result.code === 200) {
      return true
    } else {
      throwError("Could not create session. " + result.message)
      setErrorMessage(result.message);
      return false
    }
  }
  
  const handleLogin = async (username) => {
    const endpoint = '/api/user/' + username

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()

    if (result && result.code === 200) {
      if(!handleSessionStart(username)) return; 
      context.setUsername(result.data.username);
      context.setUserId(result.data._id);

      if(result.data.avatar_id) {
        context.setAvatarId(result.data.avatar_id);
        router.push("/game/map")
      } else {
        router.push("/avatar/select")
      }
    } else {
      throwError("Login did not return 200. " + result.message)
      setErrorMessage(result.message);
    }
  }

  const handleCreateUser = async (username) => {
    const endpoint = '/api/user/' + username

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()

    if(result.code === 200) {
      if(!handleSessionStart(username)) return; 
      context.setUsername(username);
      context.setUserId(result.data.insertedId);
      router.push("/avatar/select")
    } else {
      throwError("Account creation did not return 200. " + result.message)
      setErrorMessage(result.message);
    }
  }

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    event.preventDefault()
    const submitType = event.nativeEvent.submitter.value;
    const username = event.target.username.value
    switch (submitType) {
      case "login":
        handleLogin(username)
        break;
      case "create-user":
        handleCreateUser(username)
        break;
      default:
        throwError("Bad form value. " + submitType)
        break;
    }
  }

  return (
    <div className="container">
      <p className="red">{errorMessage}</p>
      <form className="" autoComplete="off" onSubmit={handleSubmit}>
          <div className="row w-75 mx-auto pt-5">
            <label className="col-4 text-end" htmlFor="UserId">Username:</label>
            <input
              className="col-6"
              id="username"
              type="text"
              name="username"
              pattern="[a-zA-Z0-9]*"
            />
          </div>
          <div className="row w-75  mx-auto text-center">
            <p>Only characters and numbers, no spaces or symbols.</p>
          </div>
          <div className="row pt-5">
            <div className="col-6 text-center">
              <button className="basic_button" type="submit" name="action" value="create-user">Create User</button>
            </div>
            <div className="col-6 text-center">
              <button className="basic_button" type="submit" name="action" value="login">Login</button>
            </div>
        </div>
      </form>
    </div>
  )
}
