import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
    const navigate = useNavigate();
    localStorage.removeItem("jarvanCherryToken")
    localStorage.removeItem("logintime")
    localStorage.removeItem("username")
    localStorage.removeItem("rememberMe")
    sessionStorage.removeItem("jarvanCherryToken")
    sessionStorage.removeItem("username")
    useEffect (() => {
      window.location.reload()
      navigate("/login")
    })
    return (
      <></>
    )
}
export default Logout
