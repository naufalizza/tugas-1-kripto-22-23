import {num2char, char2num} from "./helper.js"

/* fungsi enkripsi menggunakan auto key
plaintext bebas dan key bebas  
*/
export function encrypt_auto_key(plaintext, key){
    plaintext = plaintext.replace(/[^A-Za-z]/g, "")
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
export function decrypt_auto_key(ciphertext, key){
    ciphertext = ciphertext.replace(/[^A-Za-z]/g, "")
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