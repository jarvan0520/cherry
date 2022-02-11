import React  from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Product from './compoments/Product';
import Login from './compoments/Login';
import Home from './compoments/Home'
import Register from './compoments/Register';
import Logout from './compoments/Logout';
import {useState,useEffect} from 'react'
import Order from './compoments/Order';

export function App() {
   const [auth, setauth] = useState(false);
   const logincheck = () => setauth(true);

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

  return (
    
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
  );
}

export default App;
   

