import React, { useState } from 'react'
import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firbase'
import { toast } from 'react-toastify'

const Password = () => {
    const [password,setPassword]=useState('')
    const [loading,setLoading]=useState(false)

    const handleSubmit=async(e)=>{
        setLoading(true)
        e.preventDefault()
        console.log(password);
        await auth.currentUser.updatePassword(password)
        .then(()=>{
            setLoading(false)
            setPassword("")
            toast.success('password updated')

        })
        .catch(err=>{
            setLoading(false)
            toast.error(err.message)

        })
    }
    const passwordUpdateFrom=()=>{
        return(<form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Your Password</label>
                <input 
                    type="password"
                    className="form-control" 
                    onChange={e=>setPassword(e.target.value)}
                    placeholder="Enter a New Password"
                    disabled={loading}
                    value={password}
                />
                <button className="btn btn-primary" disabled={!password||password.length<8||loading}>submit</button>
            </div>
        </form>)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"><UserNav /></div>
                <div className="col">
                    <h4>Password Update</h4>
                    {passwordUpdateFrom()}
                    {loading?<h5 className="text-danger">Loading..</h5>:<h5>&nbsp;</h5>}
                </div>
            </div>
        </div>
    )
}

export default Password