import { useState, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Products.css";

function Products() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://fakestoreapi.com/products/');
            const json = await response.json();
            setProducts(json);
        };
        getData();
    }, []);

    const handleAddToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1, total: product.price }];
            }
        });
    };

    const toggleCart = () => {
        setShowCart(!showCart);
    };

    const handleDecrement = (index) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item, i) =>
                i === index
                    ? { ...item, quantity: Math.max(1, item.quantity - 1), total: Math.max(1, item.quantity - 1) * item.price }
                    : item
            );
            return updatedCart.filter((item) => item.quantity > 0);
        });
    };

    const handleIncrement = (index) => {
        setCart((prevCart) => {
            return prevCart.map((item, i) =>
                i === index
                    ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
                    : item
            );
        });
    };

    const handleRemove = (index) => {
        setCart((prevCart) => {
            return prevCart.filter((_, i) => i !== index);
        });
    };

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + item.total, 0);
    };

    const finalizePurchase = () => {
        alert(`Compra finalizada! Total: R$ ${calculateTotal().toFixed(2)}`);
        setCart([]);
        setShowCart(false);
    };

    return (
        <div className="product-h2">
            <h2>PRODUTOS</h2>
            <div className="painel-products">
                <button onClick={toggleCart}>
                    <CiShoppingCart /> {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </button>
            </div>
            <div className="products-container">
                {products.map((product) => (
                    <div className="product" key={product.id}>
                        <button className="button-details" onClick={() => navigate(`/products/${product.id}`)}>
                            <p>{product.title}</p>
                            <img width="153.69px" height="270px" src={product.image} alt="" /><br />
                        </button>
                        <h4>AVALIAÇÕES</h4>
                        <p><FaStar />  {product.rating.rate}</p>
                        <p>{product.rating.count} ( Votos )</p>
                        <h4>R$ {product.price.toFixed(2)}</h4>
                        <button onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</button>
                    </div>
                ))}
            </div>

            {/* Modal do Carrinho */}
            {showCart && (
                <div className="cart-modal">
                    <div className="cart-content">
                        <button className="close-cart" onClick={toggleCart}>Fechar</button>
                        <h2>Seu Carrinho</h2>
                        {cart.length === 0 ? (
                            <p>O Carrinho está vazio</p>
                        ) : (
                            <div className="cart-items">
                                {cart.map((item, index) => (
                                    <div key={index} className="cart-item">
                                        <p>{item.title}</p>
                                        <div className="quantity">
                                            <button onClick={() => handleDecrement(index)}>-</button>
                                            <p>{item.quantity}</p>
                                            <button onClick={() => handleIncrement(index)}>+</button>
                                        </div>
                                        <p className="price">R$ {item.price.toFixed(2)}</p>
                                        <p className="total">Total: R$ {item.total.toFixed(2)}</p>
                                        <button className="remove-item" onClick={() => handleRemove(index)}>Remover</button>
                                    </div>
                                ))}
                                <div className="cart-total">
                                    <h3>Total do Carrinho: R$ {calculateTotal().toFixed(2)}</h3>
                                </div>
                                <button className="finalize-button" onClick={finalizePurchase}>Finalizar Compra</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Products;
