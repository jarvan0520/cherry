import React, { useState  } from 'react';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import {apiLogin} from '../service'
import { useNavigate } from 'react-router-dom'
 function Login() {
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
    apiLogin(state)
      .then(response => {  
        const token = JSON.stringify(response.data.data.token);
          if(rememberMe){          
            localStorage.setItem('jarvanCherryUsername', username ? username : "");
            localStorage.setItem('jarvanCherryToken', token);
            var logintime = (new Date()).getTime();
            localStorage.setItem('logintime', logintime);
            navigate("/product") 
            window.location.reload() 
          }
          else {
            sessionStorage.setItem('jarvanCherryToken', token);
            navigate("/product")
            window.location.reload() 
          }
      })
      .catch((error) => {
        alert('Login Unsuccessfully');
        console.log(error)
        return error;
      })
  }; 
  return (   
    <section className="vh-100 gradient-custom">
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
              </div>
            </div>
          </div>
        </div>
      </div>  
      </section >
    )
}
export default Login;
