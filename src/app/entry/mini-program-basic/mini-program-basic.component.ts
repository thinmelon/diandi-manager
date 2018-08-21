import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Account, AccountTypeEnum, principalTypeEnum, realnameStatusEnum} from '../../services/diandi.structure';

@Component({
    selector: 'app-mini-program-basic',
    templateUrl: './mini-program-basic.component.html',
    styleUrls: ['./mini-program-basic.component.less']
})
export class MiniProgramBasicComponent implements OnInit {
    public info: Account;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        const that = this;
        this.route.data
            .subscribe((data: { miniprogramInfoResolver: any }) => {
                console.log(data);
                if (data.miniprogramInfoResolver.errcode === 0) {
                    const rawData = data.miniprogramInfoResolver;
                    that.info = new Account(
                        rawData.appid,
                        AccountTypeEnum[rawData.account_type],
                        rawData.head_image_info.head_image_url,
                        rawData.nickname,
                        rawData.principal_name,
                        principalTypeEnum[rawData.principal_type],
                        realnameStatusEnum[rawData.realname_status],
                        rawData.signature_info.signature,
                        rawData.wx_verify_info.qualification_verify,
                        rawData.wx_verify_info.naming_verify
                    );
                }
            });
    }

}
