import React, {useState, useContext } from 'react';
import AppContext from '../comps/context'
import AvatarCreator from '../comps/avatar_creator/avatar_creator'
import Game from '../comps/game/game';
import AyuIntro from '../comps/ayu_intro';
export default function Index() {

  const [pageState, setPageState] = useState("start");
  const [avatar, setAvatar] = useState(0);
  const [name, setName] = useState("nameless");

  const changePage = (...params) => {
    setPageState(params[0])
  }
  const value = useContext(AppContext);
  const { start, symbol } = value.state.translations;

  const renderFromState = (state) => {
    switch(state) {
      case "ayu_intro" :
        return (
          <div className='page_container'>
            <AyuIntro onClick={changePage}/>
          </div>
        )
      case "game":
        return(
          <div className='page_container'>
            <Game onClick={changePage}/>
          </div>
        )
      case "avatar_creator":
        return(
          <div className='page_container'>
            <AvatarCreator onClick={changePage}/>
          </div>        
          )
      case "start" :
        return(
          <div className='page_container'>
            <button style={{fontSize:"75px"}} onClick={()=> setPageState("ayu_intro")}><b>{start}</b></button>
          </div>
        )
      default:
        return(
          <div className='page_container'>
            <button style={{fontSize:"75px"}} onClick={()=> setPageState("start")}><b>BAD STATE!</b></button>
          </div>
        )
    }
  }

  return (
    <>
      {/* TODO: Remove the table and debug tags when ready*/}
      <table>
        <tr>
        <td>{renderFromState(pageState)}</td>
        <td>
          <p><b>Debug Stats</b> (Will be removed, and game screen will be centered)</p>
          <p>pageState: {pageState}</p>
          <p>langState: {symbol}</p>
          <p>name: {name}</p>
          <p>avatar: </p>
        </td>
        </tr>
      </table>
    </>)
}
