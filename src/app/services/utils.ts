// import * as NodeRSA from 'node-rsa';
// import * as CryptoJS from 'crypto-js';
import * as JSEncrypt from 'jsencrypt';
// const CRYPTO = require('crypto');

export class Utils {
    /**
     * 产生随机字符串
     * @param length
     * @returns {string}
     */
    static GetNonceStr(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const count = chars.length;
        let i, nonceStr = '';
        for (i = 0; i < length; i++) {
            nonceStr += chars.substr(Math.floor(Math.random() * (count - 1) + 1), 1);
        }
        return nonceStr;
    }

    static PublicEncrypt(publicKey, data) {
        //  获得公钥
        // const pubKey = new NodeRSA(publicKey, 'pkcs8-public');
        // return pubKey.encrypt(data, 'base64');
        // return CRYPTO.publicEncrypt(publicKey, data).toString('base64');
        // CryptoJS.publicEncrypt()
        const instance = new JSEncrypt.JSEncrypt();
        instance.setKey(publicKey);
        return instance.encrypt(data);
    }
}
