import React from 'react'
import { useWrapperContext, getText } from '@utils/imports/commonImports'
import { useRouter } from 'next/router'

export default function Index() {
  const context = useWrapperContext();
  const lang = context.state.lang  
  const userName = context.state.userName
  const userId = context.state.userId
  const router = useRouter();

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
      <p>UserName: {j}</p>
      <p>True User Id: {userLongId}</p>

      <button onClick={() => handleLogout()}>Logout</button>
      </>
      :
      /* User is not logged in */
      <>
        <p>User is not logged in (Data will not be collected)</p>
        <button className="basic_button" onClick={() => router.push('/login/') }>
              {getText('login',lang)}
        </button>
      </>
    }
    </div>
  )
}
