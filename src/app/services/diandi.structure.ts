/**
 *      订单
 */
export class Order {
    constructor(public index: number,
                public out_trade_no: string,
                public skuList: SKU[],
                public consignee: Consignee,
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
                public attributes: Attribute[],
                public thumbnail: string,
                public type: number) {
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
    constructor(public pid: string,
                public name: string,
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
 *      管理者
 */
export class Manager {
    constructor(public index: number,
                public headimgurl: string,
                public nickname: string,
                public sex: string,
                public mobile: string,
                public location: string,
                public lastLogin: string) {
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

/**
 *      商户详情
 */
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
 *      菜单
 */
export class Menu {
    constructor(public id: string,
                public isSubMenu: boolean,
                public type: string,
                public typeName: string,
                public typeHint: string,
                public name: string,
                public url: string,
                public appid: string,
                public pagePath: string,
                public key: string,
                public mediaId: string) {
    }
}

/**
 *      审核状态
 */
export const AuditStatusEnum = [
    '',
    '审核中',
    '审核不通过',
    '审核通过'
];

/**
 *      小程序类目
 */
export class Category {
    constructor(public firstId: number,
                public firstName: string,
                public secondId: number,
                public secondName: string,
                public auditStatus: string,
                public auditReason: string) {
    }
}

/**
 *      公众号及小程序账号
 */
export class Account {
    constructor(public appid: string,
                public accountType: string,
                public headImageUrl: string,
                public nickName: string,
                public categories: Category[],
                public principalName: string,
                public principalType: string,
                public realNameStatus: string,
                public signature: string,
                public qualificationVerify: boolean,
                public namingVerify: boolean) {
    }
}

/**
 *      代码模版
 */
export class Template {
    constructor(public templateId: number, /* 代码库中的代码模版ID */
                public extJson: string, /* 第三方自定义的配置 */
                public userVersion: string, /* 代码版本号 */
                public userDescription: string/* 代码描述 */) {
    }
}

/**
 *      场景应用的前置条件
 */
export class Precondition {
    constructor(public scenario: number,
                public shouldHavaBusiness: boolean) {
    }
}

/**
 *      账号类型
 */
export const AccountTypeEnum = [
    '',
    '订阅号',
    '服务号',
    '小程序'
];

/**
 *      实名验证状态
 */
export const realnameStatusEnum = [
    '',
    '实名验证成功',
    '实名验证中',
    '实名验证失败'
];

/**
 *      企业类型
 */
export const principalTypeEnum = [
    '',
    '企业'
];


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

/**
 *      权限集
 */
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
    '自定义菜单权限',
    '获取认证状态及信息',
    '帐号管理权限（小程序）',
    '开发管理与数据分析权限（小程序）',
    '客服消息管理权限（小程序）',
    '微信登录权限（小程序）',
    '数据分析权限（小程序）',
    '城市服务接口权限',
    '广告管理权限',
    '开放平台帐号管理权限',
    '开放平台帐号管理权限（小程序）',  // 25
    '微信电子发票权限',
    '',
    '',
    '',
    '小程序基本信息设置权限',          //  30
    '小程序认证权限',
    '',
    '',
    '',
    '',
    '微信卡路里权限',
    '附近地点权限',
    '',
    '',
    '插件管理权限'                     //  40
];

/**
 *      菜单类型
 */
export const MenuType = [
    {
        key: 'miniprogram',
        value: '微信小程序',
        hint: '公众号可关联同主体的10个小程序及不同主体的3个小程序，同一个小程序可关联最多500个公众号'
    },
    {
        key: 'click',
        value: '点击事件',
        hint: '点击推事件用户点击click类型按钮后，微信服务器会通过消息接口推送消息类型为event的结构给开发者，并且带上按钮中开发者填写的key值，开发者可以通过自定义的key值与用户进行交互'
    },
    {
        key: 'view',
        value: '网页URL',
        hint: '跳转URL用户点击view类型按钮后，微信客户端将会打开开发者在按钮中填写的网页URL，可与网页授权获取用户基本信息接口结合，获得用户基本信息'
    },
    {
        key: 'scancode_push',
        value: '扫码推事件',
        hint: '用户点击按钮后，微信客户端将调起扫一扫工具，完成扫码操作后显示扫描结果（如果是URL，将进入URL），且会将扫码的结果传给开发者，开发者可以下发消息'
    },
    {
        key: 'scancode_waitmsg',
        value: '扫码推事件且弹出“消息接收中”提示框',
        hint: '用户点击按钮后，微信客户端将调起扫一扫工具，完成扫码操作后，将扫码的结果传给开发者，同时收起扫一扫工具，然后弹出“消息接收中”提示框，随后可能会收到开发者下发的消息'
    },
    {
        key: 'pic_sysphoto',
        value: '弹出系统拍照发图',
        hint: '用户点击按钮后，微信客户端将调起系统相机，完成拍照操作后，会将拍摄的相片发送给开发者，并推送事件给开发者，同时收起系统相机，随后可能会收到开发者下发的消息'
    },
    {
        key: 'pic_photo_or_album',
        value: '弹出拍照或者相册发图',
        hint: '用户点击按钮后，微信客户端将弹出选择器供用户选择“拍照”或者“从手机相册选择”。用户选择后即走其他两种流程'
    },
    {
        key: 'pic_weixin',
        value: '弹出微信相册发图器',
        hint: '用户点击按钮后，微信客户端将调起微信相册，完成选择操作后，将选择的相片发送给开发者的服务器，并推送事件给开发者，同时收起相册，随后可能会收到开发者下发的消息'
    },
    {
        key: 'location_select',
        value: '弹出地理位置选择器',
        hint: '用户点击按钮后，微信客户端将调起地理位置选择工具，完成选择操作后，将选择的地理位置发送给开发者的服务器，同时收起位置选择工具，随后可能会收到开发者下发的消息'
    },
    {
        key: 'media_id',
        value: '下发消息',
        hint: '用户点击media_id类型按钮后，微信服务器会将开发者填写的永久素材id对应的素材下发给用户，永久素材类型可以是图片、音频、视频、图文消息。请注意：永久素材id必须是在“素材管理/新增永久素材”接口上传后获得的合法id'
    },
    {
        key: 'view_limited',
        value: '跳转图文消息URL',
        hint: '用户点击view_limited类型按钮后，微信客户端将打开开发者在按钮中填写的永久素材id对应的图文消息URL，永久素材类型只支持图文消息。请注意：永久素材id必须是在“素材管理/新增永久素材”接口上传后获得的合法id'
    }
];

/**
 *      银行ID
 */
export const BankID = [
    {
        index: 0,
        id: 1002,
        name: '工商银行'
    },
    {
        index: 1,
        id: 1005,
        name: '农业银行'
    },
    {
        index: 2,
        id: 1026,
        name: '中国银行'
    },
    {
        index: 3,
        id: 1003,
        name: '建设银行'
    },
    {
        index: 4,
        id: 1001,
        name: '招商银行'
    },
    {
        index: 5,
        id: 1066,
        name: '邮储银行'
    },
    {
        index: 6,
        id: 1020,
        name: '交通银行'
    },
    {
        index: 7,
        id: 1004,
        name: '浦发银行'
    },
    {
        index: 8,
        id: 1006,
        name: '民生银行'
    },
    {
        index: 9,
        id: 1009,
        name: '兴业银行'
    },
    {
        index: 10,
        id: 1010,
        name: '平安银行'
    },
    {
        index: 11,
        id: 1021,
        name: '中信银行'
    },
    {
        index: 12,
        id: 1025,
        name: '华夏银行'
    },
    {
        index: 13,
        id: 1027,
        name: '广发银行'
    },
    {
        index: 14,
        id: 1022,
        name: '光大银行'
    },
    {
        index: 15,
        id: 1032,
        name: '北京银行'
    },
    {
        index: 16,
        id: 1056,
        name: '宁波银行'
    }
];

/**
 *      场景值
 */
export const ENUM_SCENARIO = {
    COMMERCE: 0,
    MAP: 1,
    COUPON: 2,
    STATISTICS: 3,
    DEVELOPMENT: 4
};
