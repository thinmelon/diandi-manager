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

    static FetchPartialProductList(session: string, businessId: string, offset: number, amount: number): string {
        return `${ PREFIX }/product/partial?session=${ session }&businessId=${ businessId }&offset=${ offset }&amount=${ amount }`;
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

    static FetchBusinessList(session: string, appid: string): string {
        return `${ PREFIX }/business/list?session=${ session }&appid=${ appid }`;
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

    static BindNewPhone(): string {
        return `${ PREFIX }/new/phone`;
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

    static Login(): string {
        return `${ PREFIX }/login`;
    }
}

