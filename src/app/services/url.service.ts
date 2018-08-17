const PROTOCOL = 'https://';
// const PROTOCOL = 'http://';
const HOST = 'www.pusudo.cn';
// const HOST = 'localhost:4200';
const API = '/backbone';
const PREFIX = PROTOCOL + HOST + API;

export class UrlService {

    static FetchProductList(session: string, startTime: string, n: number): string {
        return `${ PREFIX }/product/list?session=${ session }&startTime=${ startTime }&number=${ n }&queryType=FULL`;
    }

    static FetchPartialProductList(session: string, offset: number, amount: number): string {
        return `${ PREFIX }/product/partial?session=${ session }&offset=${ offset }&amount=${ amount }`;
    }

    static FetchOrderList(session: string, startTime: string, n: number): string {
        return `${ PREFIX }/order/list?session=${ session }&startTime=${ startTime }&number=${ n }`;
    }

    static FetchCardList(session: string): string {
        return `${ PREFIX }/card/list?session=${ session }`;
    }

    static FetchAOrder(session: string, out_trade_no: string): string {
        return `${ PREFIX }/order/${ out_trade_no }?session=${ session }`;
    }

    static QueryCardDetail(session: string, card_id: string): string {
        return `${ PREFIX }/card/${ card_id }?session=${ session }`;
    }

    static QueryProductCard(session: string, product_id: string): string {
        return `${ PREFIX }/card/product/${ product_id }?session=${ session }`;
    }

    static FetchUserInfo(): string {
        return `${ PREFIX }/user`;
    }

    static FetchUserList(): string {
        return `${ PREFIX }/user/manager`;
    }

    static FetchRefundInfo(): string {
        return `${ PREFIX }/refund/progress`;
    }

    static Refund(): string {
        return `${ PREFIX }/refund`;
    }

    static UploadProductThumbnails(): string {
        return `${ PREFIX }/product/thumbnail`;
    }

    static UploadProductVideo(): string {
        return `${ PREFIX }/product/video`;
    }

    static SaveProductAttributes(): string {
        return `${ PREFIX }/product/attributes`;
    }

    static SaveProductInfo(): string {
        return `${ PREFIX }/product`;
    }

    static RemoveProduct(): string {
        return `${ PREFIX }/product`;
    }

    static ChangeProductStatus(): string {
        return `${ PREFIX }/product/status`;
    }

    static SendVerificationCode(): string {
        return `${ PREFIX }/sms`;
    }

    static AssociateProductCard(): string {
        return `${ PREFIX }/card/product`;
    }

    static FetchOfficialAccountMaterialList(offset: number, count: number): string {
        return `${ PREFIX }/official/list/material?offset=${offset}&count=${count}`;
    }

    static FetchBusinessList(session: string): string {
        return `${ PREFIX }/business/list?session=${ session }`;
    }

    static FetchBusinessDetail(session: string, bid: string): string {
        return `${ PREFIX }/business/detail?session=${ session }&bid=${ bid }`;
    }

    static AddBusiness(): string {
        return `${ PREFIX }/business`;
    }

    static UpdateBusiness(): string {
        return `${ PREFIX }/business`;
    }

    static RemoveBusiness(): string {
        return `${ PREFIX }/business`;
    }

    static ChangeBusinessStatus(): string {
        return `${ PREFIX }/business/status`;
    }

    static FetchAuthorizerInfo(session: string, type: string): string {
        return `${ PREFIX }/wechat/official?session=${ session }&type=${ type }`;
    }

    static FetchFastRegisterMiniprogramList(session: string, type: string): string {
        return `${ PREFIX }/wechat/miniprogram/list?session=${ session }&type=${ type }`;
    }

    static FetchMiniprogramInfo(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/info?session=${ session }&appid=${ appid }`;
    }

    static CreateMenu(session: string): string {
        return `${ PREFIX }/wechat/official/menu?session=${ session }`;
    }

    static Login(): string {
        return `${ PREFIX }/login`;
    }
}

