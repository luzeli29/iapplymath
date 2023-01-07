import React from 'react'
import { useWrapperContext } from '@common_imports'
import { useRouter } from 'next/router'

export default function index() {
  const context = useWrapperContext();
  const router = useRouter();

  const userId = context.state.userId

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
      <p>UserId: {userId}</p>
      <button onClick={() => handleLogout()}>Logout</button>
      </>
      :
      /* User is not logged in */
      <p>User is not logged in (Data will not be collected)</p>
    }
    </div>
  )
}
