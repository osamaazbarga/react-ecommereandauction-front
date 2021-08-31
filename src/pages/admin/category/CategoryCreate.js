import React,{useEffect,useState} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createCategory,getCategories,removeCategory} from '../../../function/category'
import { Link } from 'react-router-dom'
import {EditOutlined,DeleteOutlined}from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const CategoryCreate = () => {
    const {user}=useSelector(state=>({...state}))
    const [name,setName]=useState('')
    const [loading,setLoading]=useState(false)
    const [categories,setCategories]=useState([])

    //serach//filtering
    //step1
    const [keyword,setKeyword]=useState("")


    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories=()=>{
        getCategories()
        .then(c=>setCategories(c.data))
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true)
        createCategory({name},user.token)
        .then(res=>{
            setLoading(false)
            setName('')
            toast.success(`${res.data.name} is created`)
            loadCategories()
        })
        .catch(err=>{
            setLoading(false)
            if(err.response.status===400) toast.error(err.response.data)
            // console.log(err.response);
        })
    }

    const handleRemove=async(slug)=>{
        let answer=window.confirm("Delete?")
        if(answer){
            setLoading(true)
            removeCategory(slug,user.token)
            .then(res=>{
                setLoading(false)
                toast.error(`${res.data.name} deleted`)
                loadCategories()
            })
            .catch((err)=>{
                setLoading(false)
                if(err.response.status===400) {
                    
                    toast.error(err.response.data)
                }
            })
        }
        console.log(answer,slug);
    }


   

    //step4
    const searched=(keyword)=>(c)=>c.name.toLowerCase().includes(keyword)
        

    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"><AdminNav/></div>
                <div className="col">
                    <h4>Create Category</h4>
                    {<CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>}
                    {/* step2 and step3 */}
                    <LocalSearch keyword={keyword} setKeyword={setKeyword}/>
                    
                    {loading?<h5 className="text-danger">Loading...</h5>:<h5>&nbsp;</h5>}
                    {/* step5 */}
                    {categories.filter(searched(keyword)).map((c)=>{
                        return(
                            <div className="alert alert-secondary" key={c._id}>
                                {c.name} <span onClick={()=>handleRemove(c.slug)} className="btn btn-sm float-right"><DeleteOutlined className="text-danger"/></span> 
                                 <Link to={`/admin/category/${c.slug}`}>
                                     <span className="btn btn-sm float-right"><EditOutlined className="text-primary"/></span>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate
