import React, { useState} from "react";
import Board from "./board";
import initialValue from "./initialValue";
import "./editor.css";

export default function () {
    const user = JSON.parse(localStorage.getItem("profile"));
    if(!user) {
      return (
        <div className="holder">
          <h1 className="logInFirst">Log in First!</h1>
        </div>
      )
    }
    const [linkHidden, changeLinkHidden] = useState(true);
    const [boards, changeBoards] = useState({
      _id: user._id,
      board1: "",
      board2: "",
      board3: "",
    })
    const [boardNum, setBoardNum] = useState(0);
    
    
    //Fetches the boards that are saved for the user in the MongoDB databse
    const getBoards = (boardNumber) =>{
      console.log(boards);
      fetch("http://localhost:5001/api/users/getboards", { method: "PATCH", body: JSON.stringify(boards), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
          .then(res => {
              return res.json()
          })
          .then(data => {
              if(data.board1.length === 0) {
                boards.board1 = initialValue;
              }
              else {
                boards.board1 = data.board1;
              }
              if(data.board2.length === 0) {
                boards.board2 = initialValue;
              }
              else {
                boards.board2 = data.board2;
              }
              if(data.board3.length === 0) {
                boards.board3 = initialValue;
              }
              else {
                boards.board3 = data.board3;
              }
              setBoardNum(boardNumber);
              console.log("PART 1");
          })
      .catch(e => {
          console.log(e)
      })
    }
    //Sets the initialValue of the Editor based on the board they are currently working on
    const boardHandler = (boardNumber) => {
      //Sepearted because setBoardNum(boardNumber) runs inside getBoards or else it will run before getBoards finishes
      if(boardNum === 0) {
        getBoards(boardNumber);
      }
      else {
        setBoardNum(boardNumber);
      }
    }
  return (
    
    <div className="holder">
        <div className="leftSide">
        <h1 className="header1">Select which Board</h1>
        <div className="buttons">
          <button className = {'board ' + (boardNum === 1 && 'active')} onClick={() => boardHandler(1)}>1</button>
          <button className = {'board ' + (boardNum === 2 && 'active')} onClick={() => boardHandler(2)}>2</button>
          <button className = {'board ' + (boardNum === 3 && 'active')} onClick={() => boardHandler(3)}>3</button>
        </div>
        {boardNum !== 0 && (
          <div className="boardLink">
            <button className = {'linkButton ' + (linkHidden && 'active2')} onClick={() => changeLinkHidden(!linkHidden)}>Share Link</button>
            <h5 className={'link ' + (linkHidden && 'hidden')}>{"http://localhost:3000/" + user._id + "/" + boardNum}</h5>
          </div>
          
        )}
      </div>
      {boardNum === 1 && (
        <Board props = {{initialVal:boards.board1, boardNum:boardNum, boards:boards}}/>
      )}
      {boardNum === 2 && (
        <Board props = {{initialVal:boards.board2, boardNum:boardNum, boards:boards}}/>
      )}
      {boardNum === 3 && (
        <Board props = {{initialVal:boards.board3, boardNum:boardNum, boards:boards}}/>
      )}
    </div>
    
  )
}
