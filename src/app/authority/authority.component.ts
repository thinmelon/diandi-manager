import {Component, OnInit} from '@angular/core';
import {BackboneService} from '../services/diandi.backbone';

@Component({
    selector: 'app-authority',
    templateUrl: './authority.component.html',
    styleUrls: ['./authority.component.less']
})
export class AuthorityComponent implements OnInit {
    public authorityUrl = '';

    constructor(private backbone: BackboneService) {
    }

    ngOnInit() {
        this.authorityUrl = `https://www.pusudo.cn/platform/authority/wechat?session=${ this.backbone.session }`;
        console.log(this.authorityUrl);
    }
}
