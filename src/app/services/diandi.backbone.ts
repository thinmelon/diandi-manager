import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs/index';
import {UrlService} from './url.service';
import {catchError} from 'rxjs/internal/operators';
import {AttributeSet, Product, Refund} from './diandi.structure';

// const httpOptions = {
//     headers: new HttpHeaders({'Content-Type': 'application/json'})
// };

@Injectable()
export class BackboneService {
    /**
     * 构造函数
     * 依赖注入 HttpClient 服务
     * @param http
     */
    constructor(private http: HttpClient) {
    }

    /**
     * 获取商品列表
     * @returns {Observable<A>}
     */
    public fetchProducts(session: string, startTime: string, n: number) {
        return this.http
            .get<any>(UrlService.FetchProductList(session, startTime, n))
            .pipe(
                catchError(this.handleError('fetchProducts', {errMsg: '#fetchProducts#获取商品列表失败'}))
            );
    }

    /**
     * 获取订单列表
     * @returns {Observable<A>}
     */
    public fetchOrders(session: string, startTime: string, n: number): Observable<any> {
        return this.http
            .get<any>(UrlService.FetchOrderList(session, startTime, n))
            .pipe(
                catchError(this.handleError('fetchOrders', {errMsg: '#fetchOrders#获取订单列表失败'}))
            );
    }

    /**
     *  获取某订单详情
     * @param session
     * @param out_trade_no
     * @returns {Observable<A>}
     */
    public fetchAOrder(session: string, out_trade_no: string): Observable<any> {
        return this.http
            .get<any>(UrlService.FetchAOrder(session, out_trade_no))
            .pipe(
                catchError(this.handleError('fetchAOrder', {errMsg: '#fetchAOrder#获取订单详情失败'}))
            );
    }

    /**
     *  获取用户资料
     * @param session
     * @param user_id
     * @param consignee_no
     * @returns {Observable<A>}
     */
    public fetchUserInfo(session: string, user_id: string, consignee_no: string): Observable<any> {
        return this.http
            .post(UrlService.FetchUserInfo(), {
                session: session,
                user_id: user_id,
                consignee_no: consignee_no
            })
            .pipe(
                catchError(this.handleError('fetchUserInfo', {errMsg: '#fetchUserInfo#获取用户资料失败'}))
            );
    }

    /**
     *  获取退款进度
     * @param session
     * @param out_trade_no
     * @returns {Observable<A>}
     */
    public fetchRefundInfo(session: string, out_trade_no: string): Observable<any> {
        return this.http
            .post(UrlService.FetchRefundInfo(), {
                session: session,
                out_trade_no: out_trade_no
            })
            .pipe(
                catchError(this.handleError('fetchRefundInfo', {errMsg: '#fetchRefundInfo#获取退款进度信息失败'}))
            );
    }

    /**
     *  发起退款
     * @param session
     * @param refund
     * @returns {Observable<A>}
     */
    public refund(session: string, refund: Refund): Observable<any> {
        return this.http
            .post(UrlService.Refund(), {
                session: session,
                out_trade_no: refund.out_trade_no,
                out_refund_no: refund.out_refund_no,
                total_fee: refund.total_fee,
                refund_fee: refund.refund_fee
            })
            .pipe(
                catchError(this.handleError('refund', {errMsg: '#refund#退款失败'}))
            );
    }

    /**
     *  保存商品属性
     * @param attributes
     * @returns {Observable<A>}
     */
    public saveProductAttributes(attributes: AttributeSet[]): Observable<any> {
        return this.http
            .post(UrlService.SaveProductAttributes(), {
                attributes: JSON.stringify(attributes)
            })
            .pipe(
                catchError(this.handleError('saveProductAttributes', {errMsg: '#saveProductAttributes#保存商品属性失败'}))
            );
    }

    /**
     * 新建商品
     * @param session
     * @param product
     * @returns {Observable<A>}
     */
    public saveProduct(session: string, product: Product): Observable<any> {
        return this.http
            .post(UrlService.SaveProductInfo(), {
                session: session,
                product: JSON.stringify(product)
            })
            .pipe(
                catchError(this.handleError('saveProduct', {errMsg: '#saveProduct#保存商品属性失败'}))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            // console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            // this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            // return of(result as T);
            return of(error as T);
        };
    }
}
