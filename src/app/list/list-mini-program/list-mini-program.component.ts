import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackboneService} from '../../services/diandi.backbone';
import {PrivilegeSet} from '../../services/diandi.structure';

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
        this.bindMiniprogram = `https://www.pusudo.cn/platform/authority/wechat?auth_type=2&session=${ this.backbone.session }`;
        this.defaultAuthorizerAppid = this.backbone.authorizerMiniProgramAppId;
        this.route.data
            .subscribe((data: { miniprogramListResolver: any }) => {
                let index = 0;
                this.miniprograms = data.miniprogramListResolver.map(item => {
                    console.log(item.funcInfo.split(','));
                    let funcInfo = '';
                    item.funcInfo.split(',').map(func => {
                        const value = parseInt(func);
                        if (value) {
                            funcInfo += PrivilegeSet[value] ? PrivilegeSet[value] + ';' : value;
                        }
                    })
                    return {
                        index: ++index,
                        appid: item.appid,
                        funcInfo: funcInfo
                    };
                });
                if (this.miniprograms.length > 0) {
                    this.setDefaultAuthorizer(this.miniprograms[0].appid);  //  默认使用第一个小程序appid
                }
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
