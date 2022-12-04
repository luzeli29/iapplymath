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

const menu_options = {

    entre: [
        {
            type: "entree",
            en: "Huevos Rancheros",
            es: "Huevos Rancheros",
            img: "huevos_rancheros.png",
            price: 8,
        },{
            type: "entree",
            en: "Enchiladas",
            es: "Enchiladas",
            img: "burritos.png",
            price: 9,
        },{
            type: "entree",
            en: "Chicken and Rice",
            es: "Arroz con pollo",
            img: "rice_with_chicken.png",
            price: 7,
        },{
            type: "entree",
            en: "Grilled Corn",
            es: "Maíz a la Parrilla",
            img: "grilled_corn.png",
            price: 5
        },{
            type: "entree",
            en: "Salad",
            es: "Ensalada",
            img: "ceasar_salad.png",
            price: 6,

        },{
            type: "entree",
            en: "Mangu",
            es: "Mangu",
            img: "mangu.png",
            price: 9,
        },{
            type: "entree",
            en: "“Baleadas",
            es: "“Baleadas",
            img: "baleadas.png",
            price: 7,
        },{
            type: "entree",
            en: "Fried Fish",
            es: "Pescado Frito",
            img: "fried_fish.png",
            price: 9,
        },{
            type: "entree",
            en: "Quinoa Salad",
            es: "Ensalada De Quinua",
            img: "quinoa_salad.png",
            price: 7
        },{
            type: "entree",
            en: "Empanadas",
            es: "Empanadas",
            img: "empanadas.png",
            price: 6,

        },{
            type: "entree",
            en: "Arepa",
            es: "Arepa ",
            img: "arepa.png",
            price: 7,

        },{
            type: "entree",
            en: "Tamale",
            es: "Tamale",
            img: "tamale.png",
            price: 6,

        },{
            type: "entree",
            en: "Arroz Chaufa",
            es: "Arroz Chaufa",
            img: "arroz_chaufa.png",
            price: 15,

        },{
            type: "entree",
            en: "Lentil Soup",
            es: "Sopa de Lentejas",
            img: "lentil_soup.png",
            price: 7,

        }
    ],
    drink: [
        {
            type: "drink",
            en: "Mango Pineapple Juice",
            es: "Jugo de Mango y Piña",
            img: "mango_pineapple_frescas.png",

            price: 3,
        },{
            type: "drink",
            en: "Lemonade",
            es: "Limonada",
            img: "lavendar_lemonade.png",
            price: 2,
        },{
            type: "drink",
            en: "Coconut Lime Aguas Fresca",
            es: "Aguas Frescas de Coco y Lima",
            img: "aguas_frescas_coconut_lime.png",
            price: 3,
        },{
            type: "drink",
            en: "Milkshake",
            es: "Malteada",
            img: "milkshake.png",
            price: 5,
        },{
            type: "drink",
            en: "Orange Juice",
            es: "Zumo de Naranja",
            img: "orange_juice.png",
            price: 4,
        }
    ],
    desert: [
        {
            type: "desert",
            en: "Natilla",
            es: "Natilla",
            img: "natilla.png",
            price: 2,
        },{
            type: "desert",
            en: "Fruit Salad",
            es: "Ensalada de Frutas",
            img: "fruit_salad.png",

            price: 3
        },{
            type: "desert",
            en: "Brownie",
            es: "Postre de Chocolate",
            img: "brownie.png",
            price: 5,
        },{
            type: "desert",
            en: "Coconut Icecream",
            es: "Helado de Coco",
            img: "coconut_icecream.png",
            price: 3,
        },{
            type: "desert",
            en: "Flan",
            es: "Flan",
            img: "flan.png",
            price: 2,
        },{
            type: "desert",
            en: "Tres Leches",
            es: "Tres Leches",
            img: "tres_leches.png",
            price: 2,
        },{
            type: "desert",
            en: "Churros",
            es: "Churros",
            img: "churros.png",
            price: 3,
        }
    ],
    water: {
        type: "drink",
        en: "Water",
        es: "Agua",
        img: "water.png",
        price: 0,
    },

}