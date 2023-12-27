import { useOutletContext } from "react-router-dom"

const Purchase = ({title, img, price, id}) => {

    const [cartItems, setCartItems] = useOutletContext()

    function handleClick(e) {
        e.preventDefault()

        if (cartItems.some(obj => obj.id === id)) {
            updateCart(e)
        } else addToCart(e)
    }
    
    function addToCart(e) {
        const data = new FormData(e.target)
        const quantity = data.get("quantity");
    
        const item = {
            title: title,
            img: img,
            price: price
        }
        setCartItems([...cartItems, {item: item, id: id, quantity: Number(quantity)}])
        console.log(cartItems)
    }

    function updateCart(e) {
        console.log("updating")
    }
    
    return (
        <>
        <form action="" onSubmit={handleClick}>
        <input type="number" id="quantity" name="quantity" placeholder="0"/>
        {/* <button type="submit" onClick={addToCart}>ADD</button> */}
        <button type="submit">ADD</button>
        </form>
        </>
    )
}

export default Purchase