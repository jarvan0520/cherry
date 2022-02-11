import axios  from "axios";
import MaterialTable from 'material-table';
import  { useState, useEffect } from 'react';
import React from "react";



export function Editable () {

    const [columns] = useState([
        
        { title: 'ProductName', field: 'productName' },
        { title: 'ProductCode', field: 'productCode' },
        { title: 'Desciption', field: 'desciption' },
        { title: 'Price', field: 'price' },
        { title: 'RrpPrice', field: 'priceRrp' },
        // { title: 'ShopifyPrice', field: 'priceShopify' },
        // { title: 'AgentPrice', field: 'priceAgent' },
        // { title: '1212Price', field: 'price1212' },
        // { title: 'SpecialPrice', field: 'priceSpecial' },
        // { title: 'Height', field: 'height' },
        // { title: 'Width', field: 'width' },
        // { title: 'Length', field: 'length' },
        // { title: 'Weight', field: 'weight' },
        // { title: 'PackageQty', field: 'packageQty' },
      
    ]);
    const [loading,setLoading] = useState(true)
    const [prodList, setProdList] = useState([]);
    
    useEffect(() => {
        axios.get('http://206.189.39.185:5031/api/Product')
      
        .then(res => {
          console.log(res.data.data)
            setLoading(false)
            setProdList(res.data.data)
        })
        .catch(error => {
            console.log(error);
        });
    }, [])

    const changeType  =newdata => {
      newdata.price = parseInt(newdata.price)
      newdata.priceRrp = parseInt(newdata.priceRrp)
      // newdata.priceShopify = parseInt(newdata.priceShopify)
      // newdata.priceAgent = parseInt(newdata.priceAgent)
      // newdata.price1212 = parseInt(newdata.price1212)
      // newdata.priceSpecial = parseInt(newdata.priceSpecial)
      // newdata.height = parseInt(newdata.height)
      // newdata.width = parseInt(newdata.width)
      // newdata.length = parseInt(newdata.length)
      // newdata.weight = parseInt(newdata.weight)
      // newdata.packageQty = parseInt(newdata.packageQty)
      
     return newdata
   }
    // const handleAdd = (data)=>{
    //   axios.post('http://206.189.39.185:5031/api/Product/ProductCreate',data)
    //   .then(res=>{
    //     setProdList([...prodList,data])
    //     alert('Add successfully')
    //   })
    //   .catch(error=>{
    //     alert('Add unsuccessfully')
    //   })
    // }

    const handleDelete =(oldData)=>{
      let id = parseInt(oldData.productId)
      axios.delete('http://206.189.39.185:5031/api/Product/'+id)
      .then(res=>{
        alert('Delete successfully')
      })
      .catch(error=>{
        alert('Delete Unsuccessfully')
      })

      
    }
   
    
    // const userToken = localStorage.getItem('token') || sessionStorage.getItem('token')
    const ls = localStorage.getItem("token")
    const ss = sessionStorage.getItem("token")
    
  
    return (
        
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
      <MaterialTable
        title="Editable Preview"
        columns={columns}
        data={prodList}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setProdList([...prodList, newData]);
                axios.post('http://206.189.39.185:5031/api/Product/ProductCreate',changeType(newData))
                .then(res=>{
                  setProdList([...prodList,newData])
                  alert('Add successfully')
                })
                .catch(error=>{
                  alert('Add unsuccessfully')
                })
                // handleAdd(newData)
                resolve();
              },)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...prodList];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setProdList([...dataUpdate]);
                resolve();
              }, )
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...prodList];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setProdList([...dataDelete]);    
                handleDelete(oldData)   
                resolve()
              }, )
            }),
        }}
    /></>
    )
  }
export default Editable