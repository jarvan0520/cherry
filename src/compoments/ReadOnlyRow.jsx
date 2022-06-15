import { Delete, RecentActorsRounded } from "@material-ui/icons";

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
    UploadImage

  
  }) => { 
  return (
    <React.Fragment>
       {remove === true ?(

        <tr >
          <td className="button">fridgeWestinghouse Fridge Freezer
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
      </tr>
      )}

    </React.Fragment>
   
    // <tr>
    //     <td className="button">
    //       <button className="btn"
    //         type="button"
    //         onClick={(event) => handleEditClick(event, product)}>
    //         <i className="bi bi-pencil-fill"></i>
    //       </button>
    //       <button class="btn" type="button" 
    //       onClick={(event) => handleDeleteEdit(event, product)}>
           
    //       <i class="bi bi-trash"></i>
    //       </button>
    //     </td>
    //     {product.imageUrl  ? ( <td><img style={{width:'70px',height:'70px'}} src={product.imageUrl} alt=''/></td>):(<td ><div style={{width:'70px',height:'70px'}}></div></td>)}
    //     <td>{product.productName}</td>
    //     <td>{product.productCode}</td>
    //     <td>{product.desciption}</td>
    //     <td>{product.price}</td>
    //     <td>{product.priceRrp}</td>
    //   </tr>
  );
};

export default ReadOnlyRow;