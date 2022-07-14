import React, { useState, Fragment,useEffect} from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import Pagination from './Pagination';
import axios  from "axios";
// import  {paginate}  from "./paginate";
import './Homepage.css';
import _ from "lodash";

const Testing = ({ placeholder, data }) => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [prodList, setProdList] = useState([])
  
  useEffect(() => {
    getData();
  }, [])
  const getData =(newdata)=>{
    axios.get('http://47.74.86.28:5030/api/Product')
      .then(res => {
          setProdList(res.data.data)
      })
      .catch(error => {
          console.log(error);      
      });
  }
  const [filteredData, setFilteredData] = useState([]);
  const [paginatePosts, setpaginatePosts] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [editContactId, setEditContactId] = useState(null);
  const [remove , setremove] = useState([null])
  const wannadelete =()=>{
    setremove(true)
  };
  const [addFormData, setAddFormData] = useState({
    productName: "",
    productCode: "",
    desciption: "",
    price: "",
    priceRrp: "",
    imageUrl:""
  });

  const [editFormData, setEditFormData] = useState({
    productName: "",
    productCode: "",
    desciption: "",
    price: "",
    priceRrp: "",
    imageUrl:"",
   
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
    const newAddFormData = {...addFormData };
    newAddFormData[fieldName] = fieldValue;
    setAddFormData(newAddFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value; 
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    axios.post('http://47.74.86.28:5030/api/Product/ProductCreate',changeType(addFormData))          
    .then(res=>{   
      getData();
      alert('Add successfully')
      setaddClick(false)
    })
    .catch(error=>{
      alert('Add unsuccessfully')
    })
  };
  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
  };
  const handleEditClick = (event, product) => {
    setEditContactId(product.productId);
    const formValues = {
      productName: product.productName,
      productCode: product.productCode,
      desciption: product.desciption,
      price: product.price,
      priceRrp: product.priceRrp,
      imageUrl : product.imageUrl,};
    setEditFormData(formValues);
  };

  const handleDeleteEdit =(event, product) =>{
    setEditContactId(product.productId);
    setremove(true)
  }
  const handleCancelClick = () => {
    setEditContactId(null);
    setremove(false)
  };
  const uploadFile=()=>{
  document.getElementById('selectFile').click()
}
  const handleSaveClick =(newData)=>{
    const dataUpdate = [...prodList];
    const index = prodList.findIndex((product) => product.productId === editContactId)
    console.log(newData)
    dataUpdate[index].productName= newData.productName;
    dataUpdate[index].productCode= newData.productCode;
    dataUpdate[index].desciption= newData.desciption;
    dataUpdate[index].price= newData.price;
    dataUpdate[index].priceRrp= newData.priceRrp;
    dataUpdate[index].imageUrl=newData.imageUrl
    axios.put('http://47.74.86.28:5030/api/Product/ProductUpdate',changeType(dataUpdate[index]))
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
    axios.delete('http://47.74.86.28:5030/api/Product/'+oldData.productId)
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
  const handleCancel=()=>{
    setaddClick(false)
  }
  const [Upload,setUpload] = useState()

  const onFileChange =(e)=>{
    e.preventDefault();
    setUpload(e.target.files[0])
    alert("add successful")
  }
  const onFileUpload = (e)=>{
    e.preventDefault(); 
    let formdata = new FormData();
    formdata.append("imageFile", Upload)
      axios.post("http://47.74.86.28:5030/api/Common/UploadImage",formdata)
        .then (res=>{
          setUpload(formdata); 
          editFormData.imageUrl = res.data
          handleSaveClick(editFormData)
        })
        .catch((error)=>{
            console.log(error)
            alert('Unsuccessfully');
        })
        setEditContactId(null) 
  };
  
  const originData =(wordEntered)=>{
    if(wordEntered.length === 0){
      return prodList
    }
    else{
      console.log(filteredData)
      return filteredData
    }
  }
  const handleOriginData =(data)=>{
    if(data.length === 0 ){
      return paginate(prodList, currentPage, pageSize)
    }
    else{
      return paginate(filteredData, currentPage, pageSize)
    }
    
    
  }
  const handleFilter = (event) => {
    const searchWord = event.target.value ;
    if (searchWord === "") {
      setFilteredData(prodList)}
    setWordEntered(searchWord);   
    setFilteredData(prodList.filter(prodList=>prodList.productName.toLowerCase().includes(searchWord)))
   
  };
  
  return (
    <div className="app-container">
       <div className='searchbar'>
        <div> <h6 style={{fontweight :'500' , fontSize: '20px',
        fontfamily: '"Roboto", "Helvetica", "Arial", sans-serif',lineheight: '24px',
        letterspacing:'0.15px',margin:'20px 20px',}}>Editable Preview</h6>
        </div>
        <div style={{flex:'1 1 10%'}}></div>
        <div className="searchInputs">
          <div className="searchPart">
            <span className="iconn"><i  className="bi bi-search" style={{height:'20px',width:'20px'}}></i></span>
            <input className="input"
              type="text"
              placeholder='Search'
              value={wordEntered}
              onChange={handleFilter}/>     
          </div>
          <div  className=""><button  className="btn" onClick={handleAdd}><i className="bi bi-plus-square"></i></button>
             </div>
        </div>
    </div>       
      <form >
        <table >
          <thead  >           
              {editContactId === null   ? (
                <tr>
                <th className="action">Actions</th>
                <th className="image">Image</th>
                <th className="name">ProductName</th>
                <th className="code">ProductCode</th>
                <th className="desciption">Desciption</th>
                <th className="price">Price</th>
                <th className="rrp">PriceRrp</th>
                <th className="up">Uploadphoto</th>        
              </tr>
              ):(
                <tr>
                <th className="action">Actions</th>
                <th className="image">Image</th>
                <th className="name">ProductName</th>
                <th className="code">ProductCode</th>
                <th className="desciption">Desciption</th>
                <th className="price">Price</th>
                <th className="rrp">PriceRrp</th>
                <th className="up">Uploadphoto</th>     
                </tr>
              )}        
          </thead>
          <tbody>
            {handleOriginData(filteredData).map((product) =>(
              
            <Fragment key={product.productId}>            
              {editContactId === product.productId ? 
              ( 
                <EditableRow 
                  editFormData={editFormData}
                  product={product}
                  handleEditFormChange={handleEditFormChange}
                  handleSaveClick={handleSaveClick}
                  handleCancelClick={handleCancelClick}
                  handleDeleteClick={handleDeleteClick}
                  remove ={remove}
                  onFileChange={onFileChange}
                  onFileUpload={onFileUpload}
                  uploadFile={uploadFile}
                  Upload={Upload}
                />
              ):( 
                <ReadOnlyRow  
                    product={product}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    handleAdd={addClick}
                    handleDeleteEdit={handleDeleteEdit}
                    wannadelete={wannadelete}
                    onFileChange={onFileChange}
                    onFileUpload={onFileUpload}        
                  />
              )}   
          </Fragment> ))}
          </tbody>
          <tfoot>
              <Pagination
                items={originData(wordEntered).length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                handleAdd={addClick}
                addFormData ={addFormData}
                handleAddFormSubmit={handleAddFormSubmit}
                handleCancel={handleCancel}
                handleAddFormChange={handleAddFormChange}
                />  
          </tfoot>
        </table> 
      </form>
    </div>
  );
};

export default Testing;