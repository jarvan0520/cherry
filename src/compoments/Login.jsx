import React, { useState  } from 'react';
import axios from "axios";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { useNavigate } from 'react-router-dom'
const ls = localStorage.getItem("token")
const ss = sessionStorage.getItem("token")

 function Login({authenticate}) {
  const navigate = useNavigate()
  const [state, setState] = useState({
    username: "",
    password: "",
    showPassword: false,
    rememberMe : false,
    token : false
  })

  const handleChange = e => {
    const input = e.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;
    setState({
      ...state,
      [input.name]:value});
  }
  const handleClickShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword
    })
  };
  
  const {username,rememberMe} = state
  const handleLogin = ()=>  {
    
    axios.post('http://206.189.39.185:5031/api/User/UserLogin', state)
   
      .then(response => {
       
        const token = JSON.stringify(response.data.data.token);
        
          if(rememberMe){          
            localStorage.setItem('username', username ? username : "");
            localStorage.setItem('token', token);
            var logintime = (new Date()).getTime();
            localStorage.setItem('logintime', logintime);
            console.log(localStorage.token)
            authenticate()
            navigate("/product")  
          }
          else {
            sessionStorage.setItem('username', username ? username : "");
            sessionStorage.setItem('token', token);
            authenticate()
            navigate("/product")
          }
      })
      .catch((error) => {
        alert('Login Unsuccessfully');
        return error;
      })
  };
 
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
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>
                  <div className="form-outline form-white mb-4">
                    <input type="text" className="form-control form-control-lg" name='username' value={state.username}
                      onChange={handleChange} />
                    <label className="form-label" htmlFor="typeEmailX">username</label>
                  </div>
                  
                  <div className="form-outline form-white mb-4">
                    
                      <div className='input-group mb-3 bg-white shadow border rounded'>
                        <input type={state.showPassword ? "text" : "password"}  className="form-control form-control-lg" name= 'password' value={state.password}
                        onChange={handleChange} />   
                        <IconButton  onClick={handleClickShowPassword} >   
                          {state.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>                 
                      </div>
                      <label className="form-label" htmlFor="typePasswordX">Password</label>
                  
                  </div> 
                  <div>     
                     <div>
                          <label>
                            <input name="rememberMe" checked={state.rememberMe} onChange={handleChange} type="checkbox"/> Remember me
                          </label>
                      </div>
                  </div>
                  <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleLogin}>Login</button>
                </div>
                <div>
                  <p className="mb-0">Don't have an account? <a href="/register" className="text-white-50 fw-bold">Sign Up</a></p>
                  <p className="mb-0">Home Page <a href="/" className="text-white-50 fw-bold">Here</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      </section >

    )

}
export default Login;
