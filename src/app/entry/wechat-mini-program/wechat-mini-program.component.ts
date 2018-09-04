import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-wechat-mini-program',
    templateUrl: './wechat-mini-program.component.html',
    styleUrls: ['./wechat-mini-program.component.less']
})
export class WechatMiniProgramComponent implements OnInit {
    headImageUrl: string;
    nickname: string;

    constructor(private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { wechatUserInfoResolver: any }) => {
                console.log(data);
                if (data.wechatUserInfoResolver.code === 0 && data.wechatUserInfoResolver.msg.length > 0) {
                    this.headImageUrl = data.wechatUserInfoResolver.msg[0].headimgurl
                        ? data.wechatUserInfoResolver.msg[0].headimgurl : '../../../assets/public/foot.png';
                    this.nickname = data.wechatUserInfoResolver.msg[0].nickname
                        ? data.wechatUserInfoResolver.msg[0].nickname : '个人中心';
                }
            });
    }

    main() {
        sessionStorage.clear();
        window.location.href = 'http://www.pusudo.cn';
        // this.router.navigate(['list/entry']);
    }

    home() {
        this.router.navigate(['list/entry']);
    }

    basic() {
        this.router.navigate(['entry/wechat/miniprogram/list', {type: 1}]);
    }

    template() {
        this.router.navigate(['entry/wechat/miniprogram/template']);
    }

    business() {
        this.router.navigate(['entry/wechat/miniprogram/business']);
    }

    products() {
        this.router.navigate(['entry/wechat/miniprogram/product']);
    }

    orders() {
        this.router.navigate(['entry/wechat/miniprogram/order']);
    }

    users() {
        this.router.navigate(['entry/wechat/miniprogram/user/list']);
    }

    userInfo() {
        this.router.navigate(['entry/wechat/miniprogram/user/info']);
    }

    cards(pid) {
        this.router.navigate(['entry/wechat/miniprogram/card', {pid: pid}]);
    }
}
