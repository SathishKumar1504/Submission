import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TestPage from './page';
import reportWebVitals from './reportWebVitals';
import Checklist from './Checklist';

import MyFormComponent from './MyformComponent';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// var obj={name:"SK", id:15};
// root.render(
//   <React.StrictMode>
//     {/* <MyFormComponent/>
//     <MyFormComponent name="Logoot"/>
//     <App />
//     <TestPage/> */}
//     <Checklist {...obj} />
//     {/* <App /> */}
//   </React.StrictMode>
// );



const test = ReactDOM.createRoot(document.getElementById('test'));
test.render(
  <React.StrictMode>
    <TestPage/>
      <App/>
      
  </React.StrictMode>

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
