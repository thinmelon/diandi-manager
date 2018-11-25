const PROTOCOL = 'https://';
// const PROTOCOL = 'http://';
const HOST = 'www.pusudo.cn';
// const HOST = 'localhost:4200';
const PREFIX = PROTOCOL + HOST + '/backbone';
const LOGIN = PROTOCOL + HOST + '/platform';
const STORAGE = PROTOCOL + HOST + '/oss';

export class UrlService {

    static MobileLogin(): string {
        return `${ LOGIN }/mobile/login`;
    }

    static TestLogin(): string {
        return `${ LOGIN }/dev/login`;
    }

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

    static FetchOrderList(session: string, businessId: string, offset: number, amount: number): string {
        return `${ PREFIX }/order/list?session=${ session }&businessId=${ businessId }&offset=${ offset }&amount=${ amount }`;
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

    static FetchWechatUserInfo(session: string, appid: string): string {
        return `${ PREFIX }/user/wechat?session=${ session }&appid=${ appid }`;
    }

    static FetchUserList(session: string, appid: string): string {
        return `${ PREFIX }/user/list?session=${ session }&appid=${ appid }`;
    }

    static FetchRefundInfo(): string {
        return `${ PREFIX }/refund/progress`;
    }

    static Refund(): string {
        return `${ PREFIX }/refund`;
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

    static SendVerificationCode(): string {
        return `${ PREFIX }/sms`;
    }

    static AssociateProductCard(session: string): string {
        return `${ PREFIX }/card/product?session=${ session }`;
    }

    static FetchOfficialAccountMaterialList(session: string, offset: number, count: number): string {
        return `${ PREFIX }/official/list/material?session=${ session }&offset=${offset}&count=${count}`;
    }

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

    static FetchAuthorizerInfo(session: string, type: string): string {
        return `${ PREFIX }/wechat/official?session=${ session }&type=${ type }`;
    }

    static CreateMenu(session: string): string {
        return `${ PREFIX }/wechat/official/menu?session=${ session }`;
    }

    static FetchFastRegisterMiniprogramList(session: string, type: string): string {
        return `${ PREFIX }/wechat/miniprogram/list?session=${ session }&type=${ type }`;
    }

    static FetchMiniprogramInfo(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/info?session=${ session }&appid=${ appid }`;
    }

    static FetchTemplateList(): string {
        return `${ PREFIX }/wechat/miniprogram/template/list`;
    }

    // static FetchAuthorizerTemplateList(session: string, appid: string): string {
    //     return `${ PREFIX }/wechat/miniprogram/template/authorizer?session=${ session }&appid=${ appid }`;
    // }

    static CommitSourceCode(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/template/authorizer?session=${ session }&appid=${ appid }`;
    }

    static FetchTrialQRCode(session: string, appid: string): string {
        return `${ PREFIX }/wechat/miniprogram/grcode?session=${ session }&appid=${ appid }`;
    }

    static AddMaterial(session: string, appid: string, media_type: string): string {
        return `${ PREFIX }/wechat/official/material?session=${ session }&appid=${ appid }&media_type=${ media_type }`;
    }

    static UploadTempMaterial(session: string, appid: string, media_type: string): string {
        return `${ PREFIX }/wechat/official/tmp/material?session=${ session }&appid=${ appid }&media_type=${ media_type }`;
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

    static setWebViewDomain(session: string, appid: string): string {
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

    static BindMobile(session: string): string {
        return `${ PREFIX }/new/mobile?session=${ session }`;
    }

    static CheckPhone(phone: string, appid: string): string {
        return `${ PREFIX }/phone/uniqueness?phone=${ phone }&appid=${ appid }`;
    }

    static FetchBankCards(session: string): string {
        return `${ PREFIX }/authorizer/bank?session=${ session }`;
    }

    static SetAsDefaultBankCard(): string {
        return `${ PREFIX }/authorizer/default/bank`;
    }

    static BindBankCard(): string {
        return `${ PREFIX }/authorizer/bank`;
    }

    static UnbindBankCard(): string {
        return `${ PREFIX }/authorizer/bank`;
    }

    static FetchCapitalInfo(session: string): string {
        return `${ PREFIX }/authorizer/capital?session=${ session }`;
    }

    static WithdrawCash(): string {
        return `${ PREFIX }/authorizer/capital/available`;
    }

    static FetchAuthorizerPay(session: string, appid: string): string {
        return `${ PREFIX }/authorizer/pay?session=${ session }&appid=${ appid }`;
    }

    static BindAuthorizerPay(): string {
        return `${ PREFIX }/authorizer/pay`;
    }

    static UploadWxPayAPIClientCert(session: string, appid: string): string {
        return `${ PREFIX }/authorizer/pay/wxchat/api_client_cert?session=${ session }&appid=${ appid }`;
    }
}

