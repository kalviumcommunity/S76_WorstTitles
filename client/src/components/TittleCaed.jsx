import React, { useState, useEffect } from "react";
import axios from "axios";

const WorstTitle = () => {
  const [worstTitles, setWorstTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/worst-titles")
      .then(response => {
        setWorstTitles(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching worst titles:", error);
        setError("Failed to load worst titles.");
        setLoading(false);
      });
  }, []);

  return (
    <div className='flex flex-col items-center h-screen bg-gray-100 p-8'>
      <h1 className='text-black text-[30px] font-bold mb-6'>Worst Titles</h1>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {worstTitles.length > 0 ? (
          worstTitles.map((title) => (
            <div key={title.id} className='bg-white p-6 rounded shadow-md w-80 text-center'>
              <h2 className='text-xl font-bold'>{title.name}</h2>
              <p className='text-gray-600 text-sm mt-2'>{title.category}</p>
              <p className='text-gray-700 mt-4'>{title.description}</p>
            </div>
          ))
        ) : (
          !loading && <p className="text-gray-600">No worst titles found.</p>
        )}
      </div>
    </div>
  );
};

export default WorstTitle;