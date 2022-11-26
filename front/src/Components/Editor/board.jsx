import React, { useRef, useState, useEffect} from "react";
import { Editor } from '@tinymce/tinymce-react';
import "./editor.css";
import initialValue from "./initialValue";

function Board({props}) {
    const editorRef = useRef(null);
    const user = JSON.parse(localStorage.getItem("profile"));
    //Calls and updates the user board based on which of the user's three boards they are working on
    const saveButton = () => {
        console.log("CURRENT CONTENT:");
        console.log(editorRef.current.getContent());
        console.log("BOARD NUM:");
        console.log(props.boardNum);
        if (editorRef.current) {
            if(props.boardNum === 1) {
                props.boards.board1 = editorRef.current.getContent();
            }
            if(props.boardNum === 2) {
                props.boards.board2 = editorRef.current.getContent();
            }
            if(props.boardNum === 3) {
                props.boards.board3 = editorRef.current.getContent();
            }
            updateBoards();
        }
    };
    //Updates the board values in the MongoDB cluster
    const updateBoards = (e) =>{
        console.log(props.boards);
        fetch("http://localhost:5001/api/users/boards", { method: "PATCH", body: JSON.stringify(props.boards), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log("UPDATED")
                console.log("Boards:")
                console.log(props.boards)
                console.log("New User:")
                console.log(data)
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
                            console.log(props.initialVal);
                        }
                        
                    }
                initialValue = {props.initialVal}
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
            <button className = 'save' onClick={saveButton}>Save</button>
        </div>
        
    )
}
export default Board;