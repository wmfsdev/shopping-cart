   import { useOutletContext } from "react-router-dom"

const Purchase = () => {

    const [cartItems, setCartItems] = useOutletContext()
    
    return (
        <>
        <form action="">
        <input type="number" placeholder="0"/>
        <button type="submit">ADD</button>
        <p>{cartItems}</p>
        </form>

        </>
    )
}

export default Purchase