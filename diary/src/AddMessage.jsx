import React, { useState, useContext } from 'react';
import CryptoJS from 'crypto-js';
import { MyContext } from './context/MyContext';

const AddMessage = () => {
    const { messageList, setMessageList } = useContext(MyContext);
    const [encryptedText, setEncryptedText] = useState('');
    const [text, setText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');
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

    return(
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
                <table className='message-list'>
                    <tr>
                        <td>{index}</td>
                        <td>{item[0]}</td>
                        <td>{item[1]}</td>
                        <br></br>
                        <td>{decryptText(item[1])}</td>
                        <br></br>
                    </tr>
                </table>
            ))}
            </div>
        </div>
    
    );

};

export default AddMessage;
