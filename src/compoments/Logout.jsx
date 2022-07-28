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
      <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Logout successful</h2>     
                  <div className="form-outline form-white mb-5 mt-5">
                    <button className="btn btn-outline-light btn-lg px-5 margin-top:30" type="submit">Login again?</button>
                  </div>               
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      </section >
    )
}
export default Logout
