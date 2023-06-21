import ErrorScreen from "@comps/screens/errorScreen"
import Loading from "@comps/screens/loading"
import { useUserContext } from "@hooks/siteContext/useUserContext"
import useUser from "@hooks/siteContext/useUser"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import translations from "@translations";

export default function Login() {
  const {user, settings, loading, error,login,logout} = useUserContext()
  const [feedbackText, setFeedbackText] = useState(user.error)
  const [onRoute, setOnRoute] = useState()
  const router = useRouter()
    const lang = settings.lang

  if(loading) return <Loading/>
  if(onRoute) return (<Loading/>)


  async function handleSubmit(event) {
      event.preventDefault()
      let submitType,inputUsername
      try {
        submitType = event.nativeEvent.submitter.value;
        inputUsername = event.target.username.value
      } catch (e) {
        setFeedbackText("Error getting username from form. Please check to see if your browser is up to date.")
      }

      if(!inputUsername) {
        setFeedbackText("Please input a username.")
        return
      }
      setFeedbackText()
      let loggedIn = false
      switch (submitType) {
        case "offline_login":
          loggedIn = user.offlineLogin(inputUsername)
          break;
        case "login":
          loggedIn = await login(inputUsername)
          break;
        case "create_user":
          const createdUser = await user.createUser(inputUsername)
          if(createdUser) {
            loggedIn = await login(inputUsername)
          }
      }

      if(loggedIn && submitType == 'create_user'){
        router.push("/intro")
        setOnRoute(true)
      } else if (loggedIn) {
        if(!user.avatarId) {
          router.push("/dialog/websiteIntro")
          setOnRoute(true)
        } else if(!user.petId) {
          router.push("/user/petSelect")
          setOnRoute(true)
        } else {
          router.push("/game")
          setOnRoute(true)
        }
      }
      setFeedbackText(user.error)
  }

  if(user.data && !loading && !error) {
    return (
      <div className="container">
        <div className="row w-75 mx-auto pt-5 text-center">
          <div className="col-12">
            <p className="">You are logged in.</p>
            <button className="basic_button" onClick={() => logout()}>Logout</button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
      <div className="container">

        <form className="" autoComplete="off" onSubmit={handleSubmit}>
            <div className="row w-75 mx-auto pt-5 text-center">
              <p className="red">{feedbackText ? feedbackText : " "}</p>
              <label className="col-4 text-end" htmlFor="UserId">{translations.username[lang]}</label>
              <input className="col-6" id="username" type="text" name="username" pattern="[a-zA-Z0-9]*"/>
            </div>
            <div className="row w-75  mx-auto text-center">
              <p>{translations.only_char[lang]}</p>
            </div>
            <div className="row pt-5">
              <div className="col-6 text-center">
                {/*<button className="basic_button" type="submit" name="action" value="create_user">{translations.create_user[lang]}</button> */}
              </div>
              <div className="col-12 text-center">
                <button className="basic_button" type="submit" name="action" value="login">{translations.login[lang]}</button>
              </div>
              <div className="col-12 text-center pt-3">
              {user.error ? 
                  null//<button className="" type="submit" name="action" value="offline_login">Play Offline</button>
                : null}
              </div>
          </div>
        </form>
      </div>
    )
  }