import React, { useState } from 'react'
import Image from 'next/image'
import style from '../../styles/Product.module.css'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {addProduct} from "../../redux/cartSlice"
function Product({ pizza }) {
    const [size, setsize] = useState(0);
    const [extras, setExtras] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [price, setprice] = useState(pizza.prices[0])

    const dispatch = useDispatch();

    const sizehandler = (index)=>{
        const diff = pizza.prices[index]-pizza.prices[size];
        setsize(index)
        changeprice(diff)
    }
    const optionshandler =(e,option)=>{
        
        if(e.target.checked){
            changeprice(option.price)
            setExtras((prev)=>[...prev,option])
        }
        else{
           changeprice(-option.price)
          setExtras(extras.filter((extras)=>extras._id!==option._id))
        }
        
        
    };
    console.log(extras);
    const changeprice =(diff)=>{

        setprice(price+diff)
        

    }

    const handleClick=()=>{
        dispatch(addProduct({...pizza,extras,price,quantity}));

    }
    return (
        <div className={style.container}>
            <div className={style.left}>
                <div className={style.imgContainer}>
                    <Image src={pizza.img} objectFit="contain" layout='fill' />
                </div>
            </div>
            <div className={style.right}>
                <div className={style.title}>{pizza.name}</div>
                <span className={style.prices}>Rs {price}</span>
                <div className={style.desc}>{pizza.desc}</div>
                <span className={style.choose}> Choose the size</span><br />
                <div className={style.sizes}>
                    <div className={style.size} onClick={() => sizehandler(0)}>
                        <span className={style.number} >Small</span><br />
                        <Image src='/img/size.png' layout='fill' />

                    </div>
                    <div className={style.size} onClick={() => sizehandler(1)}>
                        <span className={style.number} >Medium</span><br />
                        <Image src='/img/size.png' layout='fill' />

                    </div>
                    <div className={style.size} onClick={() => sizehandler(2)}>
                        <span className={style.number} >Large</span><br />
                        <Image src='/img/size.png' layout='fill' />

                    </div>
                </div>
                <div className={style.choose}>Choose your Ingredients</div>
                <div className={style.ingredients}>
                    {pizza.extraOptions.map((extras) => (

                        <div className={style.option} key={extras._id} >
                            <input type='checkbox' id={extras.text} name={extras.text} 
                            className={style.checkbox} onClick={(e)=>{optionshandler(e,extras)}}/>
                            <label htmlFor='double'>{extras.text}</label>
                        </div>

                    ))}

                </div>
                <div className={style.cart}>
                    <input type='number' onChange={(e)=>setQuantity(e.target.value)} defaultValue={1} className={style.quantity}></input>
                    <input type='button' value='Add to Cart' onClick={handleClick} className={style.button} />
                </div>

            </div>
        </div>
    )
}
export const getServerSideProps = async ({ params }) => {
    const res = await axios.get(`http://localhost:3000/api/products/${params.id}`)
    return {
        props: {
            pizza: res.data
        }
    };

}
export default Product;