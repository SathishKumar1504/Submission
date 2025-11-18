import { useState } from "react";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function FetchTodoButton() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");

  const fetchTodo = () => {
    setLoading(true);
    setResult("");
    setStatus("starting");

    // Promise chaining style
    fetch("https://jsonplaceholder.typicode.com/todos/2")
      .then((res) => res.json())
      .then((json) => {
        // delay a little after getting JSON
        setStatus("received-json, waiting 150ms");
        return wait(150).then(() => json);
      })
      .then((json) => {
        console.log("Todo API Result:", json);
        setResult(json.title || "No title");
        // an untested branch for coverage variety
        if (json && json.completed) {
          setStatus("completed");
        } else {
          setStatus("not-completed");
        }
      })
      .catch((err) => {
        console.log("Todo API Error:", err);
        setResult("Error");
        setStatus("error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <button onClick={fetchTodo}>Fetch Todo</button>

      {loading && <p>Loading todo...</p>}
      <p>Status: {status}</p>
      {result && <p>Todo: {result}</p>}
    </div>
  );
}
