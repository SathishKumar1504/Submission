import { useState } from "react";

function fetchWithTimeout(url, ms) {
  const fetchPromise = fetch(url).then((res) => res.json());
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("timeout")), ms)
  );
  return Promise.race([fetchPromise, timeoutPromise]);
}

export default function FetchPostButton() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const fetchPost = async () => {
    setLoading(true);
    setResult("");
    setAttempts((a) => a + 1);

    try {
      // wait for response or timeout after 300ms
      const json = await fetchWithTimeout(
        "https://jsonplaceholder.typicode.com/posts/3",
        300
      );

      console.log("Post API Result:", json);
      // extra branch to vary coverage
      if (json && json.userId === 999) {
        setResult("Special case");
      } else {
        setResult(json.body || "No body");
      }
    } catch (err) {
      console.log("Post API Error:", err);
      setResult("Error: " + (err && err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchPost}>Fetch Post</button>

      <p>Attempts: {attempts}</p>
      {loading && <p>Loading post...</p>}
      {result && <p>Post: {result}</p>}
    </div>
  );
}
