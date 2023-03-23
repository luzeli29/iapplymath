import style from '@styles/restaurant.module.css'
import {useWrapperContext} from '@utils/imports/commonImports'

//order component that shows what the user has ordered
//used both in QuestionLayout and in MenuSelect
function Order({order,budget}) {
    const lang = useWrapperContext().state.lang
    
    if(!order) {
        return (
            <div className="container">
                <p>BAD ORDER</p>
            </div>
        )
    }

    return (
        <div className={style.order_container}>    
            <p className={style.order_text}>Order:</p>
            {order.entree ? <p className={style.order_text}>{order.entree[lang]} - ${order.entree.price}.00</p> : <></>}
            {order.drink ? <p className={style.order_text}>{order.drink[lang]} - ${order.drink.price}.00</p> : <></>}
            {order.dessert ? <p className={style.order_text}>{order.dessert[lang]} - ${order.dessert.price}.00</p> : <></>}
            
            {/* Re-add if you want to show total or keep it hidden
            !budget ? 
            <p>Total - ${order.total}.00</p>
            : 
            order.total <= budget ?<p className="green">Total - ${order.total}.00</p> : <p className="red">Total - ${order.total}.00</p>
            */}
        </div>
    )
}

export default Order