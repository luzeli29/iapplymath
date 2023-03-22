import Loading from '@comps/screens/loading'
import { useSiteContext } from '@hooks/siteContext/useUserContext'
import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'

export default function Test() {
    const {user,logout, settings, loading, error} = useSiteContext()
    const router = useRouter()
    if(loading) return <Loading/>
    if(!user.data) {
        if(router.isReady) router.push('/test/login')
        return <Loading/>
    }

    if(user.error) {
        return (
            <p>{user.error}</p>
        )
    }
    return (
        <>
            <h3>Test Pages</h3>
            <button className="basic_button" onClick={() => logout()}>Logout</button>
            <Link className='basic_button' href="/test/dbTest">Database Tests</Link>
            <Link className='basic_button' href="/test/settings">Settings Tests</Link>
        </>
    )
}
