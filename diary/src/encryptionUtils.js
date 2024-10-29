// encryptionUtils.js
import CryptoJS from 'crypto-js';

export const encryptText = (text, secretKey) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};
