import React  from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Login from './compoments/Login';
import Home from './compoments/Home'
import Register from './compoments/Register';
import {useEffect} from 'react'
import Order from './compoments/Order';
import Product from './compoments/Product';
import './Homepage.css'
export function App() {
   const ls = localStorage.getItem("jarvanCherryToken")
   const ss = sessionStorage.getItem("jarvanCherryToken")
   const logout = () => {
    localStorage.removeItem("jarvanCherryToken")
    localStorage.removeItem("logintime")
    localStorage.removeItem("username")
    localStorage.removeItem("rememberMe")
    sessionStorage.removeItem("jarvanCherryToken")
    sessionStorage.removeItem("username")
}
    useEffect (() => {
    const logintime = localStorage.getItem("logintime")
    if(ls){
      let nowtime = (new Date()).getTime();
      let dif = nowtime - logintime
      let difdays=Math.floor(dif/(24*3600*1000))      
      if(difdays>7){
        localStorage.removeItem("jarvanCherryToken")
        localStorage.removeItem("logintime")
        localStorage.removeItem("username")
        localStorage.removeItem("rememberMe")
      } 
    }
  },[ls])
  return (
    <div>
      <nav className ="navbar navbar-expand-lg navbar-light bg-light">              
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
                      <a className="nav-link " href="/" onClick={logout}>LOGOUT</a>
                      </li>                
                  } 
              </ul>
          </div>
      </nav>
      <Router >   
        <Routes> 
          <Route path = "*" element={<Home/>} />
          { (ls||ss) && (
            <Route 
            path = "/product" 
            element={<Product/>}
            />
          )} 
          { (ls||ss) && (
            <Route 
            path = "/order" 
            element={<Order/>}
            />
          )} 
           { !(ls||ss) && (
            <Route 
            path = "/register" 
            element={<Register/>} 
            /> 
          )}
           { !(ls||ss) && (
             <Route path = "/login" element={<Login/>}/>  
          )} 
        </Routes>
      </Router>
    </div>
  );
}
export default App;
   

