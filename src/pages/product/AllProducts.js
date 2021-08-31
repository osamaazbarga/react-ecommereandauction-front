import React, { useEffect, useState } from 'react'
import AdminNav from '../../components/nav/AdminNav'
import { getProductsByCount, removeProduct } from '../../function/product'
import AdminProductCard from '../../components/cards/AdminProductCard'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'

const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    //redux
    const {user}= useSelector((state => ({...state})))
    useEffect(() => {
        loadAllProducts()
        

    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProductsByCount(5)
            .then((res) => {

                setProducts(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    const handleRemove=(slug)=>{
        if(window.confirm('Delete?')){
            removeProduct(slug,user.token)
            .then(res=>{
                loadAllProducts()
                toast.error(`${res.data.title} is deleted`)
            })
            .catch(err=>{
                if(err.response.status===400) {
                    
                    toast.error(err.response.data)
                }
            })
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"><AdminNav /></div>
                <div className="col">
                <h4>All Products</h4>

                        <div className="row">
                            {
                                products.map(product => {
                                    return (
                                        <div className="col-md-4 pd-3" key={product._id}>
                                            <AdminProductCard 
                                                product={product} 
                                                handleRemove={handleRemove}/>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    
                </div>
            </div>
        </div>
    )
}

export default AllProducts
