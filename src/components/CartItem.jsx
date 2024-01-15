import { useState } from "react"
import { Link } from "react-router-dom"

const CartItem = ({cartState, itemIndex, setCartItems}) => {

const [inputValue, setInputValue] = useState(cartState[itemIndex].quantity)

const itemSubTotal = cartState[itemIndex].item.price * cartState[itemIndex].quantity


function handleChange(e) {
    setInputValue(e.target.value)
}

function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const quantity = data.get("quantity")

    setCartItems(cartState.map(item => {
        if (item.id === cartState[itemIndex].id) {
            return { ...item, quantity: Number(quantity) }
        } else {
            return item
        }
    }))
}

function handleClick(cartItemId, e) {
    e.preventDefault()
    setCartItems(cartState.filter(item => item.id !== cartItemId))
}

    return (
        
        <div className="cart-items">
            
            <form aria-labelledby="test" className="cart-item" action="" onSubmit={handleSubmit}>
                <Link to={`../products/${itemIndex + 1}`} state={cartState[itemIndex].item}>{cartState[itemIndex].item.title}</Link>
                <input type="number" name="quantity" value={inputValue} onChange={handleChange} min={0}/>
                <button type="submit">UPDATE</button>
                <button onClick={(e) => handleClick(cartState[itemIndex].id, e)}>REMOVE</button>
               
            </form>
             <div className="item-sub-total">£{itemSubTotal.toFixed(2)}</div>
        </div>
    )
}

export default CartItem