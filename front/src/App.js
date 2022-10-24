import './App.css';
import Editor from './Components/Editor/editor';
import Auth from './Components/Auth/Auth'
import Navbar from './Components/Navbar/navbar';
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
          <div className="App">
            <Navbar/>
            <Routes>
              <Route path = "/" element = {<Editor/>}/>
              <Route path = "/auth" element = {<Auth/>}/>
            </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
