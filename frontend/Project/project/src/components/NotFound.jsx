import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => (
    
  <div className="notfound">
    <h2>🚫 404 - Page Not Found</h2>
    <p>The page you are looking for doesn’t exist.</p>
    <Link to="/home" className="home-link">Go Back to HOME Page</Link>

    <style jsx>{`
      .notfound {
        text-align: center;
        margin-top: 100px;
        color: #333;
      }
      h2 {
        font-size: 24px;
        color: #dc3545;
      }
      .home-link {
        display: inline-block;
        margin-top: 15px;
        background: #007bff;
        color: white;
        padding: 8px 14px;
        border-radius: 5px;
        text-decoration: none;
      }
      .home-link:hover {
        background: #0056b3;
      }
    `}</style>
  </div>
);

export default NotFound;

// import { useNavigate } from "react-router";
// import { useLocation] } from "react-router";
// export default NotFound(){
// const location =useLocation();
// const navigate=useNavigate();

// function goBack()
// {
//     console.log("PATH"+.location)
//     navigate("/")
// }

// }