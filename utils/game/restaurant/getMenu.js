import menu_options from "@public/text/menuOptions"

function getMenu () {

    var menu = {
        entree: [],
        drink: [],
        dessert: [],
    }

    //generate random menu
    shuffleMenuArray(menu_options.entree.length, 0).slice(0,5).map(index => {
        menu.entree[menu.entree.length] = menu_options.entree[index]
    })

    shuffleMenuArray(menu_options.drink.length, 1).slice(0,3).map(index => {
        menu.drink[menu.drink.length] = menu_options.drink[index]
    })

    shuffleMenuArray(menu_options.dessert.length, 0).slice(0,3).map(index => {
        menu.dessert[menu.dessert.length] = menu_options.dessert[index]
    })
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
