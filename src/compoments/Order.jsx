import axios  from "axios";
import  { useState, useEffect,Fragment } from 'react';
import React from "react";
import XLSX from 'xlsx';
import _ from "lodash";

const Editable=()=> {  
    const pageSize = 5;
    const [prodList, setProdList] = useState([]);
    const [prodList2, setProdList2] = useState(null);  
    const [currentPage, setCurrentPage] = useState(1);  
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
    const [isPriceSorted,setIsPriceSorted]=useState(null)
    const [isNameSorted,setIsNameSorted]=useState(null)
    const [wordEntered, setWordEntered] = useState("");
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
    const [filteredData, setFilteredData] = useState([]);
    const paginate = (items, pageNumber, pageSize) => {
      const startIndex = (pageNumber - 1) * pageSize;
      return _(items).slice(startIndex).take(pageSize).value();
    }; 
    const sortProductName =(e)=>{
      e.preventDefault()
      setCurrentPage(1)
      setIsPriceSorted(null)
      const nameAscending = [...prodList].sort((a, b) => a.productName > b.productName ? 1:-1);
      const nameDescending = [...prodList].sort((a, b) => a.productName > b.productName ? -1:1);
      switch(isNameSorted){
        case true:
          setIsNameSorted(false)
          return setFilteredData(nameDescending)
        case false:
          setIsNameSorted(true)
          return setFilteredData(nameAscending)
        default: 
          setIsNameSorted(true)
          return setFilteredData(nameAscending)
      }
    }
    const sortProductPrice =(e)=>{
      e.preventDefault()
      setCurrentPage(1)
      setIsNameSorted(null)
      const numAscending = [...prodList].sort((a, b) => a.priceRrp - b.priceRrp);
      const numDescending = [...prodList].sort((a, b) => b.priceRrp - a.priceRrp);
      switch(isPriceSorted){
        case true:
          setIsPriceSorted(false)
          return setFilteredData(numDescending)
        case false:
          setIsPriceSorted(true)
          return setFilteredData(numAscending)
        default: 
          setIsPriceSorted(true)
          return setFilteredData(numAscending)
      }
    }
    const handleOriginData =(filteredData)=>{
      
      if(filteredData.length === 0 && prodList2 === null ){
        return paginate(prodList, currentPage, pageSize)
      }
      if(filteredData.length === 0 && prodList2 !== null){
        return paginate(prodList.concat(prodList2), currentPage, pageSize)
      }
      if(filteredData.length !== 0 && prodList2 === null){
        
        return paginate(filteredData, currentPage, pageSize)
      }
     
      if(filteredData.length !== 0 && prodList2 !== null){
        const combineTwo = filteredData.concat(prodList2)
        return paginate(combineTwo, currentPage, pageSize)
      } 
      
      
    }
    const handleFilter = (event) => {
      const searchWord = event.target.value ;
      if (searchWord ==="")
      {setFilteredData(prodList)}
      if(prodList2 !== null){
        setWordEntered(searchWord); 
        setCurrentPage(1)
        const combine = prodList.concat(prodList2)
        const name = combine.filter(combine=>combine.productName.toLowerCase().includes(searchWord))
        const desc = combine.filter(combine=>combine.desciption.toString().includes(searchWord))
        const final = name.concat(desc.filter((item)=>name.indexOf(item)<0))
        console.log(final)
        setFilteredData(final)
      }
      setWordEntered(searchWord); 
      setCurrentPage(1)
      const name = prodList.filter(prodList=>prodList.productName.toLowerCase().includes(searchWord))
      
      const desc = prodList.filter(prodList=>prodList.desciption.toString().includes(searchWord))
      const final = name.concat(desc.filter((item)=>name.indexOf(item)<0))
      console.log(final)
      setFilteredData(final)
    };
    const handleDataLength =(data)=>{
      if(data.length === 0 ){
        return prodList
      }
      else{
        return data
      }
    }

    const pageCount = handleDataLength(prodList2? prodList.concat(prodList2): filteredData).length / pageSize;

    if (Math.ceil(pageCount) === 1) return null;
    
    

    return (  
        <>
    <div className="app-container">
    <div className='searchbar'>
     <div> 
      <h6 style={{fontweight :'500' , fontSize: '20px',
          fontfamily: '"Roboto", "Helvetica", "Arial", sans-serif',lineheight: '24px',
          letterspacing:'0.15px',margin:'20px 20px',}}>Product Order
     </h6>
     <div>
        <input
          type="file" className="form" 
          style={{right:'0px' ,positions:'absolute'}}
          onChange={(e) => {const file = e.target.files[0];readExcel(file);}}/>
        <button onClick={downloadExcel}> export</button> 
      </div>
     </div>
     <div style={{flex:'1 1 10%'}}></div>
     <div className="searchInputs">
       <div className="searchPart">
         <span className="iconn">
            <i  className="bi bi-search" style={{height:'20px',width:'20px',float:"left"}}></i>
          </span>
         <input className="input"
           type="text"
           placeholder='Search'
           value={wordEntered}
           onChange={handleFilter}
           />     
       </div>
     </div>
      </div>       
        <form >
          <table >
            <thead  >           
             <tr>
             <th className="image">Image</th>
             <th className="name"onClick={sortProductName}>ProductName</th>
             <th className="code">ProductCode</th>
             <th className="desciption">Description</th>
             <th className="rrp" onClick={sortProductPrice}>PriceRrp</th>
             </tr>
            </thead>
          <tbody  >
          {handleOriginData(filteredData).map((product)=>(
            <Fragment key={product.productId}>
              <tr >
              {product.imageUrl  ? 
              ( <td><img style={{width:'70px',height:'70px'}} src={product.imageUrl} alt=''/></td>):
              (<td ><div style={{width:'70px',height:'70px'}}></div></td>)}
              <td>{product.productName}</td>
              <td>{product.productCode}</td>
              <td>{product.desciption}</td>
              <td>{product.priceRrp}</td>
              </tr>
          </Fragment>
          ))}
       </tbody>
       <tfoot>
       <React.Fragment>
        <tr style={{height:"50px"}}>
          <td colSpan={5} className='note'  style={{right:"0",position:"absolute",borderBottom:"10px",}}>
            <div  >
                {currentPage>1?
                (<>
                  <button disabled id="pagebutton">
                  <span  id ="pagespan"className="bi bi-chevron-bar-left"
                      onClick={() => handlePageChange(1)}
                      style={{ cursor: "pointer"}} >
                  </span>
                  </button>
                  <button disabled id="pagebutton" >
                  <span  id ="pagespan"className="bi bi-chevron-left"
                    onClick={() => handlePageChange(currentPage-1)}
                    style={{ cursor: "pointer"}}> 
                  </span>
                  </button>
                </>
                ):
                (<>
                  <button disabled id="pagebutton">
                  <span  id ="pagespan"className="bi bi-chevron-bar-left"
                          style={{opacity:"0.2"}} >
                  </span>
                  </button>
                  <button disabled id="pagebutton" >
                  <span  id ="pagespan"className="bi bi-chevron-left"
                          style={{opacity:"0.2"}}> 
                  </span>
                  </button>
                </>)
                }
                <span style={{fontSize:"20px",paddingLeft:"10px",paddingRight:"10px"}}>{currentPage+" of "+Math.ceil(pageCount)} </span>
                {currentPage<pageCount?
                ( <>
                    <button disabled  id="pagebutton">
                    <span  id ="pagespan"className="bi bi-chevron-right"
                          style={{ cursor: "pointer"}}   
                          onClick={() => handlePageChange(currentPage+1)}> 
                    </span>
                    </button>
                    <button disabled  id="pagebutton">
                    <span id ="pagespan"
                      style={{cursor:"pointer"}}
                      className="bi bi-chevron-bar-right"
                      onClick={() => handlePageChange(Math.ceil(pageCount))}>
                    </span>
                    </button>
                  </>
                )
                :
                (<>
                    <button disabled  id="pagebutton">
                    <span  id ="pagespan"className="bi bi-chevron-right" 
                          style={{opacity:"0.2"}}> 
                    </span>
                    </button>
                    <button disabled  id="pagebutton">
                    <span id ="pagespan"
                      style={{opacity:"0.2"}}
                      className="bi bi-chevron-bar-right">
                    </span>
                    </button>
                </>
                )          
                }      
              </div>
              </td>
        </tr>
        </React.Fragment>
       </tfoot>
     </table> 
   </form>
 </div>
      </>
    )
  }
export default Editable