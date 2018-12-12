import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {VerificationCode} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-verification-code',
    templateUrl: './verification-code.component.html',
    styleUrls: ['./verification-code.component.less']
})
export class VerificationCodeComponent implements OnDestroy {
    /**
     *  外部属性
     */
    @Input() hasSent = false;
    @Input() btnSendText = '发送';
    @Input() btnConfirmText = '下一步';
    @Input() phone = '';
    @Input() disablePhone = false;
    @Input() message = '';
    @Output() blurEvt = new EventEmitter<string>();
    @Output() gotoNext = new EventEmitter<VerificationCode>();

    public verificationCode = '';
    /**
     *  内部属性
     */
    private requestId = '';
    private bizId = '';
    private timerId = 0;
    private countDownSeconds = 60;
    private sendMessageSubscription: Subscription;

    constructor(private backbone: BackboneService) {
    }

    ngOnDestroy() {
        this.clearTimer();
        if (typeof this.sendMessageSubscription !== 'undefined') {
            this.sendMessageSubscription.unsubscribe();
        }
    }

    /**
     * 校验输入的手机号码
     * @param phone
     * @returns {boolean}
     */
    private check(phone: string): boolean {
        const reg = /^1[0-9]{10}$/;
        return reg.test(phone);
    }

    /**
     * 清空Timer
     */
    private clearTimer() {
        clearInterval(this.timerId);
    }

    /**
     * 倒计时
     */
    private countDown() {
        this.clearTimer();
        this.timerId = window.setInterval(() => {
            this.countDownSeconds--;
            if (this.countDownSeconds <= 0) {
                this.clearTimer();
                this.countDownSeconds = 60;
                this.hasSent = false;
                this.btnSendText = '重新发送';
            } else {
                this.btnSendText = `${ this.countDownSeconds } 秒`;
            }
        }, 1000);
    }

    /**
     * 开始发送验证码
     */
    sendVerificationCode(): void {
        if (this.check(this.phone)) {
            this.hasSent = true;
            this.sendMessageSubscription = this.backbone
                .sendVerificationCode(this.backbone.publicEncrypt(''), this.phone)
                .subscribe(result => {
                    // console.log(result);
                    if (result.hasOwnProperty('requestId') && result.hasOwnProperty('bizId')) {
                        this.countDown();
                        this.requestId = result.requestId;
                        this.bizId = result.bizId;
                    }
                });
        } else {
            this.message = '请输入正确的手机号码';
        }
    }

    onBlur() {
        if (!this.check(this.phone)) {
            this.message = '请输入正确的手机号码';
        } else {
            this.blurEvt.emit(this.phone);
        }
    }

    onConfirm(): void {
        // this.gotoNext.emit(new VerificationCode(
        //     '4CA5D55F-B201-48F7-898B-4DD4E1B4CB16',
        //     '250717730345090598^0',
        //     '18159393355',
        //     '032851'
        // ));
        this.gotoNext.emit(new VerificationCode(
            this.requestId,
            this.bizId,
            this.phone,
            this.verificationCode
        ));
    }
}
