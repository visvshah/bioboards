import React, {useState} from "react";
import "./auth.scss"

export default function Auth() {
  const [logIn, changeLogIn] = useState(true);
  const handleSubmit = (event) =>{
    event.preventDefault();
    if(logIn){
      sendLogIn()
    }
    else{
      sendSignUp()
    }
  }
  const sendLogIn = (e) =>{
    e.preventDefault();
        fetch("http://localhost:4000/api/users/login", { method: "POST", body: userData, mode: 'cors', contentType: "applicationjson"})
            .then(res => {
                return res.json()
            })
            .then(data => {
              localStorage.setItem("token", data.token)
            })
        .catch(e => console.log(e))
  }

  const sendSignUp = (e) =>{
    e.preventDefault();
        fetch("http://localhost:4000/api/users/", { method: "POST", body: userData, mode: 'no-cors', contentType: "applicationjson"})
            .then(res => {
                
            })
        .catch(e => console.log(e))
  }

  const changeMode = () =>{
    changeLogIn(!logIn);
  }
  const [userData, setUserData] = useState({
    fName: "",
    lName: "",
    email: "",
    age: "",
    password: ""
})

  return (
    <div>
        <div className="authPage">
            <h1 className = "header" >{logIn ? "Log In" : "Sign Up"}</h1>
            <form autoComplete = "off" validate = "true" className = "form" onSubmit = {handleSubmit}> 
                <input placeholder = "Your email" id = "email" name = "email" type ="email" onChange = {(e) => setUserData({...userData, email: e.target.value})}/>
                { !logIn && (
                    <>
                      <input placeholder = "Your first name" id = "fName" name = "fName" type ="fName" onChange = {(e) => setUserData({...userData, fName: e.target.value})}/>
                      <input placeholder = "Your last name" id = "lName" name = "lName" type ="lName" onChange = {(e) => setUserData({...userData, lName: e.target.value})}/>
                      <input placeholder = "Your age" id = "age" name = "age" type ="age" onChange = {(e) => setUserData({...userData, age: e.target.value})}/>
                    </>
                  )
                }
                
                <input placeholder = "Enter Password" id = "password" name = "password" type ="password" onChange = {(e) => setUserData({...userData, password: e.target.value})}/>
  
                <button className = "submitButton" type="submit" onClick = {handleSubmit}>Submit</button>
            </form>
            <button className = "changeMode" onClick = {changeMode}>{logIn ? "Sign Up Instead" : "Log In instead"}</button>
        </div>
    </div>
  )
}