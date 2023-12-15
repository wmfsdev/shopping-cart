import { useState, useEffect } from "react"

const Products = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)

    useEffect(() => {
      fetch('https://fakestoreapi.com/products?limit=5')
        .then((response) => response.json())
        .then((user) => setUser(user))
        .catch((error) => {
          console.log("product", error)
          setError(error)
        });
    }, []);
    //console.log(error)

    return (
        <>
        <h1>PRODUCTS!!</h1>
        { error && <div>API is down</div> }
      </>
    )
}

export default Products