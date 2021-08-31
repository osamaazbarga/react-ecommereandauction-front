import React,{useState,useEffect} from 'react'
import {auth} from '../../firbase'
import { toast} from 'react-toastify'
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../function/auth";


const RegisterComplete = ({history}) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    // const [email,setEmail]=useState('')
    // const { user } = useSelector((state) => ({ ...state }))
    let dispatch = useDispatch()

    useEffect(()=>{
        setEmail(window.localStorage.getItem("emailForRegistration"))
    },[history])
    

    //props history
    // history.push('/')
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!email||!password){
            toast.error('Email and password is required')
            return;
        }
        if(password.length<8){
            toast.error("password must be at least 6 characters long")
            return;
        }
        try{
            const result =await auth.signInWithEmailLink(email,window.location.href)
            if(result.user.emailVerified){
                //remove user from localstorage
                window.localStorage.removeItem('emailForRegistration')
                //get user id token
                let user =auth.currentUser
                await user.updatePassword(password)
                const idTokenResult=await user.getIdTokenResult()
                //redux store
                console.log('user',user,'idtokenresult',idTokenResult);
                await createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id,
                        },
                    });
                })
                .catch(err=>console.log(err));
                //redirect
                history.push('/')
            }
        }
        catch(error){
            toast.error(error.message)
        }
        
    }
    const completeRegistertionForm=()=>{
        return(
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    className="form-control" 
                    value={email} 
                    disabled
                />

                <input 
                    type="password" 
                    className="form-control" 
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    placeholder="password"
                    autoFocus
                />
                <button type="submit" className="btn btn-raised" disabled={!password||password.length<8}>complete register</button>
            </form>
        )
    }
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register complete</h4>
                    {/* <ToastContainer/> */}
                    {completeRegistertionForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete
