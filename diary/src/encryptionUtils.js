import CryptoJS from 'crypto-js';

export const encryptText = (text, secretKey) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decryptText = (encryptedText, secretKey) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || 'Invalid Secret Key';
  } catch (error) {
    return 'Decryption Failed';
  }
};

export const deleteMessage = (index, messageList) => {
  const newList = messageList.filter((item, idx) => idx !== index); 
  return newList
};