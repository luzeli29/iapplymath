import useDatabase from '@hooks/database/useDatabase'
import React from 'react'

export default function test() {
  const {database} = useDatabase()
  return (
    <button onClick={() => database.getUserdata()}>test</button>
  )
}
