import Order from './compoments/Order';
import Product from './compoments/Product';
import Login from './compoments/Login';
import Home from './compoments/Home'
import Register from './compoments/Register';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
const ls = localStorage.getItem("jarvanCherryToken")
const ss = sessionStorage.getItem("jarvanCherryToken")

const RouteService =()=>{
return(
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
    )
  }
export default RouteService