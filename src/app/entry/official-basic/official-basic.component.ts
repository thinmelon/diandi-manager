import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PrivilegeSet} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-official-basic',
    templateUrl: './official-basic.component.html',
    styleUrls: ['./official-basic.component.less']
})
export class OfficialBasicComponent implements OnInit {
    public headImage = '';
    public nickName = '';
    public principalName = '';
    public alias = '';
    public signature = '';
    public funcInfo = [];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        const that = this;
        this.route.data
            .subscribe((data: { wechatOfficialResolver: any }) => {
                if (data.wechatOfficialResolver.hasOwnProperty('authorizer_info') &&
                    data.wechatOfficialResolver.hasOwnProperty('authorization_info')) {
                    const authorizer = data.wechatOfficialResolver.authorizer_info;
                    this.headImage = authorizer.head_img;
                    this.nickName = authorizer.nick_name;
                    this.principalName = authorizer.principal_name;
                    this.alias = authorizer.alias;
                    this.signature = authorizer.signature;
                    let index = 0;
                    const authorization = data.wechatOfficialResolver.authorization_info;
                    that.backbone.authorizerAppId = authorization.authorizer_appid;
                    that.funcInfo = authorization.func_info.map(item => {
                        return {
                            index: ++index,
                            name: PrivilegeSet[item.funcscope_category.id]
                        };
                    });
                } else {
                    this.router.navigate(['/entry/wechat/official/bind']);
                }
            });
    }

}
