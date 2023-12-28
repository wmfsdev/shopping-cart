import { useState, useEffect } from "react"
import Item from "./item"
import Error from "./error"

const Products = () => {

  const [data, setData] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=5')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error));
  }, []);
  
  return (
      <>
      <h1>PRODUCTS!!</h1>
      <div className="product-view">
        { data && data.map((obj) => (
          <Item
            key={obj.id}
            title={obj.title}
            img={obj.image}
            price={obj.price}
            id={obj.id}
          />
        ))} 
      </div>
      
      { error && <Error error={error}/> }
    </>
  )
}

export default Products