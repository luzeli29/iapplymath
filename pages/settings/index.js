import React from 'react'
import { useWrapperContext, getCommonText } from '@common_imports'
import { useRouter } from 'next/router'

export default function Index() {
  const context = useWrapperContext();
  const router = useRouter();

  const userId = context.state.userId
  const userLongId = context.state.userLongId

  const handleLogout = () => {
    context.clearData();
    router.push('/')

  }

  return (
    <div className="container">
    <h1>Settings</h1>
    {
      userId ? 
      /* User is logged in */
      <>
      <p>Given User Id: {userId}</p>
      <p>True User Id: {userLongId}</p>

      <button onClick={() => handleLogout()}>Logout</button>
      </>
      :
      /* User is not logged in */
      <>
        <p>User is not logged in (Data will not be collected)</p>
        <button className="basic_button" onClick={() => router.push('/account') }>
              {getCommonText('login')}
        </button>
      </>
    }
    </div>
  )
}
