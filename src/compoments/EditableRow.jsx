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
  onFileUpload
}) => {
  return (
    <React.Fragment>
      {remove === true ? (
      <tr>
      <td className="button">
        <button className='btn' type="button" onClick={()=>handleDeleteClick(product)}><i class="bi bi-check-lg"></i></button>
        <button className='btn' type="button" onClick={handleCancelClick}>
        <i className="bi bi-x-lg"></i>      
        </button>
      </td>
      {product.imageUrl  ? ( <td><img style={{width:'70px',height:'70px'}} src={product.imageUrl} alt=''/></td>):(<td ><div style={{width:'70px',height:'70px'}}></div></td>)}
      <td className='note' colSpan={5}><h6>Are you sure you want to delete this row? </h6></td>
      
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
        {/* <div>
           <input type="file"  
          name="imageUrl"
          onChange={(e)=>onFileSelect(e)} 
          />
         <button onClick={(e)=>onFileUpload(e,editFormData)}>UPLOAD</button> 
        </div> */}
        
        </td>):
      (<td >
      
        <div style={{width:'70px',height:'70px'}} >
      
        </div>
        
        {/* <div>
          <input type="file"  
          name="imageUrl"
          onChange={(e)=>onFileSelect(e)} 
          
          />
         <button onClick={(e)=>onFileUpload(e)}>UPLOAD</button> 
          
          <button onClick={(e)=>onFileUpload(e,editFormData)}>UPLOAD</button>
        </div> */}
        
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
        {/* <input type="file"  
        name="imageUrl"
        onChange={(e)=>onFileSelect(e)} 
        />
        <button onClick={(e)=>onFileUpload(e,editFormData)}>UPLOAD</button>  */}
        <input type="file"  
            name="imageUrl"
            onChange={onFileChange}/>
            {/* <button onClick={(e)=>onFileUpload(e,editFormData)}>UPLOAD</button> */}
            <button onClick={onFileUpload}>UPLOAD</button> 
      
      </td>
      
    </tr>)}

    </React.Fragment>
    
  );
};

export default EditableRow;