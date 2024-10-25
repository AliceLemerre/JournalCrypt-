import React, { useState, useContext } from 'react';
import CryptoJS from 'crypto-js';
import { MyContext } from './context/MyContext';

const ReadMessages = () => {
  const { messageList } = useContext(MyContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [secretKey, setSecretKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const handleDecryptClick = (messageIndex) => {

    setDecryptedText('');
    setSelectedMessage(messageIndex);
    setShowPopup(true);
  };

  const handleDecrypt = () => {
    if (selectedMessage !== null && secretKey) {
      const encryptedText = messageList[selectedMessage][1];
      const decrypted = decryptText(encryptedText, secretKey);
      setDecryptedText(decrypted);
      setShowPopup(false);
    }
  };

  const decryptText = (encryptedText, secretKey) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted || 'Invalid Secret Key';
    } catch (error) {
      return 'Decryption Failed';
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Encrypted Message</th>
            <th>Decrypted Message</th>
          </tr>
        </thead>
        <tbody>
          {messageList.map((item, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{item[0]}</td>
              <td onClick={() => handleDecryptClick(index)} style={{ cursor: 'pointer', color: 'blue' }}>
                {item[1]}
              </td>
              <td>{selectedMessage === index ? decryptedText : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Enter Secret Key</h3>
            <input
              type="text"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Enter secret key"
            />
            <button onClick={handleDecrypt}>Decrypt</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadMessages;
