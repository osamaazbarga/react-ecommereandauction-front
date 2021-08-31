import React,{useState,useEffect} from 'react'
import {getProductsByCount,fetchProductsByFilter} from '../function/product'
import {useDispatch,useSelector} from 'react-redux'
import {getCategories} from '../function/category'
import {getSubs} from '../function/subCategory'
import ProductCard from '../components/cards/ProductCard'
import { Menu,Slider, Checkbox,Radio} from 'antd'
import { DollarOutlined,DownSquareOutlined,StarOutlined } from '@ant-design/icons'
import Star from '../components/forms/Star'

const {SubMenu,ItemGroup}=Menu

const Shop = () => {
    const [products,setProducts]=useState([])
    const [loading,setLoading]=useState(false)
    const [price,setPrice]=useState([0,0])
    const [ok,setOk]=useState(false)
    const [categories,setCategories]=useState([])
    const [subs,setSubs]=useState([])
    const [sub,setSub]=useState('')
    const [categoryIds,setCategoryIds]=useState([])
    const [star,setStar]=useState('')
    const [brands,setBrands]=useState([])
    const [colors,setColors]=useState(["Black","Brown","Silver","White","Blue","Green","Red"])
    const [color,setColor]=useState("")
    const [shipping,setShipping]=useState("")



    let dispach=useDispatch()
    let {search}=useSelector((state)=>({...state}))
    const {text}=search

    useEffect(() => {
        loadAllProducts()
        loadCategories()
        loadSubCategories()
    }, [])

    const fetchProducts=(arg)=>{
        fetchProductsByFilter(arg)
        .then((res)=>{
            setProducts(res.data)
        })
    }

    //fetch categories
    const loadCategories=()=>{
        getCategories().then(res=>setCategories(res.data))
    }

    //fetch subcategories
    const loadSubCategories=()=>{
        getSubs().then(res=>setSubs(res.data))
    }

    //1.load products by default on page load
    const loadAllProducts=()=>{
        setLoading(true)
        getProductsByCount(12).then((p)=>{
            setProducts(p.data)
            setLoading(false)
        })
    }

    //2. load products on user search input
    useEffect(() => {
        const delayed=setTimeout(() => {
            fetchProducts({query:text})
            if(!text){
                loadAllProducts()
            }
        }, 300);
        return ()=> clearTimeout(delayed)
        
    }, [text])


    //3. load products bases on price range
    useEffect(() => {
        console.log('ok to request');
        fetchProducts({price})
    }, [ok])

    const handleSlider=(value)=>{
        dispach({
            type:"SEARCH_QUERY",
            payload:{text:''}
        })
        setPrice(value)
        setTimeout(() => {
            setOk(!ok)
        }, 300);

    }

    //4. load products based on category
    //show categories on a list of checkbox
    const showCategories=()=>{
        return categories.map((c)=>{
            return (<div key={c._id}>
                <Checkbox 
                    onChange={handleCheck} 
                    className="pb-2 pl-4 pr-4" 
                    name="category" 
                    value={c._id}
                    checked={categoryIds.includes(c._id)}
                >
                    {c.name}
                </Checkbox>
                <br/>
            </div>)
        })
    }

    // handle check for categories
    const handleCheck=(e)=>{
        // dispach({
        //     type:"SEARCH_QUERY",
        //     payload:{text:''}
        // })
        // setPrice([0,0])
        // console.log(e.target.value);
        let inTheState=[...categoryIds]
        let justChecked=e.target.value
        let foundInTheState=inTheState.indexOf(justChecked)//index or -1

        //indexOf method??if not found -1 else return index
        if(foundInTheState===-1){
            inTheState.push(justChecked)
        }
        else{
            //if found pull out one item from index
            inTheState.splice(foundInTheState,1)
        }
        setCategoryIds(inTheState)
        // console.log(inTheState);
        fetchProducts({category:inTheState})

    }

    //5. show products by stars range
    const handleStarClick=(num)=>{
        // console.log(num);
        //איפוס חיפוש
        //reset value
         // dispach({
        //     type:"SEARCH_QUERY",
        //     payload:{text:''}
        // })
        // setPrice([0,0])
        //setCategoryIds([])
        setStar(num)
        fetchProducts({stars:num})
    }
    const showStars=()=>{
        return(
            <div className="pr-4 pl-4 pb-2">
                <Star starClick={handleStarClick} numberOfStars={5}/>
                <Star starClick={handleStarClick} numberOfStars={4}/>
                <Star starClick={handleStarClick} numberOfStars={3}/>
                <Star starClick={handleStarClick} numberOfStars={2}/>
                <Star starClick={handleStarClick} numberOfStars={1}/>

            </div>
        )
    }

    //6. show products by sub category
    const showSubs=()=>{
        return subs.map((s)=>{
            return (
                <div  
                    key={s._id}  
                    className="p-1 m-1 badge badge-secondary" 
                    style={{cursor:'pointer'}}
                    onClick={()=>handleSub(s)}>
                    {s.name}
                </div>
            )
        })
    }

    const handleSub=(sub)=>{
        //console.log(sub);
        setSub(sub)
        //reset value
         dispach({
            type:"SEARCH_QUERY",
            payload:{text:''}
        })
        setPrice([0,0])
        setCategoryIds([])
        setStar('')
        fetchProducts({sub})

    }

    //7. show products based on color name
    const showColors=()=>{
        return colors.map((c)=>{
            return (
                <Radio
                    value={c}
                    name={c}
                    checked={c===color}
                    onChange={handleColor}
                    className="pb-1 pl-4 pr-4"
                >
                    {c}
                </Radio>
            )
        })
    }

    const handleColor=(e)=>{
        setColor(e.target.value)
        fetchProducts({color:e.target.value})

    }

    //7. show products based on shpping yes/no
    const showShipping=()=>{
        return(
            <div>
                <Checkbox
                    className="pb-2 pl-4 pr-4"
                    onChange={handleShppingChange}
                    value="Yes"
                    checked={shipping==='Yes'}
                >Yes</Checkbox>
                
                <Checkbox
                    className="pb-2 pl-4 pr-4"
                    onChange={handleShppingChange}
                    value="No"
                    checked={shipping==='No'}
                >No</Checkbox>
            </div>
        )
    }

    const handleShppingChange=(e)=>{
        setShipping(e.target.value)
        fetchProducts({shipping:e.target.value})

    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                    <h4>Search/Filter</h4>
                    <hr/>
                    <Menu defaultOpenKeys={["priceslider","categorysubmenu","starsmenu","subcategorysubmenu","colorsmenu"]} mode="inline">
                        <SubMenu 
                            key="priceslider" 
                            title={<span className='h6'>
                                <DollarOutlined/>  price
                            </span>
                        }>
                            <div>
                                <Slider 
                                    className="ml-4 mr-4"
                                    tipFormatter={(v)=>`$${v}`}
                                    range
                                    value={price}
                                    onChange={handleSlider}
                                    max='4999'
                                />
                            </div>
                        </SubMenu>

                        <SubMenu 
                            key="categorysubmenu" 
                            title={
                                <span className='h6'>
                                    <DownSquareOutlined/>  Categories
                                </span>
                            }>
                            <div>
                                {showCategories()}
                            </div>
                        </SubMenu>

                        <SubMenu 
                            key="starsmenu" 
                            title={
                                <span className='h6'>
                                    <StarOutlined/>  Rating
                                </span>
                            }>
                            <div>
                                {showStars()}
                            </div>
                        </SubMenu>

                        <SubMenu 
                            key="subcategorysubmenu" 
                            title={
                                <span className='h6'>
                                    <DownSquareOutlined/>  Sub Categories
                                </span>
                            }>
                            <div className="pl-4 pr-4">
                                {showSubs()}
                            </div>
                        </SubMenu>

                        <SubMenu 
                            key="colorsmenu" 
                            title={
                                <span className='h6'>
                                    <DownSquareOutlined/>  Colors
                                </span>
                            }>
                            <div className="pl-4 pr-4">
                                {showColors()}
                            </div>
                        </SubMenu>

                        <SubMenu 
                            key="shppingmenu" 
                            title={
                                <span className='h6'>
                                    <DownSquareOutlined/>  Shipping
                                </span>
                            }>
                            <div className="pl-4 pr-4">
                                {showShipping()}
                            </div>
                        </SubMenu>
                    </Menu>
                </div>
                <div className="col-md-9 pt-2">
                    {loading?(<h4 className="text-danger">Loading...</h4>)
                        :(<h4 className="text-danger">Products</h4>)}
                    {products.length<1&&<p>No products found</p>}
                    <div className="row pd-5">
                        {products.map((p)=>{
                            return (
                                <div key={p._id} className="col-md-4 mt-3">
                                    <ProductCard product={p}/>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Shop
