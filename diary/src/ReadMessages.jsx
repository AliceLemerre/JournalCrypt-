import React, { useState, useContext } from 'react';
import CryptoJS from 'crypto-js';
import { MyContext } from './context/MyContext';

const ReadMessages = () => {
  const { messageList, setMessageList } = useContext(MyContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [secretKey, setSecretKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editableText, setEditableText] = useState('');

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
      if (editingIndex !== null) {
        setEditableText(decrypted);
      }
      setShowPopup(false);
    }
  };

  const deleteMessage = (index) => {
    const newList = messageList.filter((item, idx) => idx !== index); 
    setMessageList(newList); 
  };

  const editMessage = (index) => {
    setSelectedMessage(index);
    setEditingIndex(index);
    setShowPopup(true);
  };

  const validateEdit = (index) => {
    const newEncryptedText = CryptoJS.AES.encrypt(editableText, secretKey).toString();
    const newList = messageList.map((item, idx) => {
      if (idx === index) {
        return [item[0], newEncryptedText];
      }
      return item;
    });
    setMessageList(newList);
    setEditingIndex(null);
    setEditableText('');
    setSecretKey('');
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody data-testid="tbody">
          {messageList.map((item, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{item[0]}</td>
              <td data-testid="encrypted-message" onClick={() => handleDecryptClick(index)} style={{ cursor: 'pointer', color: 'blue' }}>
                {item[1]}
              </td>
              <td>{selectedMessage === index ? decryptedText : ''}</td>
              <td>
                {editingIndex === index && (
                  <textarea
                    data-testid="update-textarea"
                    value={editableText}
                    onChange={(e) => setEditableText(e.target.value)}
                    className="edit-textarea"
                  />
                )}
                <button onClick={() => deleteMessage(index)}>Delete</button>
                {editingIndex === index ? (
                  <button onClick={() => validateEdit(index)}>Valider</button>
                ) : (
                  <button onClick={() => editMessage(index)}>Modifier</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup" data-testid="popup">
          <div className="popup-content">
            <h3>Enter Secret Key</h3>
            <input
              type="text"
              data-testid="secret-key-input"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Enter secret key"
            />
            <button onClick={handleDecrypt}>Decrypt</button>
            <button onClick={() => { setShowPopup(false); setEditingIndex(null); }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadMessages;