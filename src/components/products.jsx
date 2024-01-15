import { useState, useEffect } from "react"
import Item from "./item"
import Error from "./error"
import ProductNav from "./ProductNav"

const Products = () => {

  const [data, setData] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [displayCount, setDisplayCount] = useState(5)

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products?limit=${displayCount}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(true))
  }, [displayCount]);
  
  return (
    <>
    <h1>Browse Our Product Range</h1>
      <div className="product-view">
        { data && data.map((obj) => (
          <Item
            key={obj.id}
            title={obj.title}
            image={obj.image}
            price={obj.price}
            description={obj.description}
            id={obj.id}
          />
        ))}
        { loading && <ProductNav displayCount={displayCount} setDisplayCount={setDisplayCount}/> }
      </div>
      { error && <Error error={error}/> }
    </>
  )
}

export default Products