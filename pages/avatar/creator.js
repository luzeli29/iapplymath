import React, {useState} from 'react';
import Image from "next/image";
import { useRouter } from 'next/router'
import {useWrapperContext} from '@utils/imports/commonImports'
import useSkinSlider from '@hooks/avatar/useSkinSlider';

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
  const {skinToneHex, SkinToneSlider} = useSkinSlider()


  return (
    <div className='text-center'>
      <h3>Create Your Avatar</h3>
      <div className='row'>
        <div className='col-1 '></div>
        <div className='col-6 '>
          {/* THIS IS WHERE THE AVATAR PREVIEW SHOULD BE*/}
          <div className='p-5 border' style={{backgroundColor: skinToneHex}} >
          </div>
        </div>
        <div className='col-4 border'>
          <div className='row pt-4'>
            <SkinToneSlider/>

          </div>
        </div>
        <div className='col-1 '></div>
      </div>
    </div>
  );
}

