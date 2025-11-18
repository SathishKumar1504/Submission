import { useState } from "react";

import FetchUserButton from "./FetchUserButton";
import FetchTodoButton from "./FetchTodoButton";
import FetchPostButton from "./FetchPostButton";

export default function ThreeButtons() {
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [result3, setResult3] = useState("");

  const fetchUser = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const json = await res.json();
      console.log("User API Result:", json);
      setResult1(json.name);
    } catch (err) {
      setResult1("Error");
    }
  };

  const fetchTodo = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/2");
      const json = await res.json();
      console.log("Todo API Result:", json);
      setResult2(json.title);
    } catch (err) {
      setResult2("Error");
    }
  };

  const fetchPost = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/3");
      const json = await res.json();
      console.log("Post API Result:", json);
      setResult3(json.body);
    } catch (err) {
      setResult3("Error");
    }
  };

  return (
    <div>
      <FetchUserButton onClick={fetchUser} />
      <FetchTodoButton onClick={fetchTodo} />
      <FetchPostButton onClick={fetchPost} />

      {result1 && <p>User: {result1}</p>}
      {result2 && <p>Todo: {result2}</p>}
      {result3 && <p>Post: {result3}</p>}
    </div>
  );
}
