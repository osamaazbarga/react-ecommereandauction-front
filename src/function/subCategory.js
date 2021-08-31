import Api from '../components/API/MainApi'



export async function getSubs() {
  const req = await Api.get('/sub')
  return req
}

export async function getSub(slug) {
    const req = await Api.get(`/sub/${slug}`)
    console.log(req);
    return req
}

export async function removeSub(slug,authtoken) {
    const req = await Api.delete(`/sub/${slug}`,{
        headers:{
            authtoken
        }
    })
    return req
}

export async function updateSub(slug,sub,authtoken) {
    const req = await Api.put(`/sub/${slug}`,sub,{
        headers:{
            authtoken
        }
    })
    return req
}

export async function createSub(sub,authtoken) {
    const req = await Api.post(`/sub`,sub,{
        headers:{
            authtoken
        }
    })
    return req
}

