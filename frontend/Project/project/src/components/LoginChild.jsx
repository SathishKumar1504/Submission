import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setField, submitForm, resetForm } from '../redux/userSlice';
import FormComponent from './FormComponent'; // ✅ Import new component

const LoginChild = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setField({ field: name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitForm());
  };

  const handleReset = () => {
    dispatch(resetForm());
  };

  return (
    <div className="form-container">
      <h2> User Login</h2>
      <FormComponent
        user={user}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
      />
      {user.successMessage && <p className="success">{user.successMessage}</p>}

      <style jsx>{`
        .form-container {
          text-align: center;
          margin: 40px auto;
          padding: 20px;
          width: 340px;
          border: 1px solid #ccc;
          border-radius: 10px;
          box-shadow: 0 0 8px rgba(0,0,0,0.2);
          background-color: #fafafa;
        }
        .success {
          color: green;
          margin-top: 10px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default LoginChild;
