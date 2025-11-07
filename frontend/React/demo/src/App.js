import React from "react";
import logo from "./logo1.jpg";
import "./App.css";
import Page from "./page.jsx"; // Capitalized component name
import MyFormComponent from "./MyformComponent.jsx"; // Proper import

import ToDolist from "./ToDoList.jsx";

import ToDolist1 from "./ToDoList1.jsx";
import ToDolist2 from "./ToDoList2.jsx";
import TestImage from "./TestImage.js";
import Checklist from "./Checklist.jsx";
import UserList from "./UserList.jsx";
import users from "./data";     // ✅ import data
// import UserList from "./UserList"; // ✅ import component
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
      

    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>

    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>

      
    //   <MyFormComponent/>
       
    // </div>
    <div>
      {/* <ToDolist/>
    // <ToDolist1/>
    // <ToDolist2/> */}
    <UserList users={null} />
    <UserList users={[]} />
    <UserList users={users} />
    <TestImage/>
    <Checklist/>
    </div>
  );
}

export default App;
