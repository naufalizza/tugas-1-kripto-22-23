function char2num(c){
    return c.toLowerCase().charCodeAt(0)-97
}
function num2char(n){
    return String.fromCharCode(97+n).toUpperCase()
}

function modulo_invers(x, mod){
    var ret = -1
    for(let i=1;i<mod;i++){
        if((i*x)%mod==1){
            ret = i
            break
        }
    }
    return ret
}

let plaintext = "Azizah, gapake h ramadhani"
let key_m =  3
let key_b = 23

/* fungsi enkripsi menggunakan affine (terbatas pada 26 huruf alfabet)
plaintext bebas
key_m terlebih dahulu dipastikan relatif prima terhadap 26
key_b bebas
*/
function encrypt_affine(plaintext, key_m, key_b){
    plaintext = plaintext.replace(/[^A-Za-z0-9]/g, "")
    var ciphertext = ""
    //console.log(plaintext)
    //console.log(key_m, key_b)
    for (let i=0; i<(plaintext.length); i++){
        const p_num = char2num(plaintext[i])
        const c_num = (p_num*key_m+key_b)%26
        //console.log(p_num, c_num)
        ciphertext = ciphertext + num2char(c_num)
    }
    //console.log(ciphertext)
    return ciphertext
}

/* fungsi dekripsi affine cipher (terbatas pada 26 huruf alfabet)
plaintext bebas
key_m terlebih dahulu dipastikan relatif prima terhadap 26
key_b bebas 
*/
function decrypt_affine(ciphertext, key_m, key_b){
    ciphertext = ciphertext.replace(/[^A-Za-z0-9]/g, "")
    var plaintext = ""
    var inv = modulo_invers(key_m, 26)
    if(inv == -1){
        return plaintext
    }
    //console.log(ciphertext)
    //console.log(key_m, key_b, inv)
    for (let i=0; i<(ciphertext.length); i++){
        const c_num = char2num(ciphertext[i])
        const p_num = (((c_num - key_b)*inv)%26 + 26)%26
        //console.log(c_num, p_num)
        plaintext = plaintext + num2char(p_num)
    }
    //console.log(plaintext)
    return plaintext
}

//console.log(modulo_invers(255,26))
//console.log(encrypt_affine(plaintext, key_m, key_b))
//console.log(decrypt_affine("XUVUXSPXQXBJSWXHXGSXKV", key_m, key_b))

