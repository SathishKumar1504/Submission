import React from "react";

function Item ({name, isPacked}){
    let itemContent = name;
    if (!isPacked){

    
        return <li className="item">{itemContent} ❌</li>;
    }
    return <li className="item">{itemContent} ✅</li>;


}


export default function Checklist(props){
    return(
        <div>
        <h1>Hello{props.name}</h1>
        <h2>id:{props.id}</h2>
        </div>
        // <section>
        //     <h1>My Travel Checklist</h1>
        //     <ul>
        //         <Item name="passport" isPacked={true}/>
        //          <Item name="passport" isPacked={true}/>
        //           <Item name="passport" isPacked={true}/>
        //            <Item name="passport" isPacked={false}/>
        //     </ul>
        // </section>
    );
}

//if (!isPacked)return null

// let itemContent=name +"❌";