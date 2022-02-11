import axios  from "axios";
import MaterialTable from 'material-table';
import  { useState, useEffect } from 'react';
import React from "react";
import XLSX from 'xlsx';

const ls = localStorage.getItem("token")
const ss = sessionStorage.getItem("token")

export function Editable () {
    
    const [columns] = useState([
        
        { title: 'ProductName', field: 'productName' },
        { title: 'ProductCode', field: 'productCode' },
        { title: 'Desciption', field: 'desciption' },
        { title: 'Price', field: 'price' },
        { title: 'RrpPrice', field: 'priceRrp' },
        { title: 'ShopifyPrice', field: 'priceShopify' },
        { title: 'AgentPrice', field: 'priceAgent' },
        { title: '1212Price', field: 'price1212' },
        { title: 'SpecialPrice', field: 'priceSpecial' },
        { title: 'Height', field: 'height' },
        { title: 'Width', field: 'width' },
        { title: 'Length', field: 'length' },
        { title: 'Weight', field: 'weight' },
        { title: 'PackageQty', field: 'packageQty' },
      
    ]);
    const [loading,setLoading] = useState(true)
    const [prodList, setProdList] = useState([]);
    const [prodList2, setProdList2] = useState([]);
    // const [items, setItems] = useState([]);
    
    
    
    useEffect(() => {
        axios.get('http://206.189.39.185:5031/api/Order/GetOrderList/userId/status?=9')
        
        .then(res => {
            setLoading(false)
            setProdList(res.data.data)
            
           
        })
        .catch(error => {
            console.log(error);
        });
    }, [])


    const readExcel = (file) => {
      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
  
        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, { type: "buffer" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);
          resolve(data);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
      promise.then((d) => {
        setProdList2(d);
      });
    };

    
    const downloadExcel=()=>{
      const newData=prodList.map(row=>{
        delete row.tableData
        return row
      })
      const workSheet=XLSX.utils.json_to_sheet(newData)
      const workBook=XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workBook,workSheet,)
      // let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
      XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
      XLSX.writeFile(workBook,"Order.xlsx")


    }
  
  
  
    
  
    return (
        
        <>
        <div>
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
          {/* <button>data in</button>
          <button>data out</button> */}



      <input
        type="file"
        className="form"
        onChange={(e) => {
          const file = e.target.files[0];
      readExcel(file);}}/>

      <div>
        <button onClick={downloadExcel}> export</button>
      </div>
      
        </nav>
      </div>
      
     <div>
       <MaterialTable
       title="Product Order"
       columns={columns}
       
       data = {prodList2?  prodList.concat(prodList2) : prodList}
       
      //  actions={[ {icon:()=>
      //  <div>Export</div>,
       
      //   tooltip:"Export to Excel",
      // onClick:()=>downloadExcel(),
      // isFreeAction:true},
      // ]}
       isLoading={loading}
       
       />


     </div>

   
      </>
    )
  }
export default Editable