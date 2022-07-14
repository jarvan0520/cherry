// import axios  from "axios";
// import  { useState, useEffect  } from 'react';
// import React from "react";
// function ProductNew (){
//     const [columns,setcolumns] = useState([
        
//         { title: 'ProductName', field: 'productName' },
//         { title: 'ProductCode', field: 'productCode' },
//         { title: 'Desciption', field: 'desciption' },
//         { title: 'Price', field: 'price' },
//         { title: 'RrpPrice', field: 'priceRrp' },    
//     ]);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editingStudent, setEditingStudent] = useState(null);
    
//     const [addFormData, setAddFormData] = useState({
//       productName: "",
//       productCode: "",
//       desciption: "",
//       price: "",
//     });
//     const resetEditing = () => {
//       setIsEditing(false);
//       setEditingStudent(null);
//     };
//     useEffect(() => {
//         getData();
//       }, [])
  
//       const getData =(newdata)=>{
//         axios.get('http://206.189.39.185:5031/api/Product')
//           .then(res => {
//               setProdList(res.data.data)
//           })
//           .catch(error => {
//               console.log(error);
//           });
         
//       }
//       const [prodList, setProdList] = useState([]);
//       const changeType  =newdata => {
//         newdata.price = parseInt(newdata.price)
//         newdata.priceRrp = parseInt(newdata.priceRrp)
//        return newdata
//      }

//      const onEditStudent = (product) => {
       
//       setIsEditing(true);
//       setEditingStudent({ ...product });
//     };


//      const handleAddFormChange = (event) => {
//       event.preventDefault();
  
//       const fieldName = event.target.getAttribute("name");
//       const fieldValue = event.target.value;
  
//       const newFormData = { ...addFormData };
//       newFormData[fieldName] = fieldValue;
  
//       setAddFormData(newFormData);
//     };
  
//       const handleAddFormData = () => {
//         <form>
//         <input
//           type="text"
//           name="productName"
//           required="required"
//           placeholder="Enter a name..."
//           // onChange={handleDataChange}
//         />
//         <input
//           type="text"
//           name="productCode"
//           required="required"
//           placeholder="Enter an addres..."
//           // onChange={handleDataChange}
//         />
//         <input
//           type="text"
//           name="desciption"
//           required="required"
//           placeholder="Enter a phone number..."
//           // onChange={handleDataChange}
//         />
//         <input
//           name="price"
//           required="required"
//           placeholder="Enter an email..."
//           // onChange={handleDataChange}
//         />
//         <input
//           name="priceRrp"
//           required="required"
//           placeholder="Enter an email..."
//           // onChange={handleDataChange}
//         />
//         <button type="submit">Add</button>
//       </form>

//     };

 

//   const [editFormData, setEditFormData] = useState({
//     fullName: "",
//     address: "",
//     phoneNumber: "",
//     email: "",
//   });

//   const [editContactId, setEditContactId] = useState(null);

//       const ls = localStorage.getItem("token")
//       const ss = sessionStorage.getItem("token")
//       const userToken = ls || ss

//     const onOk=() => {
//         setcolumns
//         ((pre) => {
//           return pre.map((product) => {
//             if (product.id === editingStudent.id) {
//               return editingStudent;
//             } else {
//               return product;
//             }
//           });
//         });
//         resetEditing();
//       }
 
//    return(
   
//      <div className="box">
//         <h2>Product Preview</h2>
//         <button onClick={handleAddFormData}>Add</button>
        
        
//        <table class="table">
//           <thead>
//             <tr>
//               <th scope="col">Actions</th>
//               <th scope="col">ProductName</th>
//               <th scope="col">ProductCode</th>
//               <th scope="col">Desciption</th>
//               <th scope="col">Price</th>
//               <th scope="col">PrpPrice</th>
//             </tr>
//           </thead>
         
//           <tbody>
//             {
//               prodList.map(product=>
//                 <tr>
//                   <td><button  onClick={()=> onEditStudent(product)}><i class="bi bi-pencil-fill"></i></button>
//                       <button  onClick={()=> onEditStudent(product)}><i class="bi bi-trash"></i></button>
//                   </td>
//                   <td >{product.productName}</td>
//                   <td >{product.productCode}</td>
//                   <td >{product.desciption}</td>
//                   <td >{product.price}</td>
//                   <td >{product.priceRrp}</td>                 
//                </tr>               
//                 )
//             }    
//           </tbody>

//         </table>
//         <form >
//           <input
//             value={editingStudent?.productName}
//             onChange={(e) => {
//               setEditingStudent((pre) => {
//                 return { ...pre, productName: e.target.value };
//               });
//             }}
//           />
//           <input
//             value={editingStudent?.productCode}
//             onChange={(e) => {
//               setEditingStudent((pre) => {
//                 return { ...pre, productCode: e.target.value };
//               });
//             }}
//           />
//           <input
//           value={editingStudent?.desciption}
//           onChange={(e) => {
//             setEditingStudent((pre) => {
//               return { ...pre, desciption: e.target.value };
//             });
//           }}
//           />
//           <input
//           value={editingStudent?.price}
//           onChange={(e) => {
//             setEditingStudent((pre) => {
//               return { ...pre, price: e.target.value };
//             });
//           }}
//           />
//           <button type="submit">Add</button>
//       </form>
      
     
//      </div>
//    );
// }
// export default ProductNew
