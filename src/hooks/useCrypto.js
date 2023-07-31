import CryptoJS from "crypto-js";
// import crypto from "crypto-browserify";

export function useCrypto() {
  // 1. generateKey
  function generateKey(ci, address) {
    const k = ci + address;
    const rk = k.padEnd(32, " ");
    return CryptoJS.SHA256(rk).toString().slice(0, 32);
  }

  // 2. data encrypt
  function encodeByAES256(key, data) {
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

  return { generateKey, encodeByAES256, decodeByAES256 };
}
