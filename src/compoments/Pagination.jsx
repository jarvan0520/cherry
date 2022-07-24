import _ from "lodash";
import React from "react";
import './Homepage.css';
const Pagination = ({ items, 
                    pageSize, 
                    currentPage, 
                    onPageChange,
                    handleAddFormChange,
                    handleAddFormSubmit,
                    addFormData,
                    handleCancel,
                    handleAdd,
                    uploadFile,
                    onFileChange,
                    UploadOrNot,
                    onFileCancel,
                    file,
                    onFileSubmit,
                    addClick}) => {
  const pageCount = items / pageSize;
  if (Math.ceil(pageCount) === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <>
       {addClick === true ? (
           <React.Fragment>
            <tr>
                <td className='button'>
                 <button
                    className='btn'
                    type="button"
                    onClick={()=>handleAddFormSubmit(addFormData)}>
                    <i className="bi bi-check-lg"></i>
                </button>
                
                <button 
                    className='btn'
                    type="button" onClick={handleCancel}>
                    <i className="bi bi-x-lg"></i>
                </button>
                </td>
                <td><img style={{height:'70px',width:'70px',marginBottom:"0px"}}src={file}></img></td>
               <td>
                 <input
                   type="text"
                   name="productName"
                   required="required"
                   value={addFormData.productName} 
                   onChange={handleAddFormChange}
                 />
               </td>
               <td> 
                 <input
                 type="text"
                 name="productCode"
                 required="required" 
                 value={addFormData.productCode}      
                 onChange={handleAddFormChange}
               />
               </td>
               <td>
                   <input
                   type="text"
                   name="desciption"
                   required="required"   
                   value={addFormData.desciption}                 
                   onChange={handleAddFormChange}
                />
                </td>
                <td> 
                  <input
                    type="number"
                    name="priceRrp"
                    required="required"
                    value={addFormData.priceRrp}  
                    onChange={handleAddFormChange}
                  />
                </td>
                <td>
                  <input id="selectFile" type="file" name="imageUrl"style={{display:"none"}} onChange={onFileChange}/>
                  {UploadOrNot === null ?
                    (
                      <i  id="select"className="bi bi-upload" style={{backgroundColor:"white",fontSize:"20px"}} onClick={uploadFile}></i>
                    ):
                    (<div>
                      <button onClick={onFileSubmit} style={{background: "#016ABC",color: "#fff",border: "1px solid #eee",borderRadius: "20px",boxShadow: "none",textAlign:"center"}} >Submit</button> 
                      <button onClick={onFileCancel} style={{background: "#016ABC",color: "#fff",border: "1px solid #eee",borderRadius: "20px",boxShadow: "none",textAlign:"center"}}>Cancel</button>
                    </div>)
                    }
                  
                </td>  

                             
           </tr> 
           <></>    
       <tr>
         <td className="pagination">
           {pages.map((page) => (
             <li
               key={page}
               className={
                 page === currentPage ? "page-item active" : "page-item"
               }
             >
               <span
                 style={{ cursor: "pointer" }}
                 onClick={() => onPageChange(page)}
                 className="page-link"
               >
                 {page}
               </span>
             </li>
           ))}
         </td>
       </tr>
      </React.Fragment>
        ):(<tr>
          <td className="pagination">
            {pages.map((page) => (
              <li
                key={page}
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => onPageChange(page)}
                  className="page-link"
                >
                  {page}
                </span>
              </li>
            ))}
          </td>
        </tr>)}  
    </>
  );
};

export default Pagination;