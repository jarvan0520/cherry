import React  from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Product from './compoments/Product';
import ProductNew from './compoments/ProductNew'
import Login from './compoments/Login';
import Home from './compoments/Home'
import Register from './compoments/Register';
import Logout from './compoments/Logout';
import {useState,useEffect} from 'react'
import Order from './compoments/Order';
import Testing from './compoments/Testing';

export function App() {
   const [auth, setauth] = useState(false);
   const logincheck = () => setauth(true);
   const ls = localStorage.getItem("token")
    const ss = sessionStorage.getItem("token")

    useEffect (() => {
    const ls = localStorage.getItem("token")
    const ss = sessionStorage.getItem("token")
    const logintime = localStorage.getItem("logintime")
    if(ls){
      var nowtime = (new Date()).getTime();
      var dif = nowtime - logintime
      var difdays=Math.floor(dif/(24*3600*1000))      
      if(difdays<=7){
        ls && JSON.stringify(ls) ? setauth(true) : setauth(false);             
      } 
    }
    if(ss){
      ss && JSON.stringify(ss) ? setauth(true) : setauth(false);
    }
  },[])
  
  console.log(window.location)

  const linkorder = true
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
                    <a className="nav-link" href='/productnew'>PRODUCTNEW</a>
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
      <Router >   
        <Routes> 
          <Route path = "*" element={<Home/>} />
          { auth && (
            <Route 
            path = "/product" 
            element={<Product/>}
            />
          )} 
          { auth && (
            <Route 
            path = "/productnew" 
            element={<ProductNew/>}
            />
          )} 
          { auth && (
            <Route 
            path = "/testing" 
            element={<Testing/>}
            />
          )} 
          { auth && (
            <Route 
            path = "/order" 
            element={<Order/>}
            />
          )} 
           { auth && (
            <Route 
            path = "/logout" 
            element={<Logout/>}
            />
          )}
           { !auth && (
            <Route 
            path = "/register" 
            element={<Register/>} 
            /> 
          )}
           { !auth && (
             <Route path = "/login" element={<Login authenticate={logincheck}/>}/>  
          )} 
        
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
   

