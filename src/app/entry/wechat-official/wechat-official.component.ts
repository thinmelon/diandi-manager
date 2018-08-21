import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-wechat-official',
    templateUrl: './wechat-official.component.html',
    styleUrls: ['./wechat-official.component.less']
})
export class WechatOfficialComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    main() {
        this.router.navigate(['list/entry']);
    }

    basic() {
        this.router.navigate(['entry/wechat/official/basic', {type: 0}]);
    }

    menu() {
        this.router.navigate(['entry/wechat/official/menu']);
    }

    miniprogram() {
        // this.router.navigate(['entry/wechat/official/miniprogram', {type: 1}]);
        this.router.navigate(['entry/wechat/official/miniprogram/new']);
    }
}
