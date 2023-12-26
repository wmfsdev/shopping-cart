import { Link, Outlet } from "react-router-dom"

const Navigation = () => {

  // state for cart contents: items, item count
  // passed to Cart and to Purchase via Products -> Item

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
          </ul>
        </nav>
        <Outlet />
        </>
    )
}

export default Navigation