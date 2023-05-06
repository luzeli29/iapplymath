import menuOptions from "@public/text/menuOptions"

function getMenu () {
    const { mainDish, drink, dessert } = menuOptions
    const drinks = shuffleMenuArray(drink.length, 0)
    drinks.splice(drinks.indexOf(0), 1)

    const menu = {
        mainDish: shuffleMenuArray(mainDish.length, 0).slice(0,5) || [0,1,2,3,4],
        drink: shuffleArray([0, ...drinks.slice(0,2)]) || [0,1,2],
        dessert: shuffleMenuArray(dessert.length, 0).slice(0,3) || [0,1,2],
    }

    return menu
}

export default getMenu 

const shuffleArray = (arr) => {
for (let i = arr.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
}
return arr;
}

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
