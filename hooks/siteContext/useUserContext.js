import React, {useState,createContext,useContext,useEffect} from 'react'
import useSettings from './useSettings';
import useUser from './useUser';
import useQuizCookies from '@hooks/quiz/useQuizCookies';

const Context = createContext();

const SiteWrapper = ({children}) => {
    const [selectedBackgroundIndex, setSelectedBackgroundIndex] = useState(-1);
    const quizCookieHandler = useQuizCookies()
    const [error, setError] = useState();
    const {user,settings} = useUser();

    //TODO: HANDLE LOADING AND ERRORS IN DIFFERNET HOOKS

    const login = async (username) => {
      try{
        quizCookieHandler.handleLogin()
      } catch (e) {
        DevErr('Failed to logout of quiz cookie...' + e)
      }      
      
      const loggedIn = await user.login(username)

      return loggedIn
    }

    const logout = () => {
      try{
        quizCookieHandler.handleLogout()
      } catch (e) {
        DevErr('Failed to logout of quiz cookie...' + e)
      }

      user.logout()
      settings.clearSettingsCookie()
      return true
    }

    const context = {
        settings: settings,
        user: user,
        loading: user.loading || settings.loading,
        error: error,
        login,
        logout,
        selectedBackgroundIndex: selectedBackgroundIndex,
        setSelectedBackgroundIndex: setSelectedBackgroundIndex
    };

    return (
        <Context.Provider value={context}>
          {children}
        </Context.Provider>
      );
}

export function useUserContext() {
    return useContext(Context);
}

export default SiteWrapper;