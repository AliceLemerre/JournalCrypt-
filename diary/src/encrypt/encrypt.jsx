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
      <h1>Encrypt and Decrypt Example</h1>
      <div>
        <textarea
          type="text"
          placeholder="Enter text to encrypt"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button onClick={() => encryptText(text)}>Encrypt</button>
      </div>
      <div>
        <p>Encrypted Text: {encryptedText}</p>
        <button onClick={() => decryptText(encryptedText)}>Decrypt</button>
      </div>
      <div>
        <p>Decrypted Text: {decryptedText}</p>
      </div>
    </div>
  );
};

export default Encrypt;
