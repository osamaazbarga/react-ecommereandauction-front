import React,{useEffect,useState} from 'react'
import {Route} from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'
import {currentAdmin} from '../../function/auth'


const AdminRoute = ({children,...rest}) => {
    const [ok,setOk]=useState(false)
    const {user}=useSelector((state)=>({...state}))
    useEffect(() => {
        if(user&&user.token){
            currentAdmin(user.token)
            .then(res=>{
                console.log('Current Admin Res',res);
                setOk(true)
            })
            .catch(err=>{
                console.log("Admin Route Error",err);
                setOk(false)
            })
        }

    }, [user])
    
    return ok?(<Route {...rest}/>):(<div className="text-danger"><LoadingToRedirect/></div>)
}
export default AdminRoute;
