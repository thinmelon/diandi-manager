import * as JSEncrypt from 'jsencrypt';

export class Utils {
    /**
     * 产生随机字符串
     * @param length
     * @returns {string}
     */
    static GetNonceStr(length: number) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const count = chars.length;
        let i, nonceStr = '';
        for (i = 0; i < length; i++) {
            nonceStr += chars.substr(Math.floor(Math.random() * (count - 1) + 1), 1);
        }
        return nonceStr;
    }

    /**
     * 使用公钥对数据进行加密
     * @param publicKey
     * @param data
     * @returns {any}
     * @constructor
     */
    static PublicEncrypt(publicKey: string, data: string) {
        //  获得公钥
        // const pubKey = new NodeRSA(publicKey, 'pkcs8-public');
        // return pubKey.encrypt(data, 'base64');
        // return CRYPTO.publicEncrypt(publicKey, data).toString('base64');
        // CryptoJS.publicEncrypt()
        const instance = new JSEncrypt.JSEncrypt();
        instance.setKey(publicKey);
        return instance.encrypt(data);
    }

    /**
     * 对URL进行解析，从中获取路径，以及参数数组
     * @param url
     * @returns {{path: string, query: {}}}
     * @constructor
     */
    static GetParametersFromURL(url: string) {
        let query = {};
        const parts = url.split(';');

        if (parts.length === 1) {               // 如果URL不带任何其它参数，则直接跳转
            // DO NOTHING
        } else {
            //  对URL以;为分隔号进行分拆，从数组第一个元素起，为参数等式
            for (let i = 1, length = parts.length; i < length; i++) {
                //  将等式划分出KEY和VALUE，组成OBJECT，放入路由中
                const params = parts[i].split('=');
                if (params.length === 2) {      //  等式数组中仅仅包含KEY和VALUE
                    query[params[0]] = decodeURIComponent(params[1]);
                }
            }
        }
        return {
            path: parts[0],
            query: query
        };
    }
}
