import React, { useState, useContext } from 'react';
import CryptoJS from 'crypto-js';
import { MyContext } from './context/MyContext';
import { decryptText, deleteMessage } from './encryptionUtils';

const ReadMessages = () => {
  const { messageList, setMessageList } = useContext(MyContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [secretKey, setSecretKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editableText, setEditableText] = useState('');

  const handleDecryptClick = (messageIndex) => {
    setShowPopup(true);
    setDecryptedText('');
    setSelectedMessage(messageIndex);
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

  const handleDeleteMessage = (index) => {
    const newList = deleteMessage(index, messageList); 
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
              <td data-testid="decrypted-message">{selectedMessage === index ? decryptedText : ''}</td>
              <td>
                {editingIndex === index && (
                  <textarea
                    data-testid="update-textarea"
                    value={editableText}
                    onChange={(e) => setEditableText(e.target.value)}
                    className="edit-textarea"
                  />
                )}
                <button onClick={() => handleDeleteMessage(index)}>Delete</button>
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
