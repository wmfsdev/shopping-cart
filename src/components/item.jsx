
import Purchase from "./purchase"

const Item = ({title, img, price, id}) => {

    return (
        <div className="product">
            <img src={img} alt="" />
            <h2>{title}</h2>
            <p>£{price}</p>
            <Purchase title={title} img={img} price={price} id={id}/>
        </div>
    )
}

export default Item