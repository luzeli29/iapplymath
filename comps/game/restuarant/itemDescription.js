import style from '@styles/restaurant.module.css'
import {useWrapperContext} from '@utils/imports/commonImports'

//Item description shown when player hovers over button
const ItemDescription = ({hoveredDish,budget}) => {
    const lang = useWrapperContext().state.lang
    const dish = hoveredDish
    return (
        <div>
            <p>{lang =="en" ? "Budget - $" + budget+ ".00" : "Presupuesto - $" + budget+ ".00"}</p>
            {dish ? 
            <>
                <p className={style.desc_font}>{dish[lang]}</p>
                <p className={style.desc_font}>${dish.price}.00</p>
                <div className={style.desc_img_container}>
                    <img 
                        src={"/img/food/" + dish.img} 
                        className={style.ms_order_button_img}/>
                </div>
            </>
                :
            <>
            </>}
        </div>
    )
}

export default ItemDescription