
import Purchase from "./purchase"

const Item = ({title, img, price}) => {

    return (
        <div className="product">
            <img src={img} alt="" />
            <h2>{title}</h2>
            <p>£{price}</p>
            <Purchase />
        </div>
    )
}

export default Item