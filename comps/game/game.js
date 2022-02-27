const Game = ({onClick}) => {
    return (
        <div className='container'>
            <p><b>GAME</b></p>
            <button onClick={() => onClick("start")}>TO START</button>
            <button onClick={() => onClick("avatar_creator")}>TO CC</button>
        </div>
    );
}
 
export default Game;