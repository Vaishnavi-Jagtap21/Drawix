import React, { useState } from 'react'
import Editor from '@monaco-editor/react';

const DrawixEditor = () => {


  return (
    <>
     <div className='h-[7vh] w-screen bg-black'>
         <span className='text-amber-50 ml-6 text-4xl font-bold new'>Dx</span>
        <button
          className="bg-gray-600 hover:bg-gray-800 text-white px-6 py-2 ml-[165vh] mt-5 new rounded-lg font-medium transition"
          onClick={() => alert("Debug started ")}
         >
          Debug
        </button>
     </div>
    
        <div className='w-screen h-[93vh] '>
         <Editor width="60vw" defaultLanguage="python"  theme="vs-dark" defaultValue=""   options={{
            fontSize: 25, // font size
            fontFamily: "Fira Code",
            fontLigatures: true,
             automaticLayout: true,
          }} />;
        </div>
      </>
  )
}

export default DrawixEditor
