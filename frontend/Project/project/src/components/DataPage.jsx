import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DataPage = () => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Your API endpoint
  const apiUrl = 'https://localhost:7092/api/user';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Fetched data:', result);
        setData(result);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="data-container">
      <h2>📊 Customer Data</h2>
      <p className="subtitle">Fetched from: <b>https://localhost:7092/api/user</b></p>

      {loading && <p className="status loading">⏳ Loading data...</p>}
      {error && <p className="status error">❌ Error: {error}</p>}

      {!loading && !error && (
        <>
          {data.length > 0 ? (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      {Object.values(item).map((val, i) => (
                        <td key={i}>{String(val)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-data">No data found.</p>
          )}
        </>
      )}

      <Link to="/home" className="back-btn">← Back to Home</Link>

      {/* ✅ Improved Styling */}
      <style jsx>{`
        .data-container {
          text-align: center;
          margin: 60px auto;
          width: 90%;
          max-width: 1000px;
          padding: 25px;
          border-radius: 10px;
          background: linear-gradient(to bottom right, #e3f2fd, #ffffff);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        h2 {
          color: #0056b3;
          margin-bottom: 5px;
        }

        .subtitle {
          color: #555;
          font-size: 0.9rem;
          margin-bottom: 20px;
        }

        .table-wrapper {
          overflow-x: auto;
          margin-top: 20px;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          border-radius: 8px;
          overflow: hidden;
          background: white;
        }

        .data-table th,
        .data-table td {
          border-bottom: 1px solid #ddd;
          padding: 12px 15px;
          text-align: left;
          font-size: 0.95rem;
        }

        .data-table th {
          background: #007bff;
          color: white;
          text-transform: capitalize;
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        .data-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .data-table tr:hover {
          background-color: #e3f2fd;
          transition: background-color 0.3s ease;
        }

        .no-data {
          color: #888;
          font-style: italic;
          margin-top: 15px;
        }

        .status {
          margin-top: 15px;
          font-size: 1rem;
        }

        .status.loading {
          color: #007bff;
        }

        .status.error {
          color: #d9534f;
          font-weight: bold;
        }

        .back-btn {
          display: inline-block;
          margin-top: 25px;
          background: #007bff;
          color: white;
          text-decoration: none;
          padding: 10px 18px;
          border-radius: 6px;
          font-weight: 500;
        }

        .back-btn:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default DataPage;
