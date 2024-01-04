import { useState } from "react"

const CartItem = ({cartState, itemIndex, setCartItems}) => {
console.log(cartState)
const [inputValue, setInputValue] = useState(cartState[itemIndex].quantity)

function handleChange(e) {
    setInputValue(e.target.value)
}

function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const quantity = data.get("quantity")
    console.log(quantity)

    setCartItems(cartState.map(item => {
        if (item.id === cartState[itemIndex].id) {
        //  const currentQuantity = Number(item.quantity)
            return { ...item, quantity: Number(quantity) }
        } else {
            return item
        }
    }))
}

    return (
        <>
        <p>{cartState[itemIndex].item.title}</p>
        <form action="" onSubmit={handleSubmit}>
        <input type="number" name="quantity" value={inputValue} onChange={handleChange}/>
        <button type="submit">UPDATE</button>
        </form>
        </>
    )
}

export default CartItem