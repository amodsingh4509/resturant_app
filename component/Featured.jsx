import React from 'react'
import style from "../styles/Featured.module.css"
import Image from 'next/image'
export default function Featured() {


  const images = [
    "/img/featured.png",
    "/img/featured2.png",
    "/img/featured3.png",
  ];
  return (
    <div className={style.container}>
      <div className={style.arrowcontainer}  style={{left:0}}>
        <Image src="/img/arrowl.png" layout="fill" />
      </div>
      <div className={style.wrapper}>
        <div className={style.imageContainer}>
          {images.map((img, i) => (
            <Image src={img} key={i} layout="fill"/>
          ))}
        </div>
      </div>
      <div className={style.arrowcontainer} style={{right:0}} >
        <Image src="/img/arrowr.png" layout="fill"/>
      </div>

    </div>
  )
}
