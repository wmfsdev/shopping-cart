
import { useOutletContext } from "react-router-dom"
import CartItem from "./CartItem"

const Cart = () => {

const [cartItems, setCartItems] = useOutletContext()
console.log(cartItems)
    return (
        <>
        <h1>CART</h1>
        { cartItems.length !== 0 ? cartItems.map((item, index) => (
            <CartItem
                key={index}
                cartState={cartItems}
                itemIndex={index}
                setCartItems={setCartItems}
            />
        )) : <h2>Your Cart Is Empty</h2>
        }
        </>
    )
}

export default Cart