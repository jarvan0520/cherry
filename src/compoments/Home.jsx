import React from "react";
import Cherry from './cherry.jpg'
    
function Home (){
    const ls = localStorage.getItem("token")
    const ss = sessionStorage.getItem("token")
    return(
        <div style={{height:'100vh',
                    overflowY:'hidden',
                    backgroundImage :'url('+Cherry+')',
                    position:'relative',
                    
                    }}>
            <p style={{                  
                        position:'absolute',
                        top :'50%',
                        textAlign:'center',
                        color:'white',   
                        width :'100%',
                        fontSize:'35px'              
                    }}>WELCOME TO CHERRY LAND
            </p>
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
                                <a className="nav-link " href="/logout">LOGOUT</a>
                                </li>                
                            }                  
                        </ul>
                    </div>
                </nav>

            </div>

           
          
            
        </div>
    )

}

export default Home