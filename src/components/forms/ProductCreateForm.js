import React,{useState} from 'react'
import FileUpload from './FileUpload'
import {LoadingOutlined} from '@ant-design/icons'
import { Select } from 'antd'
const { Option } = Select


const ProductCreateForm = ({ handleSubmit, handleChange, values, handleCategoryChange, subOptions, showSub, setValues }) => {
    //destructure
    const [loading,setLoading]=useState(false)
    const {
        title,
        description,
        price,
        category,
        categories,
        subs,
        quantity,
        images,
        colors,
        color,
        brand,
        shipping
    } = values
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Shipping</label>
                <select name="shipping" className="form-control" onChange={handleChange}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label>Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Color</label>
                <select name="color" className="form-control" onChange={handleChange}>
                    <option>Please Select</option>
                    {colors.map(c => <option key={c} value={c}>{c}</option>)}

                </select>
            </div>

            <div className="form-group">
                <label>Brand</label>
                <input
                    type="text"
                    name="brand"
                    className="form-control"
                    value={brand}
                    onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Category</label>
                <select name="category" className="form-control" onChange={handleCategoryChange}>
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

            {showSub &&
                <div>
                    <label>Sub Category</label>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="please select"
                        value={subs}
                        onChange={value => setValues({ ...values, subs: value })}
                    >
                        {subOptions.length && subOptions.map((s) =>
                            <Option key={s._id} value={s._id}>{s.name}</Option>
                        )}


                    </Select>
                </div>
            }

            <div classNa="p-3">
                <FileUpload values={values} setValues={setValues}/>
            </div>
            <br />
            <button className="btn btn-outline-info">Save</button>
        </form>
    )
}

export default ProductCreateForm
