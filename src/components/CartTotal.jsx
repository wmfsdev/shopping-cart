const CartTotal = ({cartState}) => {

    const total = cartState.reduce(
        (acc, cur) => acc + (cur.item.price * cur.quantity), 0)

    return (
        <div className="cart-total">
            <h2>TOTAL</h2>
            <p>£{total.toFixed(2)}</p>
        </div>
    )
}

export default CartTotal