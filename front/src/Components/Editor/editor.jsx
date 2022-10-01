import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./editor.scss"
export default function () {
    const [value, setValue] = useState('');
    
  return (
    <div className="editor">
        <ReactQuill 
            theme="snow" 
            value={value} 
            onChange={setValue} 
            className = "quill"
            
        />
    </div>
    
  )
}
