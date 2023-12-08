import { Link, Outlet } from "react-router-dom"

const Navigation = () => {
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