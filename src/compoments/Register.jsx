import React,{useState} from 'react';
import axios  from "axios";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
const ls = localStorage.getItem("token")
const ss = sessionStorage.getItem("token")
    
function Register(){
    const [state,setState] = useState({
        username:"",
        password:"",
    })
    
    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
          })
      }
    const handleRegister =()=> {
        console.log()
        axios.post('http://206.189.39.185:5031/api/User/UserRegister',state)
        .then (response=>{
            alert('Register successfully');
            return response
        })
        .catch((error)=>{
            console.log(error)
            alert('Unsuccessfully');
            return error;
        })
  
    };
    const handleClickShowPassword = () => {
      setState({
        ...state,
        showPassword: !state.showPassword
      })
    };
    
    return(
      <><div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/">HOME </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">LOGIN</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">REGISTER</a>
              </li>
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
      </div><section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                  <div className="card-body p-5 text-center">

                    <div className="mb-md-5 mt-md-4 pb-5">

                      <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                      <p className="text-white-50 mb-5">Please enter your username and password!</p>

                      <div className="form-outline form-white mb-4">
                        <input type="text" className="form-control form-control-lg" name='username' value={state.username} onChange={handleChange} />
                        <label className="form-label" for="typeEmailX">username</label>
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

                      <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                      <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleRegister}>Register</button>



                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section></>

    )

}
export default Register;
