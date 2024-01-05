
import { useOutletContext } from "react-router-dom"
import CartItem from "./CartItem"

const Cart = () => {

const [cartItems, setCartItems] = useOutletContext()
// console.log(cartItems)
    return (
        <>
        <h1>Cart</h1>
        { cartItems && cartItems.map((item, index) => (
            <CartItem
                key={index}
                cartState={cartItems}
                itemIndex={index}
                setCartItems={setCartItems}
            />
        ))}
        
        {/* <div>{cartItems}</div> */}
        </>
    )
}

export default Cart