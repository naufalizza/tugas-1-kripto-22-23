export function char2num(c){
    return c.toLowerCase().charCodeAt(0)-97
}
export function num2char(n){
    return String.fromCharCode(97+n).toUpperCase()
}
export function modulo_invers(x, mod){
    var ret = -1
    for(let i=1;i<mod;i++){
        if((i*x)%mod==1){
            ret = i
            break
        }
    }
    return ret
}

//Fungsi FPB
//x dan y sudah dipastikan bernilai positif
function gcd(x, y){
    while(y>0) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x
}

//Fungsi menentukan dua buah bilangan adalah relatif prima atau bukan
export function relatif_prima(x, y){
    if(x<=0 || y<=0)return false
    else if(gcd(x,y)==1)return true
    else return false
}