import React, { useState, useContext } from 'react';
import CryptoJS from 'crypto-js';
import { MyContext } from './context/MyContext';

const AddMessage = () => {
    const { messageList, setMessageList } = useContext(MyContext);
    const [encryptedText, setEncryptedText] = useState('');
    const [text, setText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);  // Added for edit functionality
    const [editableText, setEditableText] = useState('');    // Added for edit functionality
    const secretKey = 'my-secret-key';

    const encryptText = (text) => {
        const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
        setEncryptedText(encrypted);
        let map = new Map();
        let titre = 'Titre';
        map.set(titre, encrypted);
        setMessageList((prevValues) => [...prevValues, Array.from(map.entries())[0]]);
        console.log(messageList)
    };

    const decryptText = (encryptedText) => {
        const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        // setDecryptedText(decrypted);
        return decrypted;
    };

    const deleteMessage = (index) => {
        const newList = messageList.filter((item, idx) => idx !== index);
        setMessageList(newList);
    }

    // Updated edit functions
    const editMessage = (index) => {
        const item = messageList[index];
        setEditingIndex(index);
        setEditableText(decryptText(item[1]));
    }

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
    }

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
            <div>
                {messageList.map((item, index) => (
                    <div className='messages'>
                        <table className='message-list'>
                            <tr>
                                <td>{index}</td>
                                <td>{item[0]}</td>
                                <td>{item[1]}</td>
                                <br></br>
                                <td>
                                    {editingIndex === index ? (
                                        <textarea
                                            value={editableText}
                                            onChange={(e) => setEditableText(e.target.value)}
                                            className="edit-textarea"
                                        />
                                    ) : (
                                        <span className="decrypted-text">
                                            {decryptText(item[1])}
                                        </span>
                                    )}
                                </td>
                                <br></br>
                            </tr>
                        </table>
                        <button onClick={() => deleteMessage(index)}>Delete</button>
                        {editingIndex === index ? (
                            <button onClick={() => validateEdit(index)}>Valider</button>
                        ) : (
                            <button onClick={() => editMessage(index)}>Modifier</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddMessage;