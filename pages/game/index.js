import React, { useState } from 'react'
import RetrieveUserContext from '@hooks/HOF/retrieveUserContext'
import getText from '@utils/text/getText'
import Loading from '@comps/screens/loading'
import { useRouter } from 'next/router'

const GameIndex = ({user,settings}) => {
    const router = useRouter()
    const lang = settings.lang
    const [loading, setLoading] = useState(false)

    const handleYes = () => {
        router.push('/dialog/websiteIntro')
        setLoading(true)
    }

    const handleNo = () => {
        router.push('/game/map')
        setLoading(true)
    }

    const render = () => {
        if(loading) return <Loading lang={lang}/>

        return (
            <div>
                <h1 className='pb-5'>{getText('show_tutorial_prompt',lang)}</h1>
                <div className='row'>
                    <div className='col-6 text-center' onClick={handleYes}>
                        <button className="basic_button " >
                            {getText('yes',lang)}
                        </button>
                    </div>
                    <div className='col-6 text-center' onClick={handleNo}>
                        <button className="basic_button" >
                            {getText('no',lang)}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return render()
}


export default RetrieveUserContext(GameIndex)