import { useOutletContext } from "react-router-dom"

const Purchase = ({title, img, price, id}) => {

    const [cartItems, setCartItems] = useOutletContext()
    console.log([cartItems, setCartItems])

    function test() {
        console.log("test")
    }

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
        <form aria-labelledby="item quantity" action="" onSubmit={test}>
        <input type="number" id="quantity" name="quantity" placeholder="0"/>
        <button type="submit" name="1">ADD</button>
        </form>
        </>
    )
}

export default Purchase