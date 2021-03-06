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
    ]);
    // const [loading,setLoading] = useState(true)
    const [prodList, setProdList] = useState([]);
    
    useEffect(() => {
      getData();
    }, [])

    const getData =(newdata)=>{
      axios.get('http://47.74.86.28:5030/api/Product')
        .then(res => {
            setProdList(res.data.data)
        })
        .catch(error => {
            console.log(error);
        });
       
    }
    const changeType  =newdata => {
      newdata.price = parseInt(newdata.price)
      newdata.priceRrp = parseInt(newdata.priceRrp)
     return newdata
   }
    const intercept =()=>{
      axios.interceptors.request.use(config =>{
        config.headers['token'] =userToken || ""
        console.log(config);
        return config
      },error =>{
        return Promise.reject(error)
      })       
    }
   
    const ls = localStorage.getItem("token")
    const ss = sessionStorage.getItem("token")
    const userToken = ls || ss
   
    return (   

      <MaterialTable
        title="Editable Preview"
        columns={columns}
        data={prodList}    
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {           
              setTimeout(() => {  
                axios.post('http://47.74.86.28:5030/api/Product/ProductCreate',changeType(newData))          
                .then(res=>{   
                  intercept();
                  getData();
                  alert('Add successfully')
                 
                })
                .catch(error=>{
                  alert('Add unsuccessfully')
                })
                resolve();
              },2000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...prodList];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                console.log(newData)
                axios.put('http://47.74.86.28:5030/api/Product/ProductUpdate',changeType(newData))
                .then (response=>{
                    
                    intercept();
                    setProdList([...dataUpdate]);
                    alert('Update successfully');  
                })
                .catch((error)=>{
                    alert('Unsuccessfully');
                })
                resolve();
              }, )
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => { 
              setTimeout(() => {
                const dataDelete = [prodList];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                const filteredData = prodList.filter( (e) => e.productId !== oldData.productId);
                axios.delete('http://47.74.86.28:5030/api/Product/'+oldData.productId)
                .then(res=>{
                  intercept();
                  setProdList([...filteredData])
                  alert('Delete successfully')
                })
                .catch(error=>{
                  alert('Delete Unsuccessfully')
                })
                resolve()
              }, 2000)
            }),
        }}
    />
    )
  }
export default Editable