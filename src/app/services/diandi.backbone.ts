import {HttpClient, HttpParams} from '@angular/common/http';
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
     *  登录态
     */
    get isLoggedIn(): string {
        return sessionStorage.getItem('_isLoggedIn');
    }

    set isLoggedIn(loginOrNot: string) {
        sessionStorage.removeItem('_isLoggedIn');
        sessionStorage.setItem('_isLoggedIn', loginOrNot);
    }

    /**
     *  回调地址
     */
    get redirectUrl(): string {
        return sessionStorage.getItem('_redirectUrl');
    }

    set redirectUrl(url: string) {
        sessionStorage.removeItem('_redirectUrl');
        sessionStorage.setItem('_redirectUrl', url);
    }

    /**
     *  SESSION
     */
    get session(): string {
        return sessionStorage.getItem('_session');
    }

    set session(value: string) {
        sessionStorage.removeItem('_session');
        sessionStorage.setItem('_session', value);
    }

    /**
     *  菜单栏光标所在位置
     */
    get focusItem(): string {
        return sessionStorage.getItem('_focusItem');
    }

    set focusItem(value: string) {
        sessionStorage.removeItem('_focusItem');
        sessionStorage.setItem('_focusItem', value);
    }

    /**
     *  商品ID
     */
    get productId(): string {
        return sessionStorage.getItem('_productId');
    }

    set productId(value: string) {
        sessionStorage.removeItem('_productId');
        sessionStorage.setItem('_productId', value);
    }

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

    public fetchPartialProducts(session: string, n: number) {
        return this.http
            .get<any>(UrlService.FetchPartialProductList(session, n))
            .pipe(
                catchError(this.handleError('fetchPartialProducts', {errMsg: '#fetchPartialProducts#获取商品列表失败'}))
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
     *  获取用户列表
     * @param session
     * @param queryType
     * @returns {Observable<A>}
     */
    public fetchUserList(session: string, queryType: string): Observable<any> {
        return this.http
            .post(UrlService.FetchUserList(), {
                session: session,
                queryType: queryType
            })
            .pipe(
                catchError(this.handleError('fetchUserList', {errMsg: '#fetchUserList#获取用户列表失败'}))
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
                catchError(this.handleError('saveProduct', {errMsg: '#saveProduct#新增商品失败'}))
            );
    }

    /**
     * 移除商品
     * @param pid
     * @returns {Observable<A>}
     */
    public removeProduct(pid: string): Observable<any> {
        return this.http
            .delete(UrlService.RemoveProduct(), {
                params: new HttpParams().set('productid', pid),
            })
            .pipe(
                catchError(this.handleError('removeProduct', {errMsg: '#removeProduct#移除商品失败'}))
            );
    }

    /**
     * * 调整商品状态
     *  --  上/下架
     * @param status
     * @param productid
     * @returns {Observable<A>}
     * @constructor
     */
    public changeProductStatus(status: number, productid: string): Observable<any> {
        return this.http
            .post(UrlService.ChangeProductStatus(), {
                status: status,
                productid: productid
            })
            .pipe(
                catchError(this.handleError('ChangeProductStatus', {errMsg: '#ChangeProductStatus#调整商品状态失败'}))
            );
    }

    /**
     * 发送验证码
     * @param phone
     * @returns {Observable<A>}
     */
    public sendVerificationCode(phone: string): Observable<any> {
        return this.http
            .post(UrlService.SendVerificationCode(), {
                phone: phone
            })
            .pipe(
                catchError(this.handleError('sendVerificationCode', {errMsg: '#sendVerificationCode#调用发送验证码失败'}))
            );
    }

    /**
     * 登录
     * @param requestId
     * @param bizId
     * @param phone
     * @param verificationCode
     * @returns {Observable<A>}
     */
    public login(requestId: string, bizId: string, phone: string, verificationCode: string): Observable<any> {
        return this.http
            .post(UrlService.Login(), {
                requestId: requestId,
                bizId: bizId,
                phone: phone,
                verificationCode: verificationCode
            })
            .pipe(
                catchError(this.handleError('login', {errMsg: '#login#登录失败'}))
            );
    }

    /**
     * 获取卡券列表
     * @param session
     * @returns {Observable<A>}
     */
    public fetchCardList(session: string): Observable<any> {
        return this.http
            .get<any>(UrlService.FetchCardList(session))
            .pipe(
                catchError(this.handleError('fetchCardList', {errMsg: '#fetchUserList#获取卡券列表失败'}))
            );
    }

    /**
     * 获取卡券详情
     * @param session
     * @param card_id
     * @returns {Observable<A>}
     */
    public queryCardDetail(session: string, card_id: string): Observable<any> {
        return this.http
            .get<any>(UrlService.QueryCardDetail(session, card_id))
            .pipe(
                catchError(this.handleError('queryCardDetail', {errMsg: '#queryCardDetail#获取卡券列表失败'}))
            );
    }

    /**
     * 获取商品所关联的卡券
     * @param session
     * @param product_id
     * @returns {Observable<A>}
     */
    public queryProductCard(session: string, product_id: string): Observable<any> {
        return this.http
            .get<any>(UrlService.QueryProductCard(session, product_id))
            .pipe(
                catchError(this.handleError('queryProductCard', {errMsg: '#queryProductCard#获取商品所关联的卡券失败'}))
            );
    }

    /**
     * 关联商品与卡券
     * @param session
     * @param product_id
     * @param card_id
     * @returns {Observable<A>}
     */
    public associateProductCard(session: string, product_id: string, card_id: string): Observable<any> {
        return this.http
            .post<any>(UrlService.AssociateProductCard(), {
                session: session,
                product_id: product_id,
                card_id: card_id
            })
            .pipe(
                catchError(this.handleError('associateProductCard', {errMsg: '#associateProductCard#关联商品与卡券失败'}))
            );
    }

    /**
     * 查询商户列表
     * @param session
     * @returns {Observable<A>}
     */
    public fetchBusinessList(session: string): Observable<any> {
        return this.http
            .get<any>(UrlService.FetchBusinessList(session))
            .pipe(
                catchError(this.handleError('fetchBusinessList', {errMsg: '#fetchBusinessList#获取商户列表失败'}))
            );
    }

    /**
     * 添加商户
     * @param session
     * @returns {Observable<A>}
     */
    public addBusiness(session: string): Observable<any> {
        return this.http
            .post<any>(UrlService.AddBusiness(session), {
                session: session
            })
            .pipe(
                catchError(this.handleError('addBusiness', {errMsg: '#addBusiness#添加商户失败'}))
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
