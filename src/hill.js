function char2num(c){
    return c.toLowerCase().charCodeAt(0)-97
}
function num2char(n){
    return String.fromCharCode(97+n).toUpperCase()
}

let plaintext = "Azizah, gapake h ramadhani"
let key_m = [17,17,5,21,18,21,2,2,19]
let padding = 'x'

//MASIH DUMMY, HABIS KELAR BIKIN SERVERNYA BARU BIKIN MODULENYA
function inv_matriks(){
    return [4,9,15,15,17,6,24,0,17]
}

/* fungsi enkripsi menggunakan hill cipher (terbatas pada 26 huruf alfabet)
plaintext bebas
key_m terlebih dahulu dipastikan berukuran kuadratik
*/
function encrypt_hill(plaintext, key_m){
    //perhitungan besar matriks
    const key_len = Math.sqrt(key_m.length)
    if((key_m.length) != key_len*key_len){
        return ""
    }
    
    plaintext = plaintext.replace(/[^A-Za-z0-9]/g, "")
    var ciphertext = ""

    //penambahan karakter 'x' agar ukuran plainteks habis dibagi key_len
    let tambahan = (key_len-(plaintext.length%key_len))%key_len
    for(let j=0;j<tambahan;j++)plaintext+=padding
    //console.log(plaintext)
    //console.log(key_m, key_len)

    //fungsi enkripsi
    var i = 0
    while(i<plaintext.length){
        var x = []
        //inisiasi array
        for(let j=0;j<key_len;j++) x[j] = 0
        
        //kalkulasi kriptogram
        for(let j=0;j<key_len;j++){
            for(let k=0;k<key_len;k++){
                x[j]+=key_m[j*key_len+k]*char2num(plaintext[i+k])
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
function decrypt_hill(ciphertext, key_m){
    //perhitungan besar matriks
    const key_len = Math.sqrt(key_m.length)
    if((key_m.length) != key_len*key_len){
        return ""
    }
    //PERHITUNGAN MATRIKS MASIH DUMMY
    const inv = inv_matriks()
    
    ciphertext = ciphertext.replace(/[^A-Za-z0-9]/g, "")
    var plaintext = ""

    //console.log(ciphertext)
    //console.log(inv, key_len)

    //fungsi enkripsi
    var i = 0
    while(i<ciphertext.length){
        var x = []
        //inisiasi array
        for(let j=0;j<key_len;j++) x[j] = 0
        
        //kalkulasi kriptogram
        for(let j=0;j<key_len;j++){
            for(let k=0;k<key_len;k++){
                x[j]+=inv[j*key_len+k]*char2num(ciphertext[i+k])
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

//console.log(encrypt_hill(plaintext, key_m))
//console.log(decrypt_hill("XUUSWBVZLIESSLWLDDCEBSZF", key_m))