import PropTypes from 'prop-types'

const CartCount = ({state}) => {

    const quantity = state.reduce((acc, cur) => acc + cur.quantity, 0)

    return (
        <div className="cart-quantity" data-testid="cart-quantity">{ state.length >= 1 && quantity }</div>
    )
}

CartCount.propTypes = {
    state: PropTypes.array, 
}

export default CartCount