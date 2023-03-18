import React, {useState} from 'react';
import Image from "next/image";
import { useRouter } from 'next/router'
import {useWrapperContext} from '@utils/imports/commonImports'

//TODO: Finish avatar creator
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
  return (
    <div>
      <h1>Creator</h1>
    </div>
  );
}

