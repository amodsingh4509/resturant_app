import React from 'react'
import axios from 'axios'
import style from '../styles/Add.module.css'
import { useState } from 'react'
function Add({setClose}) {

  const [file, setFile] = useState(null)
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)  
  const [prices, setPrices] = useState([])
  const [extras, setExtras] = useState(null)  
  const [extraOptions, setExtraoptions] = useState([])

  const handleextrainput=(e)=>{
    setExtras({ ...extras,[e.target.name]:e.target.value})
   // console.log(extras)
  }
  function handleextra() {
    setExtraoptions((prev) => [...prev, extras])
    console.log(extras)
  }

  const changeprice =(e,index)=>{
    var currprice =prices;
    currprice[index]=e.target.value;
    setPrices(currprice);
  }
  const createHandler = async()=> {
    const formdata = new FormData();
    formdata.append("file", file)
    formdata.append("upload_preset", "dehlkqf2");
    try {
      let res = await axios.post("https://api.cloudinary.com/v1_1/dp6q8oiyi/image/upload",formdata )
      const {url} = res.data;
      const newproduct={
        title,desc,prices,extraOptions,img:url,

      }
     let res2= await axios.post("http://localhost:3000/api/products",newproduct);
     console.log(res2);
      setClose(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={style.container}>
    <div className={style.wrapper}>
        <span className={style.close} onClick={()=>setClose(false)}>X</span>
        <h2>Add new Pizza</h2>
        <label className={style.label}>Choose a image</label>
        <input type="file" className={style.inputimg} onChange={(e)=>setFile(e.target.files[0])}/>
        <label className={style.label} >Title</label>
        <input type="text" className={style.input} onChange={(e)=>setTitle(e.target.value)}/>
        <label className={style.label}>Desc</label>
        <textarea  rows={4} type="text" onChange={(e)=>setDesc(e.target.value)} className={style.input}/>
        <label>Prices</label>
        <div className={style.pricecontainer}>
            <input type="number" placeholder="small" onChange={(e)=>changeprice(e,0)} className={`${style.input} ${style.inputsm}`}/>
            <input type="number" placeholder="medium" onChange={(e)=>changeprice(e,1)} className={`${style.input} ${style.inputmd}`}/>
            <input type="number" placeholder="large" onChange={(e)=>changeprice(e,2)} className={`${style.input} ${style.inputlg}`}/>    
        </div>
        <label className={style.label}>Extras</label>
        <div className={style.extrascontainer}>
            <input type="text" placeholder='text' name='text' onChange={handleextrainput} className={style.inputextra}/>
            <input type="number" placeholder='price' name='price' onChange={handleextrainput} className={style.inputexprice}/>
            <button className={style.button} onClick={handleextra}>Add</button>

        </div>
        <div className={style.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={style .extraItem}>
                {option.text}
              </span>
          ))}
        </div>
        <button className={style.buttoncreate} onClick={createHandler}> Create</button>
    </div>
    </div>
  )
}

export default Add