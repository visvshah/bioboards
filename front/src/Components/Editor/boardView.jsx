import React, { useRef, useState} from "react";
import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router-dom';

function BoardView() {
    const { user, boardNumber } = useParams();
    const [boardString, setBoardString] = useState("<p>Loading...</p>");
    const editorRef = useRef(null);
    
    //Calls and updates the user board based on which of the user's three boards they are working on

    //Finds the board based on the given url
    const findBoard = (e) =>{
        console.log("1")
        fetch("http://localhost:5001/api/users/findBoard", { method: "PATCH", body: JSON.stringify({id: user, boardNumber:boardNumber}), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                console.log("2")
                return res.json()
            })
            .then(data => {
                console.log(data);
                setBoardString(data);
            })
        .catch(e => {
            console.log(e)
        })
    }
    
    return (
        <div className="rightSide">
            <Editor
                className = "editor"
                tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                    onInit={(evt, editor) => {
                            editorRef.current = editor;
                            findBoard();
                        }
                        
                    }
                initialValue = {boardString}
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
        </div>
        
    )
}
export default BoardView;