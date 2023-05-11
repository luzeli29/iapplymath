import DevErr from "@utils/debug/devErr"
import validateText from "@utils/validation/validateText"

export default function validateDish(dish) {
    if(!dish) {
        DevErr('Validating dish failed due to null object given.')
        return false
    }

    if(!validateText(dish)) {
        DevErr('Validating dish text failed.')
        return false
    }

    if(dish.price == undefined) {
        DevErr('Dish has no price, changing price to 0.')
        dish.price = 0
    }

    return true
}