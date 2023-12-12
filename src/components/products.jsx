import { useState, useEffect } from "react"

const Products = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)

    useEffect(() => {
      fetch('https://fakestoreapi.com/products?limit=5')
        .then((response) => response.json())
        .then((user) => setUser(user))
        .catch((error) => setError(error.message));
    }, []);

    return (
        <>
        <h1>PRODUCTS!!</h1>
        { error && <div className='fetch-error'>API is down</div> }
      </>
    )
}

export default Products