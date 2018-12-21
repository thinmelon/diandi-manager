import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-wechat-panel',
    templateUrl: './wechat-panel.component.html',
    styleUrls: ['./wechat-panel.component.less']
})
export class WechatPanelComponent implements OnInit {
    headImageUrl: string;
    nickname: string;
    channel: string;
    boardHeight: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.boardHeight = window.innerHeight.toString() + 'px';
        this.route.data
            .subscribe((data: { wechatUserInfoResolver: any }) => {
                this.channel = this.backbone.channel;       //  设置入口类型
                if (data.wechatUserInfoResolver.code === 0) {
                    this.headImageUrl = data.wechatUserInfoResolver.headimgurl ? data.wechatUserInfoResolver.headimgurl : '../../../assets/public/foot.png';
                    this.nickname = data.wechatUserInfoResolver.nickname ? data.wechatUserInfoResolver.nickname : '个人中心';
                }
            });
    }

    main() {
        sessionStorage.clear();
        window.location.href = 'http://www.pusudo.cn';
    }

    home() {
        this.router.navigate(['list/entry']);
    }

    basic() {
        if (this.channel === 'official') {
            this.router.navigate(['entry/wechat/official/basic', {type: 0}]);
        } else if (this.channel === 'miniprogram') {
            this.router.navigate(['entry/wechat/miniprogram/list', {type: 1}]);
        }
    }

    scenario() {
        this.router.navigate(['entry/wechat/miniprogram/scenario']);
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

    // cards(pid) {
    //     this.router.navigate(['entry/wechat/miniprogram/card', {pid: pid}]);
    // }

    menu() {
        this.router.navigate(['entry/wechat/official/menu']);
    }

    miniprogram() {
        // this.router.navigate(['entry/wechat/official/miniprogram', {type: 1}]);
        this.router.navigate(['entry/wechat/official/miniprogram/new']);
    }

}
