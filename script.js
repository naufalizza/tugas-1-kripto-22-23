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
function decrypt_vigenere(c,k){
    c = c.replace(' ', "")
    console.log(c.length)
    console.log(k.length)
    let p = "";
    for (let c_idx=0; c_idx<c.length; c_idx++){
        const k_idx = c_idx%k.length;
        const current_c_num = char2num(c[c_idx]);
        const current_k_num = char2num(k[k_idx]);
        const current_p_num = (current_c_num-current_k_num+26)%26
        p += num2char(current_p_num);
        console.log(c[c_idx], "><", k[k_idx], "==>", num2char(current_p_num))
    }
    return p
}


let c = encrypt_vigenere(plaintext, key)
console.log(c)
console.log(decrypt_vigenere(c, key))

