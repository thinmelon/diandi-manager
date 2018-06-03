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

export class SKU {
    constructor(public stock_no: string,
                public name: string,
                public unit: number,
                public amount: number,
                public attributes: any[]) {
    }
}

export class User {
    constructor(public name: string,
                public sex: number,
                public headimgurl: string,
                public consignee: Consignee) {
    }
}

export class Consignee {
    constructor(public name: string,
                public mobile: string,
                public address: string,
                public postcode: string) {
    }
}

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