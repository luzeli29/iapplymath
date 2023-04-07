import { getText } from "@commonImports"
import { useState } from "react"
import Tooltip from "./accessibility/tooltip"
import ClickableIcon from "./clickableIcon"

export default function IconGroup({lang,icons,selectedIcon, selectIcon,getContentFromValue,width,height}) {
    const [pageNumber, setPageNumber] = useState(0)
    
    const _lang = lang ? lang : 'en'
    if(icons == undefined || !icons) return <></>
    if(selectIcon == undefined || !selectIcon) return <></>
    if(getContentFromValue == undefined || !getContentFromValue) return <></>

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
        const startIndex = pageNumber * width * height 
        const endIndex = startIndex + (width * height)
        const keyArr = iconKeys.slice(startIndex,endIndex)
        const valueArr = keyArr.map((key) => icons[key])

        return (
            <IconGrid keyArr={keyArr} valueArr={valueArr}/>
        )
    }

    const IconGrid = ({keyArr,valueArr}) => {
        const containerStyle = {
            display: 'grid',
            gridTemplateColumns: `repeat(${width}, 1fr)`,
            gridTemplateRows: `repeat(${height}, 1fr)`,
            gridGap: '20px',
            height: '100%',
          };
        
          return (
            <div style={containerStyle}>
              {keyArr.map((key, index) => (
                <div key={index} className="mx-auto">
                    <Tooltip text={valueArr[index].name[_lang]}>
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
            <ClickableIcon selected={isSelected} onClick={() => selectIcon(keyCode)}> 
                {getContentFromValue(value)}
            </ClickableIcon>
        )
    }

    return (
        <div className="row">

            <div className="col-2">
                {pageNumber != 0 ? 
                <button cl onClick={() => prevPage()}>{getText('prev_page',_lang)}</button>
                :
                    null
                }
            </div>

            <div className="col-8">
                <CurrentIconView/>
            </div>
            <div className="col-2">
                {pageNumber < maxPage - 1 ? 
                <button onClick={() => nextPage()}>{getText('next_page',_lang)}</button>
                :
                    null
                }
            </div>
        </div>
    )
}