import getText from "@utils/text/getText"
import { useState } from "react"
import Tooltip from "./accessibility/tooltip"
import ClickableIcon from "./clickableIcon"
import styles from "@styles/aunt_house.module.css";

export default function IconGroup({lang,icons,selectedIcon, selectIcon,getContentFromValue,width,height,disableToolTip}) {
    const [pageNumber, setPageNumber] = useState(0)
    lang = lang ? lang : 'en'
    if(icons == undefined || !icons) return <></>
    if(getContentFromValue == undefined || !getContentFromValue) return <></>


    const handleSelect = (key) => {
        if(selectIcon) {
            selectIcon(key)
        }
    }

    const nextPage = () => {
        setPageNumber(pageNumber+1)
    }

    const prevPage = () => {
        setPageNumber(pageNumber-1)
    }

    const maxWidth = width ? width : 5
    const maxHeigh = height ? height : 5
    const iconCount = Object.keys(icons).length
    const maxPage = Math.ceil(iconCount / (maxWidth*maxHeigh))
    const iconKeys = Object.keys(icons)

    const CurrentIconView = () => {
        const startIndex = pageNumber * maxWidth * maxHeigh 
        const endIndex = startIndex + (maxWidth * maxHeigh)
        const keyArr = iconKeys.slice(startIndex,endIndex)
        const valueArr = keyArr.map((key) => icons[key])

        return (
            <IconGrid keyArr={keyArr} valueArr={valueArr}/>
        )
    }

    const IconGrid = ({keyArr,valueArr}) => {
        const containerStyle = {
            display: 'grid',
            gridTemplateColumns: `repeat(${maxWidth}, 1fr)`,
            gridTemplateRows: `repeat(${maxHeigh}, 1fr)`,
            gridGap: '2px'

        
          };
          
          return (
            <div style={containerStyle}>
              {keyArr.map((key, index) => (
                <div key={index} className="mx-auto">
                    {disableToolTip ? 
                    <IconButton keyCode={key} value={valueArr[index]}/>
                    :
                    <Tooltip type={true} text={valueArr[index].name ? valueArr[index].name[lang] : ''}>
                        <IconButton keyCode={key} value={valueArr[index]}/>
                    </Tooltip>
                    }
                    
                </div>
              ))}
            </div>
          );
    }

    const IconButton = ({keyCode,value}) => {
        const isSelected = keyCode == selectedIcon && selectedIcon != undefined
        return (
            <div className="mx-auto">
                {getContentFromValue(keyCode,value)}
            </div>
        )
    }

    return (
        <div className="row">

            <div className="col-1 mx-auto">
                {pageNumber != 0 ? 
                <button className={styles.next_previous_button} onClick={() => prevPage()}>{'<'}</button>
                :
                    null
                }
            </div>

            <div className="col-10 mx-auto">
                <CurrentIconView/>
            </div>
            <div className="col-1 mx-auto">
                {pageNumber < maxPage - 1 ? 
                <button className={styles.next_previous_button} onClick={() => nextPage()}>{'>'}</button>
                :
                    null
                }
            </div>
        </div>
    )
}