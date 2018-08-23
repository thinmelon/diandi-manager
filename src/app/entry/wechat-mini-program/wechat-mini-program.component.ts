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
}
