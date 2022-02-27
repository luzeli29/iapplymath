const AyuIntro = ({onClick}) => {
    return (
        <div className='container'>
            <p><b>Ayu Intro</b></p>
            <button onClick={() => onClick("start")}>TO START</button>
            <button onClick={() => onClick("avatar_creator")}>TO CC</button>
        </div>
    );
}
 
export default AyuIntro;