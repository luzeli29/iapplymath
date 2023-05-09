import { getText } from "@commonImports"
import { useState } from "react"
import Tooltip from "./accessibility/tooltip"
import ClickableIcon from "./clickableIcon"

export default function IconGroup({lang,icons,selectedIcon, selectIcon,getContentFromValue,width,height}) {
    const [pageNumber, setPageNumber] = useState(0)
    
    const _lang = lang ? lang : 'en'
    if(icons == undefined || !icons) return <></>
    if(getContentFromValue == undefined || !getContentFromValue) return <></>


    function handleSelect(key) {
        if(selectIcon) {
            selectIcon(key)
        }
    }

    function nextPage() {
        setPageNumber(pageNumber+1)
    }

    function prevPage() {
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
            gridGap: '20px',
            height: '100%',
          };
          
          return (
            <div style={containerStyle}>
              {keyArr.map((key, index) => (
                <div key={index} className="mx-auto">
                    <Tooltip text={valueArr[index].name ? valueArr[index].name[lang] : ''}>
                        <IconButton keyCode={key} value={valueArr[index]}/>
                    </Tooltip>
                </div>
              ))}
            </div>
          );
    }

    const IconButton = ({keyCode,value}) => {
        const isSelected = keyCode == selectedIcon && selectedIcon != undefined
        return (
                getContentFromValue(keyCode,value)
        )
    }

    return (
        <div className="row">

            <div className="col-1 mx-auto">
                {pageNumber != 0 ? 
                <button cl onClick={() => prevPage()}>{'<'}</button>
                :
                    null
                }
            </div>

            <div className="col-10">
                <CurrentIconView/>
            </div>
            <div className="col-1 mx-auto">
                {pageNumber < maxPage - 1 ? 
                <button onClick={() => nextPage()}>{'>'}</button>
                :
                    null
                }
            </div>
        </div>
    )
}