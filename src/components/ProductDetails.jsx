
import { useParams, useLocation } from "react-router-dom"

const ProductDetails = () => {

    const { state } = useLocation();
    const { id } = useParams()

    const { title, img, price, desc } = state

    return (
        <>
     
        <img className="full-size-product" src={img} alt="" /> 
        <h1>{title}</h1>
        <h2>£{price}</h2>
        <h3>{desc}</h3>
        </>

    )
}

export default ProductDetails