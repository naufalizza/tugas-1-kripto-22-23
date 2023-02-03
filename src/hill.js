import {num2char, char2num} from "./helper.js"
let padding = 'x'


/* fungsi enkripsi menggunakan hill cipher (terbatas pada 26 huruf alfabet)
plaintext bebas
key_m terlebih dahulu dipastikan berukuran kuadratik
*/
export function encrypt_hill(plaintext, key_m){
    const key_len = key_m.length
    if(key_len < 1 || key_len >5){
        return ""
    }
    plaintext = plaintext.replace(/[^A-Za-z]/g, "")
    var ciphertext = ""

    let tambahan = (key_len-(plaintext.length%key_len))%key_len
    for(let j=0;j<tambahan;j++)plaintext+=padding
    //console.log(plaintext)
    //console.log(key_m, key_len)

    var i = 0
    while(i<plaintext.length){
        var x = []
        for(let j=0;j<key_len;j++) x[j] = 0
        
        for(let j=0;j<key_len;j++){
            for(let k=0;k<key_len;k++){
                x[j]+=key_m[j][k]*char2num(plaintext[i+k])
            }
            x[j]%=26
            ciphertext = ciphertext + num2char(x[j])
            //console.log(num2char(x[j]))
        }
        i+=key_len
    }
    //console.log(ciphertext)
    return ciphertext
}

/* fungsi dekripsi hill cipher (terbatas pada 26 huruf alfabet)
plaintext terlebih dahulu dipastikan berukuran kelipatan dari besar matriks
key_m terlebih dahulu dipastikan berukuran kuadratik dan memiliki invers
*/
export function decrypt_hill(ciphertext, key_m){
    const key_len = key_m.length
    if(key_len < 1 || key_len > 5){
        return ""
    }
    
    ciphertext = ciphertext.replace(/[^A-Za-z]/g, "")
    var plaintext = ""
    //console.log(ciphertext)
    //console.log(inv, key_len)

    var i = 0
    while(i<ciphertext.length){
        var x = []
        for(let j=0;j<key_len;j++) x[j] = 0
        
        for(let j=0;j<key_len;j++){
            for(let k=0;k<key_len;k++){
                x[j]+=key_m[j][k]*char2num(ciphertext[i+k])
            }
            x[j]%=26
            plaintext = plaintext + num2char(x[j])
            //console.log(num2char(x[j]))
        }
        i+=key_len
    }
    //console.log(plaintext)
    return plaintext
}