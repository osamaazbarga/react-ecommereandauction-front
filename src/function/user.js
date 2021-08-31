import Api from '../components/API/MainApi'

// export const userCart = async (cart, authtoken) => {
//     return await Api.post(`${process.env.REACT_APP_API}/user/cart`, { cart }, {
//         headers: {
//             authtoken
//         }
//     })
// }

export async function userCart(cart, authtoken) {
    const req = await Api.post('/user/cart', { cart }, {
        headers: {
            authtoken
        }
    })
    return req
}

export async function getUserCart(authtoken) {
    const req = await Api.get('/user/cart',  {
        headers: {
            authtoken
        }
    })
    return req
}


export async function emptyUserCart(authtoken) {
    const req = await Api.delete('/user/cart', {
        headers: {
            authtoken
        }
    })
    return req
}

export async function saveUserAddress(authtoken,address) {
    const req = await Api.post('/user/address', { address }, {
        headers: {
            authtoken
        }
    })
    return req
}

export async function applyCoupon(authtoken,coupon) {
    const req = await Api.post('/user/cart/coupon', { coupon }, {
        headers: {
            authtoken
        }
    })
    return req
}

export async function createOrder(stripeResponse,authtoken) {
    const req = await Api.post('/user/order', { stripeResponse }, {
        headers: {
            authtoken
        }
    })
    return req
}

export async function getUserOrders(authtoken) {

    const req = await Api.get('/user/orders', {
        headers: {
            authtoken
        }
    })
    return req
}

export async function getWishlist(authtoken) {
    console.log("before");
    const req = await Api.get('/user/wishlist', {
        headers: {
            authtoken
        }
    })
    return req
}

export async function removeWishlist(productId,authtoken) {
    const req = await Api.put(`/user/wishlist/${productId}`,{}, {
        headers: {
            authtoken
        }
    })
    return req
}

export async function addToWishlist(productId,authtoken) {
    const req = await Api.post('/user/wishlist',{productId}, {
        headers: {
            authtoken
        }
    })
    return req
}


export async function createCashOrderForUser(authtoken,COD,coupon) {
    const req = await Api.post('/user/cash-order', { COD,couponApplied:coupon }, {
        headers: {
            authtoken
        }
    })
    return req
}

