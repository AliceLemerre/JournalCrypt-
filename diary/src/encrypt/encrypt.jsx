import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const Encrypt = () => {
  const [text, setText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const secretKey = 'my-secret-key';

  const encryptText = (text) => {
    const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
    setEncryptedText(encrypted);
  };

  const decryptText = (encryptedText) => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    setDecryptedText(decrypted);
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
      <div className='crypted-message-container'>
        <p className='crypted-message'>{encryptedText}</p>
        <button onClick={() => decryptText(encryptedText)}>Afficher le message</button>
      </div>
      <div>
        <p>{decryptedText}</p>
      </div>
    </div>
  );
};

export default Encrypt;
