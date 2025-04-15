import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddMovieTitle() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!formData.name || !formData.category || !formData.description || !formData.id) {
      alert("All fields are required!");
      return;
    }

    // Ensure id is a valid integer
    const titleId = parseInt(formData.id, 10);
    if (isNaN(titleId)) {
      alert("Please provide a valid ID.");
      return;
    }

    // Get userId from localStorage
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("No valid user selected. Please select a user before adding a title.");
      return;
    }

    // Prepare data to send to the backend
    const dataToSend = {
      ...formData,
      id: titleId,  // Send id as an integer
      created_by: userId,
    };

    try {
      // Send data to the backend
      const response = await fetch("http://localhost:5000/api/worst-titles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        // Success message and redirect
        alert("Movie title added successfully!");
        localStorage.removeItem("userId");
        setFormData({ id: "", name: "", category: "", description: "" });
        navigate("/");
      } else {
        setMessage(data.message || "Error adding title");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to connect to server.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Worst Movie Title</h2>
      {message && <p className="text-red-500 mb-4 text-center bg-red-100 p-2 rounded">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="id"
          placeholder="Title ID"
          value={formData.id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Movie Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
