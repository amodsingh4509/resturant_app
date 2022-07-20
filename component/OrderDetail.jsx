import React from 'react'
import style from '../styles/OrderDetail.module.css'
import { useState } from 'react'
export const OrderDetail = ({total,createOrder,handleClose}) => {

const [customer, setCustomer] = useState("");
const [address, setAddress] = useState("");
const [phone, setPhone] = useState("");

const handleClick=()=>{
    createOrder({customer,address,total,method:0})
}
    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <div className={style.items}>
                    <div className={style.item}>
                        <label className={style.label}>Name</label>
                        <input type="text" className={style.input} onChange={(e)=>{setCustomer(e.target.value)}}/>
                    </div>
                    <div className={style.item}>
                        <label className={style.label}>Phone</label>
                        <input type="text" className={style.input} onChange={(e)=>{setPhone(e.target.value)}}/>
                    </div>
                    <div className={style.item}>
                        <label className={style.label}>Address</label>
                        <input type="textarea" className={style.input} onChange={(e)=>{setAddress(e.target.value)}}/>
                    </div>
                    <div className={style.buttons}>
                        <button className={style.button} onClick={handleClick}>Order</button>
                        <button className={style.button} onClick={handleClose}>Cancel</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
