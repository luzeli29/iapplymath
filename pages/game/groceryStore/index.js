import Loading from '@comps/screens/loading'
import { useRouter } from 'next/router'
import React from 'react'

const Index = () => {
    const router = useRouter()
    router.push('/game/map')
  return (
    <Loading/>
  )
}

export default Index
