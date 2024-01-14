
import { useOutletContext } from "react-router-dom"
import CartItem from "./CartItem"
import CartTotal from "./CartTotal"

const Cart = () => {

const [cartItems, setCartItems] = useOutletContext()

    return (
        <>
        { cartItems.length !== 0 ? <h1>Your Purchases</h1> : null }
        <div className="cart-items-container">
            { cartItems.length !== 0 ? cartItems.map((item, index) => (
                <CartItem
                    key={index}
                    cartState={cartItems}
                    itemIndex={index}
                    setCartItems={setCartItems}
                />
            )) : <h1>Your Cart Is Empty</h1>
            }
        { cartItems.length !== 0 ? <CartTotal cartState={cartItems} /> : null  } 
        </div>
        </>
    )
}

export default Cart