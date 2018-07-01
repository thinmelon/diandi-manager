import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {BackboneService} from '../services/diandi.backbone';
import {ContainerService} from '../services/container.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    message = '';
    btnText = '登录';

    constructor(private router: Router,
                private container: ContainerService,
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
                    this.container.set({
                        session: res.msg[0]['3rd_session']
                    });
                    /**
                     *  设置状态为已登录
                     */
                    this.backbone.isLoggedIn = true;
                    /**
                     *  跳转至回调地址
                     */
                    typeof(this.backbone.redirectUrl) === 'undefined' ?
                        this.router.navigate(['/list/order']) :         //  默认： 订单页
                        this.router.navigate([this.backbone.redirectUrl]);
                }
            });

    }

}
