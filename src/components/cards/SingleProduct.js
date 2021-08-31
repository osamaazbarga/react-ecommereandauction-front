import React,{useState} from 'react'
import { Card, Tabs,Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import defaultImageProduct from '../../images/defaultimageproduct.png'
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings'
import _ from 'lodash'
import {useSelector,useDispatch} from 'react-redux'

import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../function/rating';
import {removeWishlist,getWishlist, addToWishlist} from '../../function/user'
import { toast } from 'react-toastify';

import { useHistory } from 'react-router';

const { TabPane } = Tabs

const SingleProduct = ({ product, onStarClick, star }) => {
    const { title, images, slug, description, _id } = product
    const [tooltip,setTooltip]=useState('Click to add')

    //router
    let history=useHistory()

    //redux
    const {user,cart}=useSelector((state)=>({...state}))
    const dispach=useDispatch()
    
    const handleAddToCart=()=>{
        
        //create cart array
        let cart=[]
        if(typeof(window)!='undefined'){
            //if cart is in localstorage get it
            if(localStorage.getItem('cart')){
                cart=JSON.parse(localStorage.getItem('cart'))
            }
            //push new product to cart
            cart.push({
                ...product,
                count:1,
            })
            //remove duplicates
            let unique=_.uniqWith(cart,_.isEqual)
            //save to localstorage
            //console.log('unique',unique)
            localStorage.setItem('cart',JSON.stringify(unique))
            //show toolTip
            setTooltip("Added")

            //add to redux state
            dispach({
                type:"ADD_TO_CART",
                payload:unique,
            })
        }
    }

    const handleAddToWishlist=(e)=>{
        e.preventDefault()
        addToWishlist(product._id,user.token).then((res)=>{
            console.log('ADDED TO WISHLIST',res.data);
            toast.success('Added to wishlist')
            history.push('/user/wishlist')
        })
    }


    return (
        <div className="row pt-4">
            <div className="col-md-7">
                {images && images.length ? <Carousel
                    showArrows={true}
                    autoPlay
                    infiniteLoop
                >
                    {images && images.map((i) => {
                        return (
                            <img src={i.url} key={i.public_id} />
                        )
                    })}
                </Carousel>
                    : (
                        <Card

                            cover={<img
                                src={defaultImageProduct}
                                className="mb-3 card-image"
                            />}

                        >

                        </Card>
                    )
                }
            </div>

            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>
                <div className="text-center pt-1 pb-3">
                    {
                        product && product.ratings && product.ratings.length > 0 ? showAverage(product) : <div className="text-center pt-1 pd-3">No rating yet</div>
                    }
                </div>

                <Card
                    actions={[
                        <Tooltip title={tooltip}>
                        <div onClick={handleAddToCart}><ShoppingCartOutlined className="text-danger" /><br />Add to Cart</div>
                    </Tooltip>,
                        <a onClick={handleAddToWishlist}><HeartOutlined className="text-info" /><br /> Add to Wishlist</a>,
                        <RatingModal>
                            {/* <StarRating
                        name={_id}
                        numberOfStars={5}
                        rating={5}
                        changeRating={onStarClick}
                        isSelectable={true}
                        starRatedColor="gray"
                        // starHoverColor="#FFC300"
                    /> */}
                            <StarRating
                                rating={star}
                                starRatedColor="#FFC300"
                                starHoverColor="#FFC300"
                                changeRating={onStarClick}
                                numberOfStars={5}
                                name={_id}
                            />
                        </RatingModal>
                    ]}
                >
                    {/* <Meta title={title} description={description} /> */}
                    <ProductListItems product={product} />
                </Card>
            </div>

            <div className="card-container">
                <Tabs type="card">
                    <TabPane tab="Description" key="1">{description && description}</TabPane>
                    <TabPane tab="More" key="2">Call use On Number</TabPane>

                </Tabs>
            </div>

        </div>
    )
}

export default SingleProduct
