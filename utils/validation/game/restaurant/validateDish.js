import { err, log } from "@utils/debug/log"
import validateText from "@utils/validation/validateText"

export default function validateDish(dish) {
    if(!dish) {
        err('Validating dish failed due to null object given.')
        return false
    }

    if(!validateText(dish)) {
        err('Validating dish text failed.')
        return false
    }

    if(dish.price == undefined) {
        err('Dish has no price, changing price to 0.')
        dish.price = 0
    }

    return true
}