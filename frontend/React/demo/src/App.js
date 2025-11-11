// import React, { useState } from "react";
// import logo from "./logo1.jpg";
// import "./App.css";

// import Page from "./page.jsx";
// import MyFormComponent from "./MyformComponent.jsx";
// import ToDolist from "./ToDoList.jsx";
// import ToDolist1 from "./ToDoList1.jsx";
// import ToDolist2 from "./ToDoList2.jsx";
// import TestImage from "./TestImage.js";
// import Checklist from "./Checklist.jsx";
// import UserList from "./UserList.jsx";
// import users from "./data";
// import Popup from "./popup.jsx";

// function App() {
//   // ✅ Popup states
//   const [showPopup, setShowPopup] = useState(false);
//   const [showPopup1, setShowPopup1] = useState(false);

//   // ✅ Popup 1 handlers
//   const handleShow = () => setShowPopup(true);
//   const handleClose = () => setShowPopup(false);

//   // ✅ Popup 2 handlers
//   const handleShow1 = () => setShowPopup1(true);
//   const handleClose1 = () => setShowPopup1(false);

//   return (
//     <div>
//       {/* Example existing components */}
//       <UserList users={null} />
//       <UserList users={[]} />
//       <UserList users={users} />
//       <TestImage />
//       <Checklist />

//       <h2>Popup Example with Props</h2>

//       {/* === First Popup Button === */}
//       <button
//         onClick={handleShow}
//         style={{
//           margin: "10px",
//           padding: "10px 20px",
//           backgroundColor: "green",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         Show Popup 1
//       </button>

//       {/* === Second Popup Button === */}
//       <button
//         onClick={handleShow1}
//         style={{
//           margin: "10px",
//           padding: "10px 20px",
//           backgroundColor: "orange",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         Show Popup 2
//       </button>

//       {/* ✅ Popup 1 */}
//       <Popup
//         show={showPopup}
//         message="Hello 👋 This is the FIRST popup!"
//         onClose={handleClose}
//       />

//       {/* ✅ Popup 2 */}
//       <Popup
//         show={showPopup1}
//         message="✅ This is the SECOND popup!"
//         onClose={handleClose1}
//       />
//     </div>
//   );
// }

// export default App;




//////////////////////////////////////////////

import React, { useState } from "react";
import Popup from "./popup.jsx";
import PopupButton from "./PopupButton.jsx";
import "./App.css";

function App() {
  // ✅ Single state to manage all popups
  const [popups, setPopups] = useState([
    { show: false, count: 0, color: "green", message: "👋 Hello from Popup 1" },
    { show: false, count: 0, color: "orange", message: "✅ Welcome to Popup 2" },
    { show: false, count: 0, color: "blue", message: " Popup 3" }
  ]);

  // ✅ Show popup and increase count
  const handleShow = (index) => {
    const updated = [...popups];
    updated[index].show = true;
    updated[index].count += 1;
    setPopups(updated);
  };

  // ✅ Close popup
  const handleClose = (index) => {
    const updated = [...popups];
    updated[index].show = false;
    setPopups(updated);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2>Popup Example </h2>

      {/* Render popup buttons */}
      {popups.map((popup, index) => (
        <PopupButton
          key={index}
          index={index}
          count={popup.count}
          color={popup.color}
          onShow={handleShow}
        />
      ))}

      {/* Render popups */}
      {popups.map((popup, index) => (
        <Popup
          key={index}
          show={popup.show}
          message={popup.message}
          count={popup.count}
          onClose={() => handleClose(index)}
        />
      ))}
    </div>
  );
}

export default App;
