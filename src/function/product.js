import Api from '../components/API/MainApi'

export async function createProduct(product,authtoken) {
    const req = await Api.post(`/product`,product,{
        headers:{
            authtoken
        }
    })
    return req
}


export async function getProductsByCount(count) {
    const req = await Api.get(`/products/${count}`)
    return req
}


export async function removeProduct(slug,authtoken) {
    const req = await Api.delete(`/product/${slug}`,{
        headers:{
            authtoken
        }
    })
    console.log(req);
    return req
    
}

export async function getProduct(slug) {
    const req = await Api.get(`/product/${slug}`)
    return req
}

export async function updateProduct(slug,product,authtoken) {
    const req = await Api.put(`/product/${slug}`,product,{
        headers:{
            authtoken
        }
    })
    return req
}

export async function getProducts(sort,order,limit) {
    const req = await Api.post(`/products`,{sort,order,limit})
    return req
}



export async function productStar(productId,star,authtoken) {
    const req = await Api.put(`/product/star/${productId}`,{star},{
        headers:{
            authtoken
        }
    })
    return req
}

export async function getRelated(productId) {
    const req = await Api.get(`/product/Related/${productId}`)
    return req
}


export async function fetchProductsByFilter(arg) {
    const req = await Api.post(`/search/filters`,arg)
    return req
}