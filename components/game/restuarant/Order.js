import style from '@styles/restaurant.module.css'
import {useWrapperContext} from '@common_imports'

//order component that shows what the user has ordered
//used both in QuestionLayout and in MenuSelect
function Order({order,budget}) {
    const lang = useWrapperContext().state.lang
    if(order ==  null) {
        return (
            <div className="container">
                <p>BAD ORDER</p>
            </div>
        )
    }
    return (
        <div className={style.order_container}>    
            <p className={style.order_text}>Order:</p>
            {order.dishes.entree[lang] ? <p className={style.order_text}>{order.dishes.entree[lang]} - ${order.dishes.entree.price}.00</p> : <></>}
            {order.dishes.drink[lang] ? <p className={style.order_text}>{order.dishes.drink[lang]} - ${order.dishes.drink.price}.00</p> : <></>}
            {order.dishes.desert[lang] ? <p className={style.order_text}>{order.dishes.desert[lang]} - ${order.dishes.desert.price}.00</p> : <></>}
            
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