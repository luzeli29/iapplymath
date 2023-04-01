import { useUserContext } from '@hooks/siteContext/useUserContext'
import style from '@styles/restaurant.module.css'
import { err } from '@utils/debug/log'
import menuOptions from "@public/text/menuOptions"
import translations from "@translations";

//order component that shows what the user has ordered
//used both in QuestionLayout and in MenuSelect
function Order({order, budget}) {
    const {user,settings,loading, error} = useUserContext()
    const isLoggedIn = user.loggedIn    
    if(loading) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>
    const lang = settings.lang
    return (
        <div className={style.order_container}>    
            <p className={style.order_text}>{translations.order_2[lang]}</p>
            {order.entree != -1 ? <p className={style.order_text}>{menuOptions.entree[order.entree][lang]} - ${menuOptions.entree[order.entree].price}.00</p> : <></>}
            {order.drink != -1 ? <p className={style.order_text}>{menuOptions.drink[order.drink][lang]} - ${menuOptions.drink[order.drink].price}.00</p> : <></>}
            {order.dessert != -1 ? <p className={style.order_text}>{menuOptions.dessert[order.dessert][lang]} - ${menuOptions.dessert[order.dessert].price}.00</p> : <></>}
            
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