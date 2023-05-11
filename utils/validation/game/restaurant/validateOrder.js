import validateDish from "./validateDish"
import DevErr from "@utils/debug/devErr"

export default function validateOrder(order) {
    if(!order) {
        DevErr('Validating order failed due to null object given.')
        return false
    }

    if(!order.mainDish) {
        DevErr('Validating order failed due to no main dish object given.')
        return false
    }
    if(!validateDish(order.mainDish)) {
        DevErr('Validating order failed due to main dish failing dish validation.')
        return false
    }

    if(!order.drink) {
        DevErr('Validating order failed due to no drink object given.')
        return false
    }
    if(!validateDish(order.drink)) {
        DevErr('Validating order failed due to drink failing dish validation.')
        return false
    }

    if(!order.dessert) {
        DevErr('Validating order failed due to no dessert object given.')
        return false
    }
    if(!validateDish(order.dessert)) {
        DevErr('Validating order failed due to dessert failing dish validation.')
        return false
    }
    return true
}