import style from '@styles/restaurant.module.css'
import { err } from '@utils/debug/log'

//Item description shown when player hovers over button
const ItemDescription = ({lang,hoveredDish,budget}) => {
    if(!lang) {
        lang = "en"
        err('"lang" not defined.')
    }

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