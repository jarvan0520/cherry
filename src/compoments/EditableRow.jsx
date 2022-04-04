import React from "react";

const EditableRow = ({
  editFormData,
  product,
  handleEditFormChange,
  handleSaveClick,
  handleCancelClick,
  handleEditFormSubmit
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          name="productName"
          value={editFormData.productName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required" 
          name="productCode"
          value={editFormData.productCode}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          name="desciption"
          value={editFormData.desciption}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input       
          type="number"
          required="required"      
          name="price"
          value={editFormData.price}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
         type="number"
          required="required"
          name="priceRrp"
          value={editFormData.priceRrp}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        {/* <button type="button" onClick={handleSaveClick}>Save</button> */}
        <button type="button" onClick={()=>handleSaveClick(editFormData)}>Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;