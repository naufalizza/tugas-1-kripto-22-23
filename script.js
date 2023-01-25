// let plaintext = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG"
// const key = "QWERTY"
let plaintext = "this plain text"
const key = "sony"

function char2num(c){
    return c.toLowerCase().charCodeAt(0)-97
}
function num2char(n){
    return String.fromCharCode(97+n).toUpperCase()
}

function encrypt_vigenere(p,k){
    p = p.replace(/[^A-Za-z0-9]/g, "")
    console.log(p.length)
    console.log(k.length)
    let c = "";
    for (let p_idx=0; p_idx<p.length; p_idx++){
        const k_idx = p_idx%k.length;
        const current_p_num = char2num(p[p_idx]);
        const current_k_num = char2num(k[k_idx]);
        const current_c_num = (current_p_num+current_k_num)%26
        c += num2char(current_c_num);
        console.log(p[p_idx], "><", k[k_idx], "==>", num2char(current_c_num))
    }
    return c
}

let c = encrypt_vigenere(plaintext, key)
console.log(c)

