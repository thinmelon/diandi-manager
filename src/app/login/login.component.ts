import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {BackboneService} from '../services/diandi.backbone';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormModalComponent} from '../modal/form-modal/form-modal.component';

const __APP_ID_WEBSITE__ = 'wxbee73e9bdc02bfdc';
const __REDIRECT_URI__ = encodeURIComponent('https://www.pusudo.cn/platform/website');
const __SCOPE__ = 'snsapi_login';
const __STATE__ = 'WECHAT';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    wxLogin = `https://open.weixin.qq.com/connect/qrconnect?appid=${ __APP_ID_WEBSITE__ }&redirect_uri=${ __REDIRECT_URI__ }&response_type=code&scope=${ __SCOPE__ }&state=${ __STATE__ }#wechat_redirect`;
    message = '';
    btnText = '登录';

    constructor(private route: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private backbone: BackboneService) {
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
        const modalRef = this.modalService.open(FormModalComponent);
        const that = this;
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
        modalRef.componentInstance.verificationCodeEvt.subscribe(evt => {
            console.log(evt);
            that.backbone.bindNewPhone(
                session,
                evt.requestId,
                evt.bizId,
                evt.phone,
                evt.verificationCode
            )
                .subscribe(res => {
                    console.log(res);
                    if (res.code === 0) {
                        that.loginSuccess(session);
                    } else {
                        that.message = res.msg;
                    }
                });
        });
    }

    /**
     * 使用短信方式进行快捷登录
     * @param evt
     */
    login(evt) {
        const that = this;

        this.backbone.login(
            evt.requestId,
            evt.bizId,
            evt.phone,
            evt.verificationCode
        )
            .subscribe(res => {
                console.log(res);
                if (res.code === 0 && res.msg.length > 0) {
                    that.loginSuccess(res.msg[0]['3rd_session']);
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
