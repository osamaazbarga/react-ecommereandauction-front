import Api from '../components/API/MainApi'



export async function getCategories() {
  const req = await Api.get('/category')
  return req
}

export async function getCategory(slug) {
    const req = await Api.get(`/category/${slug}`)
    return req
}

export async function removeCategory(slug,authtoken) {
    const req = await Api.delete(`/category/${slug}`,{
        headers:{
            authtoken
        }
    })
    return req
}

export async function updateCategory(slug,category,authtoken) {
    const req = await Api.put(`/category/${slug}`,category,{
        headers:{
            authtoken
        }
    })
    return req
}

export async function createCategory(category,authtoken) {
    const req = await Api.post(`/category`,category,{
        headers:{
            authtoken
        }
    })
    return req
}

export async function getSubsCategory(_id) {
    const req = await Api.get(`/category/subs/${_id}`)
    return req
}


