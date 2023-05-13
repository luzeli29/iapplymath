import React from 'react'
import { Calculator } from 'react-mac-calculator'
import Popup from 'reactjs-popup';
import Image from 'next/image'

export const BasicCalculator = () => {
  return (
    <Popup trigger={
      <button ishovering={true} style={{marginTop:"10px", marginLeft:"10px"}}> 
          <Image width={30} height={50} src={"/img/other/calcicon.png"} alt={"calculator"}/>
      </button>}
      closeOnDocumentClick={false} 
      position="right center" offsetX={150} offsetY={-100}>

      <div className="app">
          <Calculator/>
      </div>
  </Popup>
  )
}
