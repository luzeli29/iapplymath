import { useRouter } from 'next/router'
import React from 'react'

export default function Admin() {
    const router = useRouter()
  return (
    <div>
        <div className='row'>
            <div className='col-12 text-center'>
                <h1>Admin</h1>
            </div>
        </div>
        <button onClick={() => router.push('/admin/createKey')}>Create Key</button>
        <button onClick={() => router.push('/admin/decryptUsername')}>Decrypt Username</button>
    </div>
  )
}
