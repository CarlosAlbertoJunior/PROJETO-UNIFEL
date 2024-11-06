import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import "./Checkout.css";

function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const cartItens = location.state?.cart || [];

    const total = cartItens.reduce((acc, item) => acc + item.price, 0);

    const goBack = () => {
        navigate('/products');
    };

    return (
        <div className="product-checkout">
            <h2>Check-out</h2>
            <button className="button-checkout-voltar" onClick={goBack}>Voltar</button>
            {cartItens.length === 0 ? (
                <p>O Carrinho está vazio</p>
            ) : (
                <div>
                    {cartItens.map((item, index) => (
                        <div key={index} className="cart-item">
                            <p>{item.title}</p>
                            <img width='110px' src={item.image} alt={item.title} /><br />
                            <p>R$ {item.price.toFixed(2)}</p>
                        </div>
                    ))}
                    <h3>Total: R$ {total.toFixed(2)}</h3>
                    <button onClick={() => navigate(-1)}>Continuar Comprando</button>
                </div>
            )}
        </div>
    );
}

export default Checkout;
