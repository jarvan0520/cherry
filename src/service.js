import axios from "axios"
import {productUrl,imgUrl,userUrl} from "./baseUrl"

export const apiGet =()=> axios.get(productUrl)
export const apiUpdate =(product)=> axios.put(productUrl+`/ProductUpdate`,product)
export const apiDelete =(product)=> axios.delete(productUrl+`/${product}`)
export const apiAdd =(product)=> axios.post(productUrl+`/ProductCreate`,product)
export const apiRegister =(user)=> axios.post(userUrl+`/UserRegister`,user)
export const apiLogin =(user)=> axios.post(userUrl+`/UserLogin`,user)
export const apiUploadImg =(img)=> axios.post(imgUrl,img)
