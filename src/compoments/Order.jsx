import axios  from "axios";
import MaterialTable from 'material-table';
import  { useState, useEffect } from 'react';
import React from "react";
import XLSX from 'xlsx';

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
    useEffect(() => {
        axios.get('http://47.74.86.28:5030/api/Product')      
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
          alert('successfully')
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
      XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
      XLSX.writeFile(workBook,"Order.xlsx")
    }
    return (  
        <>
      <div>
        <input
          type="file" className="form" 
          style={{right:'0px' ,positions:'absolute'}}
          onChange={(e) => {const file = e.target.files[0];readExcel(file);}}/>
        <button onClick={downloadExcel}> export</button> 
      </div>
      
      <div>
       <MaterialTable
       title="Product Order"
       columns={columns}     
       data = {prodList2?  prodList.concat(prodList2) : prodList}
       isLoading={loading}
       button={readExcel}    
       />
      </div>
    </>
    )
  }
export default Editable