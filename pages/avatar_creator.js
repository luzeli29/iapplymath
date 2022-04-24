import React, {useState} from 'react';
import Image from "next/image";
import style from '../styles/avatar_creator.module.css'
import {useWrapperContext} from '../context/context'
import { useRouter } from 'next/router'

const data = [
  {
    id: "1",
    key: "1",
    img: "/img/hair1.png"
  },
  {
    id: "2",
    key: "2",
    img: "/img/hair2.png"
  }
];


export default function AvatarCreator() {
  //get the site context and lang
  const context = useWrapperContext()
  const lang = context.state.lang

  const router = useRouter();

  const [num, setNum] = useState(0)

  function handleClick() {
    setNum(num + 1)
  }

  //This is called when the player is done creating
  //Should handle anything to be done in order to use avatar in game
  const handleFinishAvatar = () => {
    context.setViewState("map")
  }

  return (
    <div className={style.container}>
      <div className={style.overlapGrid}>
        <Image className = {style.face}
          src={"/img/face.png"}
          layout="responsive"
          id = "face"
          width = {50}
          height = {50}

        />
        <Image className = {style.hair}
          src={data[num%2].img}
          layout="responsive"
          id = "hairs"
          width = {50}
          height = {50}
        />
      </div>
      <button className = {style.button} onClick={handleClick}>Hair Style ({num%2})</button>

      {/* TODO: Translate buttons */}
      <button onClick={() => handleFinishAvatar()}>Done</button>
      
    </div>
  );
}

