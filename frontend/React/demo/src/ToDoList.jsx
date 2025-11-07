import React from "react";

const name ="Sathish Kumar M"
const today = new Date();
function formatData(date){
    return new Intl.DateTimeFormat(
        'en-US',{weekday:'long'}
    ).format(date);
}

const ToDolist =() =>{
    return(
        <h1>To Do List For {name}  {formatData(today)} </h1>
    )

}

export default ToDolist;