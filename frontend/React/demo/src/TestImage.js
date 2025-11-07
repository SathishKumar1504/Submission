import React from "react";
const baseUrl = 'https://i.imgur.com/';
const person = {
    name: "Sathish Kumar ",
    imageId: '7vQD0fP',
    imageSize: 's',
    theme: {
        backgroundColor: "black",
        color: 'pink'
    }
};
 
export default function TestImage() {
    const a = baseUrl+ person.imageId + person.imageSize+'.jpg';
    return (
        <div style={person.theme}>
            <h1>{person.name}'s To Do List</h1>
            <img
                className="avatar"
                src={a}
                alt={person.name}
            />

            <ul>
                <li>Improve The Videophone</li>
                <li>Prepare aeronautics</li>
                <li>Work on the alcohol</li>

            </ul>
        </div>
    );
}
 
// export default TestImage;