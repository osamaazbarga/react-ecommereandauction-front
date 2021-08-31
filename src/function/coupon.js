import Api from '../components/API/MainApi'


export async function getCoupons() {
    const req = await Api.get('/coupons')
    return req
}

export async function removeCoupon(couponId,authtoken) {
    const req = await Api.delete(`/coupon/${couponId}`,{
        headers:{
            authtoken
        }
    })
    return req
}

export async function createCoupon(coupon,authtoken) {
    const req = await Api.post(`/coupon`,{coupon},{
        headers:{
            authtoken
        }
    })
    return req
}