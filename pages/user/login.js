import Loading from "@comps/screens/loading"
import { useUserContext } from "@hooks/siteContext/useUserContext"
import { useRouter } from "next/router"
import React, { useState } from "react"
import translations from "@translations";

const Login = () => {
  const {user, settings, loading, error,login,logout} = useUserContext()
  const [feedbackText, setFeedbackText] = useState(user.error)
  const router = useRouter()
  const lang = settings.lang

  if(loading) return <Loading/>
  
  const handleLoggedIn = () => {
      
    router.push('/game')

    return (
      <Loading lang={lang}/>
    )
  }

  const handleLoggedOut = () => {

    const handleSubmit = async (event) => {
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
      setFeedbackText(user.error)
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

  const render = () => {
    if(user.loggedIn) {
      return handleLoggedIn()
    } else {
      return handleLoggedOut()
    }
  }

  return (
    render()
  )
}

export default Login