import React,{useState,useEffect} from 'react'
import SingleProduct from '../components/cards/SingleProduct'
import {getProduct,productStar} from '../function/product'
import { useSelector } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import { getRelated } from '../function/product'
const ProductView = ({match}) => {
    const [product,setProduct]=useState({})
    const [related,setRelated]=useState([])
    const [star,setStar]=useState(0)
    //redux user
    const {user}=useSelector((state)=>({...state}))

    const {slug}=match.params
    useEffect(() => {
        loadSingleProduct();
    }, [slug])

    useEffect(() => {
        if (product.ratings && user) {
            let existingRatingObject = product.ratings.find(
              (ele) => ele.postedBy.toString() === user._id.toString()
            );
            existingRatingObject && setStar(existingRatingObject.star); // current user's star
          }
        // if(product.ratings&&user){
        //     //console.log("product.ratings",product.ratings.length);
        //     let existingRatingObject = product.ratings
        //     let lastRating=existingRatingObject[existingRatingObject.length-1];
        //     if(lastRating){
        //         setStar(lastRating.star)
        //     }
            
        //     let existingRatingObject1 = product.ratings.find((ele) =>
        //         (ele.postedBy.toString() === user._id.toString())
        //     )
        //     console.log("existingRatingObject1",existingRatingObject1);
        //     //existingRatingObject&&setStar(existingRatingObject.star)//corrent user stars
        // }
    })
    const loadSingleProduct=()=>{
        getProduct(slug)
        .then((res)=>{
            setProduct(res.data)
            //load related
            getRelated(res.data._id)
            .then((res)=>{
                setRelated(res.data)
            })
        })
    }

    const onStarClick=(newRating,name)=>{
        setStar(newRating)
        console.table(newRating,name,star)
        productStar(name,newRating,user.token)
        .then((res)=>{
            console.log("rating clicked",res.data);
            loadSingleProduct();//if you want to show updated rating in real time
        })
    }
    return (
        <div className="container">

            <SingleProduct product={product} onStarClick={onStarClick} star={star}/>
            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr/><h4>Reload Products</h4><hr/>
                    </div>
            </div>
            <div className="row pb-5">
                {related.length?
                    related.map((r)=>{
                        return <div key={r._id} className="col-md-4">
                            <ProductCard product={r}/>
                        </div>
                    })
                :<div className="text-center col">No products found</div>}

            </div>
        </div>
    )
}

export default ProductView
