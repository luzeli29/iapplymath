import React from 'react'
import { useStopWatch } from '@hooks/useStopWatch'
export default function Stopwatch() {
    const {start,stop,reset,isRunning,time} = useStopWatch()
  return (
    <>
    <div>stopwatch</div>
    <p>{time}</p>
    <button onClick={()=>start()}>start</button>
    <button onClick={()=>stop()}>stop</button>

    </>
  )
}
