import React, {} from 'react';

const AvatarCreator = ({onClick}) => {

    /*
        bakes created avatar to be used for the game
        called when player is done creating avatar

        returns
            - image of avatar view from the front
            - image of avatar view from the back
    */
    const bakeAvatar = () => {
    }

    return (
        <div className='container'>
            <p><b>AVATAR CREATOR</b></p>
            <button onClick={() => onClick("start")}>TO START</button>
            <button onClick={() => onClick("game")}>TO GAME</button>
        </div>
    );
}
 
export default AvatarCreator;