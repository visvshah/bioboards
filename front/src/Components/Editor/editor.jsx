import React, { useEffect} from "react";
import { useCanvas } from "./editorFunctions.js";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./editor.scss";
import Editor from "./editorFunctions.js";
export default function () {
    /*const {
      canvasRef,
      prepareCanvas,
      startDrawing,
      finishDrawing,
      draw,
    } = useCanvas();
  
    useEffect(() => {
      prepareCanvas();
    }, []);
    */
  return (
    <div className="editor">
      {/*<ReactQuill 
              theme="snow" 
              value={value} 
              onChange={setValue} 
              className = "quill"
              
          />
  */}
        <Editor/>
    </div>
    
  )
}
