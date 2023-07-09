import { useUserContext } from '@hooks/siteContext/useUserContext'
import style from '@styles/restaurant.module.css'
import { err } from '@utils/debug/devLog'
import menuOptions from "@public/text/menuOptions"
import translations from "@translations";
import getText from '@utils/text/getText';

//order component that shows what the user has ordered
//used both in QuestionLayout and in MenuSelect
function Order({order, budget, handleOrderMenu = null}) {
    const {user,settings,loading, error} = useUserContext()
    const isLoggedIn = user.loggedIn    
    if(loading) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>
    const lang = settings.lang

    const mdText = order.mainDishIndex >= 0 ? menuOptions.mainDish[order.mainDishIndex][lang] + ' - $ ' + menuOptions.mainDish[order.mainDishIndex].price + '.00' : ''
    const drinkText = order.drinkIndex >= 0 ? menuOptions.drink[order.drinkIndex][lang] + ' - $ ' + menuOptions.drink[order.drinkIndex].price + '.00' : ''
    const dessertText = order.dessertIndex >= 0 ? menuOptions.dessert[order.dessertIndex][lang] + ' - $ ' + menuOptions.dessert[order.dessertIndex].price + '.00' : ''

    return (
        <div>        
            <div className={style.order_container}>    
                <p className={style.order_text}>{translations.order_2[lang]}</p>
                <p className={style.order_text}> {getText('mainDish',lang) + ' - ' + mdText}</p>
                <p className={style.order_text}> {getText('drink',lang) + ' - ' + drinkText}</p>
                <p className={style.order_text}> {getText('dessert',lang) + ' - ' + dessertText}</p>

                
                {/* Re-add if you want to show total or keep it hidden
                !budget ? 
                <p>Total - ${order.total}.00</p>
                : 
                order.total <= budget ?<p className="green">Total - ${order.total}.00</p> : <p className="red">Total - ${order.total}.00</p>
                */}
            </div>
            {
            handleOrderMenu && <div className='row'>
                <button className={style.ms_clear_button} onClick={handleOrderMenu}>Clear Order</button>
            </div>
            }
            
        </div>
    )
}

export default Order