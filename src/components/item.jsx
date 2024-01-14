import { Link } from "react-router-dom"

import Purchase from "./purchase"

const Item = ({title, img, price, desc, id}) => {

    return (
        <div className="product">
            <div className="product-img-container">
                <img src={img} alt="" /> 
            </div>
            <div className="purchase-info">
                <Link to={`${id}`} state={{title, img, price, desc}}>{title}</Link>
                <p>£{price}</p>
                <Purchase title={title} img={img} price={price} id={id}/>
            </div>
           
        </div>
    )
}

export default Item