import Api from '../components/API/MainApi'

export async function createPaymentIntent(authtoken,coupon) {
    const req = await Api.post('/create-payment-intent', {couponApplied:coupon}, {
        headers: {
            authtoken
        }
    })
    return req
}