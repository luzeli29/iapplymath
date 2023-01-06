import React from 'react'
import { useWrapperContext } from '@common_imports'
export default function index() {
  const context = useWrapperContext();
  const userId = context.state.userId
  return (
    <div className="container">
    <h1>Settings</h1>
    {
      userId ? 
      /* User is logged in */
      <p>User: {userId}</p>
      :
      /* User is not logged in */
      <p>User is not logged in (Data will not be collected)</p>
    }
    </div>
  )
}
