import menuOptions from "@public/text/menuOptions"

function getMenu () {

    const menu = {
        mainDish: shuffleMenuArray(menuOptions.mainDish.length, 0).slice(0,5) || [0,1,2,3,4],
        drink: shuffleMenuArray(menuOptions.drink.length, 0).slice(0,3) || [0,1,2],
        dessert: shuffleMenuArray(menuOptions.dessert.length, 0).slice(0,3) || [0,1,2],
    }

    return menu
}

export default getMenu 

const shuffleMenuArray = (size, offset) => {
    var arr = Array.from(Array(size).keys())
    for(var i = 0 + offset; i < arr.length; i++) {
        const r = Math.floor(Math.random() * arr.length + offset)
        const temp = arr[i]
        arr[i] = arr[r]
        arr[r] = temp
    }

    return arr
}
