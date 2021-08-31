import React, { useState,useEffect } from 'react'
import { auth } from '../../firbase'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux';




const ForgetPassword = ({history}) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const {user}=useSelector((state)=>({...state}))
    useEffect(()=>{
        if(user && user.token){
            history.push('/')
        }
    },[user,history])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("osama");
        setLoading(true)
        const config ={
            url:process.env.REACT_APP_FORGET_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true,
        }
        await auth.sendPasswordResetEmail(email,config).then(()=>{
            setEmail('')
            setLoading(false)
            toast.success('check your email for password reset link')
        }).catch((error)=>{
            setLoading(false)
            toast.error(error.message)
            console.log('error massage in forget password',error);
        })


    }
    return (
        <div className="container col-md-6 offset-md-3 p-5">
            <h4>Forget Password</h4>

            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    className="form-control" 
                    value={email} 
                    onChange={e=>{setEmail(e.target.value)}}
                    placeholder="Enter Your Email"
                    autoFocus
                />
                <br/>
                <button type="submit" className="btn btn-raised" disabled={!email}>Submit</button>
                
            </form>
        </div>
    )
}


export default ForgetPassword;
