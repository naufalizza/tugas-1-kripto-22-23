export function char2num(c){
    return c.toLowerCase().charCodeAt(0)-97
}
export function num2char(n){
    return String.fromCharCode(97+n).toUpperCase()
}