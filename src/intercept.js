import axios from "axios"

export const intercept =()=>{
    axios.interceptors.request.use(config =>{
      config.headers['token'] =localStorage.getItem("jarvanCherryToken") || sessionStorage.getItem("jarvanCherryToken") || ""
      console.log(config);
      return config
    },error =>{
      return Promise.reject(error)
    })       
  }