import { React, useEffect, useState } from 'react'
import Image from 'next/image'
import style from '../styles/cart.module.css'
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import { OrderDetail } from '../component/OrderDetail';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

function cart() {
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);

  const cart = useSelector((state) => state.cart)

  const amount = cart.total;
  const currency = "USD";
  const styles = { layout: "vertical" };
  const dispatch = useDispatch();
  const router = useRouter();

  console.log(cart)

  const handleClose=()=>{
    setCash(false);
  }
  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/order/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then((details) => {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            })


          }}
        />
      </>
    );
  };

  return (
    <div className={style.container}>
      <div className={style.left}>
        <table className={style.table}>
          <tbody>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>

            </tr>
          </tbody>
          <tbody>
            {cart.product?.map((product) => (
              <tr className={style.tr} key={product._id}>
                <td>
                  <div className={style.imgcontainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={style.name}>{product.title}</span>
                </td>
                <td>
                  <span className={style.extras}>
                    {product.extras?product.extras.map((extra)=>(
                      <span key={extra._id}>{extra.text}, </span>
                    )):""}
                  </span>
                </td>
                <td>
                  <span className={style.price}>${product.price}</span>
                </td>
                <td>
                  <span className={style.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={style.total}>
                    ${product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <div className={style.right}>
        <div className={style.wrapper}>
          <h2 >CART TOTAL</h2>
          <h4 className={style.subtotal}>Subtotal :
            <div className={style.subtotaltext}>Rs {cart.total}</div>
          </h4>
          <h4 className={style.discount}>Discount :
            <div className={style.discounttext}>Rs 0</div>
          </h4>
          <h4 className={style.totalprice}>Total :
            <div className={style.totaltext}>Rs {cart.total}</div>
          </h4>
          {open ? (
            <div className={style.paymentMethods}>
              <button
                className={style.button}
                onClick={() => setCash(true)}
              >
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AQPAW-Sn6gfpYr1uvGl9kw12tqairjOOauuCaDloaCk1oo7-k-aEPD9I7iDu14Ea0eAaelosIbPDVoiU",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button className={style.button} onClick={() => setOpen(true)}>Chekout Now</button>
          )}
        </div>
        {cash && <OrderDetail total={cart.total} handleClose={handleClose} createOrder={createOrder}/>}
      </div>

    </div >
  )
}

export default cart