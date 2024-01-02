
const CartCount = ({state}) => {

    const quant = state.reduce(
        (acc, cur) => acc + cur.quantity, 0)

    return (
        <div className="cart-quantity" data-testid="cart-quantity">{ state.length >= 1 && quant }</div>
    )
}

export default CartCount