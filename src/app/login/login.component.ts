import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {BackboneService} from '../services/diandi.backbone';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormModalComponent} from '../modal/form-modal/form-modal.component';

const __REDIRECT_URI__ = encodeURIComponent('https://www.pusudo.cn/platform/website');
const __SCOPE__ = 'snsapi_login';
const __STATE__ = 'WECHAT';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    wxLogin = '';
    message = '';
    btnText = '登录';
    // notExist = false;       //  微信账号首次登录，检查手机号码是否已绑定过

    constructor(private route: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private backbone: BackboneService) {
        this.wxLogin = `https://open.weixin.qq.com/connect/qrconnect?appid=${ this.backbone.diandiWebsiteAppId }&redirect_uri=${ __REDIRECT_URI__ }&response_type=code&scope=${ __SCOPE__ }&state=${ __STATE__ }#wechat_redirect`;
    }

    ngOnInit() {
        const session = this.route.snapshot.queryParamMap.get('s');
        const phone = this.route.snapshot.queryParamMap.get('p');

        if (session && session !== '') {   //  通过微信扫码登录
            if (phone && phone !== '') {
                //  已关联手机号码，与后端再次握手确认
                console.log('已关联手机号码，与后端再次握手确认');
                this.loginSuccess(session);
            } else {
                //  电话号码为空，代表首次登录，弹出关联手机号码对话框
                console.log('电话号码为空，代表首次登录，弹出关联手机号码对话框');
                //  弹出关联手机号码对话框
                setTimeout(() => {
                    this.bindPhone(session);
                }, 100);
            }
        }
    }

    /**
     * 绑定手机号码
     *  -   与微信账号相关联
     */
    bindPhone(session) {
        const that = this;
        const modalRef = this.modalService.open(FormModalComponent);

        modalRef.componentInstance.title = '首次登录需要绑定您的手机号码';
        modalRef.componentInstance.hint = '';
        modalRef.componentInstance.keyValues = [
            {
                index: 0,
                key: '',
                type: 'verification',
                src: ''
            }
        ];
        modalRef.componentInstance.submitBtnText = '';
        // modalRef.componentInstance.phoneInputBlurEvt.subscribe(phone => {
        //     that.backbone.checkPhone(
        //         phone,
        //         this.backbone.diandiWebsiteAppId
        //     )
        //         .subscribe(res => {
        //             console.log(res);
        //             if (res.code !== 0) {
        //                 modalRef.componentInstance.hint = res.msg;
        //             }
        //         });
        // });
        modalRef.componentInstance.verificationCodeEvt.subscribe(evt => {
            console.log(evt);
            that.backbone.bindNewPhone(
                session,
                this.backbone.diandiWebsiteAppId,
                evt.requestId,
                evt.bizId,
                evt.phone,
                evt.verificationCode
            )
                .subscribe(res => {
                    if (res.code === 0) {
                        that.loginSuccess(session);
                        modalRef.componentInstance.activeModal.close();
                    } else if (res.code === -100) {
                        modalRef.componentInstance.hint = '该账号已绑定公众号，请使用手机验证码方式快捷登录';
                    }
                    else {
                        modalRef.componentInstance.hint = res.msg;
                    }
                });
        });
    }

    /**
     * 使用短信方式进行快捷登录
     */
    login() {
        const that = this;
        const modalRef = this.modalService.open(FormModalComponent);

        modalRef.componentInstance.title = '通过验证码快捷登录';
        modalRef.componentInstance.hint = '';
        modalRef.componentInstance.keyValues = [
            {
                index: 0,
                key: '',
                type: 'verification',
                src: ''
            }
        ];
        modalRef.componentInstance.submitBtnText = '';
        modalRef.componentInstance.verificationBtnText = '登录';
        modalRef.componentInstance.verificationCodeEvt.subscribe(evt => {
            if (this.backbone.diandiWebsiteAppId && this.backbone.diandiWebsiteAppId !== '') {
                that.backbone.login(
                    this.backbone.diandiWebsiteAppId,
                    evt.requestId,
                    evt.bizId,
                    evt.phone,
                    evt.verificationCode
                )
                    .subscribe(res => {
                        console.log(res);
                        if (res.hasOwnProperty('s') && res.s !== '') {
                            that.loginSuccess(res.s);
                            modalRef.componentInstance.activeModal.close();
                        } else {
                            modalRef.componentInstance.hint = res.msg;
                        }
                    });
            }
        });
    }

    /**
     * 登录成功
     * @param session
     */
    loginSuccess(session) {
        /**
         *  保存session
         */
        this.backbone.session = session;
        /**
         *  设置状态为已登录
         */
        this.backbone.isLoggedIn = 'YES';
        /**
         *  跳转至回调地址
         */
        console.log('REDIRECT URL ===> ' + this.backbone.redirectUrl);
        typeof(this.backbone.redirectUrl) !== 'undefined' && this.backbone.redirectUrl ?
            this.router.navigate([this.backbone.redirectUrl]) :
            this.router.navigate(['/list/entry']);                      //  默认： 订单页
    }
}
