import React from "react";
import logo from "./logo1.jpg";
// import ToDolist1 from "./ToDoList1";

// const name ="Sathish Kumar M"
// const today = new Date();
// function formatData(date){
//     return new Intl.DateTimeFormat(
//         'en-US',{weekday:'long'}
//     ).format(date);
// }

// const ToDolist1 =() =>{
//     return(
//        <div>
//         <h1>To Do List For {name}  {formatData(today)} </h1>
//         <ul style={{color:'red',marginLeft:"10%"}}>
//             <h1>To Do List For {name}  {formatData(today)} </h1>
//         </ul>
//         </div>
//     )

// }

// export default ToDolist1;
function ToDolist2() {

  const person = {
    name: 'Sathish',
    theme: {
      backgroundColor: 'blue', // fixed typo
      color: 'yellow'
    }
  };

  // ⚠️ Make sure you import your image at the top:
  // import logo from './path-to-your-image.png';

  return (
    <div style={person.theme}>
      <h1>{person.name}'s To Do List</h1>
      {/* In React, use <img>, not <image> */}
      <img
        src={logo}
        alt="Profile"
        style={{ width: "200px", height: "200px" }}
      />

      <ul>
        <li>Learn React</li>
        <li>Learn C#</li>
      </ul>
    </div>
  );
}

export default ToDolist2;
