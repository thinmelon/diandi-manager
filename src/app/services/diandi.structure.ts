/**
 *      订单
 */
export class Order {
    constructor(public index: number,
                public out_trade_no: string,
                public user_id: number,
                public createTime: string,
                public status: string,
                public skuList: SKU[]) {
    }
}

export class SKU {
    constructor(public stock_no: string,
                public name: string,
                public unit: number,
                public amount: number,
                public attributes: string) {
    }
}
