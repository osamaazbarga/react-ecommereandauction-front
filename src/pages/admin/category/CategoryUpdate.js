import React,{useEffect,useState} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createCategory,getCategories,getCategory,removeCategory,updateCategory} from '../../../function/category'
import CategoryForm from '../../../components/forms/CategoryForm'

const CategoryUpdate = ({history,match}) => {
    const {user}=useSelector(state=>({...state}))
    const [name,setName]=useState('')
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        // console.log(match.params);
        loadCategory()
    }, [])

    const loadCategory=()=>{
        getCategory(match.params.slug)
        .then(c=>setName(c.data.name))
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true)
        updateCategory(match.params.slug,{name},user.token)
        .then(res=>{
            setLoading(false)
            setName('')
            toast.success(`${res.data.name} is updated`)
            history.push('/admin/category')
        })
        .catch(err=>{
            setLoading(false)
            //if(err.response.status===400) toast.error(err.response.data)
            console.log(err.response);
        })
    }

    

    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"><AdminNav/></div>
                <div className="col">
                    <h4>Create Category</h4>
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
                    {loading?<h5 className="text-danger">Loading...</h5>:<h5>&nbsp;</h5>}
                    
                </div>
            </div>
        </div>
    )
}

export default CategoryUpdate
