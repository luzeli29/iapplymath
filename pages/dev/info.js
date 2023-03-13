import Loading from '@comps/screens/loading'
import useUser from '@hooks/user/useUser'
import { useRouter } from 'next/router'
import React from 'react'


export default function info() {
    const {user, loading,logout, error,setAvatarId, setPetId} = useUser()
    const router = useRouter()

    if(loading) return <Loading/>
    
    if(!user && router.isReady) {
        router.push('/dev/login')
        return <Loading/>
    }

    if(error) {
        return (
            <p>{error}</p>
        )
    }
    return (
        <div> 
            <p>{user.username}</p>
            <p>{user.secureUsername}</p>
            <p>{user.userId}</p>
            <p>{user.avatarId}</p>
            <p>{user.petId}</p>
            <button className="basic_button" onClick={() => logout()}>Logout</button>
            <button className="basic_button" onClick={() => setAvatarId(2)}>Change Avatar to 2</button>
            <button className="basic_button" onClick={() => setAvatarId(4)}>Change Avatar to 4</button>
            <button className="basic_button" onClick={() => setPetId(0)}>Change Pet to 0</button>
            <button className="basic_button" onClick={() => setPetId(2 )}>Change Pet to 2</button>

        </div>
    )
}
