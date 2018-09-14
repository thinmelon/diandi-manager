import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BackboneService} from '../../services/diandi.backbone';
import {FormModalComponent} from '../../modal/form-modal/form-modal.component';

const __SCOPE__ = 'snsapi_login';
const __STATE__ = 'WECHAT';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.less']
})
export class UserInfoComponent implements OnInit {
    public phone = '';
    public nickname = '';
    public bindWechat = '';
    public cards = [];

    constructor(private route: ActivatedRoute,
                private modalService: NgbModal,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { wechatUserInfoResolver: any }) => {
                if (data.wechatUserInfoResolver.code === 0 && data.wechatUserInfoResolver.msg.length > 0) {
                    if (data.wechatUserInfoResolver.msg[0].phone
                        && data.wechatUserInfoResolver.msg[0].phone !== '') {
                        this.phone = data.wechatUserInfoResolver.msg[0].phone;
                        const __REDIRECT_URI__ = encodeURIComponent(
                            `https://www.pusudo.cn/platform/new/wechat?phone=${ this.phone }&appid=${ this.backbone.diandiWebsiteAppId }`);
                        this.bindWechat = `https://open.weixin.qq.com/connect/qrconnect?appid=${ this.backbone.diandiWebsiteAppId }&redirect_uri=${ __REDIRECT_URI__ }&response_type=code&scope=${ __SCOPE__ }&state=${ __STATE__ }#wechat_redirect`;
                    }
                    if (data.wechatUserInfoResolver.msg[0].nickname
                        && data.wechatUserInfoResolver.msg[0].nickname !== '') {
                        this.nickname = data.wechatUserInfoResolver.msg[0].nickname;
                    }
                }
            });
        //  关联的银行卡
        this.backbone
            .fetchBankCards(this.backbone.session)
            .subscribe(cards => {
                console.log(cards);
                if (cards.code === 0 && cards.msg.length > 0) {
                    this.cards = cards.msg;
                }
            });
    }

    bindBankCard() {
        if (this.phone === '') {
            return;
        }

        const modalRef = this.modalService.open(FormModalComponent);

        modalRef.componentInstance.title = '安全验证';
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
        modalRef.componentInstance.phone = this.phone;
        modalRef.componentInstance.disablePhone = true;
        modalRef.componentInstance.verificationBtnText = '绑定银行卡';
        modalRef.componentInstance.verificationCodeEvt.subscribe(evt => {
            // TODO: 完成绑定银行的流程
            console.log(evt);
            that.backbone.bindBankCard(
                session,
                this.backbone.diandiWebsiteAppId,
                evt.requestId,
                evt.bizId,
                evt.phone,
                evt.verificationCode
            )
                .subscribe(res => {
                    if (res.code === 0) {
                        // that.loginSuccess(session);
                        // modalRef.componentInstance.activeModal.close();
                    } else if (res.code === -100) {
                        // modalRef.componentInstance.hint = '该账号已绑定公众号，请使用手机验证码方式快捷登录';
                    } else {
                        // modalRef.componentInstance.hint = res.msg;
                    }
                });
        });
    }

}
