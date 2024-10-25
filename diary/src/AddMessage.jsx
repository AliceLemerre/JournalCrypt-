import React, { useState, useContext } from 'react';
import CryptoJS from 'crypto-js';
import { MyContext } from './context/MyContext';

const AddMessage = () => {
  const { messageList, setMessageList } = useContext(MyContext);
  const [encryptedText, setEncryptedText] = useState('');
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  const secretKey = 'my-secret-key';

  const encryptText = (title, text) => {
    
    const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
    setEncryptedText(encrypted);

    const newMessage = [title, encrypted];

    setMessageList((prevValues) => [...prevValues, newMessage]);

    setTitle('');
    setText('');
  };

  return (
    <div>
      <h1>Journal Intime</h1>
      <h2>Ajouter un message</h2>
      <div className="new-message">
        <input
          type="text"
          placeholder="Titre"
          value={title}
          className="input-title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Votre message"
          value={text}
          className="textarea"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button className="btn-send" onClick={() => encryptText(title, text)}>
          Envoyer votre message
        </button>
      </div>
    </div>
  );
};

export default AddMessage;
