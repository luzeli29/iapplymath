import menu_options from "@public/text/menu_options"

const getMenu = () => {
    var menu = {
        entre: [],
        drink: [],
        desert: [],
    }

    menu.drink[0] = menu_options.water

    //generate random menu
    shuffleMenuArray(menu_options.entre.length).slice(0,5).map(index => {
        menu.entre[menu.entre.length] = menu_options.entre[index]
    })

    shuffleMenuArray(menu_options.drink.length).slice(0,2).map(index => {
        menu.drink[menu.drink.length] = menu_options.drink[index]
    })

    shuffleMenuArray(menu_options.desert.length).slice(0,3).map(index => {
        menu.desert[menu.desert.length] = menu_options.desert[index]
    })

    return menu
}

export default getMenu 

const shuffleMenuArray = (size) => {
    var arr = Array.from(Array(size).keys())
    for(var i = 0; i < arr.length; i++) {
        const r = Math.floor(Math.random() * arr.length)
        const temp = arr[i]
        arr[i] = arr[r]
        arr[r] = temp
    }

    return arr
}
