import React from "react";

const WorstTitle = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-2xl w-80 h-[300px] flex flex-col justify-center items-center text-center'>
        <h1 className='text-black text-[25px] font-bold p-1'>Worst Titles</h1>
        <p className='text-black text-[13px] font-semibold p-1'>
          Exploring the most bizarre, unconventional, and downright absurd titles ever created. From hilarious book names to questionable movie titles, we’ve got them all!
        </p>
      </div>
    </div>
  );
};

export default WorstTitle;
