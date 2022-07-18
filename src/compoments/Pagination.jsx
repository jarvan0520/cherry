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
                    handleAdd}) => {
  const pageCount = items / pageSize;
  if (Math.ceil(pageCount) === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <>
       {handleAdd === true ? (
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
                <td><p style={{height:'70px',width:'70px'}}>image </p></td>
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
                       name="price"
                       required="required"  
                       value={addFormData.price}                       
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
                 <td><button>upload</button></td>
                 
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