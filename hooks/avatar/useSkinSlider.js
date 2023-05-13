import DevLog from '@utils/debug/devLog';
import RGBToHex from '@utils/rgbToHex';
import React, { useState } from 'react'

export default function useSkinSlider() {

    const [skinToneMag, setSkinToneMag] = useState(0);

    const darkestSkinTone = {
        r: 53,
        g: 38,
        b: 38
    }
    const darkestSkinToneHex = RGBToHex(darkestSkinTone)

    const lighestSkinTone = {
        r: 249,
        g: 205,
        b: 196
    }
    const lighestSkinToneHex = RGBToHex(lighestSkinTone)

    function calculateSkinToneHex() {
        const mag = skinToneMag / Math.pow(100, 1);
        const skinVector = calculateSkintoneVector()
        const  skinTone = {
            r: Math.floor(darkestSkinTone.r + (skinVector.r * mag)),
            g: Math.floor(darkestSkinTone.g + (skinVector.g * mag)),
            b: Math.floor(darkestSkinTone.b + (skinVector.b * mag)),
        }
        const skinToneHex = RGBToHex(skinTone)
        return skinToneHex;
    }

    function calculateSkintoneVector () {
        const skinToneVector = {
            r: lighestSkinTone.r - darkestSkinTone.r,
            g: lighestSkinTone.g - darkestSkinTone.g,
            b: lighestSkinTone.b - darkestSkinTone.b,
        }
        return skinToneVector
    }

    const renderSlider = () => {
        DevLog(lighestSkinToneHex)
        return (
        <div className='container'>
        <div className='row'>
            <h5>Skin Tone</h5>    
        </div>
        <div className='row justify-content-md-center'>
            <div className='col-1 rounded-circle border' style={{backgroundColor: darkestSkinToneHex}}>
            </div>
            <div className='col-9 '>
                <input
                        type="range"
                        min="0"
                        max="100"
                        value={skinToneMag}
                        onChange={handleSliderChange}
                        className={"slider"}
                    />
            </div>
            <div className='col-1 rounded-circle border' style={{backgroundColor: lighestSkinToneHex}}>

            </div>
        </div>
        </div>
        )
    }

    function handleSliderChange(event) {
        setSkinToneMag(event.target.value);
    }
    


    return {
        skinToneHex: calculateSkinToneHex(),
        SkinToneSlider: () => renderSlider()
    }
}

const skinVector = {
    r: 196,
    g: 167,
    b: 158
}
