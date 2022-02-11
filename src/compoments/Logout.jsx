import React from 'react'

import { useNavigate } from 'react-router-dom'


const Logout = () => {
    const navigate = useNavigate();
    localStorage.removeItem("token")
    localStorage.removeItem("logintime")
    localStorage.removeItem("username")
    localStorage.removeItem("rememberMe")
    
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    const loggedout =()=>{
        
        navigate("/login")
    }
    const ls = localStorage.getItem("token")
    const ss = sessionStorage.getItem("token")
    return (
      <section className="vh-100 gradient-custom">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">HOME </a>
            </li>
            {!(ls||ss)&&
                  <li className="nav-item">
                  <a className="nav-link" href="/login">LOGIN</a>
                    </li>                
              }
              {!(ls||ss)&&
                  <li className="nav-item">
                  <a className="nav-link" href="/register">REGISTER</a>
                </li>       
              }
            {(ls||ss)&&
                  <li className="nav-item">
                  <a className="nav-link" href='/product'>PRODUCT</a>
                  </li>                  
              }
              {(ls||ss)&&
                  <li className="nav-item">
                  <a className="nav-link " href="/order">ORDER</a>
                  </li>                 
              }
              {(ls||ss)&&
                  <li className="nav-item">
                  <a className="nav-link " href="/logout">LOGOUT</a>
                  </li>                
              } 
          </ul>
        </div>
      </nav>

      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Logout successful</h2>
                  
                  <div className="form-outline form-white mb-5 mt-5">
                    <button className="btn btn-outline-light btn-lg px-5 margin-top:30" type="submit" onClick={loggedout}>Login again?</button>
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


// export default class Logout extends Component {
   
//     constructor(props){
//         super(props)
//         localStorage.removeItem("token")
//         localStorage.removeItem("logintime")
//         localStorage.removeItem("username")
//         localStorage.removeItem("rememberMe")

       
//         sessionStorage.removeItem("token")
//         sessionStorage.removeItem("username")
        
//     }
//     render() {
//         const ls = localStorage.getItem("token")
//         const ss = sessionStorage.getItem("token")
//         const navigate = useNavigate()
//         return (
            
//             <div>
//                 <nav className ="navbar navbar-expand-lg navbar-light bg-light">
                    
//                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarNav">
//                         <ul className="navbar-nav">
//                             <li className="nav-item active">
//                             <a className="nav-link" href="/">HOME </a>
//                             </li>
//                             {!(ls||ss)&&
//                                  <li className="nav-item">
//                                  <a className="nav-link" href="/login">LOGIN</a>
//                                  </li>                           
//                             }
//                              {!(ls||ss)&&
//                                  <li className="nav-item">
//                                  <a className="nav-link" href="/register">REGISTER</a>
//                                  </li>                           
//                             }
//                             {(ls||ss)&&
//                                 <li className="nav-item">
//                                 <a className="nav-link" href='/product'>PRODUCT</a>
//                                 </li>                  
//                             }
//                             {(ls||ss)&&
//                                 <li className="nav-item">
//                                 <a className="nav-link " href="/order">ORDER</a>
//                                 </li>                 
//                             }
//                             {(ls||ss)&&
//                                 <li className="nav-item">
//                                 <a className="nav-link " href="/logout">LOGOUT</a>
//                                 </li>                
//                             }                  
//                         </ul>
//                     </div>
//                 </nav>
//                 <h1>you have been log out</h1>
//                 {/* <Link to='/'>login again</Link> */}
//                 useNavigate("")
//             </div>
            
//         )
//     }
// }
