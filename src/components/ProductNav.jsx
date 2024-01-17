
import PropTypes from 'prop-types'

const ProductNav = ({displayCount, setDisplayCount}) => {

    return (
        <div className="product-nav-footer">
            <label>No. of Products To Display:
            <select 
                value={displayCount} 
                onChange={(e) => setDisplayCount(e.target.value)} 
                name="product-display" 
                id="display-count"
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
            </label>
        </div>
    )
}

ProductNav.propTypes = {
    displayCount: PropTypes.number,
    setDisplayCount: PropTypes.func,
}


export default ProductNav