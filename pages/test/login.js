import useUser from "@hooks/user/useUser"
import React, { useState } from "react"

export default function Login() {
    const [feedbackText, setFeedbackText] = useState()
    const {user, isLoading, error} = useUser("inputUsername")
    if(isLoading)
    function handleSubmit(event) {
        event.preventDefault()

        const inputUsername = event.target.username.value
        //handleLogin(inputUsername)
        
    }

    function handleLogin() {
        
    }

    return (
        <div className="container">
          <p className="red">{feedbackText}</p>
          <form className="" autoComplete="off" onSubmit={handleSubmit}>
              <div className="row w-75 mx-auto pt-5">
                <label className="col-4 text-end" htmlFor="UserId">Username:</label>
                <input className="col-6" id="username" type="text" name="username" pattern="[a-zA-Z0-9]*"/>
              </div>
              <div className="row w-75  mx-auto text-center">
                <p>Only characters and numbers, no spaces or symbols.</p>
              </div>
              <div className="row pt-5">
                <div className="col-12 text-center">
                  <button className="basic_button" type="submit" name="action" value="login">Login</button>
                </div>
            </div>
          </form>
        </div>
      )
  }