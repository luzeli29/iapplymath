import menu_options from "@public/text/menu_options"

export default function getMenuItem(menuItemCode) { 
    if(!menuItemCode) {
        return ''
    }

    const splitCode = menuItemCode.split("_");
    return menu_options[splitCode[0]][splitCode[1]];
}
