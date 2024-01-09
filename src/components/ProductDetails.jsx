

import { useParams } from "react-router-dom"
// import { useOutletContext } from "react-router-dom"

const ProductDetails = () => {

// const [cartItems, setCartItems] = useOutletContext()

    const {id} = useParams()

    return (
        <h1>{id}</h1>

    )
}

export default ProductDetails