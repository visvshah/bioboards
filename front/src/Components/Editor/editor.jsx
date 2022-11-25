import React, { useRef} from "react";
import { Editor } from '@tinymce/tinymce-react';
import initialVal from "./initialValue";
import "./editor.css";

export default function () {
    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
          console.log(editorRef.current.getContent());
      }
    };
  return (
    
    <div className="holder">
      <Editor
        className = "editor"
        tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
        onInit={(evt, editor) => {
            editorRef.current = editor
          }
        }
        initialValue= {initialVal}
        init={{
          height: 600,
          width: 1000,
          menubar: false,
          branding: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',
          ],
          toolbar: 'undo redo | ' +
            'bold italic underline| ' +
            'image media link',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          file_picker_callback: (callback, value, meta) => {
            // Provide file and text for the link dialog
            if (meta.filetype === 'file') {
              callback('mypage.html', { text: 'My text' });
            }
        
            // Provide image and alt text for the image dialog
            if (meta.filetype === 'image') {
              callback('myimage.jpg', { alt: 'My alt text' });
            }
        
            // Provide alternative source and posted for the media dialog
            if (meta.filetype === 'media') {
              callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' });
            }
          },
          image_uploadtab: false,
          block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3'
        }}
      />
      <button className = 'save' onClick={log}>Save</button>
    </div>
    
  )
}
