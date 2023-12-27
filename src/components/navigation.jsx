import { Link, Outlet } from "react-router-dom"
import { useState } from "react"

const Navigation = () => {

  const [cartItems, setCartItems] = useState([])
  
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
            {/* <div className="cart-count">{cartItems}</div> */}
            </li>
          </ul>
          {/* <div>{cartItems}</div> */}
        </nav>
        <Outlet context={[cartItems, setCartItems]}/>
        </>
    )
}

export default Navigation