import React, {useState, useEffect} from "react";
import "./navbar.scss";
import {Link, useHistory, useLocation} from "react-router-dom";
import decode from "jwt-decode";

export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    history.push("/auth");
    setUser(null);
}
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logOut();
      }
    }
      setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);
  return (
    <div>
        <div className="navbar">
            <div className="left">
                BioBoards
            </div>
            <div className="right">
                <a className = "link" href = '#landing'>Landing</a>
                {user?(
                  <div className = "avatar">{user?.fName.charAt(0)}</div>
                ):(
                  <a to = "/auth" href = "/auth"><button className = "signin" component = {Link} to = "/auth">Log In</button></a>
                )}
            </div>
        </div>
    </div>
  )
}
