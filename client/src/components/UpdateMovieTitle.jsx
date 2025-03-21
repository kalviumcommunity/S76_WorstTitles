import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateMovieTitle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: ""
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/worst-titles/${id}`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error("Error fetching title:", error);
                setMessage("Failed to load movie title");
            });
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/worst-titles/${id}`, formData);
            if (response.status === 200) {
                setMessage("Title updated successfully!");
                setTimeout(() => navigate("/tittle-card"), 2000);
            }
        } catch (error) {
            setMessage("Error updating title");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white">
            <h2 className="text-xl font-bold mb-4">Update Worst Movie Title</h2>
            {message && <p className="mb-2 text-red-500">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Update</button>
            </form>
        </div>
    );
}
