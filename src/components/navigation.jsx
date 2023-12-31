import { Link, Outlet } from "react-router-dom"
import { useState } from "react"

const Navigation = () => {

  const [cartItems, setCartItems] = useState([])
  console.log(cartItems)
    return (
        <>
        <nav>
          <ul className="nav-list">
            <li>
            <Link to={"storefront"}>HOME</Link>
            </li>
            <li>
            <Link to={"products"}>STORE</Link>
            </li>
            <li>
            <Link to={"cart"}>CART</Link>
            </li>
            
            <div>{ cartItems.length >= 1 && cartItems[0].quantity}</div>
          </ul>
        </nav>
        <Outlet context={[cartItems, setCartItems]}/>
        </>
    )
}

export default Navigation