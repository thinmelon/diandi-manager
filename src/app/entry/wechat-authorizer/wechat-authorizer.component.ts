import {Component, OnInit} from '@angular/core';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-wechat-authorizer',
    templateUrl: './wechat-authorizer.component.html',
    styleUrls: ['./wechat-authorizer.component.less']
})
export class WechatAuthorizerComponent implements OnInit {
    public wechatOfficialAccount = '';

    constructor(private backbone: BackboneService) {
    }

    ngOnInit() {
        this.wechatOfficialAccount = `https://www.pusudo.cn/platform/authority/wechat?auth_type=1&session=${ this.backbone.session }`;
    }

}
