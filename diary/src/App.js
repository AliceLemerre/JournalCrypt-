import Encrypt from '../src/encrypt/encrypt';
import AddMessage from '../src/AddMessage';
import ReadMessages from '../src/ReadMessages';
import './App.css';
import { useState, React, useContext } from "react";
import { MyProvider } from "./context/MyContext";

function App() {
  const [messageList, setMessageList] = useState([]);
  return (
    <div className="App">
      <div>
        <MyProvider value={{ messageList, setMessageList }}>
          <AddMessage />
          <ReadMessages />
        </MyProvider>
      </div>
    </div>
  );
}

export default App;
