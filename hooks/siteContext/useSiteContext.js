import React, {useState,createContext,useContext,useEffect} from 'react'
import useSettings from './useSettings';
import useUser from './useUser';

const Context = createContext();

export default function SiteWrapper({children}) {
    const [error, setError] = useState();
    const {user} = useUser();
    const {settings} = useSettings();

    //TODO: HANDLE LOADING AND ERRORS IN DIFFERNET HOOKS

    function getErrors() {
      //get errors form user, session and settings
    }

    function logout() {
      user.logout()
      settings.clearSettingsCookie()
      return true
    }

    const context = {
        user: user,
        settings: settings,
        loading: user.loading || settings.loading,
        error: getErrors(),
        logout:logout
    }
  
    return (
        <Context.Provider value={context}>
          {children}
        </Context.Provider>
      );
}

export function useSiteContext() {
    return useContext(Context);
}