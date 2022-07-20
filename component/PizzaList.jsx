import React from 'react'
import style from '../styles/PizzaList.module.css'
import PizzaCard from './PizzaCard'

export default function PizzaList({ pizzalist }) {
    return (
        <div className={style.container}>
            <div className={style.title}> The Best Pizza in the town</div>
            <div className={style.desc}>
                This pizza is awesome. If you try this once they you will get back to us soon.
                It is cost effective as compare to Dominos and Pizza Hut.
            </div>
            <div className={style.wrapper}>
                {pizzalist.map((pizza) => (
                    <PizzaCard pizza={pizza} key={pizza._id} />

                ))}
 
            </div>

        </div>
    )
}
