import React, { useRef, useState, useEffect} from "react";
import Board from "./board";
import initialValue from "./initialValue";
import "./editor.css";
import { isRouteErrorResponse } from "react-router-dom";

export default function () {
    const user = JSON.parse(localStorage.getItem("profile"));
    const [boards, changeBoards] = useState({
      _id: user._id,
      board1: initialValue,
      board2: "",
      board3: "",
    })
    const [boardNum, setBoardNum] = useState(1);
    
    
    //Fetches the boards that are saved for the user in the MongoDB databse
    const getBoards = (e) =>{
      console.log(boards);
      fetch("http://localhost:5001/api/users/getboards", { method: "PATCH", body: JSON.stringify(boards), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
          .then(res => {
              return res.json()
          })
          .then(data => {
              console.log(data);
              boards.board1 = data.board1;
              boards.board2 = data.board2;
              boards.board3 = data.board3;
          })
      .catch(e => {
          console.log(e)
      })
    }
    //Sets the initialValue of the Editor based on the board they are currently working on
    const getEditorValue = () => {
      console.log("Getting editor Initial Value")
      getBoards();
      if(boardNum === 1) {
        return boards.board1;
      }
      if(boardNum === 2) {
        return boards.board2;
      }
      if(boardNum === 3) {
        return boards.board3;
      }
      return "ERROR";
    }
    
  return (
    
    <div className="holder">
      <div className="leftSide">
        <h1 className="header1">Select which board</h1>
        <div className="buttons">
          <button className = {'board ' + (boardNum === 1 && 'active')} onClick={console.log()}>1</button>
          <button className = {'board ' + (boardNum === 2 && 'active')} onClick={console.log()}>2</button>
          <button className = {'board ' + (boardNum === 3 && 'active')} onClick={console.log()}>3</button>
        </div>
        
      {//setBoardNum(1)
      }
      </div>
      <Board props = {{initialVal:"<p>test</p>", boardNum:boardNum}}/>
    </div>
    
  )
}
