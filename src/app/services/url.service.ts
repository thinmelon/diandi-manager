const PROTOCOL = 'https://';
// const PROTOCOL = 'http://';
const HOST = 'www.thinmelon.cc:3000';
// const HOST = 'localhost:4200';
const API = '/backbone';
const PREFIX = PROTOCOL + HOST + API;

export class UrlService {
    static FetchOrderList(session: string, startTime: string, n: number): string {
        return `${ PREFIX }/order/list?session=${ session }&startTime=${ startTime }&number=${ n }`;
    }

    static FetchAOrder(session: string, out_trade_no: string): string {
        return `${ PREFIX }/order/${ out_trade_no }?session=${ session }`;
    }

    static FetchUserInfo(): string {
        return `${ PREFIX }/user`;
    }

    static FetchRefundInfo(): string {
        return `${ PREFIX }/refund`;
    }
}

