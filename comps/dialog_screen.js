import React, {useState} from 'react';

/*
Things DialogScreen should get passed
- background
- person talking
- dialog
*/
export default function DialogScreen ({stage, scriptId, onEnd}) {

    const [lineNum, setLineNum] = useState(0);

    const nextLine = () => {

    }



    return ( 
         <>
            <p>DIALOG SCREEN</p>
            <p>{stage}</p>
            <p>{scriptId}</p>
            <button onClick={() => onEnd()}>Skip</button>
         </>
      );
 }
  
/* 
should contain...
-background_img
-character talking

Ayu will not have character talking, he/she will be the background image
*/
const stage = {
    aunt_house: {
        
    },
    resturant: {

    },
    ayu: {

    }
}
 