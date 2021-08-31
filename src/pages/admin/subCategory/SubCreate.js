import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategories, removeCategory } from '../../../function/category'
import { createSub, getSubs, getSub, removeSub, updateSub } from '../../../function/subCategory'

import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const SubCreate = () => {
    const { user } = useSelector(state => ({ ...state }))
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [subs, setSubs] = useState([])
    const [category, setCategory] = useState("")


    //serach//filtering
    //step1
    const [keyword, setKeyword] = useState("")


    useEffect(() => {
        loadCategories()
        loadSubCategories()
    }, [])

    const loadCategories = () => {
        getCategories()
            .then(c => setCategories(c.data))
    }

    const loadSubCategories = () => {
        getSubs()
            .then(c => setSubs(c.data))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        createSub({ name, parent: category }, user.token)
            .then(res => {
                setLoading(false)
                setName('')
                toast.success(`${res.data.name} is created`)
                loadSubCategories()
            })
            .catch(err => {
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
                // console.log(err.response);
            })
    }

    const handleRemove = async (slug) => {
        let answer = window.confirm("Delete?")
        if (answer) {
            setLoading(true)
            removeSub(slug, user.token)
                .then(res => {
                    setLoading(false)
                    toast.error(`${res.data.name} deleted`)
                    loadSubCategories()
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false)
                        toast.error(err.response.data)
                    }
                })
        }
        console.log(answer, slug);
    }




    //step4
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"><AdminNav /></div>
                <div className="col">
                    <h4>Create Sub Category</h4>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={e => setCategory(e.target.value)}>
                            <option value="">Please select</option>
                            {
                                categories.length > 0 && categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>{
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
                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                    {loading ? <h5 className="text-danger">Loading...</h5> : <h5>&nbsp;</h5>}
                    {/* step5 */}
                    {subs.filter(searched(keyword)).map((s) => {
                        return (
                            <div className="alert alert-secondary" key={s._id}>
                                {s.name}
                                <span
                                    onClick={() => handleRemove(s.slug)}
                                    className="btn btn-sm float-right">
                                    <DeleteOutlined className="text-danger" />
                                </span>
                                <Link to={`/admin/sub/${s.slug}`}>
                                    <span className="btn btn-sm float-right"><EditOutlined className="text-primary" /></span>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SubCreate
