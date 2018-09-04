import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BackboneService} from '../../services/diandi.backbone';

const __SCOPE__ = 'snsapi_login';
const __STATE__ = 'WECHAT';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.less']
})
export class UserInfoComponent implements OnInit {
    public phone = '';
    public nickname = '';
    public bindWechat = '';

    constructor(private route: ActivatedRoute,
                private backbone: BackboneService) {
    }

    ngOnInit() {

        this.route.data
            .subscribe((data: { wechatUserInfoResolver: any }) => {
                console.log(data.wechatUserInfoResolver);
                if (data.wechatUserInfoResolver.code === 0 && data.wechatUserInfoResolver.msg.length > 0) {
                    if (data.wechatUserInfoResolver.msg[0].phone
                        && data.wechatUserInfoResolver.msg[0].phone !== '') {
                        this.phone = data.wechatUserInfoResolver.msg[0].phone;
                        const __REDIRECT_URI__ = encodeURIComponent(
                            `https://www.pusudo.cn/platform/new/wechat?phone=${ this.phone }&appid=${ this.backbone.diandiWebsiteAppId }`);
                        this.bindWechat = `https://open.weixin.qq.com/connect/qrconnect?appid=${ this.backbone.diandiWebsiteAppId }&redirect_uri=${ __REDIRECT_URI__ }&response_type=code&scope=${ __SCOPE__ }&state=${ __STATE__ }#wechat_redirect`;
                    }
                    if (data.wechatUserInfoResolver.msg[0].nickname
                        && data.wechatUserInfoResolver.msg[0].nickname !== '') {
                        this.nickname = data.wechatUserInfoResolver.msg[0].nickname;
                        console.log(this.nickname);
                    }
                }
            });
    }

}
