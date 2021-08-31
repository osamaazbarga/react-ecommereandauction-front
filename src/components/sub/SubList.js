import React ,{useState,useEffect}from 'react'
import {Link} from 'react-router-dom'
import {getSubs} from '../../function/subCategory'


const SubList = () => {
    const [subs,setSubs]=useState([])
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        setLoading(true)
        getSubs().then(res=>{
            setSubs(res.data)
            setLoading(false)
        })
    }, [])
    const showSubs=()=>{
        return subs.map((s)=>{
            return(
                <div key={s._id} className="col btn btn-outlined btn-lg btn-block btn-raised m-3">
                    <Link to={`/sub/${s.slug}`}>{s.name}</Link>
                </div>
            )
        })

    }

    return (
        <div className="container">
            <div className="row">
                {
                    console.log(subs)
                }
                {loading?(<h4 className="text-danger">Loading...</h4>):showSubs()}
            </div>
            
        </div>
    )
}

export default SubList
