import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-wechat-mini-program',
    templateUrl: './wechat-mini-program.component.html',
    styleUrls: ['./wechat-mini-program.component.less']
})
export class WechatMiniProgramComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    main() {
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
        this.router.navigate(['entry/wechat/miniprogram/user']);
    }

    cards(pid) {
        this.router.navigate(['entry/wechat/miniprogram/card', {pid: pid}]);
    }
}
