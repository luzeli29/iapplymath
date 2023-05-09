import { err } from "@utils/debug/log"
import validateDish from "./validateDish"

export default function validateOrder(order) {
    if(!order) {
        err('Validating order failed due to null object given.')
        return false
    }

    if(!order.mainDish) {
        err('Validating order failed due to no main dish object given.')
        return false
    }
    if(!validateDish(order.mainDish)) {
        err('Validating order failed due to main dish failing dish validation.')
        return false
    }

    if(!order.drink) {
        err('Validating order failed due to no drink object given.')
        return false
    }
    if(!validateDish(order.drink)) {
        err('Validating order failed due to drink failing dish validation.')
        return false
    }

    if(!order.dessert) {
        err('Validating order failed due to no dessert object given.')
        return false
    }
    if(!validateDish(order.dessert)) {
        err('Validating order failed due to dessert failing dish validation.')
        return false
    }
    return true
}