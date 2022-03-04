import React, {useState} from 'react';
import ToolBar from "../comps/game/tool_bar";
import MapIcon from '../comps/game/map_icon';
import Resturant from '../comps/game/resturant';
import Aunt from '../comps/game/aunt';
export default function Game() {

    const [state, setState] = useState("map");

    const debugBackButton = () => {
        console.log("BACK")
    }

    const changeGameState = (newState) => {
        console.log(newState)
        setState(newState)
    }
    
    const render = () => {
        switch(state) {
            case "map" :
                return (
                    <>
                        <ToolBar backClick={debugBackButton} isLink="true"/>
                        <div className="map">
                            <MapIcon onClick={changeGameState} icon="aunt"/>
                            <MapIcon onClick={changeGameState} icon="resturant"/>
                        </div>
                    </>
                )
            case "aunt" :
                return (
                    <>
                        <ToolBar backClick={changeGameState} isLink={false}/>
                        <Aunt/>
                    </>
                )
            case "resturant" :
                return (
                    <>
                        <ToolBar backClick={changeGameState} isLink={false}/>
                        <Resturant/>
                    </>
                )
        }
    }
    return (
        <>
            {render()}
        </>
    );
}
 
