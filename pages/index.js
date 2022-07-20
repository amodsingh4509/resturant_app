import Head from 'next/head'
import axios from 'axios'
import Image from 'next/image'
import Featured from '../component/Featured'
import Navbar from '../component/Navbar'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import Footer from '../component/Footer'
import PizzaList from '../component/PizzaList'
import Addbutton from '../component/Addbutton'
import Add from '../component/Add'
export default function Home({pizzalist,admin}) {
  const [close, setClose] = useState(false);
  return (<>
 

    <div className={styles.container}>
    
      
      <Head>
        <title>Juice Corner</title>
        <meta name="description" content="Best Juice vendor in UP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
    </div>
    <Featured/>
    { admin && <Addbutton setClose={setClose}/>}
    <PizzaList pizzalist={pizzalist}/>
    {close && <Add setClose={setClose}/>}
    </>
  )
}

export const getServerSideProps = async(ctx)=>{
  const mycookie = ctx.req?.cookies || "" ;
  let admin = false;
  if(mycookie.token == process.env.TOKEN)
  {
    admin = true;
  }
  const res  = await axios.get('http://localhost:3000/api/products')
  return {
    props :{
      pizzalist:res.data,
      admin
    }
  };

}