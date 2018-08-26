import {Component, OnInit} from '@angular/core';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-bind-official',
    templateUrl: './bind-official.component.html',
    styleUrls: ['./bind-official.component.less']
})
export class BindOfficialComponent implements OnInit {
    public wechatOfficialAccount = '';

    constructor(private backbone: BackboneService) {
    }

    ngOnInit() {
        this.wechatOfficialAccount = `https://www.pusudo.cn/platform/authority/wechat?auth_type=1&session=${ this.backbone.session }`;
    }
}
