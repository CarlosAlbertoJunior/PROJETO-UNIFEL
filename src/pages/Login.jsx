import { json, Link, useNavigate } from "react-router-dom"
import { FaUser, FaLock } from "react-icons/fa";
import  EmailValidator from "email-validator";
import "./Login.css";
import { useEffect, useState } from "react";

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


   
    const handleClick = () => {
        if (password.length >= 8 && EmailValidator.validate(email)){
            navigate('/products');
        } else {
            alert("Senha precisa ter pelo menos 8 caracters e um e-mail válido.");
        }
    }

    return (
        <div className="containe">
            <form>
                <h2>Login</h2>
                <div>
                    <input onChange={(event) => setEmail(event.target.value)} type="email" />
                    <FaUser className="icon" />
                    <h4>E-mail</h4>
                </div>
                <div>
                    <input onChange={(event) => setPassword(event.target.value)} type="password" />
                    <FaLock className="icon" />
                    <h4>Senha</h4>
                </div>
                <br />
                <button onClick={handleClick}>Entrar</button>
                <br /><br />
                <Link to='/products' >Entrar via Link</Link>
            </form>
        </div>
    )

}

export default Login