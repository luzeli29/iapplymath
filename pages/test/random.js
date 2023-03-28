import React, { useState } from 'react'
import useSeededRandom from '@hooks/useSeededRandom'
import Loading from '@comps/screens/loading'

export default function random() {
    const [userInputSeed, setUserInputSeed] = useState('')
    const {loading,seed,setSeed,regenerateSeed, randomGenerator} = useSeededRandom()


    const handleSubmit = (event) => {
        // prevents the submit button from refreshing the page
        event.preventDefault();
        if(userInputSeed === "") {
            regenerateSeed()
        } else {
            setSeed(userInputSeed)
        }

    };

    if(loading) return <Loading/>

    return (
        <div className='container row'>
            <div className='col-10 mx-auto border'>
                <form className="" autoComplete="off" onSubmit={handleSubmit}>
                    <h1>Seeded Random Test Page</h1>
                    <label className="" htmlFor="seed">Seed:</label>
                    <input value={userInputSeed} onChange={e => setUserInputSeed(e.target.value)}/>
                    <p>Seed in hook: {seed}</p>
                    <p>0-1: {randomGenerator.randomInt()}</p>
                    <p>0-5: {randomGenerator.randomInt(5)}</p>
                    <p>2- 9: {randomGenerator.randomInt(9,2)}</p>
                    <p>1-6, 12: {randomGenerator.randomHr()}</p>
                    <button className="basic_button" type="submit" name="action" value={userInputSeed}>Generate</button>
                </form>
            </div>
        </div>
    )
}
