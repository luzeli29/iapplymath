import React, {useState,createContext,useContext,useEffect} from 'react'
import useSettings from './useSettings';
import useUser from './useUser';

const Context = createContext();

export default function SiteWrapper({children}) {
    const [error, setError] = useState();
    const {user,settings} = useUser();

    //TODO: HANDLE LOADING AND ERRORS IN DIFFERNET HOOKS

    function logout() {
      user.logout()
      settings.clearSettingsCookie()
      return true
    }

    const context = {
        settings: settings,
        user: user,
        loading: user.loading || settings.loading,
        error: error,
        logout:logout
    }
  
    return (
        <Context.Provider value={context}>
          {children}
        </Context.Provider>
      );
}

export function useUserContext() {
    return useContext(Context);
}