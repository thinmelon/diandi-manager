import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-list-mini-program',
    templateUrl: './list-mini-program.component.html',
    styleUrls: ['./list-mini-program.component.less']
})
export class ListMiniProgramComponent implements OnInit {
    public bindMiniprogram = '';
    public miniprograms = [];
    public defaultAuthorizerAppid;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        const that = this;

        this.bindMiniprogram = `https://www.pusudo.cn/platform/authority/wechat?auth_type=2&session=${ this.backbone.session }`;
        this.defaultAuthorizerAppid = this.backbone.authorizerMiniProgramAppId;
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

    setDefaultAuthorizer(appid) {
        this.backbone.authorizerMiniProgramAppId = appid;
        this.defaultAuthorizerAppid = appid;
    }
}
