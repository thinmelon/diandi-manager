import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-mini-program-list',
    templateUrl: './mini-program-list.component.html',
    styleUrls: ['./mini-program-list.component.less']
})
export class MiniProgramListComponent implements OnInit {
    public bindMiniprogram = '';
    public miniprograms = [];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        const that = this;

        this.bindMiniprogram = `https://www.pusudo.cn/platform/authority/wechat?auth_type=2&session=${ this.backbone.session }`;
        this.route.data
            .subscribe((data: { miniprogramListResolver: any }) => {
                let index = 0;
                that.miniprograms = data.miniprogramListResolver.map(item => {
                    return {
                        index: ++index,
                        appid: item.appid,
                        funcInfo: item.funcInfo
                    };
                });
            });
    }

    accountInfo(appid) {
        this.router.navigate(['entry/wechat/miniprogram/info', {appid: appid}]);
    }
}
