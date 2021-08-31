
import Api from '../components/API/MainApi'



export async function createOrUpdateUser(authtoken) {
  console.log(authtoken);
  const req = await Api.post('/createorupdateuser', {}, {
    headers: {
      authtoken,
    }
  })
  return req
}

export async function currentUser(authtoken) {
  console.log(authtoken);
  const req = await Api.post('/currentuser', {}, {
    headers: {
      authtoken,
    }
  })
  return req
}


export async function currentAdmin(authtoken) {
  console.log(authtoken);
  const req = await Api.post('/currentadmin', {}, {
    headers: {
      authtoken,
    }
  })
  return req
}


