import { useRouter } from 'next/router'
import React from 'react'

export default function ValidationTestingIndex() {
    const router = useRouter()
    return (
        <div>
            <h1>Validation Test Screens</h1>
            <button onClick={() => router.push('test/validations/text')}>Text</button>
        </div>
    )
}
