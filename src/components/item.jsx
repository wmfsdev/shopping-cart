import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

import Purchase from "./purchase"

const Item = ({title, image, price, description, id}) => {

    return (
        <div className="product">
            <div className="product-img-container">
                <img src={image} alt="" /> 
            </div>
            <div className="purchase-info">
                <Link to={`${id}`} state={{title, image, price, description}}>{title}</Link>
                <p>£{price.toFixed(2)}</p>
                <Purchase title={title} image={image} price={price} description={description} id={id}/>
            </div>
           
        </div>
    )
}

Item.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    id: PropTypes.number,
    
}

export default Item