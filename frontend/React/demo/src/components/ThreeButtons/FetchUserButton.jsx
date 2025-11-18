import { useState } from "react";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function FetchUserButton() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  const fetchUser = async () => {
    setLoading(true);
    setResult("");
    setNote("Starting (will wait 100ms)...");
    try {
      // demonstrate waiting before the request
      await wait(100);

      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const json = await res.json();

      // an extra branch which rarely triggers (for coverage variety)
      if (json && json.id === 999) {
        setNote("Edge-case path hit");
      } else {
        setNote("Normal path");
      }

      console.log("User API Result:", json);
      setResult(json.name || "No name");
    } catch (err) {
      console.log("User API Error:", err);
      setResult("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchUser}>Fetch User</button>

      {loading && <p>Loading user...</p>}
      {note && <small>{note}</small>}
      {result && <p>User: {result}</p>}
    </div>
  );
}
