import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

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

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {

        this.route.data
            .subscribe((data: { wechatOfficialResolver: any }) => {
                console.log(data);
                if (data.wechatOfficialResolver.hasOwnProperty('authorizer_info')) {
                    const info = data.wechatOfficialResolver.authorizer_info;
                    this.headImage = info.head_img;
                    this.nickName = info.nick_name;
                    this.principalName = info.principal_name;
                    this.alias = info.alias;
                    this.signature = info.signature;
                }
            });
    }

}
