export default function RGBToHex(rgb) {

    const white = "#000000"

    if(rgb == undefined) {
        return white
    }

    const r = rgb.r == undefined ? 0 : rgb.r
    const g = rgb.g == undefined ? 0 : rgb.g
    const b = rgb.b == undefined ? 0 : rgb.b

    const rHex = componentToHex(r)
    const gHex = componentToHex(g)
    const bHex = componentToHex(b)

    return "#" + rHex + gHex + bHex;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}