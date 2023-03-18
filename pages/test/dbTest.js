import Loading from '@comps/screens/loading'
import { useSiteContext } from '@hooks/siteContext/useSiteContext'
import useUser from '@hooks/siteContext/useUser'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'


export default function DbTest() {
    const {user,logout, loading, error} = useSiteContext()
    const router = useRouter()
    
    if(loading) return <Loading/>
    
    if(!user.data && router.isReady) {
        router.push('/test/login')
        return <Loading/>
    }

    if(error) {
        return (
            <p>{error}</p>
        )
    }

    const testObject = {
        test: "testtesttest",
        key: "value",
        array: [
            "1",
            "2"
        ],
        object: {
            key: "valuepair",
            key2: "valuepair2",
        }
    }

    return (
        <div> 
            <p>{user.data.username}</p>
            <p>{user.data.secureUsername}</p>
            <p>{user.data.userId}</p>
            <p>{user.data.avatarId}</p>
            <p>{user.data.petId}</p>
            <Link className="basic_button" href={"/test/"}>back to tests</Link>
            <button className="basic_button" onClick={() => user.setAvatarId(2)}>Change Avatar to 2</button>
            <button className="basic_button" onClick={() => user.setAvatarId(4)}>Change Avatar to 4</button>
            <button className="basic_button" onClick={() => user.setPetId(0)}>Change Pet to 0</button>
            <button className="basic_button" onClick={() => user.setPetId(2 )}>Change Pet to 2</button>
            <button className="basic_button" onClick={() => user.putSession(testObject)}>Put Session Test</button>
            <button className="basic_button" onClick={() => user.incrementAyu()}>Ayu Push Test</button>
        </div>
    )
}
