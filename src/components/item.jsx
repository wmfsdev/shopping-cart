
function Item ({title, img}) {
   console.log(img)
    return (
        <div className="product">
            <img src={img} alt="" />
            <h2>{title}</h2>
        </div>
    )
}

export default Item