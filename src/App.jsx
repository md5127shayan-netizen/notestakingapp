import React, { useState } from "react";
import { X } from 'lucide-react';
import axios from 'axios';

const App = () => {
  const [title, settitle] = useState("");
  const [details, setdetails] = useState("");
  const [task, settask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "" || details.trim() === "") return;

    const copyTask = [...task];
    copyTask.push({ title, details });
    settask(copyTask);

    // clear inputs
    settitle("");
    setdetails("");
  };

  const deleteNote=(idx)=>{
    const copyTask=[...task];
    copyTask.splice(idx,1)
    settask(copyTask)
  }

  return (
    <div className="h-screen lg:flex bg-black text-white">
      
      {/* LEFT SIDE FORM */}
      <form
        onSubmit={submitHandler}
        className="flex gap-4 p-10 lg:w-1/2 items-start flex-col"
      >
        <h1 className="text-3xl font-bold">Add Notes</h1>

        {/* Heading Input */}
        <input
          type="text"
          placeholder="Enter Notes Heading"
          className="px-5 w-full font-medium py-2 border-2 outline-none rounded bg-black text-white placeholder-gray-400"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />

        {/* Details Input */}
        <textarea
          className="px-5 font-medium w-full h-32 py-2 border-2 outline-none rounded bg-black text-white placeholder-gray-400"
          placeholder="Write details"
          value={details}
          onChange={(e) => setdetails(e.target.value)}
        ></textarea>

        <button className="bg-white active:bg-green-200 active:scale-95 text-black font-medium w-full px-5 py-2 rounded">
          Add Note
        </button>
      </form>

      {/* RIGHT SIDE NOTES */}
      <div className="lg:w-1/2 lg:border-l bg-gray-900 p-10">
        <h1 className="text-3xl font-bold mb-5">Recent Notes</h1>

        <div className="flex flex-wrap gap-5 overflow-auto h-full">
          
          {task.length === 0 ? (
            <p className="text-gray-400">No notes yet...</p>
          ) : (
            task.map((elem, idx) => {
              return (
                <div
                  key={idx}
                  className="flex justify-between flex-col items-start  relative h-52 w-40 rounded-xl bg-cover text-black p-4"
                  style={{
                    backgroundImage:
                      "url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')",
                  }}
                >
                  
                  <h3 className="leading-tight text-xl font-bold">
                    {elem.title}
                  </h3>

                  <p className="mt-2 leading-tight font-medium text-gray-700">
                    {elem.details}
                  </p>
                  <button 
                    onClick={()=>{
                      deleteNote(idx)
                    }}
                    className='w-full cursor-pointer active:scale-95 bg-red-600 text-white py-1 text-xs rounded-2xl font-bold'>delete 
                  </button>
                </div>
              );
            })
          )}

        </div>
      </div>

    </div>
  );
};

export default App;