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

    static FetchOrderList(session: string, startTime: string, n: number): string {
        return `${ PREFIX }/order/list?session=${ session }&startTime=${ startTime }&number=${ n }`;
    }

    static FetchCardList(): string {
        return `${ PREFIX }/card/list`;
    }

    static FetchAOrder(session: string, out_trade_no: string): string {
        return `${ PREFIX }/order/${ out_trade_no }?session=${ session }`;
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

    static Login(): string {
        return `${ PREFIX }/login`;
    }
}

