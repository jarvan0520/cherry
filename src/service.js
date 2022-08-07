import axios from "axios"
import {productUrl,imgUrl,userUrl} from "./baseUrl"

const service ={
    apiGet :()=>{
        return axios.get(productUrl)
    },
    apiUpdate:(product)=>{
        return axios.put(productUrl+`/ProductUpdate`,product)
    },
    apiDelete:(product)=>{
        return axios.delete(productUrl+`/${product}`)
    },
    apiAdd :(product)=>{
        return axios.post(productUrl+`/ProductCreate`,product)
    },
    apiRegister :(user)=>{
        return axios.post(userUrl+`/UserRegister`,user)
    },
    apiLogin :(user)=>{
        return axios.post(userUrl+`/UserLogin`,user)
    },
    apiUploadImg :(img)=>{
        return axios.post(imgUrl,img)
    }
}
export default service

