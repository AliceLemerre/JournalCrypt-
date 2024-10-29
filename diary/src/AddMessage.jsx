import React, { useState, useContext } from 'react';
import CryptoJS from 'crypto-js';
import { MyContext } from './context/MyContext';
import { encryptText } from './encryptionUtils';

const AddMessage = () => {
  const { messageList, setMessageList } = useContext(MyContext);
  const [encryptedText, setEncryptedText] = useState('');
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  const secretKey = 'my-secret-key';

  const handleEncryptAndAddMessage = () => {
    const encrypted = encryptText(text, secretKey);
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
          data-testid="input-title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Votre message"
          value={text}
          className="textarea"
          data-testid="textarea"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button data-testid="btn-send" onClick={handleEncryptAndAddMessage}>
          Envoyer votre message
        </button>
      </div>
    </div>
  );
};

export default AddMessage;
