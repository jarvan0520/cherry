import React,{useState} from 'react';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import service from '../service';
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
        service.apiRegister(state)
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
