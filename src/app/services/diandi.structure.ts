/**
 *      订单
 */
export class Order {
    constructor(public index: number,
                public out_trade_no: string,
                public consignee_no: string,
                public user_id: number,
                public createTime: string,
                public payTime: string,
                public totalFee: number,
                public status: string,
                public attach: string,
                public remark: string) {
    }
}

/**
 *      库存
 */
export class SKU {
    constructor(public stock_no: string,
                public name: string,
                public unit: number,
                public amount: number,
                public attributes: any[]) {
    }
}

/**
 *      属性
 */
export class Attribute {
    constructor(public id: string,
                public name: string,
                public value: string) {
    }
}

/**
 *      属性键值集合
 */
export class AttributeSet {
    constructor(public name: string,
                public values: string[]) {
    }
}

/**
 *      商品
 */
export class Product {
    constructor(public name: string,
                public introduce: string,
                public type: number,
                public attributes: Array<any>,
                public sku: Array<any>,
                public thumbnails: Array<any>,
                public details: Array<any>,
                public videos: Array<any>) {
    }
}

/**
 *      用户
 */
export class User {
    constructor(public name: string,
                public sex: number,
                public headimgurl: string,
                public consignee: Consignee) {
    }
}

/**
 *      管理者
 */
export class Manager {
    constructor(public index: number,
                public phone: string,
                public session: number,
                public role: string) {
    }
}

/**
 *      收件人
 */
export class Consignee {
    constructor(public name: string,
                public mobile: string,
                public address: string,
                public postcode: string) {
    }
}

/**
 *      退款
 */
export class Refund {
    constructor(public out_trade_no: string,
                public out_refund_no: string,
                public total_fee: number,
                public refund_fee: number) {
    }
}

/**
 *      商品列表
 */
export class ProductList {
    constructor(public index: number,
                public pid: string,
                public name: string,
                public description: string,
                public sales: number,
                public status: number,
                public createTime: string,
                public type: number) {
    }
}

/**
 *      验证码
 */
export class VerificationCode {
    constructor(public requestId: string,
                public bizId: string,
                public phone: string,
                public verificationCode: string) {
    }
}

/**
 *      卡券
 */
export class Card {
    constructor(public cardId: string) {
    }
}

/**
 *      订单状态
 */
export const OrderStatusEnum = [
    '未支付',		// NOTPAY: 0,
    '支付成功',		// SUCCESS: 1,
    '转入退款',		// REFUND: 2,
    '已关闭',		// CLOSE: 3,
    '已撤销（刷卡支付）',	// REVOKED: 4,
    '用户支付中',			// USERPAYING: 5,
    '支付失败',			// PAYERROR: 6,
    '状态异常'			// ABNORMAL: 7
];
