import React, { useState, Fragment,useEffect} from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import Pagination from './Pagination';
import axios  from "axios";
import './Homepage.css';
import _ from "lodash";

const Testing = ({ placeholder, data }) => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [prodList, setProdList] = useState([])
  const [filteredData, setFilteredData] = useState([]);
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
  const [isPriceSorted,setIsPriceSorted]=useState(null)
  const [isNameSorted,setIsNameSorted]=useState(null)
 
  const [wordEntered, setWordEntered] = useState("");
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const  [Upload,setUpload] = useState()
  const [file, setFile] = useState();
  const [editContactId, setEditContactId] = useState(null);
  const [remove , setremove] = useState(null)
  const [addClick, setaddClick] = useState(null);
  const [addFormData, setAddFormData] = useState({
    productName: "",
    productCode: "",
    desciption: "",
    priceRrp: "",
    imageUrl:""
  });

  const [editFormData, setEditFormData] = useState({
    productName: "",
    productCode: "",
    desciption: "",
    priceRrp: "",
    imageUrl:"",
   
  });
  
  const changeType  = newdata => {
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
      setaddClick(null)
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
    dataUpdate[index].productName= newData.productName;
    dataUpdate[index].productCode= newData.productCode;
    dataUpdate[index].desciption= newData.desciption;
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
  const handleAdd=()=>{
    setaddClick(true) 
  }
  const handleCancel=()=>{
    setaddClick(null)
  }
  const [UploadOrNot,setUploadOrNot] = useState(null)

  const onFileChange =(e)=>{
    e.preventDefault();
    setUpload(e.target.files[0])
    setFile(URL.createObjectURL(e.target.files[0]))
    setUploadOrNot(true)
  }
  const onFileCancel=(e)=>{
    e.preventDefault();
    setUpload()
    setFile(null)
    setUploadOrNot(null)
  }
  const sortProductName =(e)=>{
    e.preventDefault()
    setCurrentPage(1)
    setIsPriceSorted(null)
    const nameAscending = [...prodList].sort((a, b) => a.productName > b.productName ? 1:-1);
    const nameDescending = [...prodList].sort((a, b) => a.productName > b.productName ? -1:1);
    switch(isNameSorted){
      case true:
        setIsNameSorted(false)
        return setFilteredData(nameDescending)
      case false:
        setIsNameSorted(true)
        return setFilteredData(nameAscending)
      default: 
        setIsNameSorted(true)
        return setFilteredData(nameAscending)
    }
  }
  const sortProductPrice =(e)=>{
    e.preventDefault()
    setCurrentPage(1)
    setIsNameSorted(null)
    const numAscending = [...prodList].sort((a, b) => a.priceRrp - b.priceRrp);
    const numDescending = [...prodList].sort((a, b) => b.priceRrp - a.priceRrp);
    switch(isPriceSorted){
      case true:
        setIsPriceSorted(false)
        return setFilteredData(numDescending)
      case false:
        setIsPriceSorted(true)
        return setFilteredData(numAscending)
      default: 
        setIsPriceSorted(true)
        return setFilteredData(numAscending)
    }
  }
  const onFileSubmit = (e)=>{
    e.preventDefault(); 
    let formdata = new FormData();
    formdata.append("imageFile", Upload)
      axios.post("http://47.74.86.28:5030/api/Common/UploadImage",formdata)
        .then (res=>{
          setUpload(formdata); 
          setFile()
          setUploadOrNot(null)
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
      console.log(wordEntered)   
      setCurrentPage(1)
      const name = prodList.filter(prodList=>prodList.productName.toLowerCase().includes(searchWord))
      const desc = prodList.filter(prodList=>prodList.desciption.includes(searchWord))
      const final = name.concat(desc.filter((item)=>name.indexOf(item)<0))
      setFilteredData(final)
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
          <div><button  className="btn" ><i  onClick={handleAdd}className="bi bi-plus-square"></i></button>
             </div>
        </div>
    </div>       
      <form >
        <table >
          <thead  >           
                {(editContactId === null) ? 
                (
                <tr>
                <th className="action">Actions</th>
                <th className="image">Image</th>
                <th className="name" onClick={sortProductName}>ProductName 
                  { (isNameSorted === true || isNameSorted=== null) ?
                    <i className="bi bi-arrow-up-short" style={{color:"white"}}></i>
                    :
                    <i className="bi bi-arrow-down-short" style={{color:"white"}}></i>
                  }
                </th>
                <th className="code">ProductCode</th>
                <th className="desciption">Description</th>
                <th className="rrp" onClick={sortProductPrice}>PriceRrp
                  { (isPriceSorted === true || isPriceSorted=== null) ?
                    <i className="bi bi-arrow-up-short" style={{color:"white"}}></i>
                    :
                    <i className="bi bi-arrow-down-short"style={{color:"white"}}></i>
                  }
                </th>
                {(editContactId === null && addClick !==true)? 
                (<></>)
                :
                ( <th className="up">Uploadphoto</th> )
                }        
              </tr>
              ):
              (
                <tr>
                <th className="action">Actions</th>
                <th className="image">Image</th>
                <th className="name">ProductName</th>
                <th className="code">ProductCode</th>
                <th className="desciption">Description</th>
                <th className="rrp">PriceRrp</th>
                {remove ===true ?
                (<></>)
                :
                (<th className="up">Uploadphoto</th>)
                }          
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
                  prodList={prodList}
                  handleEditFormChange={handleEditFormChange}
                  handleSaveClick={handleSaveClick}
                  handleCancelClick={handleCancelClick}
                  handleDeleteClick={handleDeleteClick}
                  remove ={remove}
                  onFileChange={onFileChange}
                  onFileSubmit={onFileSubmit}
                  uploadFile={uploadFile}
                  Upload={Upload}
                  file={file}
                  UploadOrNot={UploadOrNot}
                  onFileCancel={onFileCancel}
                />
              ):( 
                <ReadOnlyRow  
                    product={product}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    handleDeleteEdit={handleDeleteEdit}
                    onFileChange={onFileChange}
                    onFileSubmit={onFileSubmit}  
                    editContactId={editContactId}    
                    addClick={addClick}
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
                handleAdd={handleAdd}
                addClick={addClick}
                addFormData ={addFormData}
                handleAddFormSubmit={handleAddFormSubmit}
                handleCancel={handleCancel}
                handleAddFormChange={handleAddFormChange}
                uploadFile={uploadFile}
                onFileChange={onFileChange}
                file={file}
                onFileCancel={onFileCancel}
                onFileSubmit={onFileSubmit}
                UploadOrNot={UploadOrNot}
                />  
          </tfoot>
        </table> 
      </form>
    </div>
  );
};

export default Testing;