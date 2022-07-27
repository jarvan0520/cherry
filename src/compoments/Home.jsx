import React from "react";
import Cherry from './cherry.jpg'
function Home (){
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
        </div>
    )
}
export default Home