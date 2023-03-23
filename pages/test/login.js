import Loading from "@comps/screens/loading"
import { useSiteContext } from "@hooks/siteContext/useSiteContext"
import useUser from "@hooks/siteContext/useUser"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

export default function Login() {
  console.log("in login")
  const {user, loading, error} = useSiteContext()
  console.log(user)
  const [feedbackText, setFeedbackText] = useState()
  const [onRoute, setOnRoute] = useState()

  const router = useRouter()

  if(loading) return <Loading/>
  

  async function handleSubmit(event) {
      event.preventDefault()
      const submitType = event.nativeEvent.submitter.value;
      const inputUsername = event.target.username.value

      if(!inputUsername) {
        setFeedbackText("Please input a username.")
        return
      }
      let loggedIn = false
      if(submitType == "offline_login") {
        loggedIn = user.offlineLogin(inputUsername)
      } else if (submitType == "login") {
        loggedIn = await user.login(inputUsername)
      }

      if(loggedIn){
        setOnRoute(true)
        router.push("/test")
      }
  }

  if(onRoute) return (<Loading/>)

  if(user.data && !loading && !error) {
    return (
      <div className="container">
        <p className="red">You are already logged in.</p>
        <button className="basic_button" onClick={() => user.logout()}>Logout</button>
      </div>
    )
  }
  
  return (
      <div className="container">

        <form className="" autoComplete="off" onSubmit={handleSubmit}>
            <div className="row w-75 mx-auto pt-5 text-center">
              <p className="red">{feedbackText}</p>
              <p className="red">{error}</p>
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
              <div className="col-12 text-center pt-3">
              {error ? 
                  <button className="" type="submit" name="action" value="offline_login">Play Offline</button>
                : null}
              </div>
          </div>
        </form>
      </div>
    )
  }