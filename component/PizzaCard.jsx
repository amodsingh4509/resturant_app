import React from 'react'
import Image from 'next/image'
import style from '../styles/PizzaCard.module.css'
import Link from 'next/link'
export default function PizzaCard({ pizza }) {
  return (
    <div className={style.container}>
      <div className={style.image}>
        <Link href={`/product/${pizza._id}`} passHref>
          <Image src={pizza.img} height='200' width='200' />
        </Link>

      </div>
      <div className={style.price}>Rs {pizza.prices[0]}</div>
      <div className={style.title}>{pizza.title}</div>
      <div className={style.desc}>{pizza.desc}</div>

    </div>
  )
}
