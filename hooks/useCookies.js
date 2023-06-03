import React, { useState } from "react"
import DevErr from "@utils/debug/devErr"
import Cookies from "js-cookie"
import DevLog from "@utils/debug/devLog"

const useCookies = () => {
    const [error, setError] = useState()
    
    const setCookie = (name,data,isSecure,expires) => {
        if(!name) {
            DevErr
            DevErr('Failed to set cookie, "name" was null.')
            return false
        }

        if(!data) {
            DevErr('Failed to set cookie, "data" was null.')
            return false
        }
        
        expires = expires ? expires : 1
        isSecure = isSecure ? isSecure : false

        const JSONData = JSON.stringify(data)
        //TODO: add a way to check if too many cookies are stored
        Cookies.set(name,JSONData, { expires: expires, secure: isSecure })
        DevLog('Updated Quiz Cookie Succesfully...')
        return true
    }

    const getCookie = (name) => {
        
        if(!name) {
            DevErr('Failed to get cookie, "name" was null.')
            return false
        }

        const exists = cookieExists(name)
        if(!exists) {
            DevLog('Failed to get cookie, cookie with name ' + name + ' does not exist.')
            return false
        }

        
        const JSONcookie = Cookies.get(name)

        try{
            const cookie = JSON.parse(JSONcookie)
            return cookie
        } catch (e) {
            DevErr('Failed to parse cookie...')
            return {}
        }
    }

    const removeCookie = (name) => {
        if(!name) {
            DevErr('Failed to remove cookie, "name" was null.')
            return false
        }

        const exists = cookieExists(name)
        if(!exists) {
            DevErr('Failed to remove cookie, cookie with name ' + name + ' does not exist.')
            return false
        }

        Cookies.remove(name)

        return true
    }

    const cookieExists = (name) => {
        if(!name) {
            DevErr('Failed to check if cookie exists, "name" was null.')
            return false
        }

        const cookie = Cookies.get(name)

        if(cookie) {
            return true
        }

        return false
    }


    const useCookieData = {
        error,
    }
    return {useCookieData, setCookie,getCookie,removeCookie,cookieExists}
}

export default useCookies