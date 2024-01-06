import { useState } from "react"

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
        
        <div className="cart-item">
            <p>{cartState[itemIndex].item.title}</p>
            <form action="" onSubmit={handleSubmit}>
                <input type="number" name="quantity" value={inputValue} onChange={handleChange} min={0}/>
                <button type="submit">UPDATE</button>
                <button onClick={(e) => handleClick(cartState[itemIndex].id, e)}>REMOVE</button>
            </form>
            <div className="item-sub-total">£{itemSubTotal}0</div>
        </div>
    )
}

export default CartItem