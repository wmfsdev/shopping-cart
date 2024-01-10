import { Link } from "react-router-dom"

import Purchase from "./purchase"

const Item = ({title, img, price, desc, id}) => {

    return (
        <div className="product">
            <img src={img} alt="" />
            {/* <h2> {title} </h2> */}
            <Link to={`${id}`} state={{title, img, price, desc}}>{title}</Link>
            <p>£{price}</p>
            <Purchase title={title} img={img} price={price} id={id}/>
        </div>
    )
}

export default Item