import CryptoJS from "crypto-js";

export function useCrypto() {
  // 1. generateKey
  function generateKey(ci, address) {
    return CryptoJS.SHA256(ci + address);
  }

  // 2. data encrypt
  function encodeByAES56(key, data) {
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(""),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });
    return cipher.toString();
  }

  // 3. data decrypt
  function decodeByAES256(key, data) {
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(""),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });
    // return json Object
    return JSON.parse(cipher.toString(CryptoJS.enc.Utf8));
  }

  return { generateKey, encodeByAES56, decodeByAES256 };
}
