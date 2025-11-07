import React from "react";


function MyFormComponent(args) {
  let props=args;
  return (
    <form>
      <input type="text" name="name" placeholder="name" />
      {/* <input type="submit" value="send" /> */}
      <button type="submit">{props.name}</button>
    </form>
  );
}
export default MyFormComponent;
 

// // Parent component
// const MyFormComponent = ({ children, onSubmit }) => {
//   return <form onSubmit={onSubmit}>{children}</form>;
// };

// // Input sub-component
// MyFormComponent.Input = ({ name = "name", placeholder = "name" }) => {
//   return <input type="text" name={name} placeholder={placeholder} />;
// };

// // Button sub-component
// MyFormComponent.Button = ({ value = "Send" }) => {
//   return <input type="submit" value={value} />;
// };

// // Example usage
// const FormExample = () => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Form submitted!");
//   };

//   return (
//     <MyFormComponent onSubmit={handleSubmit}>
//       <MyFormComponent.Input />
//       <MyFormComponent.Button />
//     </MyFormComponent>
//   );
// };

// export default FormExample;
