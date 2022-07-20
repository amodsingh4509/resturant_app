import React from 'react'
import style from '../styles/navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity)
  return (
    <div className={style.container}>
      <div className={style.item1}>
        <div className={style.callbutton}>
          <Image src="/img/telephone.png" alt="" width="20" height="20"></Image>
        </div>
        <div className={style.text}>
          <div className={style.textitem}>Order Now</div>
          <div className={style.textitem}>7017484123</div>
        </div>
      </div>
      <div className={style.item2}>
        <ul className={style.list}>
          <Link href="/" passHref>
          <li className={style.listitem}>HOME</li>
          </Link>
          
          <li className={style.listitem}>Product</li>
          <Image src="/img/logo.png" alt='' width="140px" height="70px"></Image>
          <li className={style.listitem}>Menu</li>
          <li className={style.listitem}>Contact</li>
        </ul>
      </div>
      <Link href='/cart' passHref>
        <div className={style.item3}>
          <div className={style.cartlogo}>
            <Image src="/img/cart.png" alt='' width="40px" height="40px" ></Image>
          </div>
          <div className={style.counter}>{quantity}</div>
        </div>
      </Link>
    </div>
  )
}
