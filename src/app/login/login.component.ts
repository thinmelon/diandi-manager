import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {BackboneService} from '../services/diandi.backbone';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    message = '';
    btnText = '登录';

    constructor(private router: Router,
                private backbone: BackboneService) {
    }

    ngOnInit() {
    }

    login(evt) {
        this.backbone.login(
            evt.requestId,
            evt.bizId,
            evt.phone,
            evt.verificationCode
        )
            .subscribe(res => {
                console.log(res);
                console.log(this.backbone.redirectUrl);
                if (res.code === 0 && res.msg.length > 0) {
                    /**
                     *  保存session
                     */
                    this.backbone.session = res.msg[0]['3rd_session'];
                    /**
                     *  设置状态为已登录
                     */
                    this.backbone.isLoggedIn = 'YES';
                    /**
                     *  跳转至回调地址
                     */
                    typeof(this.backbone.redirectUrl) !== 'undefined' && this.backbone.redirectUrl ?
                        this.router.navigate([this.backbone.redirectUrl]) :
                        this.router.navigate(['/list/order']);                      //  默认： 订单页

                }
            });

    }

}
