import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from 'react'


const data = [
  {
    id: "1",
    key: "1",
    img: "/hair1.png"
  },
  {
    id: "2",
    key: "2",
    img: "/hair2.png"
  }
];


export default function creator() {
  const [num, setNum] = useState(0)
  function handleClick() {
    setNum(num + 1)
  }

  return (
    <div className={styles.container}>
      <div className={styles.overlapGrid}>
        <Image className = {styles.face}
          src={"/face.png"}
          layout="responsive"
          id = "face"
          width = {50}
          height = {50}

        />
        <Image className = {styles.hair}
          src={data[num%2].img}
          layout="responsive"
          id = "hairs"
          width = {50}
          height = {50}
        />
      </div>
      <button className = {styles.button} onClick={handleClick}>Hair Style ({num%2})</button>

      
    </div>
  );
}

