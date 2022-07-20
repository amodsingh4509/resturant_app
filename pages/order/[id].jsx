import React from 'react'
import style from '../../styles/order.module.css'
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import Image from 'next/image'
function Order ({order}) {

  const status=order.status;
  const statusclass =(status)=>{
    if(status<1) return style.done;
    if (status==1) return style.inprogress;
    if(status>1) return style.undone;
  }

  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.row}>
          <table className={style.table}>
            <tbody>
            <tr>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>

            </tr>
            </tbody>
            <tbody>
            <tr>

              <td><span className={style.orderid}>{order._id}</span></td>
              <td ><span className={style.customer}>{order.customer}</span></td>
              <td ><span className={style.Address}>{order.address}</span></td>
              <td ><span className={style.total}>Rs {order.total}</span></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className={style.row}>
          <div className={statusclass(0)}>
            <div className={style.stausicon}>
              <Image src='/img/paid.png' height={20} width={30}></Image>
            </div>

            <span>Payment</span>
            <div className={style.checkedicon}>
              <Image src='/img/checked.png' height={20} width={30}></Image>
            </div>
          </div>
          <div className={statusclass(1)}>
            <div className={style.stausicon}>
              <Image src='/img/bake.png' height={20} width={30}></Image>
            </div>
            <span>Preparing</span>
            <div className={style.checkedicon}>
              <Image src='/img/checked.png' height={20} width={30}></Image>
            </div>
          </div>
          <div className={statusclass(2)}>
            <div className={style.stausicon}>
              <Image src='/img/bike.png' height={20} width={30}></Image>
            </div>
            <span>On the way</span>
            <div className={style.checkedicon}>
              <Image src='/img/checked.png' height={20} width={30}></Image>
            </div>
          </div>
          <div className={statusclass(3)}>
            <div className={style.stausicon}>
              <Image src='/img/delivered.png' height={20} width={30}/> 
            </div>
            <span>Delivered</span>
            <div className={style.checkedicon}>
              <Image src='/img/checked.png' height={20} width={30}></Image>
            </div>
          </div>

        </div>
      </div>


      <div className={style.right}>
        <h3 >Cart Details</h3>
        <h4 className={style.subtotal}>Subtotal :
          <div className={style.subtotaltext}>Rs {order.total}</div>
        </h4>
        <h4 className={style.discount}>Discount :
          <div className={style.discounttext}>Rs 0</div>
        </h4>
        <h4 className={style.totalprice}>Total :
          <div className={style.totaltext}>Rs {order.total}</div>
        </h4>
        <button className={style.button}>Paid</button>

      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`)
  return {
      props: {
          order: res.data
      },
  };
}


export default Order;