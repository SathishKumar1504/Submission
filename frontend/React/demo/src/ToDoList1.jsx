import React from "react";


const name ="Sathish Kumar M"
const today = new Date();
function formatData(date){
    return new Intl.DateTimeFormat(
        'en-US',{weekday:'long'}
    ).format(date);
}

const ToDolist1 =() =>{
    return(
       <div>
        <h1>To Do List For {name}  {formatData(today)} </h1>
        <ul style={{color:'red',marginLeft:"10%"}}>
            <h1>To Do List For {name}  {formatData(today)} </h1>
        </ul>
        </div>
    )

}

export default ToDolist1;