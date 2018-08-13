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
    constructor(public cardId: string,
                public cardType = '',
                public brandName = '',
                public title = '') {
    }
}

/**
 *      商户列表
 */
export class BusinessList {
    constructor(public index: number,
                public bid: string,
                public name: string,
                public longitude: number,
                public latitude: number,
                public shopHours: string,
                public phone: string,
                public status: number) {
    }
}

export class Business {
    constructor(public bid: string,
                public type: number,
                public name: string,
                public address: string,
                public longitude: number,
                public latitude: number,
                public shopHours: string,
                public phone: string,
                public consumptionPerPerson: string,
                public remark: string,
                public associatedProductPid: string,
                public associatedMaterialId: string) {
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

/**
 *      商户类别
 */
export const BusinessType = [
    '其它',
    '川菜',
    '粤菜',
    '鲁菜',
    '湘菜',
    '沪菜',
    '京菜',
    '浙菜',
    '徽菜',
    '闽菜',
    '素菜',
    '凉菜',
    '海鲜',
    '烧烤',
    '糕点',
    '湖北菜',
    '东北菜',
    '云贵菜',
    '西北菜',
    '煲仔饭',
    '天津菜',
    '清真菜',
    '农家菜',
    '客家菜',
    '粉面食',
    '快餐',
    '外卖',
    '西餐',
    '自助餐',
    '冰淇淋',
    '饮品',
    '咖啡',
    '火锅',
    '炒冰',
    '砂锅粥',
    '糖水',
    '比萨',
    '甜点点心',
    '日本烤肉',
    '韩国烤肉',
    '料理/寿司',
    '东南亚印',
    '洗浴健身',
    '酒吧',
    '茶室',
    'KTV'
];

export const PrivilegeSet = [
    '',
    '消息管理权限',
    '用户管理权限',
    '帐号服务权限',
    '网页服务权限',
    '微信小店权限',
    '微信多客服权限',
    '群发与通知权限',
    '微信卡券权限',
    '微信扫一扫权限',
    '微信连WIFI权限',
    '素材管理权限',
    '微信摇周边权限',
    '微信门店权限',
    '微信支付权限',
    '自定义菜单权限'
];
