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
}
