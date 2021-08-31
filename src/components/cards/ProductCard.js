import React ,{useState}from 'react'
import { Card,Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import defaultImage from '../../images/defaultimageproduct.png'
import { Link } from 'react-router-dom'
import { showAverage} from '../../function/rating'
import _ from 'lodash'
import {useSelector,useDispatch} from 'react-redux'

const { Meta } = Card;

const ProductCard = ({ product }) => {
    const { title, description, price, images, slug } = product
    
    const [tooltip,setTooltip]=useState('Click to add')

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

            //show cart items in side drawer
            dispach({
                type:"SET_VISABLE",
                payload:true,
            })
            
        }
    }
    return (
        <div>
            <div className="text-center pt-1 pb-3">
            {
                    product&&product.ratings&&product.ratings.length>0?showAverage(product):<div className="">No rating yet</div>
            }
            </div>
            
            <Card
                hoverable
                // style={{ width: 240 }}
                cover={<img
                    src={images && images.length ? images[0].url : defaultImage}
                    style={{ height: 150, objectFit: "cover" }}
                    className="p-1"
                />}
                actions={[
                    <Link to={`/product/${slug}`}><EyeOutlined className="text-warning" />
                        <br />View
                    </Link>,
                    <Tooltip title={tooltip}>
                        <a onClick={handleAddToCart} disabled={product.quantity<1}>
                            <ShoppingCartOutlined className="text-danger" /><br />
                            
                            {product.quantity<1?'Out of stock':"Add to Cart"}
                        </a>
                    </Tooltip>,
                ]}
            >
                <Meta title={`${title} - $${price}`} description={`${description && description.substring(0, 40)}...`} />

            </Card>
        </div>
    )
}

export default ProductCard
