import React from 'react'
import {useRouter} from 'next/router'
import {getCommonText} from '@common_imports'

export default function AccountIndex() {

    const router = useRouter();

    return (
        <div className="container">
            <button className="basic_button" onClick={() => router.push('/account/login') }>
                {getCommonText('login')}
            </button>
            <button className="basic_button" onClick={() => router.push('/account/create_account') }>
                {getCommonText('create_account')}
            </button>
        </div>
    )
}
