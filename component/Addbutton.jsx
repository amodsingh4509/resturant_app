import React from 'react'
import style from "../styles/Addbutton.module.css"
const Addbutton = ({ setClose }) => {
    return (
        <div>
            <div onClick={()=>setClose(true)} className={style.addbutton}>Add new Pizza</div>
        </div>

    )
}
export default Addbutton