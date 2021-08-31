import React, { useEffect, useState } from 'react'
import { getProducts } from '../../function/product'
import ProductCard from '../cards/ProductCard'
import LoadingCard from '../cards/LoadingCard'

const NewArrivals = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        //send sor,order,limit
        getProducts('createdAt','desc',6)
            .then((res) => {

                setProducts(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }
    return (
        <div>
            

            
            <div className="container">
                {loading?
                (<LoadingCard count={3}/>):<div className="row">
                    {products.map((product)=>{
                        return(
                            <div key={product._id} className="col-md-2">
                                <ProductCard product={product} />
                            </div>
                        )
                    })}
                </div>}
            </div>
        </div>

    )
}

export default NewArrivals
