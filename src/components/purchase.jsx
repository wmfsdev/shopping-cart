import { useOutletContext } from "react-router-dom"

const Purchase = ({title, img, price, id}) => {

    const [cartItems, setCartItems] = useOutletContext()

    function addToCart(e) {
        e.preventDefault()
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
    
    return (
        <>
        <form action="" onSubmit={addToCart}>
        <input type="number" id="quantity" name="quantity" placeholder="0"/>
        {/* <button type="submit" onClick={addToCart}>ADD</button> */}
        <button type="submit">ADD</button>
        </form>
        </>
    )
}

export default Purchase