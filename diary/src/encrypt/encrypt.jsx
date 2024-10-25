import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const Encrypt = () => {
  const getMessageList = JSON.parse(localStorage.getItem('messageList'));
  const [text, setText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [messageListEncrypted, showMessageListEncrypted] = useState(getMessageList);

  const secretKey = 'my-secret-key';

  const encryptText = (text) => {
    const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
    setEncryptedText(encrypted);
    const getMessageList = JSON.parse(localStorage.getItem('messageList'));
    if(getMessageList){
        let map = new Map();
        let id = 2;
        map.set(id, encrypted);
        getMessageList.push(Array.from(map.entries())[0])
        localStorage.setItem('messageList',JSON.stringify(getMessageList));
    }else{
        setMessageToLocalStorage(encrypted);
    }
  };

  const setMessageToLocalStorage = (encrypted) => {
    let map = new Map();
    let id = 1;
    map.set(id, encrypted);
    console.log(JSON.stringify(map))
    localStorage.setItem('messageList',JSON.stringify(Array.from(map.entries())));
  };

  const decryptText = (encryptedText) => {
    // const getMessageList = JSON.parse(localStorage.getItem('messageList'));
    // getMessageList.forEach(element => {
    //     console.log(element[1])
    // });

    getMessageList.forEach(element => {
        showMessageListEncrypted(element);
    });

    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    setDecryptedText(decrypted);
  };


    

    const test = () => {
        return getMessageList ? <div>{getMessageList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}</div> : null
      };

  return (
    <div>
      <h1>Nouveau message</h1>
      <div className="new-message">
        <textarea
          placeholder="Votre message"
          value={text}
          className="textarea"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button className="btn-send" onClick={() => encryptText(text)}>Envoyer votre message</button>
      </div>
      {/* <div className='crypted-message-container'>
        <p className='crypted-message'>{encryptedText}</p>
        <button onClick={() => decryptText(encryptedText)}>Afficher le message</button>
      </div> */}
      <div>
        <p>{text}</p>
      </div>
      <div>
        {test()}
      </div>
    </div>
  );
};

export default Encrypt;
