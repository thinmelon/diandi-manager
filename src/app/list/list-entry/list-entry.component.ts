import {Component, OnInit} from '@angular/core';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-list-entry',
    templateUrl: './list-entry.component.html',
    styleUrls: ['./list-entry.component.less']
})
export class ListEntryComponent implements OnInit {
    public wechatOfficialAccount = '';

    constructor(private backbone: BackboneService) {
    }

    ngOnInit() {
        this.wechatOfficialAccount = `https://www.pusudo.cn/platform/authority/wechat?session=${ this.backbone.session }`;
    }

}
