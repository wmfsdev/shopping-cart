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
        const quantity = data.get("quantity")
        const item = {
            title: title,
            img: img,
            price: price
        }
        setCartItems([...cartItems, {item: item, id: id, quantity: Number(quantity)}])
        console.log("worked")
    }

    function updateCart(e) {
        console.log("updating")
        
        const data = new FormData(e.target)
        const quantity = data.get("quantity")

        setCartItems(cartItems.map(item => {
            if (item.id === id) {
                const currentQuantity = Number(item.quantity)
                return { ...item, quantity: Number(quantity) + currentQuantity }
            } else {
                return item
            }
        }))
    }
   
    return (
        <>
        <form aria-labelledby="item quantity" action="" onSubmit={handleClick}>
        <input type="number" id="quantity" name="quantity" placeholder="0" required/>
        <button type="submit" name="1">ADD</button>
        </form>
        </>
    )
}

export default Purchase