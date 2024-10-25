// import logo from './logo.svg';
import Encrypt from '../src/encrypt/encrypt';
import AddMessage from '../src/AddMessage';
import './App.css';
import { useState, React, useContext } from "react";
import { MyContext } from "./context/MyContext";

function App() {
  const [messageList, setMessageList] = useState([]);
  return (
    <div className="App">
      <div>
        <MyContext.Provider value={{ messageList, setMessageList }}>
          <AddMessage />
        </MyContext.Provider>
      </div>
    </div>
  );
}

export default App;
