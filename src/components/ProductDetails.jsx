
import { useParams, useLocation } from "react-router-dom"

const ProductDetails = () => {

    const { state } = useLocation();
    const { id } = useParams()

    const { title, image, price, description } = state

    return (
        <div className="product-page-container">
            <img className="full-size-product" src={image} alt="" /> 
            <h1>{title}</h1>
            <h2>£{price.toFixed(2)}</h2>
            <h3>{description}</h3>
        </div>
    )
}

export default ProductDetails