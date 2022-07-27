// 加密解密函数
import CryptoJS from "crypto-js";

const CRYPTO_SECRET = "加密的密钥（可通过随机生成密码器生成）";

/**
 * AES加密数据
 * @param data 需要加密的数据
 * @returns 返回AES加密后的数据
 */
export function encrypto(data: any) {
  const newData = JSON.stringify(data);
  return CryptoJS.AES.encrypt(newData, CRYPTO_SECRET).toString();
}

/**
 * AES解密数据
 * @param encryptedData 加密后的数据
 * @returns 解密的数据
 */
export function decrypto(encryptedData: any) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, CRYPTO_SECRET);
  const originText = bytes.toString(CryptoJS.enc.Utf8);
  if (originText) {
    return JSON.parse(originText);
  }
  return null;
}
