import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-authority',
    templateUrl: './authority.component.html',
    styleUrls: ['./authority.component.less']
})
export class AuthorityComponent implements OnInit {
    public authorityUrl = 'https://www.pusudo.cn/platform/authority/wechat';

    constructor() {
    }

    ngOnInit() {
    }
}
