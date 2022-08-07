import React from "react";
import '../Homepage.css';
const Pagination = ({ items, 
                    pageSize, 
                    currentPage, 
                    onPageChange,
                    handleAddFormChange,
                    handleAddFormSubmit,
                    addFormData,
                    handleCancel,
                    uploadFile,
                    onFileChange,
                    UploadOrNot,
                    onFileCancel,
                    file,
                    onFileSubmit,
                    addClick}) => {
  const pageCount = items / pageSize;
  if (Math.ceil(pageCount) === 1) return null;
  return (
    <>
      {addClick === true ? (
        <React.Fragment>
        <tr>
            <td className='button'>
              {addFormData.productCode || addFormData.productName || addFormData.desciption || addFormData.priceRrp ?
              (<button
                className='btn'
                type="button"
                onClick={()=>handleAddFormSubmit(addFormData)}>
                <i className="bi bi-check-lg"></i>
              </button>
              ):(
                <button disabled
                className='btn'
                type="button"
               >
                <i className="bi bi-check-lg" style={{opacity:"0.3"}}></i>
                </button>
              )}
              
              <button 
                  className='btn'
                  type="button" onClick={handleCancel}>
                  <i className="bi bi-x-lg"></i>
              </button>
            </td>
            <td>
              {file ? 
              (<img style={{height:'70px',width:'70px'}} src={file} alt=""></img>)
              :
              (<div style={{height:'70px',width:'70px'}}></div>)}
            </td>
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
          <tr style={{height:"50px"}}>
          <td colSpan={5} className='note'  style={{right:"0",position:"absolute",borderBottom:"10px",}}>
            <div  >
                {currentPage>1?
                (<>
                  <button disabled id="pagebutton">
                  <span  id ="pagespan"className="bi bi-chevron-bar-left"
                      onClick={() => onPageChange(1)}
                      style={{ cursor: "pointer"}} >
                  </span>
                  </button>
                  <button disabled id="pagebutton" >
                  <span  id ="pagespan"className="bi bi-chevron-left"
                    onClick={() => onPageChange(currentPage-1)}
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
                {currentPage<4?
                ( <>
                    <button disabled  id="pagebutton">
                    <span  id ="pagespan"className="bi bi-chevron-right"
                          style={{ cursor: "pointer"}}   
                          onClick={() => onPageChange(currentPage+1)}> 
                    </span>
                    </button>
                    <button disabled  id="pagebutton">
                    <span id ="pagespan"
                      style={{cursor:"pointer"}}
                      className="bi bi-chevron-bar-right"
                      onClick={() => onPageChange(Math.ceil(pageCount))}>
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
                )}      
              </div>
              </td>
        </tr>
        </React.Fragment>     
        )
        :
        (
        <React.Fragment>
        <tr style={{height:"50px"}}>
          <td colSpan={5} className='note'  style={{right:"0",position:"absolute",borderBottom:"10px",}}>
            <div  >
                {currentPage>1?
                (<>
                  <button disabled id="pagebutton">
                  <span  id ="pagespan"className="bi bi-chevron-bar-left"
                      onClick={() => onPageChange(1)}
                      style={{ cursor: "pointer"}} >
                  </span>
                  </button>
                  <button disabled id="pagebutton" >
                  <span  id ="pagespan"className="bi bi-chevron-left"
                    onClick={() => onPageChange(currentPage-1)}
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
                {currentPage<4?
                ( <>
                    <button disabled  id="pagebutton">
                    <span  id ="pagespan"className="bi bi-chevron-right"
                          style={{ cursor: "pointer"}}   
                          onClick={() => onPageChange(currentPage+1)}> 
                    </span>
                    </button>
                    <button disabled  id="pagebutton">
                    <span id ="pagespan"
                      style={{cursor:"pointer"}}
                      className="bi bi-chevron-bar-right"
                      onClick={() => onPageChange(Math.ceil(pageCount))}>
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
        )}
    </>
  );
};

export default Pagination;