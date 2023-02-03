import {encrypt_auto_key, decrypt_auto_key} from "./autokey.js"
import {encrypt_affine, decrypt_affine} from "./affine.js"
import {encrypt_hill, decrypt_hill} from "./hill.js"
import {encrypt_playfair, decrypt_playfair, encrypt_vigenere, decrypt_vigenere, encrypt_extended_vigenere, decrypt_extended_vigenere} from "./script.js"
import {relatif_prima, modulo_invers, split_five} from "./helper.js"
import React, { useEffect } from "react"
import {saveAs} from "file-saver"
const Matrix = require("node-matrices")

function App() {
  //Encryption required
  const [plainEnVis, setPlainEnVis] = React.useState(true)
  useEffect(() =>{
    if(plainEnVis===true){
      setFileTextEnVis(false)
      setFileBinEnVis(false)
    }
  }, [plainEnVis])
  const [fileTextEnVis, setFileTextEnVis] = React.useState(false)
  useEffect(() =>{
    if(fileTextEnVis===true){
      setPlainEnVis(false)
      setFileBinEnVis(false)
    }
  }, [fileTextEnVis])
  const [fileBinEnVis, setFileBinEnVis] = React.useState(false)
  useEffect(() =>{
    if(fileBinEnVis===true){
      setPlainEnVis(false)
      setFileTextEnVis(false)
    }
  }, [fileBinEnVis])
  const [errHillEn, setErrHillEn] = React.useState(false)
  const [defaultEnVis, setDefaultEnVis] = React.useState(true)
  const [enButtonVis, setEnButtonVis] = React.useState(true)
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
    if(event.target.id==="radioHill"){
      setHillEnVis(true)
    }
      else if(event.target.id==="radioAffine"){
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
    if(event.target["radioPlainEn"].checked){
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
        
        if(modulo_invers(det,26)===-1){
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
      else if(event.target["radioExtended"].checked){
        cipher = encrypt_extended_vigenere(event.target["plainEn"].value, event.target["keyEnDef"].value)
      }
      if(event.target["spacedOutEn"].checked) cipher=split_five(cipher)
      setCipherEn(cipher)
    }
    else{
      var file
      if(event.target["radioTextEn"].checked) file = event.target[4].files[0];
      else file = event.target[5].files[0];
      var reader = new FileReader();
      reader.onload = function(e)
      {
        if(event.target["radioAuto"].checked){
          cipher= encrypt_auto_key(e.target.result, event.target["keyEnDef"].value)
        }
        else if(event.target["radioAffine"].checked){
          if(isRelative){
            cipher = encrypt_affine(e.target.result, event.target["keyEnM"].value, event.target["keyEnB"].value)
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
          
          if(modulo_invers(det,26)===-1){
            setErrHillEn(true)
          }
          else{
            setErrHillEn(false)
            cipher = encrypt_hill(e.target.result, tmpList)
          }
        }
        else if(event.target["radioVigenere"].checked){
          cipher = encrypt_vigenere(e.target.result, event.target["keyEnDef"].value)
        }
        else if(event.target["radioPlayfair"].checked){
          cipher = encrypt_playfair(e.target.result, event.target["keyEnDef"].value)
        }
        else if(event.target["radioExtended"].checked){
          var blob = new Blob([encrypt_extended_vigenere(e.target.result, event.target["keyEnDef"].value)])
          saveAs(blob, "ciphertext.txt");
        }
        if(event.target["spacedOutEn"].checked) cipher=split_five(cipher)
        setCipherEn(cipher)
      };
      if(event.target["radioTextEn"].checked) reader.readAsText(file);
      else reader.readAsBinaryString(file);
    }
  }
  const changeMatrixEn = (event) => {
    var tmpList = []
    for(let i=0;i<event.target.value;i++){
      tmpList.push("")
    }
    setList(tmpList)
  }
  const showEn = (event) =>{
    if(event.target.id==="radioPlainEn"){
      setPlainEnVis(true)
    }
    else if(event.target.id==="radioTextEn"){
      setFileTextEnVis(true)
    }
    else if(event.target.id==="radioBinEn"){
      setFileBinEnVis(true)
    }
  }
  const enDownload = () =>{
    var blob = new Blob([cipherEn], {type: "text/plain;charset=utf-8"})
    saveAs(blob, "ciphertext.txt");
  }

  //Decryption required
  const [plainDeVis, setPlainDeVis] = React.useState(true)
  useEffect(() =>{
    if(plainDeVis===true){
      setFileTextDeVis(false)
      setFileBinDeVis(false)
    }
  }, [plainDeVis])
  const [fileTextDeVis, setFileTextDeVis] = React.useState(false)
  useEffect(() =>{
    if(fileTextDeVis===true){
      setPlainDeVis(false)
      setFileBinDeVis(false)
    }
  }, [fileTextDeVis])
  const [fileBinDeVis, setFileBinDeVis] = React.useState(false)
  useEffect(() =>{
    if(fileBinDeVis===true){
      setPlainDeVis(false)
      setFileTextDeVis(false)
    }
  }, [fileBinDeVis])
  const [errHillDe, setErrHillDe] = React.useState(false)
  const [defaultDeVis, setDefaultDeVis] = React.useState(true)
  const [deButtonVis, setDeButtonVis] = React.useState(true)
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
    if(event.target.id==="radioHillDe"){
      setHillDeVis(true)
    }
    else if(event.target.id==="radioAffineDe"){
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
    if(event.target["radioPlainDe"].checked){
      if(event.target["radioAutoDe"].checked){
        cipher= decrypt_auto_key(event.target["plainDe"].value, event.target["keyDeDef"].value)
      }
      else if(event.target["radioAffineDe"].checked){
        if(isRelativeDe){
          cipher = decrypt_affine(event.target["plainDe"].value, event.target["keyDeM"].value, event.target["keyEDeB"].value)
        }
      }
      else if(event.target["radioHillDe"].checked){
        var tmpList = []
        for(var i=0;i<list.length;i++){
          var row = []
          for(var j=0;j<list.length;j++){
            row.push(event.target["cellDe"+i+j].value)
          }
          tmpList.push(row)
        }
        var tmpMatrix = new Matrix(tmpList)
        const det = (tmpMatrix.determinant()%26+26)%26
        
        if(modulo_invers(det,26)===-1){
          setErrHillDe(true)
        }
        else{
          setErrHillDe(false)
          cipher = decrypt_hill(event.target["plainDe"].value, tmpList)
        }
      }
      else if(event.target["radioVigenereDe"].checked){
        cipher = decrypt_vigenere(event.target["plainDe"].value, event.target["keyDeDef"].value)
      }
      else if(event.target["radioPlayfairDe"].checked){
        cipher = decrypt_playfair(event.target["plainDe"].value, event.target["keyDeDef"].value)
      }
      else if(event.target["radioExtendedDe"].checked){
        cipher = decrypt_extended_vigenere(event.target["plainDe"].value, event.target["keyDeDef"].value)
      }
      if(event.target["spacedOutDe"].checked) cipher=split_five(cipher)
      setCipherDe(cipher)
    }
    else{
      var file
      console.log(event)
      if(event.target["radioTextDe"].checked) file = event.target["fileTextDe"].files[0];
      else file = event.target["fileBinDe"].files[0];
      var reader = new FileReader();
      reader.onload = function(e)
      {
        if(event.target["radioAutoDe"].checked){
          cipher= decrypt_auto_key(e.target.result, event.target["keyDeDef"].value)
        }
        else if(event.target["radioAffineDe"].checked){
          if(isRelativeDe){
            cipher = decrypt_affine(e.target.result, event.target["keyDeM"].value, event.target["keyDeB"].value)
          }
        }
        else if(event.target["radioHillDe"].checked){
          var tmpList = []
          for(var i=0;i<list.length;i++){
            var row = []
            for(var j=0;j<list.length;j++){
              row.push(event.target["cellDe"+i+j].value)
            }
            tmpList.push(row)
          }
          var tmpMatrix = new Matrix(tmpList)
          const det = (tmpMatrix.determinant()%26+26)%26
          
          if(modulo_invers(det,26)===-1){
            setErrHillDe(true)
          }
          else{
            setErrHillDe(false)
            cipher = decrypt_hill(e.target.result, tmpList)
          }
        }
        else if(event.target["radioVigenereDe"].checked){
          cipher = decrypt_vigenere(e.target.result, event.target["keyDeDef"].value)
        }
        else if(event.target["radioPlayfairDe"].checked){
          cipher = decrypt_playfair(e.target.result, event.target["keyDeDef"].value)
        }
        else if(event.target["radioExtendedDe"].checked){
          var blob = new Blob([decrypt_extended_vigenere(e.target.result, event.target["keyDeDef"].value)])
          saveAs(blob, "plaintext.bin");
        }
        if(event.target["spacedOutDe"].checked) cipher=split_five(cipher)
        setCipherDe(cipher)
      };
      if(event.target["radioTextDe"].checked) reader.readAsText(file);
      else reader.readAsBinaryString(file);
    }
  }
  const changeMatrixDe = (event) => {
    var tmpList = []
    for(let i=0;i<event.target.value;i++){
      tmpList.push("")
    }
    setListDe(tmpList)
  }
  const showDe = (event) =>{
    if(event.target.id==="radioPlainDe"){
      setPlainDeVis(true)
    }
    else if(event.target.id==="radioTextDe"){
      setFileTextDeVis(true)
    }
    else if(event.target.id==="radioBinDe"){
      setFileBinDeVis(true)
    }
  }
  const deDownload = (event) =>{
    var blob = new Blob([cipherDe])
    saveAs(blob, "plaintext.bin");
  }

  return(
    <div>
      ENKRIPSI
      <form onSubmit={handleSubmitEn}>
        Input type :
        <div>
          <input type="radio" id="radioPlainEn" name="inputType" onChange={showEn} defaultChecked></input>Plaintext
          <input type="radio" id="radioTextEn" name="inputType" onChange={showEn}></input>A text file
          <input type="radio" id="radioBinEn" name="inputType" onChange={showEn}></input>A binary file
        </div>
        <div hidden={!plainEnVis}>
          <div><label>Plaintext:<div>
            <input id="plainEn" name="plaintext" type="text" required={plainEnVis} style={{width: 700, height:30, wordBreak:"break-all", overflowY:"auto", borderColor:"black", borderStyle:"solid"}}></input>
          </div></label></div>
        </div>
        <div hidden={!fileTextEnVis}>
          <input type="file"  required={fileTextEnVis} accept=".txt"></input>
        </div>
        <div hidden={!fileBinEnVis}>
          <input type="file"  required={fileBinEnVis}></input>
        </div>
        Output type :
        <input type="radio" id="rawOutEn" name="outputType" defaultChecked></input>Raw
        <input type="radio" id="spacedOutEn" name="outputType"></input>5 Character Split
        Type:
        <div>
          <input type="radio" id="radioAuto" name="type" onChange={showInput}></input>Auto key
          <input type="radio" id="radioAffine" name="type" onChange={showInput}></input>Affine
          <input type="radio" id="radioHill" name="type" onChange={showInput}></input>Hill
          <input type="radio" id="radioVigenere" name="type" onChange={showInput} defaultChecked></input>Vigenere
          <input type="radio" id="radioPlayfair" name="type" onChange={showInput}></input>Vigenere Playfair
          <input type="radio" id="radioExtended" name="type" onChange={showInput}></input>Extended Vigenere
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
        <div id="hasilEnkripsi" style={{width: 700, height:150, wordBreak:"break-word", overflowY:"auto", borderColor:"black", borderStyle:"solid"}}>{cipherEn}</div>
        <div hidden={!errHillEn}>Matriks harus memiliki modulo invers</div>
      </div>
      <button id="downloadEn" hidden={!enButtonVis} onClick={enDownload}>Download hasil enkripsi</button>


      <br></br><br></br>


      DEKRIPSI
      <form onSubmit={handleSubmitDe}>
        Input type :
        <div>
          <input type="radio" id="radioPlainDe" name="inputType" onChange={showDe} defaultChecked></input>Plaintext
          <input type="radio" id="radioTextDe" name="inputType" onChange={showDe}></input>A text file
          <input type="radio" id="radioBinDe" name="inputType" onChange={showDe}></input>A binary file
        </div>
        <div hidden={!plainDeVis}>
          <div><label>Plaintext:<div>
            <input id="plainDe" name="plaintext" type="" required={plainDeVis} style={{width: 700, height:30, wordBreak:"break-all", overflowY:"scroll", borderColor:"black", borderStyle:"solid"}}></input>
          </div></label></div>
        </div>
        <div hidden={!fileTextDeVis}>
          <input id="fileTextDe" type="file"  required={fileTextDeVis} accept=".txt"></input>
        </div>
        <div hidden={!fileBinDeVis}>
          <input id="fileBinDe" type="file"  required={fileBinDeVis}></input>
        </div>
        Output type :
        <input type="radio" id="rawOutDe" name="outputType" defaultChecked></input>Raw
        <input type="radio" id="spacedOutDe" name="outputType"></input>5 Character Split
        Type:
        <div>
          <input type="radio" id="radioAutoDe" name="type" onChange={showInputDe}></input>Auto key
          <input type="radio" id="radioAffineDe" name="type" onChange={showInputDe}></input>Affine
          <input type="radio" id="radioHillDe" name="type" onChange={showInputDe}></input>Hill
          <input type="radio" id="radioVigenereDe" name="type" onChange={showInputDe} defaultChecked></input>Vigenere
          <input type="radio" id="radioPlayfairDe" name="type" onChange={showInputDe}></input>Vigenere Playfair
          <input type="radio" id="radioExtendedDe" name="type" onChange={showInputDe}></input>Extended Vigenere
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
        <div id="hasilDekripsi" style={{width: 700, height:150, wordBreak:"break-all", overflowY:"auto", borderColor:"black", borderStyle:"solid"}}>{cipherDe}</div>
        <div hidden={!errHillDe}>Matriks harus memiliki modulo invers</div>
      </div>
      <button id="downloadDe" hidden={!enButtonVis} onClick={deDownload}>Download hasil dekripsi</button>
    </div>
  )
}

export default App;
