import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-list-entry',
    templateUrl: './list-entry.component.html',
    styleUrls: ['./list-entry.component.less']
})
export class ListEntryComponent implements OnInit {

    constructor(private router: Router,
                private backbone: BackboneService) {
    }

    ngOnInit() {
    }

    wechat() {
        this.backbone.channel = 'official';
        this.router.navigate(['entry/wechat/official/basic', {type: 0}]);
    }

    miniprogram() {
        this.backbone.channel = 'miniprogram';
        this.router.navigate(['entry/wechat/miniprogram/list', {type: 1}]);
    }
}
