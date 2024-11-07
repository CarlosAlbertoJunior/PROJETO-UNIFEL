import { useState, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Products.css";


function Products() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false); // Estado para controlar a exibição do modal
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://fakestoreapi.com/products/');
            const json = await response.json();
            setProducts(json);
        };
        getData();
    }, []);

    const handLeClick = (product) => {
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
        setShowCart(!showCart); // Alterna entre mostrar e esconder o modal
    };

    const goPage = (id) => {
        navigate(`/products/${id}`);
    }
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
                        <button className="button-details" onClick={() => goPage(product.id)}>
                        <p>{product.title}</p>
                        <img width='158.19px' height='270px' src={product.image} alt="" /><br />
                        </button>
                        <h4>AVALIAÇÕES</h4>

                        <p><FaStar />  {product.rating.rate}</p>
                        <p>{product.rating.count} ( Votos )</p>
                        <h4>R$ {product.price.toFixed(2)}</h4>
                        <button onClick={() => handLeClick(product)}>Adicionar ao Carrinho</button>
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
                            <div>
                                {cart.map((item, index) => (
                                    <div key={index} className="cart-item">
                                        <p>{item.title}</p>
                                        <p>Quantidade: {item.quantity}</p>
                                        <p>Preço Unitário: R$ {item.price.toFixed(2)}</p>
                                        <p>Total: R$ {item.total.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Products;
