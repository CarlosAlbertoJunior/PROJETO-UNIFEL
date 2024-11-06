import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductsDetails.css";

function ProductsDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const { id } = params;

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const json = await response.json();
            setProduct(json);
        };
        getData();
    }, [id]);

    // Função para voltar à página de produtos
    const goBack = () => {
        navigate('/products'); // caminho para a rota da  página de produtos
    };

    console.log(params);

    return (
        <div className="products-details-h1">
            <h1>DETALHES DO PRODUTO</h1>
            <button className="button-detalhes-voltar" onClick={goBack}>Voltar</button>
            <div className="products-details">
                <p>CATEGORIA: {product.category}</p>
                <p>{product.title}</p>
                <h2>{product.description}</h2>
                <img src={product.image} alt="" />
                <p>R$ {product.price} Reais</p>
            </div>
           
        </div>
    );
}

export default ProductsDetails;
