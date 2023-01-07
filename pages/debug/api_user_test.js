import React from 'react'
import Link from "next/link"
import {getCommonText} from '@common_imports'
export default function UserTest() {

  const isDev = process.env.NODE_ENV == 'development'


  return (
    <>
      {isDev ? 
        <div>
          <h1>API Debug Page</h1>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="UserId">UserId</label>
              <input
                id="user_id"
                type="text"
                name="user_id"
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
        :
        
        <p>
          {getCommonText('click') + " "}
          <Link href="/"><a><strong>{getCommonText('here')}</strong></a></Link> 
          {" " + getCommonText('to_return_home')}
        </p>
      }
    </>
  )
}
