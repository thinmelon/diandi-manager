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
    public btnAuthText = '';

    constructor(private route: ActivatedRoute,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        const that = this;
        this.route.data
            .subscribe((data: { wechatOfficialResolver: any }) => {
                console.log(data);
                if (data.wechatOfficialResolver.hasOwnProperty('authorizer_info') &&
                    data.wechatOfficialResolver.hasOwnProperty('authorization_info')) {
                    const authorizer = data.wechatOfficialResolver.authorizer_info;
                    this.headImage = authorizer.head_img;
                    this.nickName = authorizer.nick_name;
                    this.principalName = authorizer.principal_name;
                    this.alias = authorizer.alias;
                    this.signature = authorizer.signature;
                    this.btnAuthText = '重新授权';
                    let index = 0;
                    const authorization = data.wechatOfficialResolver.authorization_info;
                    console.log(authorization);
                    that.backbone.authorizerAppId = authorization.authorizer_appid;
                    that.funcInfo = authorization.func_info.map(item => {
                        return {
                            index: ++index,
                            id: item.funcscope_category.id,
                            name: PrivilegeSet[item.funcscope_category.id]
                        };
                    });
                } else {
                    this.btnAuthText = '绑定微信公众号';
                }
            });
    }

    /**
     * 公众号授权
     */
    reauthorization() {
        window.location.href = `https://www.pusudo.cn/backbone/authority/wechat?auth_type=1&session=${ this.backbone.publicEncrypt('') }`;
    }

    /**
     *  快速注册小程序
     */
    fastRegisterMiniProgram() {
        window.location.href = `https://www.pusudo.cn/backbone/register/miniprogram?session=${ this.backbone.publicEncrypt('') }&appid=${ this.backbone.authorizerAppId }`;
    }
}
