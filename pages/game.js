import React, {useState} from 'react';
import Resturant from '../comps/game/rest/resturant';
import Aunt from '../comps/game/aunt/aunt';
import Map from '../comps/game/map/map'
import style from './game.module.css'

export default function Game() {

    const [state, setState] = useState("map");

    const changeGameState = (newState) => {
        setState(newState)
    }
    
    const render = () => {
        switch(state) {
            case "map" :
                return (
                    <>
                        <Map handleSelect={changeGameState}/>
                    </>
                )
            case "aunt_house" :
                return (
                    <>
                        <Aunt   
                        backToMap={() => setState("map")}/>
                    </>
                )
            case "resturant" :
                return (
                    <>
                        <Resturant/>
                    </>
                )
        }
    }
    
    return (
        //TODO: Change container to fixed resolution
        //TODO: Add back button???
        <div className={style.game_container}>
            {render()}
        </div>
    );
}
 
