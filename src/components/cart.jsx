
import { useOutletContext } from "react-router-dom"


const Cart = () => {

const [cartItems, setCartItems] = useOutletContext()

    return (
        <>
        <h1>Cart</h1>
        {/* <div>{cartItems}</div> */}
        </>
    )
}

export default Cart