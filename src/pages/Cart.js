import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCartInCheckout from '../components/cards/ProductCartInCheckout'
import {userCart}from '../function/user'

const Cart = ({history}) => {
    const { cart, user } = useSelector((state) => ({ ...state }))
    const dispach = useDispatch()

    const getTotal=()=>{
        return cart.reduce((currentValue,nextValue)=>{
            return currentValue+nextValue.count*nextValue.price
        },0)
    }

    const saveOrderToDb=()=>{
        //console.log("cart",JSON.stringify(cart,null,4));
        userCart(cart,user.token)
        .then((res)=>{
            console.log('CART POST RES',res);
            if(res.data.ok){
                history.push('/checkout')
            }
        })
        .catch((err)=>{
            console.log('cart save err',err);
        })
        
    }

    const saveCashOrderToDb=()=>{
        dispach({
            type:"COD",
            payload:true
        })
        //console.log("cart",JSON.stringify(cart,null,4));
        userCart(cart,user.token)
        .then((res)=>{
            console.log('CART POST RES',res);
            if(res.data.ok){
                history.push('/checkout')
            }
        })
        .catch((err)=>{
            console.log('cart save err',err);
        })
    }
    const showCartItem=()=>{
        return (
            <table className="table table-boardered">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Count</th>
                        <th scope="col">Shipping</th>
                        <th scope="col">Remove</th>

                    </tr>
                </thead>
                {cart.map((p)=>{
                    return (
                        <ProductCartInCheckout key={p._id} p={p}/>
                    )
                })}
            </table>
        )
    }

    return (
        <div className="container-fluid pt-2">

            <div className="row">
                <div className="col-md-8">
                    <div className="row">
                        <h4>Cart / {cart.length} Product</h4>
                    </div>
                    {!cart.length ? <h4>No Products in Cart. <Link to="/shop">Continue Shopping.</Link></h4>
                        :
                        showCartItem()
                    }
                </div>

                <div className="col-md-4">
                    <h4>Order Summary</h4>
                    <hr/>
                    <p>Products </p>
                    {cart.map((c,i)=>{
                        return(
                            <div key={i}>
                                <p>{c.title} x {c.count}=${c.price*c.count} </p>
                            </div>
                        )
                    })}

                    <hr/>
                    Total: <b>${getTotal()}</b>
                    <hr/>

                    {
                        user?(
                            <div>
                                <button onClick={saveOrderToDb} disabled={!cart.length} className="btn btn-sm btn-primary mt-2">Procced to Checkout</button>
                                <br/>
                                <button onClick={saveCashOrderToDb} disabled={!cart.length} className="btn btn-sm btn-warning mt-2">Pay Cash on Delivery</button>
                            </div>
                        ):(
                            <button className="btn btn-sm btn-primary mt-2"><Link to={{pathname:"login",state:{from:"cart"}}}>Login to Checkout</Link></button>

                        )
                    }
                </div>

            </div>


        </div>
    )
}

export default Cart
