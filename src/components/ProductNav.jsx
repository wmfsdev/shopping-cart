import { useState } from "react"

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

export default ProductNav