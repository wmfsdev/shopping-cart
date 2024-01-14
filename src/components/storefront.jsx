import { useEffect, useState } from "react"

const Storefront = () => {

    const [data, setData] = useState(false)
    const [error, setError] = useState(false)

    function random(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    useEffect(() => {
      fetch(`https://fakestoreapi.com/products/${random(1, 30)}`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => setError(error))
    }, []);

    console.log(data)

    return (
        <div className="store-front-container">
            <img src={data.image} alt="" />
            <h1>TRENDING PRODUCTS</h1>
        </div>
    )
}

export default Storefront