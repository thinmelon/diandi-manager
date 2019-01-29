const PROTOCOL = 'https://';
// const PROTOCOL = 'http://';
const HOST = 'www.pusudo.cn';
// const HOST = 'localhost:4200';
const PREFIX = PROTOCOL + HOST + '/backbone';
const LOGIN = PROTOCOL + HOST + '/platform';
const STORAGE = PROTOCOL + HOST + '/oss';

export class UrlService {

    /**
     * =====================      登录        ===================== *
     */

    static MobileLogin(): string {
        return `${ LOGIN }/mobile/login`;
    }

    static TestLogin(): string {
        return `${ LOGIN }/dev/login`;
    }

    static SendVerificationCode(session: string): string {
        return `${ LOGIN }/sms?session=${ session }`;
    }

    /**
     * =====================      商户        ===================== *
     */

    static FetchBusinessList(session: string, appid: string): string {
        return `${ PREFIX }/business/list?session=${ session }&appid=${ appid }`;
    }

    static FetchBusinessDetail(session: string, bid: string): string {
        return `${ PREFIX }/business/detail?session=${ session }&bid=${ bid }`;
    }

    static AddBusiness(session: string): string {
        return `${ PREFIX }/business?session=${ session }`;
    }

    static RemoveBusiness(session: string): string {
        return `${ PREFIX }/business?session=${ session }`;
    }

    static ChangeBusinessStatus(session: string): string {
        return `${ PREFIX }/business/status?session=${ session }`;
    }

    /**
     * =====================      商品        ===================== *
     */

    static UploadProductThumbnails(): string {
        return `${ STORAGE }/image`;
    }

    static UploadProductVideo(): string {
        return `${ STORAGE }/video`;
    }

    static FetchPartialProductList(session: string, businessId: string, offset: number, amount: number): string {
        return `${ PREFIX }/product/partial?session=${ session }&bid=${ businessId }&skip=${ offset }&limit=${ amount }`;
    }

    static FetchProductDetails(session: string, productId: string): string {
        return `${ PREFIX }/product/detail/${ productId }?session=${ session }`;
    }

    static SaveProductInfo(session: string, bid: string): string {
        return `${ PREFIX }/product?session=${ session }&bid=${ bid }`;
    }

    static RemoveProduct(): string {
        return `${ PREFIX }/product`;
    }

    static ChangeProductStatus(session: string): string {
        return `${ PREFIX }/product/status?session=${ session }`;
    }

    /**
     * =====================      卡券        ===================== *
     */

    static FetchCardList(session: string): string {
        return `${ PREFIX }/card/list?session=${ session }`;
    }

    static QueryCardDetail(session: string, card_id: string): string {
        return `${ PREFIX }/card/${ card_id }?session=${ session }`;
    }

    static QueryProductCard(session: string, product_id: string): string {
        return `${ PREFIX }/card/product/${ product_id }?session=${ session }`;
    }

    static AssociateProductCard(session: string): string {
        return `${ PREFIX }/card/product?session=${ session }`;
    }

    /**
     * =====================      订单        ===================== *
     */

    static FetchOrderList(session: string, businessId: string, offset: number, amount: number): string {
        return `${ PREFIX }/order/list?session=${ session }&businessId=${ businessId }&offset=${ offset }&amount=${ amount }`;
    }

    static FetchAOrder(session: string, out_trade_no: string): string {
        return `${ PREFIX }/order/${ out_trade_no }?session=${ session }`;
    }

    static SubmitSelfOrder(session: string): string {
        return `${ PREFIX }/order/self?session=${ session }`;
    }

    static FetchRefundInfo(session: string): string {
        return `${ PREFIX }/refund/progress?session=${ session }`;
    }

    static Refund(session: string): string {
        return `${ PREFIX }/refund?session=${ session }`;
    }

    /**
     * =====================      用户        ===================== *
     */

    static FetchUserList(session: string, appid: string): string {
        return `${ PREFIX }/user/list?session=${ session }&appid=${ appid }`;
    }

    static FetchUserInfo(): string {
        return `${ PREFIX }/user`;
    }

    static FetchWechatUserInfo(session: string, appid: string): string {
        return `${ PREFIX }/user/wechat?session=${ session }&appid=${ appid }`;
    }

    static BindMobile(session: string): string {
        return `${ PREFIX }/new/mobile?session=${ session }`;
    }

    /**
     * =====================      授权方之微信公众号        ===================== *
     */

    static FetchAuthorizerInfo(session: string, type: string): string {
        return `${ PREFIX }/wechat/official?session=${ session }&type=${ type }`;
    }

    static FetchOfficialAccountMaterialList(session: string, offset: number, count: number): string {
        return `${ PREFIX }/official/list/material?session=${ session }&offset=${offset}&count=${count}`;
    }

    static CreateMenu(session: string): string {
        return `${ PREFIX }/wechat/official/menu?session=${ session }`;
    }

    static FetchFastRegisterMiniprogramList(session: string, type: string): string {
        return `${ PREFIX }/wechat/miniprogram/list?session=${ session }&type=${ type }`;
    }

    static AddMaterial(session: string, appid: string, media_type: string): string {
        return `${ PREFIX }/wechat/official/material?session=${ session }&appid=${ appid }&media_type=${ media_type }`;
    }

    static UploadTempMaterial(session: string, appid: string, media_type: string): string {
        return `${ PREFIX }/wechat/official/tmp/material?session=${ session }&appid=${ appid }&media_type=${ media_type }`;
    }

    /**
     * =====================      授权方之微信小程序        ===================== *
     */

    static FetchMiniprogramInfo(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/info?session=${ session }&appid=${ appid }`;
    }

    // static FetchTemplateList(session: string): string {
    //     return `${ PREFIX }/wechat/miniprogram/template/list?session=${ session }`;
    // }

    static CommitSourceCode(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/template/authorizer?session=${ session }&appid=${ appid }`;
    }

    static FetchTrialQRCode(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/grcode?session=${ session }&appid=${ appid }`;
    }

    static SetNickname(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/name?session=${ session }&appid=${ appid }`;
    }

    static ModifySignature(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/signature?session=${ session }&appid=${ appid }`;
    }

    static ModifyHeadImage(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/headimage?session=${ session }&appid=${ appid }`;
    }

    static FetchAuthorizerCategory(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/categories?session=${ session }&appid=${ appid }`;
    }

    static FetchAllCategories(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/categories/all?session=${ session }&appid=${ appid }`;
    }

    static AddCategory(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/category?session=${ session }&appid=${ appid }`;
    }

    static RemoveCategory(): string {
        return `${ PREFIX }/wechat/miniprogram/category`;
    }

    static ModifyDomain(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/domain?session=${ session }&appid=${ appid }`;
    }

    static SetWebViewDomain(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/webview?session=${ session }&appid=${ appid }`;
    }

    static FetchAuthorizerAllVersions(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/version/all?session=${ session }&appid=${ appid }`;
    }

    static FetchAuthorizerCategories(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/categories/available?session=${ session }&appid=${ appid }`;
    }

    static FetchAuthorizerPages(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/page?session=${ session }&appid=${ appid }`;
    }

    static SubmitAudit(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/audit?session=${ session }&appid=${ appid }`;
    }

    static UndoCodeAudit(): string {
        return `${ PREFIX }/wechat/miniprogram/audit`;
    }

    static QueryAudit(session: string, appid: string, auditid: number): string {
        return `${ PREFIX }/wechat/miniprogram/audit?session=${ session }&appid=${ appid }&auditid=${ auditid }`;
    }

    static ReleaseVersion(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/release?session=${ session }&appid=${ appid }`;
    }

    static FetchTemplateList(session: string): string {
        return `${ PREFIX }/template/list?session=${ session }`;
    }

    static CheckEverBoughtTemplate(session: string): string {
        return `${ PREFIX }/template/ever/bought?session=${ session }`;
    }

    /**
     * =====================      银行        ===================== *
     */

    static FetchBankCards(session: string): string {
        return `${ PREFIX }/authorizer/bank?session=${ session }`;
    }

    static SetAsDefaultBankCard(session: string): string {
        return `${ PREFIX }/authorizer/default/bank?session=${ session }`;
    }

    static BindBankCard(session: string): string {
        return `${ PREFIX }/authorizer/bank?session=${ session }`;
    }

    static UnbindBankCard(): string {
        return `${ PREFIX }/authorizer/bank`;
    }

    /**
     * =====================      个人资产        ===================== *
     */

    static FetchCapitalInfo(session: string): string {
        return `${ PREFIX }/authorizer/capital?session=${ session }`;
    }

    static WithdrawCash(session: string): string {
        return `${ PREFIX }/authorizer/capital/available?session=${ session }`;
    }

    static FetchBills(session: string, offset: number, amount: number): string {
        return `${ PREFIX }/authorizer/bills?session=${ session }&offset=${ offset }&amount=${ amount }`;
    }

    /**
     * =====================      授权方支付配置        ===================== *
     */

    static FetchAuthorizerPay(session: string, appid: string): string {
        return `${ PREFIX }/authorizer/pay?session=${ session }&appid=${ appid }`;
    }

    static BindAuthorizerPay(session: string): string {
        return `${ PREFIX }/authorizer/pay?session=${ session }`;
    }

    static UploadWxPayAPIClientCert(session: string, appid: string): string {
        return `${ PREFIX }/authorizer/pay/wxchat/api_client_cert?session=${ session }&appid=${ appid }`;
    }
}

