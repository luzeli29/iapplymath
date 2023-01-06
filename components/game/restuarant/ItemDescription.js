import style from '@styles/restaurant.module.css'
import {useWrapperContext} from '@common_imports'

//Item description shown when player hovers over button
const ItemDescription = ({hovering,budget}) => {
    const lang = useWrapperContext().state.lang
    return (
        <div>
            <p>{lang =="en" ? "Budget - $" + budget+ ".00" : "Presupuesto - $" + budget+ ".00"}</p>
            {hovering == "" ? 
            <></>
                :
            <>
                <p className={style.desc_font}>{hovering[lang]}</p>
                <p className={style.desc_font}>${hovering.price}.00</p>
                <div className={style.desc_img_container}>
                    <img 
                        src={"/img/food/" + hovering.img} 
                        className={style.ms_order_button_img}/>
                </div>
            </>}
        </div>
    )
}

export default ItemDescription