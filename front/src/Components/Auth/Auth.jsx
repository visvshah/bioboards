import React, {useState} from "react";
import "./auth.css"
import {useNavigate} from "react-router-dom";

export default function Auth() {
    const [logIn, changeLogIn] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
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
        fetch("http://localhost:5001/api/users/login", { method: "POST", body: JSON.stringify(userData), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json()
            })
            .then(data => {
                setError(false);
                localStorage.setItem("profile", JSON.stringify(data));
                navigate('/');
            })
        .catch(e => {
            console.log(e)
            setError(true);
        })
    }

    const sendSignUp = (e) =>{
        console.log(userData);
        fetch("http://localhost:5001/api/users/signup", { method: "POST", body: JSON.stringify(userData), mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},contentType: "application/json"})
            .then(res => {
                return res.json();
            })
            .then(data => {
                setError(false);
                localStorage.setItem("profile", JSON.stringify(data));
                navigate('/');
            })
        .catch(e => {
            setError(true);
            console.log(e)
        })
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
                {error && (
                    <>
                        <div className = "error">Error!</div>
                    </>
                )}
            </form>
            <button className = "changeMode" onClick = {changeMode}>{logIn ? "Sign Up Instead" : "Log In instead"}</button>
        </div>
    </div>
    )
}