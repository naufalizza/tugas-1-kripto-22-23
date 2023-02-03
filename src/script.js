import {num2char, char2num} from "./helper.js"
// let plaintext = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG"
// const key = "QWERTY"
let plaintext = "temuui ibu nanti malammxm"
const key = "soonjy"


export function encrypt_vigenere(p,k){
    p = p.replace(/[^A-Za-z0-9]/g, "")
    // console.log(p.length)
    // console.log(k.length)
    let c = "";
    for (let p_idx=0; p_idx<p.length; p_idx++){
        const k_idx = p_idx%k.length;
        const current_p_num = char2num(p[p_idx]);
        const current_k_num = char2num(k[k_idx]);
        const current_c_num = (current_p_num+current_k_num)%26
        c += num2char(current_c_num);
        // console.log(p[p_idx], "><", k[k_idx], "==>", num2char(current_c_num))
    }
    return c
}
export function decrypt_vigenere(c,k){
    c = c.replace(' ', "")
    // console.log(c.length)
    // console.log(k.length)
    let p = "";
    for (let c_idx=0; c_idx<c.length; c_idx++){
        const k_idx = c_idx%k.length;
        const current_c_num = char2num(c[c_idx]);
        const current_k_num = char2num(k[k_idx]);
        const current_p_num = (current_c_num-current_k_num+26)%26
        p += num2char(current_p_num);
        // console.log(c[c_idx], "><", k[k_idx], "==>", num2char(current_p_num))
    }
    return p
}

function generate_playfair_key_table(k){
    k = [... new Set(k.toUpperCase().replace(/[J]/g, "").split(""))]
    // console.log("k =", k)
    let key_chars = "ABCDEFGHIKLMNOPQRSTUVWXYZ".split("");
    // console.log(key_chars)
    let key_table = Array(5).fill(Array(5).fill(null));
    for (let i = 0; i<5; i++){
        let row_i = []
        for (let j = 0; j<5; j++){
            if (k.length > 0){
                const curr_key = k.splice(0,1)[0]
                const curr_key_idx = key_chars.indexOf(curr_key)
                key_chars.splice(curr_key_idx,1)
                row_i.push(curr_key)
            } else {
                const curr_key = key_chars.splice(0,1)[0]
                row_i.push(curr_key)
            }
        }
        key_table[i] = row_i
    }
    return key_table
}

function generate_bigram(t, uncommon_letter){
    let bigram_t = t[0]
    for (let i = 1; i<t.length; i++){
        var prev = t[i-1]
        var curr = t[i]
        if (prev == curr && prev != uncommon_letter){
            t = [t.slice(0,i), uncommon_letter, t.slice(i)].join('')
        }
        bigram_t += t[i]
        if (i%2 == 1){
            bigram_t += " "
        } 
    }
    if (bigram_t[bigram_t.length-1] == " "){
        bigram_t = bigram_t.slice(0,bigram_t.length-1)
    }
    if (t.length%2 == 1){
        t+=uncommon_letter
        bigram_t+=uncommon_letter
    }
    bigram_t = bigram_t.split(" ")
    return bigram_t
}
export function encrypt_playfair(p,k){
    const UNCOMMON_LETTER = "X"
    p = p.replace(/[^A-Za-z0-9]/g, "").toUpperCase().replace(/[J]/g, "I")
    const key_table = generate_playfair_key_table(k)
    // console.log("KEY TABLE =",key_table)
    // console.log(p)
    const bigram_p = generate_bigram(p, UNCOMMON_LETTER)
    // console.log("bigram_p =", bigram_p)
    // bigram_p DONE, key_table DONE
    let bigram_c = []
    for (let i = 0; i<bigram_p.length; i++){
        const letter_1 = bigram_p[i][0];
        const letter_2 = bigram_p[i][1];
        let pos_1 = {}
        let pos_2 = {}
        for (let x = 0; x<key_table.length; x++){
            for (let y=0; y<key_table[0].length; y++){
                if (key_table[x][y] == letter_1){
                    pos_1 = {x:x, y:y}
                }
                if (key_table[x][y] == letter_2){
                    pos_2 = {x:x, y:y}
                }
            }
        }
        let curr_bigram_c = ""
        if (pos_1.x == pos_2.x){
            // console.log("== horizontal")
            const y_1 = (pos_1.y + 1) % 5
            const y_2 = (pos_2.y + 1) % 5
            curr_bigram_c += key_table[pos_1.x][y_1]
            curr_bigram_c += key_table[pos_2.x][y_2]
        } else if (pos_1.y == pos_2.y){
            // console.log("|| vertical")
            const x_1 = (pos_1.x + 1) % 5
            const x_2 = (pos_2.x + 1) % 5
            curr_bigram_c += key_table[x_1][pos_1.y]
            curr_bigram_c += key_table[x_2][pos_2.y]
        } else {
            // console.log("[] square")
            const y_1 = pos_2.y
            const y_2 = pos_1.y
            curr_bigram_c += key_table[pos_1.x][y_1]
            curr_bigram_c += key_table[pos_2.x][y_2]
        }
        // console.log(bigram_p[i], "==>", pos_1, pos_2, "==>", curr_bigram_c, "\n")
        bigram_c.push(curr_bigram_c)
    }
    let c = ""
    for (let i=0; i<bigram_c.length; i++){
        c+=bigram_c[i]
    }
    return c
}
export function decrypt_playfair(c,k){
    const UNCOMMON_LETTER = ""
    const key_table = generate_playfair_key_table(k)
    const bigram_c = generate_bigram(c, UNCOMMON_LETTER)
    // console.log(key_table)
    
    let bigram_p = []
    for (let i = 0; i<bigram_c.length; i++){
        const letter_1 = bigram_c[i][0];
        const letter_2 = bigram_c[i][1];
        let pos_1 = {}
        let pos_2 = {}
        for (let x = 0; x<key_table.length; x++){
            for (let y=0; y<key_table[0].length; y++){
                if (key_table[x][y] == letter_1){
                    pos_1 = {x:x, y:y}
                }
                if (key_table[x][y] == letter_2){
                    pos_2 = {x:x, y:y}
                }
            }
        }
        let curr_bigram_p = ""
        if (pos_1.x == pos_2.x){
            // console.log("== horizontal")
            const y_1 = (pos_1.y + 5 - 1) % 5
            const y_2 = (pos_2.y + 5 - 1) % 5
            curr_bigram_p += key_table[pos_1.x][y_1]
            curr_bigram_p += key_table[pos_2.x][y_2]
        } else if (pos_1.y == pos_2.y){
            // console.log("|| vertical")
            const x_1 = (pos_1.x + 5 - 1) % 5
            const x_2 = (pos_2.x + 5 - 1) % 5
            curr_bigram_p += key_table[x_1][pos_1.y]
            curr_bigram_p += key_table[x_2][pos_2.y]
        } else {
            // console.log("[] square")
            const y_1 = pos_2.y
            const y_2 = pos_1.y
            curr_bigram_p += key_table[pos_1.x][y_1]
            curr_bigram_p += key_table[pos_2.x][y_2]
        }
        // console.log(bigram_c[i], "==>", pos_1, pos_2, "==>", curr_bigram_p, "\n")
        bigram_p.push(curr_bigram_p)
    }
    let p = ""
    for (let i=0; i<bigram_p.length; i++){
        p+=bigram_p[i]
    }
    return p
}

let c = encrypt_vigenere(plaintext, key)
console.log(c)
console.log(decrypt_vigenere(c, key))

c = encrypt_playfair(plaintext, key)
console.log(c, c.length)
console.log(decrypt_playfair(c, key), decrypt_playfair(c, key).length)



