

document.querySelector("#file-read-btn").addEventListener('click', () => {
    if (document.querySelector("#file-input").value == ""){
        console.log("no file selected")
        return
    }

    var file = document.querySelector("#file-input").files[0];

    var reader = new FileReader();
    reader.onload = function(e){
        // binary data
        const binary_data = e.target.result
        console.log(binary_data.length, typeof(binary_data), binary_data[0])
        const enc_binary_data = encrypt_extended_vigenere(binary_data, "KUNCISUPERAMAN")
        for (let i = 0; i<10; i++){
            console.log(binary_data[i].charCodeAt(0), String.fromCharCode(binary_data[i].charCodeAt(0)))
        }
        for (let i = 0; i<10; i++){
            console.log(enc_binary_data[i].charCodeAt(0), String.fromCharCode(enc_binary_data[i].charCodeAt(0)))
        }


    }
    reader.onerror = function(e){
        // error
        console.log("Error : " + e.type)
    }
    reader.readAsBinaryString(file)
})