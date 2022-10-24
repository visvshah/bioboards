import React, { useRef} from "react";
import { Editor } from '@tinymce/tinymce-react';
import "./editor.scss";
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
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue='<p>.             .</p>'
        init={{
          height: 600,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help' + ' | insertfile image media template link anchor codesample',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button className = 'save' onClick={log}>Save</button>
      </div>
    
  )
}
