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
        this.channel = this.backbone.channel;
    }

    ngOnInit() {
        this.boardHeight = window.innerHeight.toString() + 'px';
        console.log(this.boardHeight);
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
