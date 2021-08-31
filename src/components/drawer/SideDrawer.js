import React from 'react'
import { Drawer, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import defaultImage from '../../images/defaultimageproduct.png'


const SideDrawer = ({ children }) => {

    const dispach = useDispatch()
    const { drawer, cart } = useSelector((state) => ({ ...state }))
    
    const imageStyle={
        width:"100%",
        height:'50px',
        objectFit:'cover'
    }

    return (
        <Drawer
            onClose={() => {
                dispach({
                    type: 'SET_VISABLE',
                    payload: false,
                })
            }}
            visible={drawer}
            className="text-center"
            closable={false}
            title={`Cart / ${cart.length} Product`}
            placement="right"
        >
            {cart.map((p)=>{
                return (
                    <div className="row" key={p._id}>
                        <div className="col">
                            {
                                p.images[0]?(
                                    <div>
                                        <img src={p.images[0].url} style={imageStyle}/>
                                        <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
                                    </div>
                                ):(
                                    <div>
                                        <img src={defaultImage} style={imageStyle}/>
                                        <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            })}
            <Link to="/cart">
                <button onClick={()=>{
                    dispach({
                        type:"SET_VISABLE",
                        payload:false
                    })
                }} className="text-center btn btn-primary btn-raised btn-block">
                    Go To Cart
                </button>
            </Link>
        </Drawer>
    )
}

export default SideDrawer
