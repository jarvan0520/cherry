import React from "react";
import './Homepage.css';
 
const EditableRow = ({
  editFormData,
  product,
  handleEditFormChange,
  handleSaveClick,
  handleCancelClick,
  handleEditFormSubmit,
  handleDeleteClick,
  remove,
  onFileChange,
  onFileUpload,
  Upload
}) => {
  const uploadFile=()=>{
    document.getElementById('selectFile').click()
  }
  return (
    <React.Fragment>
      {remove === true ? (
      <tr>
      <td className="button">
        <button className='btn' type="button" onClick={()=>handleDeleteClick(product)}><i className="bi bi-check-lg"></i></button>
        <button className='btn' type="button" onClick={handleCancelClick}>
        <i className="bi bi-x-lg"></i>      
        </button>
      </td>
      {product.imageUrl  ? ( <td><img style={{width:'70px',height:'70px'}} src={product.imageUrl} alt=''/></td>):(<td ><div style={{width:'70px',height:'70px'}}></div></td>)}
      <td className='note' colSpan={6}><h5>Are you sure you want to delete this row? </h5></td>
      
    </tr>

    ) : 
    
    (<tr > 
      <td className="button">
        <button className='btn' type="button" onClick={()=>handleSaveClick(editFormData)}><i className="bi bi-check-lg"></i></button>
        <button className='btn' type="button" onClick={handleCancelClick}>
        <i className="bi bi-x-lg"></i>
        </button>
      </td>
      {product.imageUrl ? 
      ( <td>
        <img style={{width:'70px',height:'70px'}} src={product.imageUrl} alt=''/>
        </td>):
      (<td >
        <div style={{width:'70px',height:'70px'}} >
        </div>
        
      </td>)}
      
      <td className="name">
        <input
          type="text"
          required="required"
          name="productName"
          value={editFormData.productName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className='code'>
          <input
          type="text"
          required="required" 
          name="productCode"
          value={editFormData.productCode}
          onChange={handleEditFormChange}
          ></input>
      </td>
      <td className='desciption'>
        <input
          type="text"
          required="required"
          name="desciption"
          value={editFormData.desciption}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className='price'>
      <input       
          type="number"
          required="required"      
          name="price"
          value={editFormData.price||""}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className='rrp'>
      <input
         type="number"
          required="required"
          name="priceRrp"
          value={editFormData.priceRrp}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
       
        <button onClick={uploadFile} style={{border:"none",backgroundColor:"white",textAlign:"center",paddingRight:"10px"}}><i className="bi bi-upload" style={{backgroundColor:"white",fontSize:"20px"}}></i></button>
        <input id="selectFile" type="file" name="imageUrl"style={{display:"none"}} onChange={onFileChange}/>
          
        {/* <button onClick={onFileUpload} style={{backgroundColor:"blue",color:"white",borderRadius:"80%"}}>Submit</button>  */}
        <button onClick={onFileUpload} style={{background: "#016ABC",color: "#fff",border: "1px solid #eee",borderRadius: "20px",boxShadow: "none",textAlign:"center"}}>Submit</button> 
      </td>
      
    </tr>)}

    </React.Fragment>
    
  );
};

export default EditableRow;