import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BankID} from '../../services/diandi.structure';
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
    public boardWidth = '';            //  内容区域宽度
    public message = '';                //  提示
    public phone = '';                  //  关联的电话号码
    public nickname = '';               //  关联的微信号昵称
    public bindWechat = '';             //  申请关联微信号的链接地址
    public cards = [];                  //  关联的银行卡
    public amount = '';                  //  总金额
    public available = '';               //  可提取金额
    public defaultBank = '';             //  默认银行卡

    constructor(private route: ActivatedRoute,
                private modalService: NgbModal,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.boardWidth = (window.innerWidth * 0.8).toString() + 'px';
        this.route.data
            .subscribe((data: { wechatUserInfoResolver: any }) => {
                if (data.wechatUserInfoResolver.code === 0) {
                    if (data.wechatUserInfoResolver.phone && data.wechatUserInfoResolver.phone !== '') {
                        this.phone = data.wechatUserInfoResolver.phone;
                        const __REDIRECT_URI__ = encodeURIComponent(
                            `https://www.pusudo.cn/platform/new/wechat?phone=${ this.phone }&session=${ this.backbone.session }`);
                        this.bindWechat = `https://open.weixin.qq.com/connect/qrconnect?appid=${ this.backbone.diandiWebsiteAppId }&redirect_uri=${ __REDIRECT_URI__ }&response_type=code&scope=${ __SCOPE__ }&state=${ __STATE__ }#wechat_redirect`;
                    }
                    if (data.wechatUserInfoResolver.nickname && data.wechatUserInfoResolver.nickname !== '') {
                        this.nickname = data.wechatUserInfoResolver.nickname;
                    }
                }
            });
        //  关联的银行卡
        this.fetchBankCards();
        //  名下的资产
        this.fetchCapitalInfo();
    }

    /**
     *  获取用户的所有银行卡
     */
    fetchBankCards() {
        this.backbone
            .fetchBankCards(this.backbone.publicEncrypt(''))
            .subscribe(cards => {
                console.log(cards);
                if (cards.code === 0) {
                    this.cards = cards.data.map(card => {
                        if (card.default === 1) {
                            this.defaultBank = card.originalBankNo;
                        }
                        return card;
                    });
                } else {
                    this.cards = [];
                }
            });
    }

    /**
     *  获取名下资产
     */
    fetchCapitalInfo() {
        this.backbone
            .fetchCapitalInfo(this.backbone.publicEncrypt(''))
            .subscribe(capital => {
                console.log(capital);
                if (capital.code === 0) {
                    this.amount = capital.data.capital.amount ? (capital.data.capital.amount / 100).toFixed(2) : '0';
                    this.available = capital.data.capital.available ? (capital.data.capital.available / 100).toFixed(2) : '0';
                }
            });
    }

    /**
     * 设置为默认银行卡
     * @param bank_id
     */
    setAsDefaultBankCard(bank_id) {
        this.backbone
            .setAsDefaultBankCard(this.backbone.publicEncrypt(''), bank_id)
            .subscribe(result => {
                if (result.code === 0) {
                    this.fetchBankCards();
                }
            });
    }

    /**
     *      绑定银行卡
     */
    bindBankCard() {
        if (this.phone === '') {
            this.message = '为安全起见，请先验证手机号';
            return;
        }

        const modalRef = this.modalService.open(FormModalComponent);

        modalRef.componentInstance.title = '绑定银行卡';
        modalRef.componentInstance.hint = '';
        modalRef.componentInstance.keyValues = [
            {
                index: 0,
                key: '',
                type: 'dropdown',
                value: '请选择银行',
                src: BankID,
                categoryId: 0
            },
            {
                index: 1,
                key: '银行卡号',
                type: 'text',
                src: ''
            },
            {
                index: 2,
                key: '持卡人姓名',
                type: 'text',
                src: ''
            },
            {
                index: 3,
                key: '',
                type: 'verification',
                src: ''
            }
        ];
        modalRef.componentInstance.submitBtnText = '';
        modalRef.componentInstance.phone = this.phone;
        modalRef.componentInstance.disablePhone = true;
        modalRef.componentInstance.verificationBtnText = '绑定';
        modalRef.componentInstance.verificationCodeEvt.subscribe(evt => {
            console.log(evt);
            this.backbone.bindBankCard(
                this.backbone.publicEncrypt(''),
                this.backbone.authorizerMiniProgramAppId,
                evt.requestId,
                evt.bizId,
                evt.phone,
                evt.verificationCode,
                evt.keyValues[1].src,
                evt.keyValues[0].categoryId,
                evt.keyValues[2].src
            )
                .subscribe(res => {
                    if (res.code === 0) {
                        this.message = '成功绑定银行卡！';
                        modalRef.componentInstance.activeModal.close();
                        this.fetchBankCards();
                    } else {
                        modalRef.componentInstance.hint = res.msg || res;
                    }
                });
        });
    }

    /**
     *      解绑
     * @param bank_id
     */
    unbindBankCard(bank_id) {
        if (this.phone === '') {
            this.message = '为安全起见，请先验证手机号';
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
        modalRef.componentInstance.verificationBtnText = '解绑';
        modalRef.componentInstance.verificationCodeEvt.subscribe(evt => {
            console.log(evt);
            this.backbone.unbindBankCard(
                this.backbone.publicEncrypt(''),
                evt.requestId,
                evt.bizId,
                evt.phone,
                evt.verificationCode,
                bank_id
            )
                .subscribe(res => {
                    if (res.code === 0) {
                        this.message = '成功解绑银行卡！';
                        modalRef.componentInstance.activeModal.close();
                        this.fetchBankCards();
                    } else {
                        modalRef.componentInstance.hint = res.msg || res;
                    }
                });
        });
    }

    /**
     *  提现
     */
    withdrawCash() {
        if (this.phone === '') {
            this.message = '为安全起见，请先验证手机号';
            return;
        }

        const modalRef = this.modalService.open(FormModalComponent);

        modalRef.componentInstance.title = '安全验证';
        modalRef.componentInstance.hint = `提取资金将汇款至尾号为${ this.defaultBank }的银行卡上`;
        modalRef.componentInstance.keyValues = [
            {
                index: 0,
                key: `提取金额（以元为单位，可提金额：${ this.available }元）`,
                type: 'text',
                src: ''
            },
            {
                index: 1,
                key: '',
                type: 'verification'
            }
        ];
        modalRef.componentInstance.submitBtnText = '';
        modalRef.componentInstance.phone = this.phone;
        modalRef.componentInstance.disablePhone = true;
        modalRef.componentInstance.verificationBtnText = '提取';
        modalRef.componentInstance.verificationCodeEvt.subscribe(evt => {
            const withdraw = parseFloat(evt.keyValues[0].src) * 100;
            const available = parseFloat(this.available) * 100;

            if (withdraw &&
                typeof withdraw === 'number' &&
                withdraw % 1 === 0 &&
                withdraw <= available
            ) {
                this.backbone.withdrawCash(
                    this.backbone.publicEncrypt(''),
                    this.backbone.authorizerMiniProgramAppId,
                    evt.requestId,
                    evt.bizId,
                    evt.phone,
                    evt.verificationCode,
                    withdraw
                )
                    .subscribe(res => {
                        if (res.code === 0) {
                            this.message = '申请提现成功！';
                            modalRef.componentInstance.activeModal.close();
                            this.fetchCapitalInfo();
                        } else {
                            modalRef.componentInstance.hint = res.msg || res;
                        }
                    });
            } else {
                modalRef.componentInstance.hint = '请输入正确的提现金额';
            }
        });

    }

}
