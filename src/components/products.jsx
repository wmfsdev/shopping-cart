import { useState, useEffect } from "react"
import Item from "./item"
import Error from "./error"
import ProductNav from "./ProductNav"

const Products = () => {

  const [data, setData] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [limit, setLimit] = useState(5)

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products?limit=${limit}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(true))
  }, [limit]);
  
  return (
      <>
    <h1>Browse Our Product Range</h1>
      <div className="product-view">
        { data && data.map((obj) => (
          <Item
            key={obj.id}
            title={obj.title}
            img={obj.image}
            price={obj.price}
            desc={obj.description}
            id={obj.id}
          />
        ))}
        { loading && <ProductNav limit={limit} setLimit={setLimit}/> }
      </div>
      { error && <Error error={error}/> }
    </>
  )
}

export default Products