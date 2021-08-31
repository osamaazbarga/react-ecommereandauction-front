import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { applyCoupon,getUserCart ,saveUserAddress,createCashOrderForUser,emptyUserCart} from '../function/user' 
import {toast} from 'react-toastify'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Checkout = ({history}) => {
    const dispach=useDispatch()
    const {user,COD}=useSelector((state)=>({...state}))
    const couponTrueOrFalse=useSelector((state)=>state.coupon)

    const [products,setProducts]=useState([])
    const [total,setTotal]=useState(0)
    const [address,setAddress]=useState("")
    const [addressSaved,setAddressSaved]=useState(false)
    const [coupon,setCoupon]=useState('')
    //discount price
    const [totalAfterDiscount,setTotalAfterDiscount]=useState(0)
    const [discountError,setDiscountError]=useState('')
    



    useEffect(()=>{
        getUserCart(user.token)
        .then((res)=>{
            console.log('user cart res',JSON.stringify(res.data,null,4));
            setProducts(res.data.products)
            setTotal(res.data.cartTotal)
        })
    },[])

    const saveAddressToDb=()=>{
        // console.log("");
        saveUserAddress(user.token,address)
        .then((res)=>{
            if(res.data.ok){
                setAddressSaved(true)
                toast.success("Address Saved")
            }
        })
    }

    const applyDiscountCoupon=()=>{
        console.log('send coupon to backend',coupon);
        //applyCoupon
        applyCoupon(user.token,coupon)
        .then((res)=>{
            console.log('RES ON COUPON APPLIED',res.data);
            if(res.data){
                setTotalAfterDiscount(res.data)
                //update redux coupon applied true/false
                dispach({
                    type:"COUPON_APPLIED",
                    payload:true
                })
            }
            //error
            if(res.data.err){
                setDiscountError(res.data.err)
                //update redux coupon applied true/false
                dispach({
                    type:"COUPON_APPLIED",
                    payload:false
                })
            }
        })
    }

    const showAddress=()=>{
        return(
            <div>
                <ReactQuill
                    theme="snow" value={address} onChange={setAddress}/>
                <button onClick={saveAddressToDb} className="btn btn-primary mt-2">Save</button>
            </div>
        )

    }

    const showProductSummary=()=>{
        return(
            
                products.map((p,i)=>{
                    return (
                        <div>
                            <p>{p.product.title} x {p.count} = {p.product.price*p.count}</p>
                        </div>
                    )
                })
            
        )
    }

    const showApplyCoupon=()=>{
        return(
            <div>
                <input 
                    onChange={(e)=>{
                        setCoupon(e.target.value)
                        setDiscountError("")
                    }}
                    value={coupon}
                    type="text"
                    className="form-control"
                />
                <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">Apply</button>
            </div>
        )
    }

    const emptyCart=()=>{
        //remove from localstorage
        if(typeof(window)!=='undefined'){
            localStorage.removeItem("cart")
        }
        //remove from redux
        dispach({
            type:'ADD_TO_CART',
            payload:[]
        })

        //remove from backend
        emptyUserCart(user.token)
        .then((res)=>{
            setProducts([])
            setTotal(0)
            setTotalAfterDiscount(0)
            setCoupon("");
            toast.success("Cart is Empty,contniue shopping")
        })

    }

    const createCashOrder=()=>{
        createCashOrderForUser(user.token,COD,couponTrueOrFalse)
        .then((res)=>{
            console.log('USER CADH ORDER CREATED RES',res);
            //empty cart from redux, local storage, reset coupon, reset COD, redirect
            if(res.data.ok){
                //emprty localstorage
                if(typeof(window)!=="undefined"){
                    localStorage.removeItem('cart')
                }

                //empty redux cart
                dispach({
                    type:'ADD_TO_CART',
                    payload:[]
                })

                //empty redux coupon
                dispach({
                    type:'COUPON_APPLIED',
                    payload:false
                })

                //empty redux COD
                dispach({
                    type:'COD',
                    payload:false
                })

                //empty cart from backend
                emptyUserCart(user.token);

                //redirect
                setTimeout(()=>{
                    history.push('/user/history')
                },1000)
            }
        })
    }

    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br/>
                <br/>
                {showAddress()}
                <hr/>
                <h4>Got Coupon?</h4>
                <br/>
                {showApplyCoupon()}
                
                {discountError&&<p className="text-danger p-2">{discountError}</p>}
            </div>
            <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr/>
                <p>Products {products.length}</p>
                <hr/>
                <p>List of Products</p>
                {showProductSummary()}
                <hr/>
                <p>Cart total: {total}$</p>
                {totalAfterDiscount>0&&(
                    <div className="bg-success p-2">Discount Applied : Total Payable {totalAfterDiscount}$</div>
                )}
                <div className="row">
                    <div className="col-md-6">
                        {COD?(<button 
                            disabled={!addressSaved||!products.length} 
                            className="btn btn-primary"
                            onClick={createCashOrder}
                        >Place Order
                        </button>):(<button 
                            disabled={!addressSaved||!products.length} 
                            className="btn btn-primary"
                            onClick={()=>history.push("/payment")}
                        >Place Order
                        </button>)}
                    </div>

                    <div className="col-md-6">
                        <button disabled={!products.length} onClick={emptyCart} className="btn btn-primary">Empty Cart</button>
                    </div>

                </div>
            </div>

            
        </div>
    )
}

export default Checkout
