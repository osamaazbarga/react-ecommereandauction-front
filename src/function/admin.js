import Api from '../components/API/MainApi'


export async function getOrders(authtoken) {
    const req = await Api.get('admin/orders',  {
        headers: {
            authtoken
        }
    })
    return req
}

export async function changeStatus(orderId,orderStatus,authtoken) {
    const req = await Api.put('admin/order-status',{orderId,orderStatus},  {
        headers: {
            authtoken
        }
    })
    return req
}