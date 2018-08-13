import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {BackboneService} from '../services/diandi.backbone';

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
                private backbone: BackboneService) {
    }

    ngOnInit() {
        const session = this.route.snapshot.queryParamMap.get('s');
        if (session && session !== '') {
            console.log('S ===> ' + session);
            this.loginSuccess(session);
        }
    }

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
