import {encrypt_auto_key, decrypt_auto_key} from "./autokey.js"
import {encrypt_affine, decrypt_affine} from "./affine.js"
import {encrypt_hill, decrypt_hill} from "./hill.js"
import {encrypt_playfair, decrypt_playfair, encrypt_vigenere, decrypt_vigenere} from "./script.js"
import {relatif_prima, modulo_invers} from "./helper.js"
import React, { useEffect } from "react";
const Matrix = require("node-matrices")

function App() {
  //Encryption required
  const [errHillEn, setErrHillEn] = React.useState(false)
  const [defaultEnVis, setDefaultEnVis] = React.useState(false)
  const [enButtonVis, setEnButtonVis] = React.useState(false)
  const [isRelative, setIsRelative] = React.useState(true)
  const [cipherEn, setCipherEn] = React.useState("")
  const [list,setList] = React.useState(["",""])
  useEffect(() =>{
    if(defaultEnVis===true){
      setHillEnVis(false)
      setAffineEnVis(false)
    }
  }, [defaultEnVis])
  const [hillEnVis, setHillEnVis] = React.useState(false)
  useEffect(() => {
    if(hillEnVis===true){
      setAffineEnVis(false)
      setDefaultEnVis(false)
    }
  }, [hillEnVis])
  const [affineEnVis, setAffineEnVis] = React.useState(false)
  useEffect(() => {
    if(affineEnVis===true){
      setHillEnVis(false)
      setDefaultEnVis(false)
    }
  }, [affineEnVis])
  const showInput = (event) =>{
    if(event.target.id=="radioHill"){
      setHillEnVis(true)
    }
      else if(event.target.id=="radioAffine"){
      setAffineEnVis(true)
    }
    else{
      setDefaultEnVis(true)
    }
    setEnButtonVis(true)
    setCipherEn("")
  }
  const checkRelativeEn = (event) =>{
    if(relatif_prima(event.target.value, 26)){
      setIsRelative(true)
    }
    else setIsRelative(false)
  }
  const handleSubmitEn = (event) =>{
    event.preventDefault();
    var cipher = ""
    if(event.target["radioAuto"].checked){
      cipher= encrypt_auto_key(event.target["plainEn"].value, event.target["keyEnDef"].value)
    }
    else if(event.target["radioAffine"].checked){
      if(isRelative){
        cipher = encrypt_affine(event.target["plainEn"].value, event.target["keyEnM"].value, event.target["keyEnB"].value)
      }
    }
    else if(event.target["radioHill"].checked){
      var tmpList = []
      for(var i=0;i<list.length;i++){
        var row = []
        for(var j=0;j<list.length;j++){
          row.push(event.target["cell"+i+j].value)
        }
        tmpList.push(row)
      }
      var tmpMatrix = new Matrix(tmpList)
      const det = (tmpMatrix.determinant()%26+26)%26
      
      if(modulo_invers(det,26)==-1){
        setErrHillEn(true)
      }
      else{
        setErrHillEn(false)
        cipher = encrypt_hill(event.target["plainEn"].value, tmpList)
      }
    }
    else if(event.target["radioVigenere"].checked){
      cipher = encrypt_vigenere(event.target["plainEn"].value, event.target["keyEnDef"].value)
    }
    else if(event.target["radioPlayfair"].checked){
      cipher = encrypt_playfair(event.target["plainEn"].value, event.target["keyEnDef"].value)
    }
    setCipherEn(cipher)
  }
  const changeMatrixEn = (event) => {
    var tmpList = []
    for(let i=0;i<event.target.value;i++){
      tmpList.push("")
    }
    setList(tmpList)
  }


  //Decryption required
  const [errHillDe, setErrHillDe] = React.useState(false)
  const [defaultDeVis, setDefaultDeVis] = React.useState(false)
  const [deButtonVis, setDeButtonVis] = React.useState(false)
  const [isRelativeDe, setIsRelativeDe] = React.useState(true)
  const [cipherDe, setCipherDe] = React.useState("")
  const [listDe,setListDe] = React.useState(["",""])
  useEffect(() =>{
    if(defaultDeVis===true){
      setHillDeVis(false)
      setAffineDeVis(false)
    }
  }, [defaultDeVis])
  const [hillDeVis, setHillDeVis] = React.useState(false)
  useEffect(() => {
    if(hillDeVis===true){
      setAffineDeVis(false)
      setDefaultDeVis(false)
    }
  }, [hillDeVis])
  const [affineDeVis, setAffineDeVis] = React.useState(false)
  useEffect(() => {
    if(affineDeVis===true){
      setHillDeVis(false)
      setDefaultDeVis(false)
    }
  }, [affineDeVis])
  const showInputDe = (event) =>{
    if(event.target.id=="radioHillDe"){
      setHillDeVis(true)
    }
    else if(event.target.id=="radioAffineDe"){
      setAffineDeVis(true)
    }
    else{
      setDefaultDeVis(true)
    }
    setDeButtonVis(true)
    setCipherDe("")
  }
  const checkRelativeDe = (event) =>{
    if(relatif_prima(event.target.value, 26)){
      setIsRelativeDe(true)
    }
    else setIsRelativeDe(false)
  }
  const handleSubmitDe = (event) =>{
    event.preventDefault();
    var cipher = ""
    if(event.target["radioAutoDe"].checked){
      cipher= decrypt_auto_key(event.target["plainDe"].value, event.target["keyDeDef"].value)
    }
    else if(event.target["radioAffineDe"].checked){
      if(isRelativeDe){
        cipher = decrypt_affine(event.target["plainDe"].value, event.target["keyDeM"].value, event.target["keyDeB"].value)
      }
    }
    else if(event.target["radioHillDe"].checked){
      var tmpList = []
      for(var i=0;i<listDe.length;i++){
        var row = []
        for(var j=0;j<listDe.length;j++){
          row.push(event.target["cellDe"+i+j].value)
        }
        tmpList.push(row)
      }
      var tmpMatrix = new Matrix(tmpList)
      const det = (tmpMatrix.determinant()%26+26)%26
      var k = modulo_invers(det,26)
      
      if(k==-1){
        setErrHillDe(true)
      }
      else{
        setErrHillDe(false)
        var adj = tmpMatrix.adjugate()
        var tmpAdj = []
  
        for(var i=0;i<listDe.length;i++){
          var row = []
          var rowMat = adj.sliceRows(i,i+1)
          for(var j=0;j<listDe.length;j++){
            row.push((rowMat.get(0,j)*k%26+26)%26)
          }
          tmpAdj.push(row)
        }
        tmpList = tmpAdj
        cipher = decrypt_hill(event.target["plainDe"].value, tmpList)
      }
    }
    else if(event.target["radioVigenereDe"].checked){
      cipher = decrypt_vigenere(event.target["plainDe"].value, event.target["keyDeDef"].value)
    }
    else if(event.target["radioPlayfairDe"].checked){
      cipher = decrypt_playfair(event.target["plainDe"].value, event.target["keyDeDef"].value)
    }
    setCipherDe(cipher)
  }
  const changeMatrixDe = (event) => {
    var tmpList = []
    for(let i=0;i<event.target.value;i++){
      tmpList.push("")
    }
    setListDe(tmpList)
  }

  return(
    <div>
      ENKRIPSI
      <form onSubmit={handleSubmitEn}>
        Type:
        <div>
          <input type="radio" id="radioAuto" name="type" onChange={showInput}></input>Auto key
          <input type="radio" id="radioAffine" name="type" onChange={showInput}></input>Affine
          <input type="radio" id="radioHill" name="type" onChange={showInput}></input>Hill
          <input type="radio" id="radioVigenere" name="type" onChange={showInput}></input>Vigenere
          <input type="radio" id="radioPlayfair" name="type" onChange={showInput}></input>Vigenere Playfair
        </div>
        <div>
          <div><label>Plaintext: <input id="plainEn" name="plaintext" type="text" required={true}></input></label></div>
        </div>
        <div id="key">
          <div hidden={!affineEnVis}>
            Key: 
            <div><label>m: <input id="keyEnM" type="number" min={1} max={100000000} onChange={checkRelativeEn} required={affineEnVis}></input></label></div>
            <div hidden={isRelative}>m harus relatif prima dengan 26</div>
            <div><label>b: <input id="keyEnB" type="number" min={1} max={100000000} required={affineEnVis}></input></label></div>
          </div>
          <div hidden={!hillEnVis}>
            <div>Matrix Size: <select name="matrixEn" id="matrixEn" onChange={changeMatrixEn}>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select></div>
            <table>
              <tbody>
              {list && list.map((_,i) => (
                  <tr>
                    {list && list.map((_,j) =>(
                      <td><input id={"cell"+i+j} type="number" placeholder={0}></input></td>
                    ))}
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div hidden={!defaultEnVis}>
            <div><label>Key: <input id="keyEnDef" type="text" required={defaultEnVis}></input></label></div>
          </div>
        </div>
        <button type="submit" hidden={!enButtonVis}>Encrypt</button>
      </form>
      <div> 
        Hasil enkripsi:
        <div id="hasilEnkripsi" >{cipherEn}</div>
        <div hidden={!errHillEn}>Matriks harus memiliki modulo invers</div>
      </div>


      <br></br>


      DEKRIPSI
      <form onSubmit={handleSubmitDe}>
        Type:
        <div>
          <input type="radio" id="radioAutoDe" name="type" onChange={showInputDe}></input>Auto key
          <input type="radio" id="radioAffineDe" name="type" onChange={showInputDe}></input>Affine
          <input type="radio" id="radioHillDe" name="type" onChange={showInputDe}></input>Hill
          <input type="radio" id="radioVigenereDe" name="type" onChange={showInputDe}></input>Vigenere
          <input type="radio" id="radioPlayfairDe" name="type" onChange={showInputDe}></input>Vigenere Playfair
        </div>
        <div>
          <div><label>Plaintext: <input id="plainDe" name="plaintext" type="text" required={true}></input></label></div>
        </div>
        <div id="key">
          <div hidden={!affineDeVis}>
            Key: 
            <div><label>m: <input id="keyDeM" type="number" min={1} max={100000000} onChange={checkRelativeDe} required={affineDeVis}></input></label></div>
            <div hidden={isRelativeDe}>m harus relatif prima dengan 26</div>
            <div><label>b: <input id="keyDeB" type="number" min={1} max={100000000} required={affineDeVis}></input></label></div>
          </div>
          <div hidden={!hillDeVis}>
            <div>Matrix Size: <select name="matrixDe" id="matrixDe" onChange={changeMatrixDe}>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select></div>
            <table>
              <tbody>
              {listDe && listDe.map((_,i) => (
                  <tr>
                    {listDe && listDe.map((_,j) =>(
                      <td><input id={"cellDe"+i+j} type="number" placeholder={0}></input></td>
                    ))}
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div hidden={!defaultDeVis}>
            <div><label>Key: <input id="keyDeDef" type="text" required={defaultDeVis}></input></label></div>
          </div>
        </div>
        <button type="submit" hidden={!deButtonVis}>Decrypt</button>
      </form>
      <div> 
        Hasil dekripsi:
        <div id="hasilDekripsi" >{cipherDe}</div>
        <div hidden={!errHillDe}>Matriks harus memiliki modulo invers</div>
      </div>
    </div>
  )
}

export default App;
