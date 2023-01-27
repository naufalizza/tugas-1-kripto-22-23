//import {num2char, char2num} from './helper.js';
function char2num(c){
    return c.toLowerCase().charCodeAt(0)-97
}
function num2char(n){
    return String.fromCharCode(97+n).toUpperCase()
}

let plaintext = "Azizah gapake h ramadhani"
let key = "jijah"


/* fungsi enkripsi menggunakan auto key
plaintext bebas dan key bebas  
*/
function encrypt_auto_key(plaintext, key){
    plaintext = plaintext.replace(/[^A-Za-z0-9]/g, "")
    var ciphertext = ""
    //console.log(plaintext)
    //console.log(key)
    for (let i=0; i<(plaintext.length); i++){
        const p_num = char2num(plaintext[i])
        const k_num = char2num(key[i])
        const c_num = (p_num+k_num)%26
        //console.log(p_num, k_num, c_num)
        ciphertext = ciphertext + num2char(c_num)
        key = key + plaintext[i]
    }
    //console.log(ciphertext)
    return ciphertext
}

/* fungsi dekripsi auto key vigenere cipher
plaintext bebas dan key bebas  
*/
function decrypt_auto_key(ciphertext, key){
    ciphertext = ciphertext.replace(/[^A-Za-z0-9]/g, "")
    var plaintext = ""
    //console.log(ciphertext)
    //console.log(key)
    for (let i=0; i<(ciphertext.length); i++){
        const c_num = char2num(ciphertext[i])
        const k_num = char2num(key[i])
        const p_num = (c_num-k_num+26)%26
        //console.log(c_num, k_num, p_num)
        plaintext = plaintext + num2char(p_num)
        key = key + plaintext[i]
    }
    //console.log(plaintext)
    return plaintext
}

//encrypt_auto_key(plaintext,key)
//decrypt_auto_key("JHRZHHFIOARKHGAWEKYAZI",key)