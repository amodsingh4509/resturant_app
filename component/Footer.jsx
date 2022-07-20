import Image from 'next/image'
import React from 'react'
import style from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <div className={style.container}>
      <div className={style.item}>
        <Image src='/img/bg.png ' layout='fill' />
      </div>
      <div className={style.item}>
        <div className={style.items}>
          <div className={style.title}>
            Find our Resturant
          </div>
          <div className={style.card}>
            Civil lines Bijnor
            <br /> Uttar Pradesh 246701
          </div>
          <div className={style.card}>
            Sadar Bazar Bijnor
            <br /> Uttar Pradesh 246701
          </div>
          <div className={style.card}>
            Nai Basti Bijnor
            <br /> Uttar Pradesh 246701
          </div>
        </div>
        <div className={style.items}>
          <div className={style.title}>
            Working Hours
          </div>
          <div className={style.card}>
            Monday to Friday<br />
            9:00 AM to 8:00 PM<br /><br />
            Saturday,Sunday <br />
            10:00 AM to 4:00 PM
          </div>
        </div>
      </div>
    </div>
  )
}
