import React, { useState, Fragment,useEffect} from "react";
import { nanoid } from "nanoid";
// import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import axios  from "axios";


const Testing = () => {
    // const [columns] = useState([
        
    //     { title: 'ProductName', field: 'productName' },
    //     { title: 'ProductCode', field: 'productCode' },
    //     { title: 'Desciption', field: 'desciption' },
    //     { title: 'Price', field: 'price' },
    //     { title: 'RrpPrice', field: 'priceRrp' },    
    // ]);


    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
  
    const [prodList, setProdList] = useState([])
    
    useEffect(
      () => {getData();}, [])

    const getData =(newdata)=>{
      axios.get('http://206.189.39.185:5031/api/Product')
        .then(res => {
            setProdList(res.data.data)
            // setPosts(res.data);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setLoading(true);
        });
       
    }
   // Get current posts
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const [contacts, setContacts] = useState(prodList);
  const [editContactId, setEditContactId] = useState(null);
  
  const [addFormData, setAddFormData] = useState({
    productName: "",
    productCode: "",
    desciption: "",
    price: "",
    priceRrp: "",

  });

  const [editFormData, setEditFormData] = useState({
    productName: "",
    productCode: "",
    desciption: "",
    price: "",
    priceRrp: "",
  });

  const changeType  = newdata => {
    newdata.price = parseInt(newdata.price)
    newdata.priceRrp = parseInt(newdata.priceRrp)
   return newdata
 }

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    // console.log(newFormData)
    setAddFormData(newFormData);
    // console.log(addFormData)
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value; 
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    // console.log(newFormData)
    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    axios.post('http://206.189.39.185:5031/api/Product/ProductCreate',changeType(addFormData))          
    .then(res=>{   
      getData();
      alert('Add successfully')
    })
    .catch(error=>{
      alert('Add unsuccessfully')
    })
  };

  const handleEditClick = (event, product) => {
  
    // event.preventDefault();
    setEditContactId(product.productId);
    // console.log(product)
    const formValues = {
      productName: product.productName,
      productCode: product.productCode,
      desciption: product.desciption,
      price: product.price,
      priceRrp: product.priceRrp,

    };

    setEditFormData(formValues);
  };
  const handleCancelClick = () => {
    setEditContactId(null);
  };
  const handleSaveClick =(newData)=>{

    const dataUpdate = [...prodList];
    const index = prodList.findIndex((product) => product.productId === editContactId)
    // dataUpdate[index] = newData;
    dataUpdate[index].productName= newData.productName;
    dataUpdate[index].productCode= newData.productCode;
    dataUpdate[index].desciption= newData.desciption;
    dataUpdate[index].price= newData.price;
    dataUpdate[index].priceRrp= newData.priceRrp;
    console.log(index)
    console.log(dataUpdate)
    axios.put('http://206.189.39.185:5031/api/Product/ProductUpdate',changeType(dataUpdate[index]))
    .then (response=>{
        setProdList([...dataUpdate]);  
        alert('Update successfully'); 
        
    })
    .catch((error)=>{
        alert('Unsuccessfully');
    })
    setEditContactId(null) 
  }
  
  const handleDeleteClick = (oldData) => {
    const dataDelete = [prodList];
    const index = prodList.findIndex((prodList)=>prodList.productId===oldData.productId);
    dataDelete.splice(index, 1);
    const filteredData = prodList.filter( (e) => e.productId !== oldData.productId);
    axios.delete('http://206.189.39.185:5031/api/Product/'+oldData.productId)
    .then(res=>{  
      setProdList([...filteredData])
      alert('Delete successfully')
    })
    .catch(error=>{
      alert('Delete Unsuccessfully')
    })
  };

  const [addClick, setaddClick] = useState(null);
  const handleAdd=()=>{
    setaddClick(true)
  }
  return (
    <div className="app-container">
       {/* <p>Search</p> */}
       <button onClick={handleAdd}>Add</button>
       
      <form >
        <table>
          <thead>
            <tr>
              <th>productName</th>
              <th>productCode</th>
              <th>desciption</th>
              <th>price</th>
              <th>priceRrp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prodList.map((product) => (
              <Fragment key={product.productId}>

                {editContactId === product.productId ? (
                  <EditableRow 
                    editFormData={editFormData}
                    product={product}
                    handleEditFormChange={handleEditFormChange}
                    handleSaveClick={handleSaveClick}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                  
                    product={product}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    handleAdd={addClick}
                    handleAddFormChange={handleAddFormChange}
                    
                  />
                 
                )}
                {/* {addClick === true }(
                  <ReadOnlyRow
                  
                    product={product}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    handleAdd={addClick}
                    handleAddFormChange={handleAddFormChange}
                    
                  />

                ) */}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
     
      <form >
    
        <button onClick={handleAddFormSubmit} type="button">Add</button>
        <button  type="button">Cancel</button>
      </form>
    </div>
  );
};

export default Testing;