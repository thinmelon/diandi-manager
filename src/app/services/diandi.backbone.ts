import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs/index';
import {UrlService} from './url.service';
import {catchError} from 'rxjs/internal/operators';
import {AttributeSet, Business, Product, Refund, Template} from './diandi.structure';
import {Utils} from './utils';

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
     *  publicKey
     */
    get publicKey(): string {
        return sessionStorage.getItem('_publicKey');
    }

    set publicKey(value: string) {
        sessionStorage.removeItem('_publicKey');
        sessionStorage.setItem('_publicKey', value);
    }

    /**
     * 渠道 （公众号、小程序、生活号）
     */
    get channel(): string {
        return sessionStorage.getItem('_channel');
    }

    set channel(value: string) {
        sessionStorage.removeItem('_channel');
        sessionStorage.setItem('_channel', value);
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
     *  商户ID
     */
    get businessId(): string {
        return sessionStorage.getItem('_businessId');
    }

    set businessId(value: string) {
        sessionStorage.removeItem('_businessId');
        sessionStorage.setItem('_businessId', value);
    }

    /**
     *  授权公众号的 APPID
     */
    get authorizerAppId(): string {
        return sessionStorage.getItem('_authorizerAppId');
    }

    set authorizerAppId(value: string) {
        sessionStorage.removeItem('_authorizerAppId');
        sessionStorage.setItem('_authorizerAppId', value);
    }

    /**
     *  授权小程序的 APPID
     */
    get authorizerMiniProgramAppId(): string {
        return sessionStorage.getItem('_authorizerMiniProgramAppId');
    }

    set authorizerMiniProgramAppId(value: string) {
        sessionStorage.removeItem('_authorizerMiniProgramAppId');
        sessionStorage.setItem('_authorizerMiniProgramAppId', value);
    }

    get diandiWebsiteAppId(): string {
        return 'wxf0e807f315d28d5b';
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
    public fetchPartialProducts(session: string, businessId: string, offset: number, amount: number) {
        return this.http
            .get<any>(UrlService.FetchPartialProductList(session, businessId, offset, amount))
            .pipe(
                catchError(this.handleError('fetchPartialProducts', {errMsg: '#fetchPartialProducts#获取商品列表失败'}))
            );
    }

    /**
     * 获取商品详情
     * @param session
     * @param productId
     * @returns {Observable<A>}
     */
    public fetchProductDetails(session: string, productId: string) {
        return this.http
            .get<any>(UrlService.FetchProductDetails(session, productId))
            .pipe(
                catchError(this.handleError('fetchProductDetails', {errMsg: '#fetchProductDetails#获取商品详情失败'}))
            );
    }

    /**
     * 获取授权方的订单列表
     * @param session
     * @param businessId
     * @param offset
     * @param amount
     * @returns {Observable<A>}
     */
    public fetchOrders(session: string, businessId: string, offset: number, amount: number): Observable<any> {
        return this.http
            .get<any>(UrlService.FetchOrderList(session, businessId, offset, amount))
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
     * 获取微信用户信息
     * @param session
     * @param appid
     * @returns {Observable<A>}
     */
    public fetchWechatUserInfo(session: string, appid: string): Observable<any> {
        return this.http
            .get(UrlService.FetchWechatUserInfo(session, appid))
            .pipe(
                catchError(this.handleError('fetchWechatUserInfo', {errMsg: '#fetchWechatUserInfo#获取微信用户信息失败'}))
            );
    }

    /**
     *  获取用户列表
     * @param session
     * @param appid
     * @returns {Observable<A>}
     */
    public fetchUserList(session: string, appid: string): Observable<any> {
        return this.http
            .get(UrlService.FetchUserList(session, appid))
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
            .post(UrlService.FetchRefundInfo(session), {
                out_trade_no: out_trade_no
            })
            .pipe(
                catchError(this.handleError('fetchRefundInfo', {errMsg: '#fetchRefundInfo#获取退款进度信息失败'}))
            );
    }

    /**
     * 发起退款
     * @param session
     * @param appid
     * @param refund
     * @returns {Observable<A>}
     */
    public refund(session: string, appid: string, refund: Refund): Observable<any> {
        return this.http
            .post(UrlService.Refund(session), {
                appid: appid,
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
     * 新建商品
     * @param session
     * @param bid
     * @param product
     * @returns {Observable<A>}
     */
    public saveProduct(session: string, bid: string, product: Product): Observable<any> {
        return this.http
            .post(UrlService.SaveProductInfo(session, bid), {
                product: JSON.stringify(product)
            })
            .pipe(
                catchError(this.handleError('saveProduct', {errMsg: '#saveProduct#新增商品失败'}))
            );
    }

    /**
     * 移除商品
     * @param session
     * @param bid
     * @param pid
     * @returns {Observable<A>}
     */
    public removeProduct(session: string, bid: string, pid: string): Observable<any> {
        return this.http
            .delete(UrlService.RemoveProduct(), {
                params: {
                    session: session,
                    businessId: bid,
                    productId: pid
                }
            })
            .pipe(
                catchError(this.handleError('removeProduct', {errMsg: '#removeProduct#移除商品失败'}))
            );
    }

    /**
     * 调整商品状态
     *  --  上/下架
     * @param session
     * @param status
     * @param productid
     * @returns {Observable<A>}
     */
    public changeProductStatus(session: string, status: number, productid: string): Observable<any> {
        return this.http
            .post(UrlService.ChangeProductStatus(session), {
                status: status,
                pid: productid
            })
            .pipe(
                catchError(this.handleError('ChangeProductStatus', {errMsg: '#ChangeProductStatus#调整商品状态失败'}))
            );
    }

    /**
     * 发送验证码
     * @param session
     * @param phone
     * @returns {Observable<A>}
     */
    public sendVerificationCode(session: string, phone: string): Observable<any> {
        return this.http
            .post(UrlService.SendVerificationCode(session), {
                phone: phone
            })
            .pipe(
                catchError(this.handleError('sendVerificationCode', {errMsg: '#sendVerificationCode#调用发送验证码失败'}))
            );
    }

    /**
     * 手机验证码登录
     * @param appid
     * @param requestId
     * @param bizId
     * @param phone
     * @param verificationCode
     * @returns {Observable<A>}
     */
    public mobileLogin(appid: string, requestId: string, bizId: string, phone: string, verificationCode: string): Observable<any> {
        return this.http
            .post(UrlService.MobileLogin(), {
                appid: appid,
                requestId: requestId,
                bizId: bizId,
                phone: phone,
                verificationCode: verificationCode
            })
            .pipe(
                catchError(this.handleError('mobileLogin', {errMsg: '#MobileLogin#登录失败'}))
            );
    }

    /**
     *  测试账户登录
     * @param account
     * @param password
     * @returns {Observable<A>}
     */
    public testLogin(account: string, password: string): Observable<any> {
        return this.http
            .post(UrlService.TestLogin(), {
                account: account,
                password: password
            })
            .pipe(
                catchError(this.handleError('testLogin', {errMsg: '#testLogin#测试账户登录'}))
            );
    }

    /**
     * 绑定手机号码
     * @param session
     * @param requestId
     * @param appid
     * @param bizId
     * @param phone
     * @param verificationCode
     * @returns {Observable<A>}
     */
    public bindMobile(session: string, appid: string, requestId: string, bizId: string, phone: string, verificationCode: string): Observable<any> {
        return this.http
            .post(UrlService.BindMobile(session), {
                appid: appid,
                requestId: requestId,
                bizId: bizId,
                phone: phone,
                verificationCode: verificationCode
            })
            .pipe(
                catchError(this.handleError('bindMobile', {errMsg: '#bindMobile#绑定手机号失败'}))
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
                catchError(this.handleError('queryCardDetail', {errMsg: '#queryCardDetail#获取卡券详情失败'}))
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
            .post<any>(UrlService.AssociateProductCard(session), {
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
     * @param appid
     * @returns {Observable<A>}
     */
    public fetchBusinessList(session: string, appid: string): Observable<any> {
        return this.http
            .get<any>(UrlService.FetchBusinessList(session, appid))
            .pipe(
                catchError(this.handleError('fetchBusinessList', {errMsg: '#fetchBusinessList#获取商户列表失败'}))
            );
    }

    /**
     * 查询商户信息
     * @param session
     * @param bid
     * @returns {Observable<A>}
     */
    public fetchBusinessDetail(session: string, bid: string): Observable<any> {
        return this.http
            .get<any>(UrlService.FetchBusinessDetail(session, bid))
            .pipe(
                catchError(this.handleError('fetchBusinessDetail', {errMsg: '#fetchBusinessDetail#获取商户信息失败'}))
            );
    }

    /**
     * 添加商户
     * @param session
     * @param appid
     * @param business
     * @returns {Observable<A>}
     */
    public addBusiness(session: string, appid: string, business: Business): Observable<any> {
        return this.http
            .post<any>(UrlService.AddBusiness(session), {
                appid: appid,
                business: JSON.stringify(business)
            })
            .pipe(
                catchError(this.handleError('addBusiness', {errMsg: '#addBusiness#添加商户失败'}))
            );
    }

    /**
     * 移除商户
     * @param session
     * @param bid
     * @returns {Observable<A>}
     */
    public removeBusiness(session: string, bid: string): Observable<any> {
        return this.http
            .delete(UrlService.RemoveBusiness(session), {
                params: {
                    bid: bid
                }
            })
            .pipe(
                catchError(this.handleError('removeBusiness', {errMsg: '#removeBusiness#删除商户失败'}))
            );
    }

    /**
     * 调整商户状态 -- 上下架
     * @param session
     * @param status
     * @param bid
     * @returns {Observable<A>}
     */
    public changeBusinessStatus(session: string, status: number, bid: string): Observable<any> {
        return this.http
            .post(UrlService.ChangeBusinessStatus(session), {
                status: status,
                bid: bid
            })
            .pipe(
                catchError(this.handleError('changeBusinessStatus', {errMsg: '#changeBusinessStatus#调整商户状态失败'}))
            );
    }

    /**
     * 获取商户关联软文列表
     * @param offset    --  起始位置
     * @param count     --  数量
     * @returns {Observable<A>}
     */
    public fetchOfficialAccountMaterialList(session: string, offset: number, count: number): Observable<any> {
        return this.http
            .get<any>(UrlService.FetchOfficialAccountMaterialList(session, offset, count))
            .pipe(
                catchError(this.handleError('fetchOfficialAccountMaterialList', {errMsg: '#fetchOfficialAccountMaterialList#获取商户关联软文列表失败'}))
            );
    }

    /**
     * 获取授权方信息
     * @param session
     * @param type
     * @returns {Observable<A>}
     */
    public fetchAuthorizerInfo(session: string, type: string): Observable<any> {
        return this.http
            .get<any>(UrlService.FetchAuthorizerInfo(session, type))
            .pipe(
                catchError(this.handleError('fetchAuthorizerInfo', {errMsg: '#fetchAuthorizerInfo#获取授权方信息失败'}))
            );
    }

    /**
     * 获取复用公众号主体注册的小程序列表
     * @param session
     * @param type
     * @returns {Observable<A>}
     */
    public fetchFastRegisterMiniprogramList(session: string, type: string): Observable<any> {
        return this.http
            .get<any>(UrlService.FetchFastRegisterMiniprogramList(session, type))
            .pipe(
                catchError(this.handleError('fetchFastRegisterMiniprogramList',
                    {errMsg: '#fetchFastRegisterMiniprogramList#获取复用公众号主体注册的小程序列表失败'}))
            );
    }

    /**
     * 获取小程序的基础信息
     * @param session
     * @param appid
     * @returns {Observable<A>}
     */
    public fetchMiniprogramInfo(session: string, appid: string): Observable<any> {
        return this.http
            .get<any>(UrlService.FetchMiniprogramInfo(session, appid))
            .pipe(
                catchError(this.handleError('fetchMiniprogramInfo',
                    {errMsg: '#fetchMiniprogramInfo#获取小程序的基础信息失败'}))
            );
    }

    /**
     * 创建菜单
     * @param session
     * @param appid
     * @param menu
     * @returns {Observable<A>}
     */
    public createMenu(session: string, appid: string, menu: any): Observable<any> {
        return this.http
            .post(UrlService.CreateMenu(session), {
                appid: appid,
                menu: encodeURIComponent(JSON.stringify(menu))
            })
            .pipe(
                catchError(this.handleError('changeBusinessStatus', {errMsg: '#changeBusinessStatus#调整商户状态失败'}))
            );
    }

    /**
     * 获取代码模版库中的所有小程序代码模版
     * @param session
     * @returns {Observable<A>}
     */
    public fetchTemplateList(session: string): Observable<any> {
        return this.http
            .get<any>(UrlService.FetchTemplateList(session))
            .pipe(
                catchError(this.handleError('fetchTemplateList',
                    {errMsg: '#fetchTemplateList#获取小程序模版列表失败'}))
            );
    }

    /**
     * 获取小程序模板库标题列表
     * @param session
     * @param appid
     * @returns {Observable<A>}
     */
    // public fetchAuthorizerTemplateList(session: string, appid: string): Observable<any> {
    //     return this.http
    //         .get<any>(UrlService.FetchAuthorizerTemplateList(session, appid))
    //         .pipe(
    //             catchError(this.handleError('fetchAuthorizerTemplateList',
    //                 {errMsg: '#fetchAuthorizerTemplateList#获取授权方所用的小程序模版列表失败'}))
    //         );
    // }

    /**
     * 为授权的小程序帐号上传小程序代码
     * @param session
     * @param appid
     * @param template
     * @returns {Observable<A>}
     */
    public commitSourceCode(session: string, appid: string, template: Template): Observable<any> {
        return this.http
            .post(UrlService.CommitSourceCode(session, appid), {
                template_id: template.templateId,
                ext_json: template.extJson,
                user_version: template.userVersion,
                user_desc: template.userDescription
            })
            .pipe(
                catchError(this.handleError('commitSourceCode',
                    {errMsg: '#commitSourceCode#为授权的小程序帐号上传小程序代码失败'}))
            );
    }

    /**
     * 获取小程序的体验二维码
     * @param session
     * @param appid
     * @returns {string}
     */
    public fetchTrialQRCode(session: string, appid: string): string {
        return UrlService.FetchTrialQRCode(session, appid);
    }

    /**
     * 设置昵称
     * @param session
     * @param appid
     * @param name
     * @param type
     * @param mediaId
     * @returns {Observable<A>}
     */
    public setNickname(session: string, appid: string, name: string, type: string, mediaId: string): Observable<any> {
        return this.http
            .post(UrlService.SetNickname(session, appid), {
                nick_name: name,
                type: type,
                media_id: mediaId
            })
            .pipe(
                catchError(this.handleError('setNickname', {errMsg: '#setNickname#设置昵称失败'}))
            );
    }

    /**
     * 修改签名
     * @param session
     * @param appid
     * @param signature
     * @returns {Observable<A>}
     */
    public modifySignature(session: string, appid: string, signature: string): Observable<any> {
        return this.http
            .post(UrlService.ModifySignature(session, appid), {
                signature: signature
            })
            .pipe(
                catchError(this.handleError('modifySignature', {errMsg: '#modifySignature#设置签名失败'}))
            );
    }

    /**
     * 修改头像
     * @param session
     * @param appid
     * @param mediaId
     * @returns {Observable<A>}
     */
    public modifyHeadImage(session: string, appid: string, mediaId: string): Observable<any> {
        return this.http
            .post(UrlService.ModifyHeadImage(session, appid), {
                head_img_media_id: mediaId
            })
            .pipe(
                catchError(this.handleError('modifyHeadImage', {errMsg: '#modifyHeadImage#更换头像失败'}))
            );
    }

    /**
     * 账号已经设置的所有类目
     * @param session
     * @param appid
     * @returns {Observable<A>}
     */
    public fetchAuthorizerCategory(session: string, appid: string): Observable<any> {
        return this.http
            .get<any>(UrlService.FetchAuthorizerCategory(session, appid))
            .pipe(
                catchError(this.handleError('fetchAuthorizerCategory',
                    {errMsg: '#fetchAuthorizerCategory#获取账号已经设置的所有类目失败'}))
            );
    }

    /**
     * 获取账号可以设置的所有类目
     * @param session
     * @param appid
     * @returns {Observable<A>}
     */
    public fetchAllCategories(session: string, appid: string): Observable<any> {
        return this.http
            .get<any>(UrlService.FetchAllCategories(session, appid))
            .pipe(
                catchError(this.handleError('fetchAllCategories',
                    {errMsg: '#fetchAllCategories#获取账号可以设置的所有类目失败'}))
            );
    }

    /**
     * 添加类目
     * @param session
     * @param appid
     * @param first
     * @param second
     * @returns {Observable<A>}
     */
    public addCategory(session: string, appid: string, first: number, second: number): Observable<any> {
        return this.http
            .post(UrlService.AddCategory(session, appid), {
                first: first,
                second: second,
                certicates: JSON.stringify([])
            })
            .pipe(
                catchError(this.handleError('AddCategory', {errMsg: '#AddCategory#新增类目失败'}))
            );
    }

    /**
     * 移除类目
     * @param session
     * @param appid
     * @param first
     * @param second
     * @returns {Observable<A>}
     */
    public removeCategory(session: string, appid: string, first: number, second: number): Observable<any> {
        return this.http
            .delete(UrlService.RemoveCategory(), {
                params: {
                    session: session,
                    appid: appid,
                    first: first.toString(),
                    second: second.toString()
                }
            })
            .pipe(
                catchError(this.handleError('RemoveCategory', {errMsg: '#RemoveCategory#移除类目失败'}))
            );
    }

    /**
     * 修改域名
     * @param session
     * @param appid
     * @param config
     * @returns {Observable<A>}
     */
    public modifyDomain(session: string, appid: string, config: any): Observable<any> {
        return this.http
            .post(UrlService.ModifyDomain(session, appid), {
                action: 'set',
                requestdomain: JSON.stringify(config[0]),
                wsrequestdomain: JSON.stringify(config[1]),
                uploaddomain: JSON.stringify(config[2]),
                downloaddomain: JSON.stringify(config[3])
            })
            .pipe(
                catchError(this.handleError('modifyDomain', {errMsg: '#modifyDomain#修改域名失败'}))
            );
    }

    /**
     * 设置业务域名
     * @param session
     * @param appid
     * @param config
     * @returns {Observable<A>}
     */
    public setWebViewDomain(session: string, appid: string, config: any): Observable<any> {
        return this.http
            .post(UrlService.setWebViewDomain(session, appid), {
                action: 'set',
                webviewdomain: JSON.stringify(config[0])
            })
            .pipe(
                catchError(this.handleError('setWebViewDomain', {errMsg: '#setWebViewDomain#修改域名失败'}))
            );
    }

    /**
     * 获取授权方所有版本
     * @param session
     * @param appid
     * @returns {Observable<A>}
     */
    public fetchAuthorizerAllVersions(session: string, appid: string): Observable<any> {
        return this.http
            .get(UrlService.FetchAuthorizerAllVersions(session, appid))
            .pipe(
                catchError(this.handleError('fetchAuthorizerAllVersions', {errMsg: '#fetchAuthorizerAllVersions#获取授权方所有版本失败'}))
            );
    }

    /**
     * 获取授权方所有类目
     * @param session
     * @param appid
     * @returns {Observable<A>}
     */
    public fetchAuthorizerCategories(session: string, appid: string): Observable<any> {
        return this.http
            .get(UrlService.FetchAuthorizerCategories(session, appid))
            .pipe(
                catchError(this.handleError('fetchAuthorizerCategories', {errMsg: '#fetchAuthorizerCategories#获取授权方所有类目失败'}))
            );
    }

    /**
     * 获取授权方所有页面配置
     * @param session
     * @param appid
     * @returns {Observable<A>}
     */
    public fetchAuthorizerPages(session: string, appid: string): Observable<any> {
        return this.http
            .get(UrlService.FetchAuthorizerPages(session, appid))
            .pipe(
                catchError(this.handleError('fetchAuthorizerPages', {errMsg: '#fetchAuthorizerPages#获取授权方所有页面配置失败'}))
            );
    }

    /**
     * 提交审核
     * @param session
     * @param appid
     * @param itemList
     * @param templateId
     * @returns {Observable<A>}
     */
    public submitAudit(session: string, appid: string, itemList: any, templateId: number): Observable<any> {
        return this.http
            .post(UrlService.SubmitAudit(session, appid), {
                item_list: JSON.stringify(itemList),
                template_id: templateId
            })
            .pipe(
                catchError(this.handleError('submitAudit', {errMsg: '#submitAudit#提交审核失败'}))
            );
    }

    /**
     * 撤消审核
     * @param session
     * @param appid
     * @param templateId
     * @returns {Observable<A>}
     */
    public undoCodeAudit(session: string, appid: string, templateId: number): Observable<any> {
        return this.http
            .delete(UrlService.UndoCodeAudit(), {
                params: {
                    session: session,
                    appid: appid,
                    template_id: templateId.toString()
                }
            })
            .pipe(
                catchError(this.handleError('undoCodeAudit', {errMsg: '#undoCodeAudit#撤消审核失败'}))
            );
    }

    /**
     * 查询审核状态
     * @param session
     * @param appid
     * @param auditid
     * @returns {Observable<A>}
     */
    public queryAudit(session: string, appid: string, auditid: number): Observable<any> {
        return this.http
            .get(UrlService.QueryAudit(session, appid, auditid))
            .pipe(
                catchError(this.handleError('queryAudit', {errMsg: '#queryAudit#查询审核状态失败'}))
            );
    }

    /**
     * 发布版本
     * @param session
     * @param appid
     * @param templateId
     * @returns {Observable<A>}
     */
    public releaseVersion(session: string, appid: string, templateId: number): Observable<any> {
        return this.http
            .post(UrlService.ReleaseVersion(session, appid), {
                template_id: templateId
            })
            .pipe(
                catchError(this.handleError('releaseVersion', {errMsg: '#releaseVersion#发布版本失败'}))
            );
    }

    /**
     * 获取授权方名下的银行卡
     * @param session
     * @returns {Observable<A>}
     */
    public fetchBankCards(session: string): Observable<any> {
        return this.http
            .get(UrlService.FetchBankCards(session))
            .pipe(
                catchError(this.handleError('fetchBankCards', {errMsg: '#fetchBankCards#获取授权方名下的银行卡出错'}))
            );
    }

    /**
     * 设置为默认卡
     * @param session
     * @param bank_id
     * @returns {Observable<A>}
     */
    public setAsDefaultBankCard(session: string, bank_id: string): Observable<any> {
        return this.http
            .post(UrlService.SetAsDefaultBankCard(session), {
                bank_id: bank_id
            })
            .pipe(
                catchError(this.handleError('setAsDefaultBankCard', {errMsg: '#setAsDefaultBankCard#设置为默认卡失败'}))
            );
    }

    /**
     * 绑定银行卡
     * @param session
     * @param appid
     * @param requestId
     * @param bizId
     * @param phone
     * @param verificationCode
     * @param bank_no
     * @param bank_code
     * @param name
     * @returns {Observable<A>}
     */
    public bindBankCard(session: string, appid: string, requestId: string, bizId: string, phone: string, verificationCode: string, bank_no: string, bank_code: string, name: string): Observable<any> {
        return this.http
            .post(UrlService.BindBankCard(session), {
                appid: appid,
                requestId: requestId,
                bizId: bizId,
                phone: phone,
                verificationCode: verificationCode,
                bank_no: bank_no,
                bank_code: bank_code,
                name: name
            })
            .pipe(
                catchError(this.handleError('bindBankCard', {errMsg: '#bindBankCard#绑定银行卡失败'}))
            );
    }

    /**
     * 解绑银行卡
     * @param session
     * @param requestId
     * @param bizId
     * @param phone
     * @param verificationCode
     * @param bank_id
     * @returns {Observable<A>}
     */
    public unbindBankCard(session: string, requestId: string, bizId: string, phone: string, verificationCode: string, bank_id: string): Observable<any> {
        return this.http
            .delete(UrlService.UnbindBankCard(), {
                params: {
                    session: session,
                    requestId: requestId,
                    bizId: bizId,
                    phone: phone,
                    verificationCode: verificationCode,
                    bank_id: bank_id
                }
            })
            .pipe(
                catchError(this.handleError('unbindBankCard', {errMsg: '#unbindBankCard#解绑银行卡失败'}))
            );
    }

    /**
     * 获取授权方名下的资产
     * @param session
     * @returns {Observable<A>}
     */
    public fetchCapitalInfo(session: string): Observable<any> {
        return this.http
            .get(UrlService.FetchCapitalInfo(session))
            .pipe(
                catchError(this.handleError('fetchCapitalInfo', {errMsg: '#fetchCapitalInfo#获取授权方名下的资产出错'}))
            );
    }

    /**
     * 申请提现
     * @param session
     * @param appid
     * @param requestId
     * @param bizId
     * @param phone
     * @param verificationCode
     * @param withdraw
     * @returns {Observable<A>}
     */
    public withdrawCash(session: string, appid: string, requestId: string, bizId: string, phone: string, verificationCode: string, withdraw: number): Observable<any> {
        return this.http
            .post(UrlService.WithdrawCash(session), {
                appid: appid,
                requestId: requestId,
                bizId: bizId,
                phone: phone,
                verificationCode: verificationCode,
                withdraw: withdraw,
            })
            .pipe(
                catchError(this.handleError('withdrawCash', {errMsg: '#withdrawCash#申请提现失败'}))
            );
    }

    /**
     * 获取授权方关联的支付账号
     * @param session
     * @param appid
     * @returns {Observable<A>}
     */
    public fetchAuthorizerPay(session: string, appid: string): Observable<any> {
        return this.http
            .get(UrlService.FetchAuthorizerPay(session, appid))
            .pipe(
                catchError(this.handleError('fetchAuthorizerPay', {errMsg: '#fetchAuthorizerPay#获取授权方关联的支付账号出错'}))
            );
    }

    /**
     * 绑定支付
     * @param session
     * @param appid
     * @param mchid
     * @param apiKey
     * @returns {Observable<A>}
     */
    public bindAuthorizerPay(session: string, appid: string, mchid: string, apiKey: string): Observable<any> {
        return this.http
            .post(UrlService.BindAuthorizerPay(session), {
                appid: appid,
                mchid: mchid,
                apiKey: apiKey
            })
            .pipe(
                catchError(this.handleError('bindAuthorizerPay', {errMsg: '#bindAuthorizerPay#绑定支付失败'}))
            );
    }

    public publicEncrypt(data) {
        return encodeURIComponent(Utils.PublicEncrypt(this.publicKey,
            JSON.stringify({
                appid: this.diandiWebsiteAppId,           //	当前网站appid
                session: this.session,                    //	 token
                timestamp: Date.now(),                              //	 时间戳
                data: data                                          //	 数据
            })));
    }

    // public UploadWxPayAPIClientCert(session: string, appid: string): Observable<any> {
    //     return this.http
    //         .post(UrlService.UploadWxPayAPIClientCert(), {
    //             session: session,
    //             appid: appid,
    //             mchid: mchid,
    //             apiKey: apiKey
    //         })
    //         .pipe(
    //             catchError(this.handleError('bindAuthorizerPay', {errMsg: '#bindAuthorizerPay#绑定支付失败'}))
    //         );
    // }

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
