import {encrypt_auto_key, decrypt_auto_key} from "./autokey.js"
import React from "react";

function App() {
  const handleSubmitEn = (event) =>{
      event.preventDefault();
      document.getElementById("hasil").innerHTML = encrypt_auto_key(event.target[0].value, event.target[1].value)
  }
  return(
    <div>
      <form onSubmit={handleSubmitEn}>
        <div><label>Name: <input name="plaintext" type="text"></input></label></div>
        <div><label>Key: <input name="key" type="text"></input></label></div>
        <button type="submit">Encrypt</button>
      </form>
      <div id="hasil">
        
      </div>
    </div>
  )
}

export default App;
