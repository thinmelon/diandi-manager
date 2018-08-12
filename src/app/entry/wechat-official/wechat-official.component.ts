import {Component, OnInit} from '@angular/core';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-wechat-official',
    templateUrl: './wechat-official.component.html',
    styleUrls: ['./wechat-official.component.less']
})
export class WechatOfficialComponent implements OnInit {

    constructor(private backbone: BackboneService) {
    }

    ngOnInit() {

    }

}
