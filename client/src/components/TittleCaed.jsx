import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WorstTitle = () => {
  const [titles, setTitles] = useState([]);
  const [allTitles, setAllTitles] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTitles();
    fetchUsers();
  }, []);

  const fetchTitles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/worst-titles");
      setTitles(res.data);
      setAllTitles(res.data);
    } catch (err) {
      setError("Failed to fetch titles");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this title?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/worst-titles/${id}`);
      const updated = titles.filter((title) => title._id !== id);
      setTitles(updated);
      setAllTitles(updated);
    } catch (err) {
      console.error("Error deleting title", err);
      setError("Failed to delete title");
    }
  };

  const handleFilterByUser = (email) => {
    setSelectedEmail(email);
    if (email === "") {
      setTitles(allTitles);
    } else {
      const filtered = allTitles.filter((title) => title.created_by?.email === email);
      setTitles(filtered);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Worst Titles</h1>

        <div className="flex items-center gap-2">
          <label className="font-medium">Created by:</label>
          <select
            value={selectedEmail}
            onChange={(e) => handleFilterByUser(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Users</option>
            {users.map((user) => (
              <option key={user._id} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>

          <button
            disabled={!selectedEmail}
            className={`px-4 py-2 rounded-lg shadow transition text-white ${
              selectedEmail ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => {
              const selectedUser = users.find((user) => user.email === selectedEmail);
              if (selectedUser) {
                localStorage.setItem("userId", selectedUser._id);
                navigate("/add-title");
              }
            }}
          >
            Add New
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading titles...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : titles.length === 0 ? (
        <p className="text-gray-500">No titles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {titles.map((title) => (
            <div key={title._id} className="bg-white p-6 rounded shadow-md w-full text-center">
              <h2 className="text-xl font-bold">{title.name}</h2>
              <p className="text-gray-600 text-sm mt-2">{title.category}</p>
              <p className="text-gray-700 mt-4">{title.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                <strong>Added by:</strong> {title.created_by?.email || "Unknown"}
              </p>

              <div className="mt-4 flex justify-center gap-2">
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  onClick={() => navigate(`/update-title/${title._id}`)}
                >
                  Update
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(title._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorstTitle;
