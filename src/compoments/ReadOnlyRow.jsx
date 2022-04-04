import { RecentActorsRounded } from "@material-ui/icons";
import React from "react";
import  { useState, Fragment,useEffect} from "react";
const ReadOnlyRow = (
  { product, 
    handleEditClick, 
    handleDeleteClick,
    handleAdd ,
    handleAddFormChange}) => { 
  return (
    
    <React.Fragment>
      {handleAdd === true ?
      ( 
      <table>
        <tbody>
          <tr>
            <td>{product.productName}</td>
            <td>{product.productCode}</td>
            <td>{product.desciption}</td>
            <td>{product.price}</td>
            <td>{product.priceRrp}</td>
            <td>
              <button
                type="button"
                onClick={(event) => handleEditClick(event, product)}>
                Edit
              </button>
              <button type="button" onClick={() => handleDeleteClick(product)}>
                Delete
              </button>
            </td>
          </tr>
          <tr>
              <td>
                <input
                  type="text"
                  name="productName"
                  required="required"
                  // value={addFormData.productName}          
                  onChange={handleAddFormChange}
                />
              </td>
              <td> 
                <input
                type="text"
                name="productCode"
                required="required"
                // value={addFormData.productCode}          
                onChange={handleAddFormChange}
              />
              </td>
              <td>
                  <input
                  type="text"
                  name="desciption"
                  required="required"
                  // value={addFormData.desciption}        
                  onChange={handleAddFormChange}
                />
                </td>
                <td> 
                    <input
                      type="number"
                      name="price"
                      required="required"
                      // value={addFormData.price}          
                      onChange={handleAddFormChange}
                    />
                </td>
                <td> 
                  <input
                    type="number"
                    name="priceRrp"
                    required="required"
                    // value={addFormData.priceRrp}  
                    onChange={handleAddFormChange}
                  />
                </td>
          </tr>        
        </tbody>

      </table>
      
      
      )   
      :( 
      <tr>
        <td>{product.productName}</td>
        <td>{product.productCode}</td>
        <td>{product.desciption}</td>
        <td>{product.price}</td>
        <td>{product.priceRrp}</td>
        
        <td>
          <button
            type="button"
            onClick={(event) => handleEditClick(event, product)}>
            Edit
          </button>
          <button type="button" onClick={() => handleDeleteClick(product)}>
            Delete
          </button>
        </td>
        <td>hi</td>
        
      </tr>)}
    

    </React.Fragment>

    
  );
};

export default ReadOnlyRow;