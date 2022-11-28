import './App.css';
import Editor from './Components/Editor/editor';
import BoardView from './Components/Editor/boardView';
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
              <Route path='/:user/:boardNumber' element={<BoardView/>} />
                    <Route></Route>
            </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
