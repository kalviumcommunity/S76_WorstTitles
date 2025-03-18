import { useState } from "react";

export default function AddMovieTitle() {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        category: "",
        description: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/worst-titles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("Title added successfully!");
                setFormData({ id: "", name: "", category: "", description: "" });
            } else {
                setMessage(data.message || "Error adding title");
            }
        } catch (error) {
            setMessage("Error connecting to the server");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white">
            <h2 className="text-xl font-bold mb-4">Add Worst Movie Title</h2>
            {message && <p className="mb-2 text-red-500">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="id"
                    placeholder="ID"
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
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
            </form>
        </div>
    );
}
