
import React, { useState, Fragment,useEffect} from "react";

import './Homepage.css';
         
const Pagination = ({ postsPerPage, 
                      totalPosts, 
                      paginate }) => {
  const pageNumbers = [];
           
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const ReadOnlyRow = (
  { product, 
    handleEditClick, 
    handleDeleteClick,
    handleDeleteEdit,
    handleAdd ,
    handleAddFormChange,
    postsPerPage, 
    totalPosts, 
    paginate,
    wannadelate,
    makeSureDelete,
    remove,
    UploadImage,
    onFileSelect,
    onFileUpload,
    editFormData,
    handleEditFormChange
  
  }) => { 
  return (
    <React.Fragment>
       {remove === true ?(

        <tr >
          <td className="button">
            <button className="btn"
              type="button"
              onClick={(event) => handleEditClick(event, product)}>
              <i className="bi bi-pencil-fill"></i>
            </button>
            <button className="btn" type="button" 
            onClick={(event) => handleDeleteEdit(event, product)}>
            
            <i className="bi bi-trash"></i>
            </button>
          </td>
          {product.imageUrl  ? 
          ( <td><img style={{width:'70px',height:'70px'}} src={product.imageUrl} alt=''/></td>):
          (<td ><div style={{width:'70px',height:'70px'}}></div></td>)}
          <td>{product.productName}</td>
          <td>{product.productCode}</td>
          <td>{product.desciption}</td>
          <td>{product.price}</td>
          <td>{product.priceRrp}</td>
        </tr>
      ):(
      <tr >
        <td className="button">
          <button className="btn"
            type="button"
            onClick={(event) => handleEditClick(event, product)}>
            <i className="bi bi-pencil-fill"></i>
          </button>
          <button className="btn" type="button" 
          onClick={(event) => handleDeleteEdit(event, product)}>
          
          <i className="bi bi-trash"></i>
          </button>
        </td>
        {product.imageUrl  ? 
        ( <td><img style={{width:'70px',height:'70px'}} src={product.imageUrl} alt=''/></td>):
        (<td ><div style={{width:'70px',height:'70px'}}></div></td>)}
        <td>{product.productName}</td>
        <td>{product.productCode}</td>
        <td>{product.desciption}</td>
        <td>{product.price}</td>
        <td>{product.priceRrp}</td>
        {/* <td><input type="file"  
            name="imageUrl"
            onChange={onFileSelect}/>
            <button onClick={(e)=>onFileUpload(e,editFormData)}>UPLOAD</button>
            <button onClick={onFileUpload}>UPLOAD</button> 
         </td> */}
      </tr>
      )}

    </React.Fragment>
  );
};

export default ReadOnlyRow;