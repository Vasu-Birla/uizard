// // src/App.js
// import React from 'react';
// // import { BrowserRouter as Routes,Route } from 'react-router-dom';
// // import { createBrowserRouter,  RouterProvider } from "react-router-dom";
// import { Link, Route, Routes, Navigate } from "react-router-dom";


// import Login from './components/Login';
// import Home from './components/Home'; 
// import Logout from './components/Logout'

// function App() {


//   const isAuthenticated = localStorage.getItem('Admin_token');

//   if(isAuthenticated){
//     console.log("session ON")
//   }else{
//     console.log("session OFF")
//   }

//   return (    

// <div className="container">
//       <nav>
//         <ul>
//           <Link to="/admin" class="list">
//             Home
//           </Link>
//           <Link to="/admin/login" class="list">
//             Login
//           </Link>

//           <Link to="/admin/logout" class="list">
//            . Logout 
//           </Link>

          
//         </ul>
//       </nav>

//       {/* Defining routes path and rendering components as element */}
//       <Routes>
              
//         {/* <Route path="/admin" element={<Home />} /> */}
//         <Route
//             path="/admin"
//             element={isAuthenticated ? <Home /> : <Navigate to="/admin/login" />}
//           />
//         <Route path="/admin/login" element={<Login />} />      

//         <Route path="/admin/logout" element={<Logout />} />     
//       </Routes>
//     </div>


//   );
// }

// export default App;
