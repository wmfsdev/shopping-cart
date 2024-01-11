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
    <h1>Browse our product range</h1>
      <div className="product-view">
      {/* <h1>Browse our product range</h1> */}
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
      </div>
      
      { error && <Error error={error}/> }
    </>
  )
}

export default Products