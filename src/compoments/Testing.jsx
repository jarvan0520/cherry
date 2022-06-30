import React, { useState, Fragment,useEffect} from "react";
import { nanoid } from "nanoid";
// import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import Posts from './Posts';
import Pagination from './Pagination';
import axios  from "axios";
import  {paginate}  from "./paginate";
import './Homepage.css';
import { width } from "@mui/system";
import { ContactSupportOutlined } from "@material-ui/icons";


const Testing = ({ placeholder, data }) => {

    const [posts, setPosts] = useState([]);
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const [prodList, setProdList] = useState([])
    
    useEffect(() => {
      getData();
    }, [])

    const getData =(newdata)=>{
      axios.get('http://47.74.86.28:5030/api/Product')
        .then(res => {
            let parsedData = res.data.data;
            // for(let item of parsedData){
            //   item.imageUrl = parse(item.imageUrl)
            // }
            console.log(res.data.data)
            setProdList(res.data.data)
            // setPosts(res.data.data);
           
        })
        .catch(error => {
            console.log(error);
            
        });
       
    }
    const parse = data => (data && data.includes('{') )&& JSON.parse(data).url

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
    // const handleDelete = (post) =>{
    //   setPosts(prodList.filter(p => p.id !== post.id ))
    //   }
   

    const paginatePosts = paginate(prodList, currentPage, pageSize);  
   
   
      // Get current posts
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = prodList.slice(indexOfFirstPost, indexOfLastPost);

  

  const [contacts, setContacts] = useState(prodList);
  const [editContactId, setEditContactId] = useState(null);
  const [remove , setremove] = useState([null])
  const [confirmdelate, setconfirmdelate] = useState([])
  
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
    // newdata.imageUrl  = `{"url":"${newdata.imageUrl}"}`
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

  const handleEditClick = (event, product) => {
    setEditContactId(product.productId);
    // console.log(product.productId)
    const formValues = {
      productName: product.productName,
      productCode: product.productCode,
      desciption: product.desciption,
      price: product.price,
      priceRrp: product.priceRrp,
      imageUrl : product.imageUrl,     
    };

    setEditFormData(formValues);
  };

  const handleDeleteEdit =(event, product) =>{
    setEditContactId(product.productId);
    setremove(true)
    console.log('delete')
    // setDeleteFormData(formValues);
  }
  const handleCancelClick = () => {
    setEditContactId(null);
    setremove(false)
  };
  // const handleSaveClick =(newData)=>{
  //   // setEditContactId(newData.productId);
  //   const dataUpdate = [...prodList];
  //   const index = prodList.findIndex((product) => product.productId === editContactId)
  //   console.log(index)
  //   dataUpdate[index].productName= newData.productName;
  //   dataUpdate[index].productCode= newData.productCode;
  //   dataUpdate[index].desciption= newData.desciption;
  //   dataUpdate[index].price= newData.price;
  //   dataUpdate[index].priceRrp= newData.priceRrp;
  //   // dataUpdate[index].imageUrl= newData.imageUrl;
  //   // console.log(typeof(newData))
  //   console.log(newData)
  //   // console.log(dataUpdate[index].imageUrl)
  //   axios.put('http://47.74.86.28:5030/api/Product/ProductUpdate',changeType(dataUpdate[index]))
  //   .then (response=>{
        
  //       setProdList([...dataUpdate]); 
  //       alert('Update successfully'); 
  //       console.log(response.data)
  //   })
  //   .catch((error)=>{
  //       alert('Unsuccessfully');
  //       console.log(error.data)
  //   })
  //   setEditContactId(null) 
  // }

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
    console.log(changeType(dataUpdate[index]))
    // console.log(dataUpdate[index])
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
    console.log('abc')
  }
  const handleCancel=()=>{
    setaddClick(false)
  }
  const [Upload,setUpload] = useState([])

  const onFileChange =(e)=>{
    e.preventDefault();
    setUpload(e.target.files[0])
  }
  const onFileUpload = (e)=>{
    e.preventDefault();
    
    let formdata = new FormData();
    formdata.append("imageFile", Upload)
      // Upload.name);
      // console.log(Upload)
      axios.post("http://47.74.86.28:5030/api/Common/UploadImage",formdata)
        .then (res=>{
          setUpload(formdata); 
          console.log(res.data)
          editFormData.imageUrl = res.data
          console.log(editFormData)
          handleSaveClick(editFormData)
        })
        .catch((error)=>{
            console.log(error)
            alert('Unsuccessfully');
        })
        
        setEditContactId(null) 

  };
  // const changeImage=(e,file)=>{
  //   // alert('change here')
  //   e.preventDefault();
  //   setUpload(e.target.files[0])
  //   let newImage = new FormData();
  //   newImage.append("imageFile",file);
  //   axios.post("http://47.74.86.28:5030/api/Common/UploadImage",newImage)
  //   .then (response=>{
  //     alert('Update successfully'); 
  //     // setProdList([...dataUpdate]); 
  //   })
  //   .catch((error)=>{
  //       alert('Unsuccessfully');
  //   })
  //   setEditContactId(null) 
  // }
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    
    const searchWord = event.target.value ;
    setWordEntered(searchWord);
    console.log(searchWord)
    setFilteredData(prodList.filter(prodList=>prodList.productName.toLowerCase().includes(searchWord)))
    // console.log()
    // const newFilter = data.filter((value) => {
    //   return value.title.toLowerCase().includes(searchWord.toLowerCase());
    // });

    // if (searchWord === "") {
    //   setFilteredData([]);
    // } else {
    //   setFilteredData(newFilter);
    // }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
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
          {/* <input type="file" onChange={onFileUpload}/>
          <button onClick={(e) => onFileUpload(e)}>UPLOAD</button>     */}
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
          {/* {paginatePosts.filter((prodList)=> prodList.productName.toLowerCase().includes(wordEntered)).map((product) =>( */}
          {paginatePosts.map((product) =>(
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
                    // makeSureDelete={makeSureDelete}
                    // handleAddFormChange={handleAddFormChange}
                    
                  />
              )}   
          </Fragment> ))}
          </tbody>

          <tfoot>
              <Pagination
                items={prodList.length}
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