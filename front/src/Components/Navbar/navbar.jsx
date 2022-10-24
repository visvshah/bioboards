import React from 'react'
import "./navbar.scss"
import {Link} from "react-router-dom";

export default function navbar() {
  return (
    <div>
        <div className="navbar">
            <div className="left">
                BioBoards
            </div>
            <div className="right">
                <a className = "link" href = '#landing'>Landing</a>
                <a className = "link" href = '#drive'>Drive</a>
                <a to = "/auth" href = "/auth"><button className = "signin" component = {Link} to = "/auth">Log In</button></a>
            </div>
        </div>
    </div>
  )
}
