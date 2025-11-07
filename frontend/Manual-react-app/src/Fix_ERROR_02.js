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
    return (
        <div style={person.theme}>
            <h1>{person}'s To Do List</h1>
            <img
                className="avatar"
                src="{baseUrl}{person.imageId}{person.imageSize}.jpg"
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
 