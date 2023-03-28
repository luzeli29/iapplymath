import { err } from "@utils/debug/log"
import validateDish from "./validateDish"

export default function validateOrder(order) {
    if(!order) {
        err('Validating order failed due to null object given.')
        return false
    }

    if(!order.entree) {
        err('Validating order failed due to no entree object given.')
        return false
    }
    if(!validateDish(order.entree)) {
        err('Validating order failed due to entree failing dish validation.')
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