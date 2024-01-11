import { Link } from "react-router-dom"

import Purchase from "./purchase"

const Item = ({title, img, price, desc, id}) => {

    return (
        <div className="product">
            <div className="product-img-container">
                <img src={img} alt="" /> 
            </div>
            <Link to={`${id}`} state={{title, img, price, desc}}>{title}</Link>
            {/* <h2> {title} </h2> */}
            <p>£{price}</p>
            <Purchase title={title} img={img} price={price} id={id}/>
        </div>
    )
}

export default Item