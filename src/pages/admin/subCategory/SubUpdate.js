import React,{useEffect,useState} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createCategory,getCategories,getCategory,removeCategory,updateCategory} from '../../../function/category'
import { createSub, getSubs, getSub, removeSub, updateSub } from '../../../function/subCategory'

import CategoryForm from '../../../components/forms/CategoryForm'

const SubUpdate = ({match,history}) => {
    const { user } = useSelector(state => ({ ...state }))
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [parent, setParent] = useState('')


    useEffect(() => {
        loadCategories()
        loadSubCategory()
    }, [])

    const loadCategories = () => {
        getCategories()
            .then(c => setCategories(c.data))
    }

    const loadSubCategory = () => {
        getSub(match.params.slug).then(s =>{ 
                setName(s.data.name)
                setParent(s.data.parent)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        updateSub(match.params.slug,{ name, parent}, user.token)
            .then(res => {
                setLoading(false)
                setName('')
                toast.success(`${res.data.name} is created`)
                history.push('/admin/sub')
            })
            .catch(err => {
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
                // console.log(err.response);
            })
    }

    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"><AdminNav /></div>
                <div className="col">
                    <h4>Update Sub Category</h4>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={e => setParent(e.target.value)}>
                            <option value="">Please select</option>
                            {
                                categories.length > 0 && categories.map((cat) => (
                                    <option key={cat._id} value={cat._id} selected={cat._id===parent}>{
                                        cat.name
                                    }</option>
                                ))
                            }

                        </select>
                    </div>

                    


                    {<CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName} />}
                    {/* step2 and step3 */}
                    

                    {loading ? <h5 className="text-danger">Loading...</h5> : <h5>&nbsp;</h5>}
                    {/* step5 */}

                </div>
            </div>
        </div>
    )
}

export default SubUpdate
