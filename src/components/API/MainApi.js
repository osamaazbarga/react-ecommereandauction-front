import axios from "axios";
const url='http://localhost:8001/api'

export default axios.create({
    baseURL:url
})
