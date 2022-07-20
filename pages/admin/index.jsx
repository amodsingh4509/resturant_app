import React from "react";
import style from "../../styles/Admin.module.css"
import Image from 'next/image'
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
function Index({ product, order }) {

    const [PizzaList, setPizzaList] = useState(product);
    const [orderlist, setOrderlist] = useState(order);
    const status =["Preparing","on the way","Deliverd"];

    const handlestatus = async(id)=>{

        const item =orderlist.filter((order)=>order._id==id)[0];
        const currstatus=item.status;
        if(currstatus<2)
        {
            try {
                const res = await axios.put("http://localhost:3000/api/orders/" + id,{status:currstatus+1} );
                setOrderlist([res.data,...orderlist.filter((order) => order._id !== id)]);
            } catch (error) {
                console.log(error)
    
            }
        }
        
    }
    const handledelete = async (id) => {

        try {
            const res = await axios.delete("http://localhost:3000/api/products/" + id);
            setPizzaList(PizzaList.filter((pizza) => pizza._id !== id));
        } catch (error) {
            console.log(error)

        }
    }

    return (
        <div className={style.container}>
            <div className={style.item}>
                <h1>Products</h1>
                <table className={style.table}>
                    <tbody>
                        <tr>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {PizzaList.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    <Image src={product.img} height={40} width={40} />
                                </td>
                                <td>{product._id.slice(0, 6)}...</td>
                                <td>{product.title}</td>
                                <td>{product.prices[0]}</td>
                                <td>
                                    <button className={style.button}>Edit</button>
                                    <button className={style.button} onClick={() => handledelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={style.item}>
                <h1>Orders</h1>
                <table className={style.table}>
                    <tbody>
                        <th>Order Id</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tbody>
                    <tbody>
                        {orderlist.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id.slice(0, 6)}...</td>
                                <td>{order.customer}</td>
                            
                                <td>Rs {order.total}</td>
                                <td>{order.method === 0 ?(<span>Cash</span>):(<span>Paid</span>)}</td>
                                <td>{status[order.status]}</td>
                                <td>
                                    <button className={style.button} onClick={()=>handlestatus(order._id)}>Next Stage</button>

                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div >
    )
}

export const getServerSideProps = async (ctx) => {

    const mycookie = ctx.req?.cookies || "";
    if(mycookie.token !== process.env.TOKEN)
    {
        return {
            redirect:{
                destination:"/admin/login",
                permanent:false
            }
        }
    }
    const Productres = await axios.get(`http://localhost:3000/api/products`)
    const Orderres = await axios.get(`http://localhost:3000/api/orders`)
    return {
        props: {
            order: Orderres.data,
            product: Productres.data,
        },
    };
}

export default Index