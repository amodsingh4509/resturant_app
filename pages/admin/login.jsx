import { useState } from 'react'
import { useRouter } from "next/router";
import style from '../../styles/login.module.css';
import axios from 'axios';
const Login = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleclick = async () => {

        try {
            await axios.post("http://localhost:3000/api/login", {
                username, password
            });
            router.push("/admin");

        } catch (error) {
            setError(true);
        }

    }
    return (

        

        <div className = {style.container } >
            <div className={style.wrapper}>
                <span><h2>Admin Dashboard</h2></span>
                <label className={style.label}>Username</label>
                <input type="text" className={style.input} onChange={(e) => setUsername(e.target.value)} />
                <label className={style.label}>Password</label>
                <input type="password" className={style.input} onChange={(e) => setPassword(e.target.value)} />
                <button className={style.button} onClick={handleclick}>Login</button>
                {error && <span>Wrong Credentials</span>}
            </div>

        </div >
    )
}

export default Login