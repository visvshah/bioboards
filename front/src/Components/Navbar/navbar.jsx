import React from 'react'
import "./navbar.scss"
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
            </div>
        </div>
    </div>
  )
}
